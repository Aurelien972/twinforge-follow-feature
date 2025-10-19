# Stripe Integration Setup Guide

This guide explains how to configure Stripe for TwinForgeFit's token-based subscription system.

## Overview

TwinForgeFit uses Stripe for:
- **Monthly Subscriptions**: Recurring billing with automatic token allocation
- **One-Time Token Purchases**: Pay-as-you-go token packs
- **Customer Portal**: Self-service subscription management
- **Webhooks**: Real-time synchronization with Stripe events

## Required Environment Variables

Add these environment variables to your Supabase project:

### 1. Stripe Secret Key

```bash
STRIPE_SECRET_KEY=sk_test_...  # Test mode key
# or
STRIPE_SECRET_KEY=sk_live_...  # Production mode key
```

**How to get it:**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers > API keys**
3. Copy your **Secret key**
4. In Supabase: **Project Settings > Edge Functions > Secrets**
5. Add secret: `STRIPE_SECRET_KEY` with your key

### 2. Stripe Publishable Key (Frontend)

Add to your `.env` file:

```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...  # Test mode
# or
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...  # Production mode
```

### 3. Stripe Webhook Secret

```bash
STRIPE_WEBHOOK_SECRET=whsec_...
```

**How to get it:**
1. In Stripe Dashboard: **Developers > Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `https://YOUR_SUPABASE_PROJECT.supabase.co/functions/v1/stripe-webhooks`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. After creating the endpoint, reveal and copy the **Signing secret**
6. Add to Supabase: `STRIPE_WEBHOOK_SECRET`

## Stripe Products & Prices Setup

### 1. Create Subscription Products

For each subscription tier, create a product in Stripe:

1. Go to **Products > Add product**
2. Create products for each tier:
   - **Essential** (9€/month - 1,000 tokens)
   - **Pro** (19€/month - 3,000 tokens)
   - **Elite** (29€/month - 5,000 tokens)
   - **Champion** (39€/month - 8,000 tokens)
   - **Master** (49€/month - 12,000 tokens)
   - **Legend** (59€/month - 18,000 tokens)
   - **Titan** (99€/month - 35,000 tokens)

3. For each product:
   - Set **Pricing**: Recurring, Monthly
   - Set **Price**: Corresponding EUR amount
   - **Copy the Price ID** (starts with `price_`)

### 2. Update Database Configuration

After creating all Stripe products, update the `token_pricing_config` table:

```sql
UPDATE token_pricing_config
SET subscription_plans = jsonb_set(
  subscription_plans,
  '{essential,stripe_price_id}',
  '"price_YOUR_STRIPE_PRICE_ID"'
)
WHERE is_active = true;

-- Repeat for each tier (pro, elite, champion, master, legend, titan)
```

Or update all at once:

```sql
UPDATE token_pricing_config
SET subscription_plans = '{
  "essential": {
    "name": "Essential",
    "tokens_per_month": 1000,
    "price_eur": 9.00,
    "stripe_price_id": "price_YOUR_ESSENTIAL_PRICE_ID"
  },
  "pro": {
    "name": "Pro",
    "tokens_per_month": 3000,
    "price_eur": 19.00,
    "stripe_price_id": "price_YOUR_PRO_PRICE_ID"
  },
  "elite": {
    "name": "Elite",
    "tokens_per_month": 5000,
    "price_eur": 29.00,
    "stripe_price_id": "price_YOUR_ELITE_PRICE_ID"
  },
  "champion": {
    "name": "Champion",
    "tokens_per_month": 8000,
    "price_eur": 39.00,
    "stripe_price_id": "price_YOUR_CHAMPION_PRICE_ID"
  },
  "master": {
    "name": "Master",
    "tokens_per_month": 12000,
    "price_eur": 49.00,
    "stripe_price_id": "price_YOUR_MASTER_PRICE_ID"
  },
  "legend": {
    "name": "Legend",
    "tokens_per_month": 18000,
    "price_eur": 59.00,
    "stripe_price_id": "price_YOUR_LEGEND_PRICE_ID"
  },
  "titan": {
    "name": "Titan",
    "tokens_per_month": 35000,
    "price_eur": 99.00,
    "stripe_price_id": "price_YOUR_TITAN_PRICE_ID"
  }
}'::jsonb
WHERE is_active = true;
```

## Testing the Integration

### 1. Test Subscription Flow

1. Navigate to `/settings?tab=subscription`
2. Click on any subscription plan
3. Complete checkout with Stripe test card: `4242 4242 4242 4242`
4. Verify:
   - User is redirected back to settings with success message
   - Subscription appears in `user_subscriptions` table
   - Tokens are added to `user_token_balance`
   - Transaction logged in `token_transactions`

### 2. Test Token Purchase

1. Navigate to `/settings?tab=subscription`
2. Click "Acheter" on any token pack
3. Complete checkout with test card
4. Verify:
   - Tokens are added to user's balance
   - Transaction is logged with `source='one_time_purchase'`

### 3. Test Webhooks

1. Trigger a webhook event in Stripe Dashboard or test mode
2. Check `stripe_webhooks_log` table for event processing
3. Verify corresponding actions (subscription creation, token addition, etc.)

### 4. Test Customer Portal

1. Navigate to `/settings?tab=subscription`
2. Click "Gérer mon abonnement"
3. Verify redirect to Stripe Customer Portal
4. Test cancel subscription, update payment method, etc.

## Stripe Test Cards

Use these test cards for different scenarios:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Insufficient funds**: `4000 0000 0000 9995`
- **3D Secure required**: `4000 0025 0000 3155`

All test cards:
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any valid postal code

## Monthly Token Reset Automation

Tokens are automatically reset on subscription renewal via webhook:

1. Stripe sends `invoice.payment_succeeded` event
2. `stripe-webhooks` function handles event
3. Tokens are reset to plan allocation
4. Previous balance is archived in transaction history

## Monitoring & Troubleshooting

### Check Webhook Logs

```sql
SELECT *
FROM stripe_webhooks_log
ORDER BY created_at DESC
LIMIT 50;
```

### Check Failed Webhooks

```sql
SELECT *
FROM stripe_webhooks_log
WHERE status = 'error'
ORDER BY created_at DESC;
```

### Check Token Transactions

```sql
SELECT
  tt.*,
  up.email
FROM token_transactions tt
JOIN auth.users up ON up.id = tt.user_id
WHERE tt.created_at > NOW() - INTERVAL '24 hours'
ORDER BY tt.created_at DESC;
```

### Check Active Subscriptions

```sql
SELECT
  us.*,
  up.email,
  utb.balance as current_token_balance
FROM user_subscriptions us
JOIN auth.users up ON up.id = us.user_id
JOIN user_token_balance utb ON utb.user_id = us.user_id
WHERE us.status = 'active'
ORDER BY us.created_at DESC;
```

## Security Best Practices

1. **Never expose Secret Key**: Only use in Edge Functions server-side
2. **Verify Webhook Signatures**: Always validate `Stripe-Signature` header
3. **Use HTTPS**: Ensure all Stripe communication uses HTTPS
4. **Rotate Keys**: Periodically rotate API keys in production
5. **Monitor Webhooks**: Set up alerts for failed webhook deliveries

## Production Checklist

Before going live:

- [ ] Replace test API keys with live keys
- [ ] Update webhook endpoint to production URL
- [ ] Create live Stripe products and update database
- [ ] Test complete subscription flow with real card
- [ ] Set up monitoring and alerting
- [ ] Review Stripe Dashboard settings (tax, invoices, emails)
- [ ] Configure Stripe Customer Portal branding
- [ ] Set up automatic failed payment handling
- [ ] Document subscription cancellation policy

## Support & Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Dashboard](https://dashboard.stripe.com)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Token Integration Guide](supabase/functions/_shared/TOKEN_INTEGRATION_GUIDE.md)

## Common Issues

### Webhook Not Receiving Events

1. Check webhook endpoint URL is correct
2. Verify Edge Function is deployed
3. Check Supabase logs: `supabase functions logs stripe-webhooks`
4. Test webhook delivery in Stripe Dashboard

### Tokens Not Added After Payment

1. Check `stripe_webhooks_log` for webhook processing
2. Verify `user_token_balance` and `token_transactions` tables
3. Check for errors in Edge Function logs
4. Ensure user_id metadata is correctly passed to Stripe

### Subscription Not Created

1. Verify Stripe Price IDs in `token_pricing_config`
2. Check user authentication status
3. Review `create-checkout-session` function logs
4. Ensure Stripe Secret Key is correctly configured

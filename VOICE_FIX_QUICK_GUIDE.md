# 🔧 Voice Connection Fix - Quick Guide

## The Problem
WebSocket connection errors preventing voice coach from working.

## The Solution
Configure OPENAI_API_KEY in Supabase Edge Function secrets.

## ⚡ Quick Fix (5 minutes)

### 1. Run Diagnostics
Open your browser console and type:
```javascript
runVoiceDiagnostics()
```

### 2. If it shows "OPENAI_API_KEY not configured":

#### Go to Supabase Dashboard
🔗 https://supabase.com/dashboard/project/kwipydbtjagypocpvbwn

#### Add the Secret
1. Click **"Edge Functions"** in sidebar
2. Click **"Settings"** tab
3. Scroll to **"Secrets"** section
4. Click **"Add new secret"**
5. Enter:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `sk-proj-...` (your OpenAI API key)
6. Click **"Save"**

#### Get OpenAI API Key
If you don't have one:
🔗 https://platform.openai.com/api-keys

### 3. Test Again
```javascript
runVoiceDiagnostics()
```

All tests should now pass ✅

## What Changed

### Before
- Generic WebSocket errors with no helpful information
- No way to diagnose the actual problem
- Connection attempts fail silently

### After
- Detailed diagnostic tool runs automatically
- Clear error messages identifying the exact issue
- Step-by-step solutions provided
- Pre-connection checks prevent wasted attempts

## New Developer Tools

### Browser Console Commands

```javascript
// Full diagnostic report
runVoiceDiagnostics()

// Quick status check
quickVoiceCheck()
```

These are automatically available in development mode.

## Files Changed

✅ Enhanced error handling in WebSocket connection
✅ Added pre-connection diagnostic checks
✅ Created browser diagnostic utility
✅ Improved error messages with solutions
✅ Auto-load diagnostics in dev mode

## Common Issues & Solutions

### Issue: WebSocket Error
**Solution**: Add OPENAI_API_KEY to Supabase secrets

### Issue: All diagnostics pass but still fails
**Solutions**:
- Check OpenAI API key is valid
- Verify key has Realtime API access
- Try different network (mobile hotspot)
- Check Supabase Edge Function logs

### Issue: Can't access Supabase Dashboard
**Solution**: Get owner/admin access to the Supabase project

## Testing the Fix

1. ✅ Run diagnostics in console
2. ✅ Verify all 6 tests pass
3. ✅ Try voice coach feature
4. ✅ Confirm WebSocket connects
5. ✅ Test audio recording/playback

## Need Help?

Check the detailed guide: `VOICE_CONNECTION_FIX.md`

## Architecture

```
Browser → WebSocket → Supabase Edge Function → OpenAI Realtime API
                      (needs OPENAI_API_KEY)
```

The edge function is deployed and working. It just needs the API key configured in secrets.

---

**TL;DR**: Add `OPENAI_API_KEY` to Supabase Edge Function secrets via the dashboard. Run `runVoiceDiagnostics()` in console to verify.

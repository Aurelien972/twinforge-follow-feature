# TwinForge Master Index

**Version**: 2.0
**Last Updated**: October 2025
**Purpose**: Central navigation hub for all TwinForge documentation

---

## About TwinForge

TwinForge is a comprehensive health and performance optimization platform that integrates multiple specialized systems (Forges) to provide holistic, AI-powered recommendations for nutrition, training, fasting, and body composition.

**Core Philosophy**: Data-driven personalization through cross-forge intelligence and a unified central brain that learns from all user interactions.

---

## Quick Navigation

### For Users
- [Getting Started Guide](#user-guides)
- [Feature Overview](#forge-systems-overview)
- [Subscription Plans](#monetization-and-plans)

### For Developers
- [Architecture Overview](#technical-documentation)
- [API Documentation](#technical-documentation)
- [Deployment Guide](#technical-documentation)

### For Business
- [Executive Summary](#business-documentation)
- [Monetization System](#monetization-and-plans)
- [Market Positioning](#business-documentation)

---

## Forge Systems Overview

TwinForge consists of six integrated "Forges", each specializing in a specific aspect of health optimization:

### 1. Energy Forge (Activity Tracking)
**Purpose**: Track, analyze, and optimize physical activity and exercise
**Documentation**: [FORGE_ENERGETIQUE.md](./activity/FORGE_ENERGETIQUE.md)

**Key Features**:
- Multi-modal activity capture (audio, text, wearables)
- AI-powered session analysis
- Real-time GPS tracking
- Heart rate zones and performance metrics
- Progressive overload tracking

**User Flow**: Capture → Analysis → Review → Save → Insights

---

### 2. Nutrition Forge
**Purpose**: Intelligent meal tracking and nutritional optimization
**Documentation**: [FORGE_NUTRITIONNELLE.md](./nutrition/FORGE_NUTRITIONNELLE.md)

**Key Features**:
- Photo-based meal scanning with AI vision
- Barcode scanning for packaged foods
- Automatic macronutrient calculation
- Daily nutrition tracking and trends
- Personalized meal insights

**User Flow**: Scan → Analysis → Review → Save → Daily Tracking

---

### 3. Time Forge (Intermittent Fasting)
**Purpose**: Track and optimize intermittent fasting protocols
**Documentation**: [FORGE_TEMPORELLE.md](./fasting/FORGE_TEMPORELLE.md)

**Key Features**:
- Multiple fasting protocol support (16:8, 18:6, 20:4, OMAD, etc.)
- Real-time metabolic phase tracking
- Fasting streak management
- AI-generated progression insights
- Historical analysis and trends

**User Flow**: Protocol Selection → Session Tracking → Completion → Insights

---

### 4. Body Forge (3D Body Scanning)
**Purpose**: Precise body composition analysis through 3D scanning
**Documentation**:
- [FORGE_CORPORELLE_BODY_SCAN.md](./bodyscan/FORGE_CORPORELLE_BODY_SCAN.md)
- [Pipeline Details](./bodyscan/body-forge/PIPELINE.md)

**Key Features**:
- Multi-photo 3D reconstruction
- AI-powered morphology estimation
- Limb mass distribution analysis
- Skin tone extraction and mapping
- Historical body composition tracking

**User Flow**: Photo Capture → AI Estimation → 3D Matching → Refinement → Avatar Generation

---

### 5. Culinary Forge (Recipe & Meal Planning)
**Purpose**: AI-powered meal planning based on available ingredients
**Documentation**: [CULINARY_FORGE.md](./culinaire/CULINARY_FORGE.md)

**Key Features**:
- Fridge scanning and inventory management
- AI recipe generation from available ingredients
- Weekly meal planning
- Smart shopping list generation
- Budget optimization

**User Flow**: Fridge Scan → Inventory Review → Recipe Generation → Meal Planning → Shopping List

---

### 6. Training Forge (Structured Workout Programs)
**Purpose**: Personalized training program generation and tracking
**Documentation**: [TRAINING_SYSTEM_OVERVIEW.md](./training/TRAINING_SYSTEM_OVERVIEW.md)

**Key Features**:
- Multi-discipline support (Force, Endurance, Calisthenics, Functional, Competitions)
- AI coaching with contextual conversations
- Equipment detection and adaptation
- Real-time session tracking with illustrations
- Progressive program generation

**Disciplines**:
- **Force**: Powerlifting and strength training
- **Endurance**: Running, cycling, swimming
- **Calisthenics**: Bodyweight training
- **Functional**: CrossFit-style workouts
- **Competitions**: Race and event preparation

**User Flow**: Goal Setting → Program Generation → Session Execution → Performance Analysis

---

## Central Brain Integration

**Documentation**: [CENTRAL_BRAIN_INTEGRATION.md](./technical/CENTRAL_BRAIN_INTEGRATION.md)

The Central Brain is the AI orchestration layer that correlates data across all Forges to provide holistic recommendations.

### Cross-Forge Intelligence

**How It Works**:
1. **Data Collection**: Each Forge exports structured data to the Central Brain
2. **Correlation Analysis**: AI identifies patterns and relationships across systems
3. **Holistic Recommendations**: Generates unified advice considering all health aspects
4. **Adaptive Learning**: Continuously improves based on user outcomes

**Example Correlations**:
- Training intensity affects nutrition needs and fasting protocol recommendations
- Poor sleep (Activity) suggests adjusting training load and fasting windows
- Body composition changes inform training and nutrition adjustments
- Fasting adherence impacts energy levels and workout performance

### Integration Points

Each Forge provides:
- Structured data exports in standardized format
- Real-time event streams for immediate correlation
- Historical trend data for long-term pattern analysis
- User feedback loops for recommendation refinement

---

## Monetization and Plans

**Documentation**: [MONETIZATION_SYSTEM.md](./technical/MONETIZATION_SYSTEM.md)

### Subscription Tiers

TwinForge uses a 7-tier subscription model with progressive feature access:

| Tier | Monthly Price | AI Tokens/Month | Key Features |
|------|--------------|-----------------|--------------|
| **Essential** | $9.99 | 50,000 | Basic tracking, manual entry |
| **Pro** | $19.99 | 150,000 | AI analysis, all Forges unlocked |
| **Elite** | $29.99 | 300,000 | Advanced insights, priority support |
| **Champion** | $49.99 | 600,000 | Training programs, meal plans |
| **Master** | $79.99 | 1,000,000 | Central Brain full access |
| **Legend** | $149.99 | 2,500,000 | API access, custom integrations |
| **Titan** | $299.99 | Unlimited | White-glove service, dedicated coach |

### Token System

- **AI operations consume tokens** based on model usage and complexity
- **Automatic monthly refresh** on billing cycle
- **Unused tokens do not roll over**
- **Pay-as-you-go top-ups** available for all tiers

**Token Costs** (approximate):
- Meal scan analysis: 5,000-10,000 tokens
- Training session generation: 15,000-25,000 tokens
- Body scan processing: 20,000-30,000 tokens
- Central Brain correlation: 10,000-20,000 tokens

---

## User Guides

### Getting Started
1. **Sign Up**: Create account with email/password
2. **Complete Profile**: Fill in basic health and goal information
3. **Connect Devices** (optional): Link wearables for automated tracking
4. **Choose Your First Forge**: Start with the system most relevant to your goals
5. **Explore Cross-Forge Intelligence**: As you use multiple Forges, unlock Central Brain insights

### Best Practices
- **Consistency**: Use systems regularly for best AI recommendations
- **Complete Data**: Fill out profile sections for personalized advice
- **Track Progress**: Review insights tabs to see trends
- **Iterate**: Adjust based on AI feedback and personal experience

---

## Technical Documentation

### Architecture
**Documentation**: [architecture.md](./technical/architecture.md)

**Tech Stack**:
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **AI**: OpenAI GPT-4 Vision, GPT-4o, Whisper
- **3D**: Three.js + React Three Fiber
- **Payments**: Stripe Subscriptions + Checkout
- **Storage**: Supabase Storage with RLS

### Key Systems

1. **Pipeline Architecture**: [forge-pipeline-harmonization.md](./technical/forge-pipeline-harmonization.md)
   - Standardized flow: Capture → Analysis → Review → Save
   - Background AI processing with job queues
   - Token consumption tracking

2. **Illustration System**: [illustration-system.md](./technical/illustration-system.md)
   - AI-generated exercise illustrations
   - Diptych format (start/end positions)
   - Caching and optimization

3. **Training Coach System**: [TRAINING_SYSTEM_OVERVIEW.md](./training/TRAINING_SYSTEM_OVERVIEW.md)
   - Modular coach architecture
   - Discipline-specific prompt systems
   - Real-time session tracking

4. **Data Retention**: [data-retention-policy.md](./technical/data-retention-policy.md)
   - GDPR compliance
   - Preventive health data (5 years)
   - Critical user data protection

5. **Edge Functions**: All AI operations run as Supabase Edge Functions
   - Token middleware integration
   - CORS configuration
   - Error handling and monitoring

---

## Business Documentation

### Executive Summary
**Documentation**: [executive-summary.md](./pitch/executive-summary.md)

**Market Opportunity**:
- $96B global fitness market
- Growing demand for AI-powered personalization
- Integration gap between tracking apps

**Competitive Advantages**:
- Unified platform vs. fragmented solutions
- Cross-system AI intelligence
- Freemium to premium monetization
- Privacy-first architecture

### Website Content Guide
**Documentation**: [WEBSITE_CONTENT_GUIDE.md](./technical/WEBSITE_CONTENT_GUIDE.md)

Comprehensive guide for creating marketing website including:
- Landing page structure and copy
- Feature showcases for each Forge
- Pricing page design
- SEO optimization
- User testimonial frameworks

---

## Training Documentation

### Overview
**Main Documentation**: [TRAINING_SYSTEM_OVERVIEW.md](./training/TRAINING_SYSTEM_OVERVIEW.md)

### Discipline-Specific Docs
- [Coach Force Specification](./training/COACH_FORCE_SPECIFICATION.md)
- [Coach Endurance Specification](./training/COACH_ENDURANCE_SPECIFICATION.md)
- [Coach Competitions Specification](./training/COACH_COMPETITIONS_SPECIFICATION.md)

### Technical Guides
- [Coach Analyzer Architecture](./training/COACH_ANALYZER_MODULAR_ARCHITECTURE.md)
- [Data Flow Architecture](./training/DATA_FLOW_ARCHITECTURE.md)
- [Endurance Session Feedback](./training/ENDURANCE_SESSION_FEEDBACK_FLOW.md)

---

## Wearables Integration

**Documentation**:
- [Health Connect Setup](./wearables/HEALTH_CONNECT_SETUP.md)
- [OAuth Configuration](./wearables/OAUTH_REDIRECT_URI_CONFIGURATION.md)
- [Supabase Secrets](./wearables/SUPABASE_SECRETS_SETUP.md)

**Supported Platforms**:
- Apple Health (iOS)
- Google Health Connect (Android)
- Manual OAuth integration for other providers

**Data Sync**:
- Automatic background sync
- Real-time activity detection
- Heart rate zones integration
- Sleep and recovery metrics

---

## Development Workflow

### Local Development
```bash
npm install
npm run dev
```

### Database Migrations
```bash
# View migrations
supabase migration list

# Apply new migration
supabase migration up
```

### Edge Function Deployment
```bash
# Deploy function
supabase functions deploy <function-name>

# View logs
supabase functions logs <function-name>
```

### Stripe Setup
```bash
# Create test products
npm run stripe:create:test

# Verify configuration
npm run stripe:verify:test
```

---

## Support and Resources

### For Users
- In-app help tooltips
- Coach chat for contextual assistance
- Email support: support@twinforge.app

### For Developers
- GitHub repository: [private]
- API documentation: [In development]
- Developer Discord: [Coming soon]

### For Partners
- Integration guides: [In development]
- White-label options: Contact sales
- API access: Legend tier and above

---

## Document Maintenance

**Last Major Update**: October 2025
**Update Frequency**: Monthly or with significant feature releases
**Maintainer**: TwinForge Core Team

### Change Log
- **October 2025**: Initial consolidated master index
- **Future**: Version control with git history

---

## Quick Links

### Most Important Documents
1. [Executive Summary](./pitch/executive-summary.md) - Business overview
2. [Architecture](./technical/architecture.md) - Technical foundation
3. [Central Brain](./technical/CENTRAL_BRAIN_INTEGRATION.md) - AI orchestration
4. [Monetization](./technical/MONETIZATION_SYSTEM.md) - Business model

### For New Users
1. [Getting Started](#user-guides)
2. [Energy Forge](./activity/FORGE_ENERGETIQUE.md)
3. [Nutrition Forge](./nutrition/FORGE_NUTRITIONNELLE.md)

### For New Developers
1. [Architecture](./technical/architecture.md)
2. [Pipeline Harmonization](./technical/forge-pipeline-harmonization.md)
3. [Database Setup](./technical/database-health-check.md)

---

*This master index is the central entry point for all TwinForge documentation. All paths are relative to the `/docs` directory.*

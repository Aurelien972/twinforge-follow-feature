# TwinForge Documentation

**Version:** 1.0.0 (MVP)
**Last Updated:** October 2025
**Project:** TwinForge - AI-Powered Training & Nutrition Platform

---

## Table of Contents

1. [Overview](#overview)
2. [Training Forge (Training System)](#training-forge-training-system)
3. [Culinary Forge (Nutrition System)](#culinary-forge-nutrition-system)
4. [Technical Architecture](#technical-architecture)
5. [Document Index](#document-index)

---

## Overview

TwinForge is an AI-powered platform that combines two specialized systems:

1. **Training Forge** - Personalized training programs with specialized AI coaches
2. **Culinary Forge** - Intelligent nutrition planning and meal generation

Both systems leverage cutting-edge AI (GPT-4o, GPT-4o Vision, Whisper) and run on Supabase infrastructure with Edge Functions.

---

## Training Forge (Training System)

### MVP Status: ✅ Operational

The Training Forge system generates personalized workout programs through a 5-step pipeline with specialized AI coaches.

### Key Features

**✅ Implemented:**
- 5-step training pipeline (Préparer → Activer → Séance → Analyser → Avancer)
- 5 specialized AI coaches (Force, Endurance, Functional, Competitions, Calisthenics)
- Equipment detection via computer vision (GPT-4o Vision)
- Training locations management with photo analysis
- Real-time session tracking
- AI-powered performance analysis
- Multi-discipline support

**🔄 In Development:**
- Training Dashboard 4 tabs (partial functionality)
- Advanced progression analytics
- Historical data visualization

**❌ Not in MVP:**
- Apple Health / Google Fit integration
- Wearable device synchronization
- Advanced ML predictions

### 5 Operational Coaches

1. **Coach Force** ✅ - Force, Powerlifting, Bodybuilding, Strongman
2. **Coach Endurance** ✅ - Running, Cycling, Swimming, Triathlon, Cardio
3. **Coach Functional** ⚙️ - CrossFit, HIIT, Functional Training, Circuit
4. **Coach Competitions** ⚙️ - HYROX, DEKA FIT, DEKA MILE, DEKA STRONG
5. **Coach Calisthenics** ⚙️ - Calisthenics, Street Workout, Streetlifting, Freestyle

**Legend:**
- ✅ Fully operational and tested
- ⚙️ Implemented, in testing phase

### Quick Start Documentation

**Start Here:** [📄 TRAINING_FORGE_MVP.md](./training/TRAINING_FORGE_MVP.md)
→ Complete MVP overview with all features, architecture, and roadmap

**System Deep-Dive:** [📄 TRAINING_SYSTEM_OVERVIEW.md](./training/TRAINING_SYSTEM_OVERVIEW.md)
→ Detailed system architecture and technical documentation

**Coaches & Disciplines:** [📄 TRAINING_DISCIPLINES_AND_COACHES.md](./training/TRAINING_DISCIPLINES_AND_COACHES.md)
→ All training categories and coach specializations

**Dashboard Tabs:** [📄 TRAINING_PAGE_TABS.md](./training/TRAINING_PAGE_TABS.md)
→ Training dashboard (Today, Insights, History, Progression tabs)

### Specialized Documentation

**Coach Specifications:**
- [📄 COACH_FORCE_SPECIFICATION.md](./training/COACH_FORCE_SPECIFICATION.md) - Force & Powerbuilding
- [📄 COACH_ENDURANCE_SPECIFICATION.md](./training/COACH_ENDURANCE_SPECIFICATION.md) - Endurance & Cardio
- [📄 COACH_COMPETITIONS_SPECIFICATION.md](./training/COACH_COMPETITIONS_SPECIFICATION.md) - HYROX & DEKA
- [📄 COACH_FUNCTIONAL_SPECIFICATION.md](./training/COACH_FUNCTIONAL_SPECIFICATION.md) - CrossFit & HIIT *(To be created)*
- [📄 COACH_CALISTHENICS_SPECIFICATION.md](./training/COACH_CALISTHENICS_SPECIFICATION.md) - Calisthenics *(To be created)*

**Implementation Guides:**
- [📄 COACH_ANALYZER_MODULAR_ARCHITECTURE.md](./training/COACH_ANALYZER_MODULAR_ARCHITECTURE.md) - Session analysis system
- [📄 COACH_TEMPLATE_GUIDE.md](./training/COACH_TEMPLATE_GUIDE.md) - How to create new coaches
- [📄 ENDURANCE_SESSION_FEEDBACK_FLOW.md](./training/ENDURANCE_SESSION_FEEDBACK_FLOW.md) - Endurance feedback system

---

## Culinary Forge (Nutrition System)

### Status: 🚧 Documentation Pending

The Culinary Forge system provides intelligent meal planning, recipe generation, and nutrition tracking.

**Key Features:**
- Fridge scanning with computer vision
- AI-powered recipe generation
- Weekly meal planning
- Shopping list generation
- Dietary restrictions support
- Macro tracking

**Documentation:** [📄 culinary-forge.md](./technical/culinary-forge.md)

---

## Technical Architecture

### Edge Functions

All AI operations run through Supabase Edge Functions for security and performance.

**Training System Functions:**
- `training-coach-force` - Force & Powerbuilding specialist
- `training-coach-endurance` - Endurance & Cardio specialist
- `training-coach-functional` - CrossFit & HIIT specialist
- `training-coach-competitions` - HYROX & DEKA specialist
- `training-coach-calisthenics` - Bodyweight specialist
- `training-coach-analyzer` - Session performance analysis
- `training-context-collector` - User context optimization
- `training-exercise-regenerate` - Exercise substitutions
- `training-insights-generator` - Long-term insights
- `training-voice-transcribe` - Voice feedback transcription
- `detect-equipment` - Equipment detection from photos
- `process-detection-jobs` - Background detection processing

**Nutrition System Functions:**
- `fridge-scanner` - Fridge inventory analysis
- `recipe-generator` - Recipe creation
- `meal-planner` - Weekly meal planning
- `shopping-list-generator` - Shopping list creation

**Documentation:**
- [📄 architecture.md](./technical/architecture.md) - System architecture
- [📄 edge-function-token-management-best-practices.md](./technical/edge-function-token-management-best-practices.md) - Edge Functions best practices
- [📄 training-coach-notification-system.md](./technical/training-coach-notification-system.md) - Notification system

### Database Schema

All data is stored in Supabase PostgreSQL with Row Level Security (RLS) policies.

**Key Tables:**
- `training_sessions` - Session data
- `training_locations` - User training locations
- `training_goals` - User training goals
- `training_session_exercises` - Exercise tracking
- `training_session_sets` - Set-by-set data
- `training_session_endurance_blocks` - Endurance block tracking
- `profiles` - User profiles
- `meal_plans` - Weekly meal plans
- `recipes` - Generated recipes

**Migrations:** See `/supabase/migrations/` for complete schema

---

## Document Index

### Training System (/docs/training/)

**Core Documentation:**
1. [TRAINING_FORGE_MVP.md](./training/TRAINING_FORGE_MVP.md) - **START HERE** - Complete MVP overview
2. [TRAINING_SYSTEM_OVERVIEW.md](./training/TRAINING_SYSTEM_OVERVIEW.md) - Detailed system architecture
3. [TRAINING_DISCIPLINES_AND_COACHES.md](./training/TRAINING_DISCIPLINES_AND_COACHES.md) - Coaches & disciplines
4. [TRAINING_PAGE_TABS.md](./training/TRAINING_PAGE_TABS.md) - Dashboard tabs documentation

**Coach Specifications:**
5. [COACH_FORCE_SPECIFICATION.md](./training/COACH_FORCE_SPECIFICATION.md) - Force coach
6. [COACH_ENDURANCE_SPECIFICATION.md](./training/COACH_ENDURANCE_SPECIFICATION.md) - Endurance coach
7. [COACH_COMPETITIONS_SPECIFICATION.md](./training/COACH_COMPETITIONS_SPECIFICATION.md) - Competitions coach

**Implementation Guides:**
8. [COACH_ANALYZER_MODULAR_ARCHITECTURE.md](./training/COACH_ANALYZER_MODULAR_ARCHITECTURE.md) - Analysis system
9. [COACH_TEMPLATE_GUIDE.md](./training/COACH_TEMPLATE_GUIDE.md) - Creating new coaches
10. [ENDURANCE_SESSION_FEEDBACK_FLOW.md](./training/ENDURANCE_SESSION_FEEDBACK_FLOW.md) - Feedback flow

### Technical Documentation (/docs/technical/)

1. [architecture.md](./technical/architecture.md) - System architecture
2. [culinary-forge.md](./technical/culinary-forge.md) - Nutrition system
3. [edge-function-token-management-best-practices.md](./technical/edge-function-token-management-best-practices.md) - Edge Functions
4. [training-coach-notification-system.md](./technical/training-coach-notification-system.md) - Notifications

### Business Documentation (/docs/pitch/)

1. [executive-summary.md](./pitch/executive-summary.md) - Project pitch and vision

---

## Contributing

### Creating New Documentation

When creating new documentation:

1. **Use clear naming:** Descriptive, lowercase with hyphens (e.g., `coach-wellness-specification.md`)
2. **Include metadata:** Version, date, status at the top
3. **Add to index:** Update this README.md with links
4. **Cross-reference:** Link to related documents
5. **Keep it concise:** Focus on essential information

### Documentation Standards

- **Version format:** `1.0.0 (MVP)` or `2.0.0 (Phase 2)`
- **Status indicators:**
  - ✅ Operational / Complete
  - ⚙️ Implemented / Testing
  - 🔄 In Development / Partial
  - ❌ Not Implemented / Out of Scope
  - 🚧 Planned / Roadmap

---

## Roadmap

### Phase 1: MVP (Current) ✅
- 5 specialized coaches operational
- Core training pipeline complete
- Equipment detection system
- Basic dashboard functionality

### Phase 2: Coach Expansion
- Re-introduce Wellness & Mobilité coach
- Implement Mixte & Personnalisé coach
- Multi-coach programs
- Coach handoffs

### Phase 3: Advanced Features
- Combat Sports coach
- Sports Spécifiques coach
- Wearable data integration
- ML-based predictions
- Form analysis via computer vision

### Phase 4: Social & Gamification
- Training buddies
- Leaderboards
- Challenges
- Social sharing

### Phase 5: Integration & Optimization
- Gym equipment integration
- Smart home gym equipment
- Voice coaching
- Video analysis
- Advanced periodization

---

## Support

For technical questions or documentation updates:
- Review existing documentation in this directory
- Check Edge Function implementations in `/supabase/functions/`
- Consult migration files in `/supabase/migrations/`

---

**Document Version:** 1.0.0 (MVP)
**Maintained By:** TwinForge AI Team
**Last Updated:** October 2025

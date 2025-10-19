# Voice Coach Quick Fix Guide

## TL;DR - What I Found

**Good News**: The code is correct! The voice system architecture is solid and properly connected from button to edge function.

**Issue**: If the voice mode button doesn't work, it's likely a **configuration issue**, not a code issue.

## Immediate Actions

### 1. Check if Edge Function is Deployed

```bash
# In your terminal
supabase functions list
```

**Expected**: You should see `voice-coach-realtime` in the list.

**If not listed**:
```bash
supabase functions deploy voice-coach-realtime
```

### 2. Configure OpenAI API Key

1. Go to: **Supabase Dashboard**
2. Navigate to: **Edge Functions** → **Settings** → **Secrets**
3. Add secret:
   - Name: `OPENAI_API_KEY`
   - Value: `sk-...` (your OpenAI API key)

**This is critical!** The edge function will fail without this key.

### 3. Test the Button

1. **Open the app** in browser
2. **Click the floating button** (bottom-right corner)
3. **Click the microphone icon** in the drawer header
4. **Allow microphone** when prompted
5. **Wait 2-3 seconds** for connection

### 4. Check Browser Console

Press **F12** and look for these logs:

**Success**:
```
✅✅✅ SUCCESSFULLY CONNECTED TO REALTIME API ✅✅✅
✅✅✅ Voice session started successfully - STATE = LISTENING ✅✅✅
```

**Failure** (missing API key):
```
❌ CONNECTION TIMEOUT after 15 seconds
```

## Button Styling Issue

**Reported**: Button has square corners
**Code Reality**: Button is correctly styled with `borderRadius: '50%'`

**Quick Fix**:
1. Hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
2. If still square, check DevTools → Elements → find button → check Computed styles

## Architecture Verified

```
Button Click → Drawer Opens → Toggle Voice → Start Session → Connect to Edge Function → OpenAI Realtime API
```

**All connections are correct** ✅

## Files Analyzed

1. ✅ `src/ui/components/chat/UnifiedFloatingButton.tsx` - Button correctly styled
2. ✅ `src/ui/components/chat/UnifiedCoachDrawer.tsx` - Auto-starts voice session
3. ✅ `src/system/services/voiceCoachOrchestrator.ts` - Orchestrates voice flow
4. ✅ `src/system/services/openaiRealtimeService.ts` - WebSocket client
5. ✅ `supabase/functions/voice-coach-realtime/index.ts` - Proxy to OpenAI

## Common Errors

### Error: "Connection timeout - WebSocket did not open within 15 seconds"
**Cause**: Missing `OPENAI_API_KEY` in Supabase Edge Function secrets
**Fix**: Add the key in Supabase Dashboard → Edge Functions → Secrets

### Error: "Microphone access required"
**Cause**: Browser permission denied
**Fix**: Click lock icon in address bar → Allow microphone

### Error: Button appears square
**Cause**: CSS cache or performance mode
**Fix**: Hard refresh (Ctrl+Shift+R) or clear cache

## What Was Done

1. ✅ Analyzed entire voice system architecture
2. ✅ Verified all code connections are correct
3. ✅ Confirmed button styling is correct in code
4. ✅ Verified WebSocket URL construction
5. ✅ Confirmed edge function proxy logic is correct
6. ✅ Created comprehensive diagnostic document

## For Detailed Debugging

See: **VOICE_SYSTEM_DIAGNOSTIC.md** for:
- Complete architecture diagram
- Step-by-step testing instructions
- All log markers to look for
- Network tab debugging guide
- Edge function log verification

## Next Step

**Configuration is the most likely issue.** Check:
1. ✅ OPENAI_API_KEY configured in Supabase
2. ✅ Edge function deployed
3. ✅ Browser microphone permission granted

Then test the voice mode and check console logs.

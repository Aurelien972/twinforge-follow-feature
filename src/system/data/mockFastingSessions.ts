/**
 * Mock Fasting Sessions - Test Data Generator
 * Utilities for generating test fasting sessions for pipeline testing
 */

import { supabase } from '../supabase/client';
import { subDays, format } from 'date-fns';
import logger from '../../lib/utils/logger';

export interface MockFastingSession {
  user_id: string;
  start_time: string;
  end_time: string;
  target_hours: number;
  actual_duration_hours: number;
  protocol_id: string;
  status: 'completed' | 'cancelled';
  notes: string;
  created_at: string;
}

/**
 * Generate realistic mock fasting sessions for testing
 */
function generateMockSessions(
  userId: string, 
  count: number = 8, 
  mode: 'period' | 'same_day' = 'period'
): MockFastingSession[] {
  const sessions: MockFastingSession[] = [];
  const protocols = ['16:8', '18:6', '20:4', '14:10'];
  const targetHoursOptions = [16, 18, 20, 14];
  
  logger.debug('MOCK_FASTING_SESSIONS_GENERATE', 'Starting session generation', {
    userId,
    count,
    mode,
    timestamp: new Date().toISOString()
  });
  
  if (mode === 'same_day') {
    // Generate 3 sessions for today (for testing daily summary)
    const today = new Date();
    
    // Generate 3 different sessions for today at different times
    const sessionTimes = [
      { start: 8, protocol: '16:8', target: 16 },   // Session matinale
      { start: 14, protocol: '18:6', target: 18 },  // Session après-midi
      { start: 20, protocol: '14:10', target: 14 }  // Session soirée
    ];
    
    sessionTimes.forEach((sessionConfig, index) => {
      const startTime = new Date(today);
      startTime.setHours(sessionConfig.start, 0, 0, 0);
      
      // Generate realistic actual duration (90-105% of target for success)
      const completionRate = 0.90 + Math.random() * 0.15; // 90% to 105%
      const actualDuration = sessionConfig.target * completionRate;
      
      // End time calculation
      const endTime = new Date(startTime.getTime() + actualDuration * 60 * 60 * 1000);
      
      sessions.push({
        user_id: userId,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        target_hours: sessionConfig.target,
        actual_duration_hours: Math.round(actualDuration * 10) / 10,
        protocol_id: sessionConfig.protocol,
        status: 'completed',
        notes: `mock-session-same-day-${index + 1}`,
        created_at: startTime.toISOString()
      });
    });
    
    logger.debug('MOCK_FASTING_SESSIONS_GENERATE', 'Generated same-day session', {
      userId,
      sessionsCount: sessions.length,
      sessionsData: sessions.map(s => ({
        startTime: s.start_time,
        endTime: s.end_time,
        targetHours: s.target_hours,
        actualDurationHours: s.actual_duration_hours,
        protocol: s.protocol_id,
        status: s.status
      })),
      timestamp: new Date().toISOString()
    });
  } else {
    // Generate sessions across multiple days (original logic fixed)
    for (let i = 0; i < count; i++) {
      // Generate one session per day for the last 'count' days
      const daysAgo = i;
      const sessionDate = subDays(new Date(), daysAgo);
      
      // Random start time between 19:00 and 22:00
      const startHour = 19 + Math.floor(Math.random() * 4);
      const startMinute = Math.floor(Math.random() * 60);
      const startTime = new Date(sessionDate);
      startTime.setHours(startHour, startMinute, 0, 0);
      
      // Select random protocol
      const protocolIndex = Math.floor(Math.random() * protocols.length);
      const protocol = protocols[protocolIndex];
      const targetHour = targetHoursOptions[protocolIndex];
      
      // Generate realistic actual duration (85-105% of target for better success rate)
      const completionRate = 0.85 + Math.random() * 0.2; // 85% to 105%
      const actualDuration = targetHour * completionRate;
      
      // End time calculation
      const endTime = new Date(startTime.getTime() + actualDuration * 60 * 60 * 1000);
      
      // CRITICAL: All sessions are completed for AI testing
      const status = 'completed' as const;
      
      sessions.push({
        user_id: userId,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        target_hours: targetHour,
        actual_duration_hours: Math.round(actualDuration * 10) / 10,
        protocol_id: protocol,
        status,
        notes: 'mock-session-period',
        created_at: startTime.toISOString()
      });
    }
    
    logger.debug('MOCK_FASTING_SESSIONS_GENERATE', 'Generated period sessions', {
      userId,
      count,
      sessionsGenerated: sessions.length,
      sessionsSummary: sessions.map(s => ({
        date: s.start_time.split('T')[0],
        targetHours: s.target_hours,
        actualHours: s.actual_duration_hours,
        protocol: s.protocol_id,
        status: s.status
      })),
      timestamp: new Date().toISOString()
    });
  }
  
  // Sort by start time (oldest first)
  const sortedSessions = sessions.sort((a, b) => 
    new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
  );
  
  logger.debug('MOCK_FASTING_SESSIONS_GENERATE', 'Sessions generation completed', {
    userId,
    mode,
    requestedCount: count,
    actualCount: sortedSessions.length,
    timestamp: new Date().toISOString()
  });
  
  return sortedSessions;
}

/**
 * Create mock fasting sessions in the database
 */
export async function createMockFastingSessions(
  userId: string, 
  count: number = 8, 
  mode: 'period' | 'same_day' = 'period'
): Promise<void> {
  try {
    logger.info('MOCK_FASTING_SESSIONS', 'Creating mock fasting sessions', {
      userId,
      count,
      mode,
      timestamp: new Date().toISOString()
    });

    // Clear existing mock sessions first
    await clearMockFastingSessions(userId);
    
    const mockSessions = generateMockSessions(userId, count, mode);
    
    logger.debug('MOCK_FASTING_SESSIONS_CREATE', 'About to insert sessions into database', {
      userId,
      count,
      mode,
      sessionsToInsert: mockSessions.length,
      sessionsData: mockSessions.map(s => ({
        date: s.start_time.split('T')[0],
        targetHours: s.target_hours,
        actualHours: s.actual_duration_hours,
        protocol: s.protocol_id,
        status: s.status
      })),
      timestamp: new Date().toISOString()
    });
    
    const { data, error } = await supabase
      .from('fasting_sessions')
      .insert(mockSessions)
      .select();

    if (error) {
      logger.error('MOCK_FASTING_SESSIONS', 'Failed to create mock sessions', {
        error: error.message,
        errorCode: error.code,
        errorDetails: error.details,
        userId,
        count,
        mode,
        sessionsAttempted: mockSessions.length,
        timestamp: new Date().toISOString()
      });
      throw error;
    }

    logger.info('MOCK_FASTING_SESSIONS', 'Mock sessions created successfully', {
      userId,
      requestedCount: count,
      generatedCount: mockSessions.length,
      sessionsCreated: data?.length || 0,
      mode,
      actualSessions: data?.map(s => ({
        date: s.start_time.split('T')[0],
        hours: s.actual_duration_hours,
        protocol: s.protocol_id,
        status: s.status
      })),
      timestamp: new Date().toISOString()
    });
    
    // AUDIT: Verify insertion success
    if ((data?.length || 0) !== mockSessions.length) {
      logger.error('MOCK_FASTING_SESSIONS_AUDIT', 'Insertion count mismatch detected', {
        userId,
        mode,
        requestedCount: count,
        generatedCount: mockSessions.length,
        insertedCount: data?.length || 0,
        mismatchDetected: true,
        timestamp: new Date().toISOString()
      });
    }

  } catch (error) {
    logger.error('MOCK_FASTING_SESSIONS', 'Exception during mock session creation', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      userId,
      count,
      mode,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
}

/**
 * Clear all mock fasting sessions from the database
 */
export async function clearMockFastingSessions(userId: string): Promise<void> {
  try {
    logger.info('MOCK_FASTING_SESSIONS', 'Clearing mock fasting sessions', {
      userId,
      timestamp: new Date().toISOString()
    });

    // Clear both types of mock sessions
    const { error } = await supabase
      .from('fasting_sessions')
      .delete()
      .eq('user_id', userId)
      .in('notes', ['mock-session', 'mock-session-period', 'mock-session-same-day']);

    if (error) {
      logger.error('MOCK_FASTING_SESSIONS', 'Failed to clear mock sessions', {
        error: error.message,
        userId,
        timestamp: new Date().toISOString()
      });
      throw error;
    }

    logger.info('MOCK_FASTING_SESSIONS', 'Mock sessions cleared successfully', {
      userId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('MOCK_FASTING_SESSIONS', 'Exception during mock session cleanup', {
      error: error instanceof Error ? error.message : 'Unknown error',
      userId,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
}

/**
 * Check if user has mock sessions
 */
export async function hasMockFastingSessions(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('fasting_sessions')
      .select('id')
      .eq('user_id', userId)
      .in('notes', ['mock-session', 'mock-session-period', 'mock-session-same-day'])
      .limit(1);

    if (error) {
      logger.error('MOCK_FASTING_SESSIONS', 'Failed to check mock sessions', {
        error: error.message,
        userId,
        timestamp: new Date().toISOString()
      });
      return false;
    }

    return (data?.length || 0) > 0;
  } catch (error) {
    logger.error('MOCK_FASTING_SESSIONS', 'Exception during mock session check', {
      error: error instanceof Error ? error.message : 'Unknown error',
      userId,
      timestamp: new Date().toISOString()
    });
    return false;
  }
}
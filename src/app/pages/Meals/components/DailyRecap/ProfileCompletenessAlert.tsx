import React from 'react';
import { motion } from 'framer-motion';
import logger from '../../../../../lib/utils/logger';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';
import { Link } from '../../../../../app/nav/Link';
import { calculateProfileCompleteness, getProfileStatusMessage } from '../../../../../lib/profile/profileCompleteness';

interface ProfileCompletenessAlertProps {
  profile: any;
}

/**
 * Profile Completeness Alert - Enhanced with detailed breakdown
 */
const ProfileCompletenessAlert: React.FC<ProfileCompletenessAlertProps> = ({
  profile,
}) => {
  // CRITICAL FIX: Enhanced useMemo with deep dependency tracking
  const profileAnalysis = React.useMemo(() => {
    logger.debug('PROFILE_COMPLETENESS_ALERT', 'Recalculating profile completeness', {
      profileExists: !!profile,
      profileId: profile?.id,
      profileUserId: profile?.userId,
      immutabilityMarker: profile?._immutabilityMarker,
      profileTimestamp: profile?.updated_at,
      criticalFields: {
        displayName: profile?.displayName,
        sex: profile?.sex,
        height_cm: profile?.height_cm,
        weight_kg: profile?.weight_kg
      },
      profileObjectReference: profile ? Object.keys(profile).length : 0,
      timestamp: new Date().toISOString()
    });
    
    const completeness = calculateProfileCompleteness(profile);
    
    logger.debug('PROFILE_COMPLETENESS_ALERT', 'Profile completeness calculated', {
      percentage: completeness.percentage,
      canProvideAccurateAnalysis: completeness.canProvideAccurateAnalysis,
      missingCriticalCount: completeness.missingCritical.length,
      missingCritical: completeness.missingCritical,
      immutabilityMarker: profile?._immutabilityMarker,
      timestamp: new Date().toISOString()
    });
    
    return completeness;
  }, [
    profile,
    // CRITICAL: Add specific field dependencies to force recalculation
    profile?.displayName,
    profile?.sex,
    profile?.height_cm,
    profile?.weight_kg,
    profile?.target_weight_kg,
    profile?.activity_level,
    profile?.objective,
    profile?.birthdate,
    profile?.job_category,
    profile?.phoneNumber,
    profile?._immutabilityMarker,
    profile?.updated_at
  ]);
  
  const statusMessage = getProfileStatusMessage(profileAnalysis);
  
  // CRITICAL DEBUG: Log every render to track useMemo behavior
  React.useEffect(() => {
    logger.debug('PROFILE_COMPLETENESS_ALERT_RENDER', 'Component rendered with profile analysis', {
      profileExists: !!profile,
      profileId: profile?.id,
      analysisPercentage: profileAnalysis.percentage,
      canProvideAccurateAnalysis: profileAnalysis.canProvideAccurateAnalysis,
      missingCriticalCount: profileAnalysis.missingCritical.length,
      missingCritical: profileAnalysis.missingCritical,
      statusMessageTitle: statusMessage.title,
      statusMessageType: statusMessage.type,
      immutabilityMarker: profile?._immutabilityMarker,
      profileCriticalFields: {
        displayName: profile?.displayName,
        sex: profile?.sex,
        height_cm: profile?.height_cm,
        weight_kg: profile?.weight_kg
      },
      timestamp: new Date().toISOString()
    });
  }, [profile, profileAnalysis, statusMessage]);

  // Show alert if completeness is below 60% or critical fields are missing
  if (profileAnalysis.canProvideAccurateAnalysis && profileAnalysis.percentage >= 75) {
    return null;
  }

  // Determine alert severity based on completeness
  const alertSeverity = profileAnalysis.percentage < 30 ? 'high' :
                       profileAnalysis.percentage < 60 ? 'medium' : 'low';
  
  const alertColors = {
    high: { bg: 'rgba(239, 68, 68, 0.12)', border: 'rgba(239, 68, 68, 0.3)', text: '#EF4444', icon: 'AlertCircle' as const },
    medium: { bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)', text: '#F59E0B', icon: 'Info' as const },
    low: { bg: 'rgba(59, 130, 246, 0.12)', border: 'rgba(59, 130, 246, 0.3)', text: '#3B82F6', icon: 'Info' as const }
  };
  
  const alertStyle = alertColors[alertSeverity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard 
        className="p-4"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, ${alertStyle.bg} 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: alertStyle.border,
          boxShadow: `0 0 20px ${alertStyle.text}15`
        }}
      >
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-3"
          >
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: `${alertStyle.text}20`,
                border: `1px solid ${alertStyle.text}40`
              }}
            >
              <SpatialIcon 
                Icon={ICONS[alertStyle.icon]} 
                size={12} 
                style={{ color: alertStyle.text }}
              />
            </div>
            <div>
              <span className="text-white font-medium text-sm">
                {statusMessage.title}
              </span>
              <div className="text-white/60 text-xs mt-1">
                {profileAnalysis.missingCritical.length > 0 ? 
                  `${profileAnalysis.missingCritical.length} champs critiques manquants` :
                  `${profileAnalysis.percentage}% complété`
                }
              </div>
            </div>
          </div>
          
          <Link 
            to="/profile" 
            className="btn-glass--secondary-nav px-3 py-1.5 text-xs"
            style={{
              background: 'rgba(96, 165, 250, 0.15)',
              borderColor: 'rgba(96, 165, 250, 0.3)',
              color: '#60A5FA'
            }}
          >
            <div className="flex items-center gap-1">
              <SpatialIcon Icon={ICONS.User} size={12} />
              <span>{statusMessage.actionText || 'Compléter'}</span>
            </div>
          </Link>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default ProfileCompletenessAlert;
import { motion } from 'framer-motion';
import { Link } from '../../../../nav/Link';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';
import { useUserStore } from '../../../../../system/store/userStore';
import React from 'react';

interface ProfileAnalysis {
  percentage: number;
  missingCritical: string[];
  missingOptional: string[];
  hasBasicInfo: boolean;
  canUseActivityFeatures: boolean;
}

interface AlertStyle {
  bg: string;
  border: string;
  text: string;
  icon: keyof typeof ICONS;
}

interface StatusMessage {
  title: string;
  actionText: string;
}

/**
 * Analyser la complétude du profil pour les fonctionnalités d'activité
 */
function analyzeProfileForActivity(profile: any): ProfileAnalysis {
  const criticalFields = ['sex', 'height_cm', 'weight_kg'];
  const optionalFields = ['birthdate', 'activity_level', 'objective'];
  
  const missingCritical = criticalFields.filter(field => !profile?.[field]);
  const missingOptional = optionalFields.filter(field => !profile?.[field]);
  
  const totalFields = criticalFields.length + optionalFields.length;
  const completedFields = totalFields - missingCritical.length - missingOptional.length;
  const percentage = Math.round((completedFields / totalFields) * 100);
  
  return {
    percentage,
    missingCritical,
    missingOptional,
    hasBasicInfo: missingCritical.length === 0,
    canUseActivityFeatures: missingCritical.length === 0,
  };
}

/**
 * Obtenir le style d'alerte basé sur l'analyse du profil
 */
function getAlertStyle(analysis: ProfileAnalysis): AlertStyle {
  if (analysis.missingCritical.length > 0) {
    return {
      bg: 'rgba(239, 68, 68, 0.08)',
      border: 'rgba(239, 68, 68, 0.25)',
      text: '#EF4444',
      icon: 'AlertCircle'
    };
  }
  
  if (analysis.missingOptional.length > 0) {
    return {
      bg: 'rgba(245, 158, 11, 0.08)',
      border: 'rgba(245, 158, 11, 0.25)',
      text: '#F59E0B',
      icon: 'Info'
    };
  }
  
  return {
    bg: 'rgba(34, 197, 94, 0.08)',
    border: 'rgba(34, 197, 94, 0.25)',
    text: '#22C55E',
    icon: 'Check'
  };
}

/**
 * Obtenir le message de statut basé sur l'analyse du profil
 */
function getStatusMessage(analysis: ProfileAnalysis): StatusMessage {
  if (analysis.missingCritical.length > 0) {
    return {
      title: 'Profil incomplet pour le tracking d\'activité',
      actionText: 'Compléter'
    };
  }
  
  if (analysis.missingOptional.length > 0) {
    return {
      title: 'Optimisez votre tracking d\'activité',
      actionText: 'Améliorer'
    };
  }
  
  return {
    title: 'Profil optimisé pour le tracking d\'activité',
    actionText: 'Voir profil'
  };
}

interface ProfileCompletenessAlertProps {
  profile: any;
}

/**
 * Profile Completeness Alert - Forge Énergétique
 * Alerte de complétude du profil adaptée pour les activités
 */
const ProfileCompletenessAlert: React.FC<ProfileCompletenessAlertProps> = ({ profile }) => {
  const profileAnalysis = analyzeProfileForActivity(profile);
  const alertStyle = getAlertStyle(profileAnalysis);
  const statusMessage = getStatusMessage(profileAnalysis);

  // Ne pas afficher l'alerte si le profil est complet
  if (profileAnalysis.percentage >= 100) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard
        className="p-4 activity-card-base"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${alertStyle.bg} 0%, transparent 60%), var(--glass-opacity)`,
          borderColor: alertStyle.border
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
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
            to="/profile#identity"
            className="btn-glass--secondary-nav px-3 py-1.5 text-xs"
            style={{
              background: 'rgba(59, 130, 246, 0.15)',
              borderColor: 'rgba(59, 130, 246, 0.3)',
              color: '#3B82F6'
            }}
          >
            <div className="flex items-center gap-1">
              <SpatialIcon Icon={ICONS.User} size={12} />
              <span>{statusMessage.actionText}</span>
            </div>
          </Link>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default ProfileCompletenessAlert;
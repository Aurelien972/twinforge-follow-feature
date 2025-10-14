import { ProgressBar, AvatarStatusCard, AvatarDetailsCard, AvatarTechnicalDetailsCard } from './components/ProfileAvatarComponents';
import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../ui/cards/GlassCard';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import { useUserStore } from '../../../system/store/userStore';
import { calculateAvatarCompletion } from './utils/profileCompletion';
import { uniformTabPanelVariants, uniformStaggerContainerVariants, uniformStaggerItemVariants } from '../../../ui/tabs/tabsConfig';

const ProfileAvatarTab: React.FC = () => {
  const { profile } = useUserStore();

  // Calculate completion percentage
  const completionPercentage = calculateAvatarCompletion(profile);

  return (
    <motion.div
      className="space-y-6"
      variants={uniformStaggerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Avatar Status Card */}
      <motion.div
        variants={uniformStaggerItemVariants}
      >
        <GlassCard className="p-6" style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(168, 85, 247, 0.2)'
        }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, color-mix(in srgb, #A855F7 35%, transparent), color-mix(in srgb, #A855F7 25%, transparent))
                `,
                border: '2px solid color-mix(in srgb, #A855F7 50%, transparent)',
                boxShadow: '0 0 20px color-mix(in srgb, #A855F7 30%, transparent)'
              }}
            >
              <SpatialIcon Icon={ICONS.Eye} size={20} style={{ color: '#A855F7' }} variant="pure" />
            </div>
            <div>
              <div className="text-xl">Statut de l'Avatar</div>
              <div className="text-white/60 text-sm font-normal mt-0.5">État de votre reflet numérique 3D</div>
            </div>
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-purple-300 text-sm font-medium">3D</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                profile?.avatarStatus === 'ready' 
                  ? 'bg-purple-500/20 border-purple-400/40' 
                  : 'bg-gray-500/20 border-gray-400/40'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <SpatialIcon 
                Icon={profile?.avatarStatus === 'ready' ? ICONS.Check : ICONS.Circle} 
                size={24} 
                className={profile?.avatarStatus === 'ready' ? 'text-purple-400' : 'text-gray-400'} 
              />
            </motion.div>
            
            <div>
              <h4 className="text-white font-semibold">
                {profile?.avatarStatus === 'ready' ? 'Avatar Disponible' : 'Aucun Avatar'}
              </h4>
              <p className={`text-sm ${profile?.avatarStatus === 'ready' ? 'text-purple-300' : 'text-gray-400'}`}>
                {profile?.avatarStatus === 'ready' ? 'Données morphologiques configurées' : 'Avatar non configuré'}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-white mb-1">
              {profile?.avatarStatus === 'ready' ? '100' : '0'}%
            </div>
            <div className="text-purple-300 text-xs">Complété</div>
          </div>
        </div>
      </GlassCard>
      </motion.div>

      {/* Avatar Details Card */}
      <motion.div
        variants={uniformStaggerItemVariants}
      >
        <GlassCard className="p-6" style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(168, 85, 247, 0.2)'
        }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, color-mix(in srgb, #A855F7 35%, transparent), color-mix(in srgb, #A855F7 25%, transparent))
                `,
                border: '2px solid color-mix(in srgb, #A855F7 50%, transparent)',
                boxShadow: '0 0 20px color-mix(in srgb, #A855F7 30%, transparent)'
              }}
            >
              <SpatialIcon Icon={ICONS.Info} size={20} style={{ color: '#A855F7' }} variant="pure" />
            </div>
            <div>
              <div className="text-xl">Informations Avatar</div>
              <div className="text-white/60 text-sm font-normal mt-0.5">Détails de votre reflet numérique</div>
            </div>
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-purple-300 text-sm font-medium">Données</span>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <SpatialIcon 
            Icon={profile?.avatarStatus === 'ready' ? ICONS.Check : ICONS.Plus} 
            size={16} 
            className={profile?.avatarStatus === 'ready' ? 'text-purple-400' : 'text-brand-accent'} 
          />
          <div>
            <p className="text-white/70 text-sm leading-relaxed">
              {profile?.avatarStatus === 'ready' 
                ? 'Votre avatar 3D est disponible. Les données morphologiques sont stockées dans vos préférences utilisateur.'
                : 'Aucun avatar 3D configuré. Vous pouvez ajouter des fonctionnalités pour créer et gérer des avatars.'
              }
            </p>
            {profile?.avatarStatus === 'ready' && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-4 text-xs text-white/50">
                  <span className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-purple-400" />
                    Données morphologiques
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-purple-400" />
                    Paramètres 3D
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-white/50">
                  <span className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-purple-400" />
                    Configuration matériaux
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-purple-400" />
                    Teinte de peau
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </GlassCard>
      </motion.div>

      {/* Technical Details Card */}
      <motion.div
        variants={uniformStaggerItemVariants}
      >
        <GlassCard className="p-6" style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(168, 85, 247, 0.2)'
        }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, color-mix(in srgb, #A855F7 35%, transparent), color-mix(in srgb, #A855F7 25%, transparent))
                `,
                border: '2px solid color-mix(in srgb, #A855F7 50%, transparent)',
                boxShadow: '0 0 20px color-mix(in srgb, #A855F7 30%, transparent)'
              }}
            >
              <SpatialIcon Icon={ICONS.Settings} size={20} style={{ color: '#A855F7' }} variant="pure" />
            </div>
            <div>
              <div className="text-xl">Détails Techniques</div>
              <div className="text-white/60 text-sm font-normal mt-0.5">Configuration avancée de l'avatar</div>
            </div>
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-purple-300 text-sm font-medium">Avancé</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Shape Parameters */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <SpatialIcon Icon={ICONS.GitCompare} size={14} className="text-purple-400" />
              <span className="text-white font-medium text-sm">Paramètres Morphologiques</span>
            </div>
            <div className="text-white/60 text-xs">
              {profile?.preferences?.final_shape_params ? 
                `${Object.keys(profile.preferences.final_shape_params).length} paramètres` : 
                'Non configuré'
              }
            </div>
          </div>

          {/* Limb Masses */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <SpatialIcon Icon={ICONS.Activity} size={14} className="text-purple-400" />
              <span className="text-white font-medium text-sm">Masses Corporelles</span>
            </div>
            <div className="text-white/60 text-xs">
              {profile?.preferences?.final_limb_masses ? 
                `${Object.keys(profile.preferences.final_limb_masses).length} segments` : 
                'Non configuré'
              }
            </div>
          </div>

          {/* Skin Tone */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <SpatialIcon Icon={ICONS.Palette} size={14} className="text-purple-400" />
              <span className="text-white font-medium text-sm">Teinte de Peau</span>
            </div>
            <div className="flex items-center gap-2">
              {profile?.preferences?.skin_tone && (
                <div 
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ 
                    backgroundColor: profile.preferences.skin_tone.hex || '#D4A574'
                  }}
                />
              )}
              <span className="text-white/60 text-xs">
                {profile?.preferences?.skin_tone ? 
                  profile.preferences.skin_tone.hex || 'Configuré' : 
                  'Non configuré'
                }
              </span>
            </div>
          </div>

          {/* Model Version */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <SpatialIcon Icon={ICONS.Globe} size={14} className="text-purple-400" />
              <span className="text-white font-medium text-sm">Version Modèle</span>
            </div>
            <div className="text-white/60 text-xs">
              {profile?.preferences?.avatar_version || 'v1.0'}
            </div>
          </div>
        </div>
      </GlassCard>
      </motion.div>

      {/* Body Scanner Placeholder Card */}
      <motion.div
        variants={uniformStaggerItemVariants}
      >
        <GlassCard className="p-6" style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(217, 70, 239, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.08) 0%, transparent 50%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(217, 70, 239, 0.3)'
        }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, color-mix(in srgb, #D946EF 35%, transparent), color-mix(in srgb, #D946EF 25%, transparent))
                `,
                border: '2px solid color-mix(in srgb, #D946EF 50%, transparent)',
                boxShadow: '0 0 20px color-mix(in srgb, #D946EF 30%, transparent)'
              }}
            >
              <SpatialIcon Icon={ICONS.Scan} size={20} style={{ color: '#D946EF' }} variant="pure" />
            </div>
            <div>
              <div className="text-xl">Scanner Corporel 3D</div>
              <div className="text-white/60 text-sm font-normal mt-0.5">Analyse morphologique avancée</div>
            </div>
          </h3>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30">
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="text-yellow-300 text-xs font-medium">En développement</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <SpatialIcon
              Icon={ICONS.Info}
              size={16}
              className="text-fuchsia-400 mt-1"
            />
            <div>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                Le scanner corporel 3D est actuellement en développement dans un environnement dédié.
                Cette fonctionnalité révolutionnaire permettra de créer votre avatar numérique en analysant
                votre morphologie avec précision.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <div className="p-4 rounded-xl bg-white/5 border border-fuchsia-500/20">
              <div className="flex items-center gap-2 mb-2">
                <SpatialIcon Icon={ICONS.Camera} size={14} className="text-fuchsia-400" />
                <span className="text-white font-medium text-sm">Scan Photo</span>
              </div>
              <div className="text-white/60 text-xs">
                Capture de photos pour reconstruction 3D
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-fuchsia-500/20">
              <div className="flex items-center gap-2 mb-2">
                <SpatialIcon Icon={ICONS.Target} size={14} className="text-fuchsia-400" />
                <span className="text-white font-medium text-sm">Mesures Précises</span>
              </div>
              <div className="text-white/60 text-xs">
                Analyse automatique des dimensions corporelles
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-fuchsia-500/20">
              <div className="flex items-center gap-2 mb-2">
                <SpatialIcon Icon={ICONS.Eye} size={14} className="text-fuchsia-400" />
                <span className="text-white font-medium text-sm">Visualisation 3D</span>
              </div>
              <div className="text-white/60 text-xs">
                Rendu réaliste de votre avatar numérique
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-fuchsia-500/20">
              <div className="flex items-center gap-2 mb-2">
                <SpatialIcon Icon={ICONS.TrendingUp} size={14} className="text-fuchsia-400" />
                <span className="text-white font-medium text-sm">Suivi Évolution</span>
              </div>
              <div className="text-white/60 text-xs">
                Historique des transformations corporelles
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/20">
            <div className="flex items-start gap-3">
              <SpatialIcon Icon={ICONS.Sparkles} size={16} className="text-fuchsia-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-fuchsia-200 text-sm font-medium mb-1">
                  Bientôt disponible
                </p>
                <p className="text-white/60 text-xs leading-relaxed">
                  Cette fonctionnalité avancée sera intégrée prochainement pour vous offrir une expérience
                  de suivi corporel révolutionnaire avec visualisation 3D en temps réel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
      </motion.div>
    </motion.div>
  );
};

export default ProfileAvatarTab;
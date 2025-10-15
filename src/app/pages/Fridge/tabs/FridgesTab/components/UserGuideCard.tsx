import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../../ui/icons/registry';
import { useFeedback } from '../../../../../../hooks/useFeedback';
import { useFridgeScanPipeline } from '../../../../../../system/store/fridgeScan';

/**
 * UserGuideCard - Carte d'information pour l'atelier de recettes (thématisée Cyan)
 * Utilise des couleurs cyan pour s'harmoniser avec l'onglet frigo.
 */
const UserGuideCard: React.FC = () => {
  const navigate = useNavigate();
  const { click } = useFeedback();
  const { startScan } = useFridgeScanPipeline();

  const handleNewScan = () => {
    click();
    startScan();
    navigate('/fridge/scan');
  };

  return (
    <GlassCard
      className="p-8 text-center relative overflow-hidden rounded-3xl transform-gpu preserve-3d will-transform transition-all duration-300"
      style={{
        background: `
          radial-gradient(circle at 30% 20%, rgba(24, 227, 255, 0.25) 0%, transparent 60%),
          radial-gradient(circle at 70% 80%, rgba(103, 232, 249, 0.15) 0%, transparent 60%),
          rgba(255, 255, 255, 0.06)
        `,
        borderColor: 'rgba(24, 227, 255, 0.4)',
        backdropFilter: 'blur(20px) saturate(160%)',
        boxShadow: `
          0 12px 40px rgba(0, 0, 0, 0.25),
          0 0 30px rgba(24, 227, 255, 0.3),
          inset 0 2px 0 rgba(255, 255, 255, 0.15)
        `
      }}
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Icône principale */}
        <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center relative"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(24, 227, 255, 0.4) 0%, transparent 60%),
              radial-gradient(circle at 70% 80%, rgba(103, 232, 249, 0.25) 0%, transparent 60%),
              rgba(255, 255, 255, 0.1)
            `,
            border: `3px solid rgba(24, 227, 255, 0.6)`,
            boxShadow: `
              0 12px 40px rgba(24, 227, 255, 0.4),
              0 0 60px rgba(103, 232, 249, 0.3),
              inset 0 4px 0 rgba(255, 255, 255, 0.25),
              inset 0 -2px 0 rgba(0, 0, 0, 0.1)
            `
          }}
        >
          <SpatialIcon 
            Icon={ICONS.Refrigerator} 
            size={36}
            style={{ 
              color: '#18E3FF', fill: 'none', stroke: '#18E3FF',
              filter: `drop-shadow(0 0 12px rgba(24, 227, 255, 0.6))`
            }}
            variant="pure"
          />
        </div>

        {/* Titre et sous-titre */}
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Mon Inventaire
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            Gérez vos ingrédients, générez des recettes et des plans alimentaires
          </p>
        </div>

        {/* Trois blocs de résumé explicatifs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          {/* Scan Rapide */}
          <div className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center"
              style={{
                background: `
                  radial-gradient(circle at 30% 20%, rgba(24, 227, 255, 0.3) 0%, transparent 60%),
                  rgba(255, 255, 255, 0.08)
                `,
                border: `2px solid rgba(24, 227, 255, 0.5)`,
                boxShadow: `
                  0 8px 24px rgba(24, 227, 255, 0.3),
                  inset 0 2px 0 rgba(255, 255, 255, 0.2)
                `
              }}
            >
              <SpatialIcon 
                Icon={ICONS.Camera} 
                size={24}
                style={{ 
                  color: '#18E3FF', fill: 'none', stroke: '#18E3FF',
                  filter: `drop-shadow(0 0 8px rgba(24, 227, 255, 0.5))`
                }}
                variant="pure"
              />
            </div>
            <h4 className="text-lg font-semibold text-white">Scan Rapide</h4>
            <p className="text-white/70 text-sm">
              Photographiez votre frigo en quelques secondes pour un inventaire automatique
            </p>
          </div>

          {/* Recettes Personnalisées */}
          <div className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center"
              style={{
                background: `
                  radial-gradient(circle at 30% 20%, rgba(24, 227, 255, 0.3) 0%, transparent 60%),
                  rgba(255, 255, 255, 0.08)
                `,
                border: `2px solid rgba(24, 227, 255, 0.5)`,
                boxShadow: `
                  0 8px 24px rgba(24, 227, 255, 0.3),
                  inset 0 2px 0 rgba(255, 255, 255, 0.2)
                `
              }}
            >
              <SpatialIcon 
                Icon={ICONS.Utensils} 
                size={24}
                style={{ 
                  color: '#18E3FF', fill: 'none', stroke: '#18E3FF',
                  filter: `drop-shadow(0 0 8px rgba(24, 227, 255, 0.5))`
                }}
                variant="pure"
              />
            </div>
            <h4 className="text-lg font-semibold text-white">Recettes Personnalisées</h4>
            <p className="text-white/70 text-sm">
              Générez des recettes adaptées à vos ingrédients disponibles
            </p>
          </div>

          {/* Plans de Repas */}
          <div className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center"
              style={{
                background: `
                  radial-gradient(circle at 30% 20%, rgba(24, 227, 255, 0.3) 0%, transparent 60%),
                  rgba(255, 255, 255, 0.08)
                `,
                border: `2px solid rgba(24, 227, 255, 0.5)`,
                boxShadow: `
                  0 8px 24px rgba(24, 227, 255, 0.3),
                  inset 0 2px 0 rgba(255, 255, 255, 0.2)
                `
              }}
            >
              <SpatialIcon 
                Icon={ICONS.Calendar} 
                size={24}
                style={{ 
                  color: '#18E3FF', fill: 'none', stroke: '#18E3FF',
                  filter: `drop-shadow(0 0 8px rgba(24, 227, 255, 0.5))`
                }}
                variant="pure"
              />
            </div>
            <h4 className="text-lg font-semibold text-white">Plans de Repas</h4>
            <p className="text-white/70 text-sm">
              Créez des plans alimentaires équilibrés pour toute la semaine
            </p>
          </div>
        </div>

        {/* Bouton d'action */}
        <button
          onClick={handleNewScan}
          className="px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl font-bold relative overflow-hidden rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: `
              linear-gradient(135deg, #18E3FF 0%, #67E8F9 100%)
            `,
            border: `2px solid rgba(24, 227, 255, 0.6)`,
            boxShadow: `
              0 8px 32px rgba(24, 227, 255, 0.4),
              0 0 40px rgba(103, 232, 249, 0.25),
              inset 0 2px 0 rgba(255, 255, 255, 0.25),
              inset 0 -2px 0 rgba(0, 0, 0, 0.1)
            `,
            backdropFilter: 'blur(20px) saturate(160%)',
            color: 'white'
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <SpatialIcon 
              Icon={ICONS.Camera} 
              size={20}
              style={{ 
                color: 'white', fill: 'none', stroke: 'white',
                filter: `drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))`
              }}
              variant="pure"
            />
            Commencer - Scanner Mon Frigo
          </span>
        </button>

        {/* Section Astuce */}
        <div className="mt-8 p-4 rounded-lg w-full"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(24, 227, 255, 0.15) 0%, transparent 60%),
              rgba(255, 255, 255, 0.04)
            `,
            border: `1px solid rgba(24, 227, 255, 0.3)`
          }}
        >
          <div className="flex items-start gap-3">
            <SpatialIcon 
              Icon={ICONS.Lightbulb} 
              size={20}
              style={{ 
                color: '#18E3FF', fill: 'none', stroke: '#18E3FF',
                filter: `drop-shadow(0 0 6px rgba(24, 227, 255, 0.4))`,
                marginTop: '2px'
              }}
              variant="pure"
            />
            <div className="text-left">
              <h5 className="text-sm font-semibold text-white/90 mb-1">Astuce TwinForge</h5>
              <p className="text-white/70 text-xs leading-relaxed">
                Pour de meilleurs résultats, photographiez votre frigo avec un bon éclairage et organisez vos aliments de manière visible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default UserGuideCard;
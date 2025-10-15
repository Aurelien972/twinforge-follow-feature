import React from 'react';
import SpatialIcon from '../../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../../ui/icons/registry';

interface InventoryManagementHeaderProps {
  onDeleteAllInventories: () => void;
  onStartNewScan: () => void;
}

const InventoryManagementHeader: React.FC<InventoryManagementHeaderProps> = ({
  onDeleteAllInventories,
  onStartNewScan
}) => {
  return (
    <div
      className="glass-card rounded-3xl"
      style={{
        background: 'color-mix(in srgb, var(--color-plasma-cyan) 8%, transparent)',
        borderColor: 'color-mix(in srgb, var(--color-plasma-cyan) 30%, transparent)',
        borderRadius: '1.5rem',
        boxShadow: `
          0 8px 32px color-mix(in srgb, var(--color-plasma-cyan) 15%, transparent),
          0 2px 8px rgba(0, 0, 0, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `,
        overflow: 'visible',
        isolation: 'isolate',
        padding: 0,
        paddingBottom: '1rem'
      }}
    >
      {/* Header Content */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-5">
          {/* Icône ronde glass premium */}
          <div
            className="flex-shrink-0"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.22) 0%, transparent 50%),
                radial-gradient(circle at 70% 70%, color-mix(in srgb, var(--color-plasma-cyan) 15%, transparent) 0%, transparent 60%),
                linear-gradient(135deg,
                  color-mix(in srgb, var(--color-plasma-cyan) 25%, transparent),
                  color-mix(in srgb, var(--color-plasma-cyan) 15%, transparent))
              `,
              border: '2px solid color-mix(in srgb, var(--color-plasma-cyan) 45%, transparent)',
              boxShadow: `
                0 8px 32px color-mix(in srgb, var(--color-plasma-cyan) 25%, transparent),
                0 0 40px color-mix(in srgb, var(--color-plasma-cyan) 18%, transparent),
                inset 0 2px 0 rgba(255, 255, 255, 0.25)
              `,
              backdropFilter: 'blur(16px) saturate(150%)',
              WebkitBackdropFilter: 'blur(16px) saturate(150%)',
              transform: 'translateZ(0)',
              overflow: 'visible'
            }}
          >
            <SpatialIcon
              Icon={ICONS.Archive}
              size={28}
              style={{
                color: '#06B6D4',
                filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))'
              }}
            />
          </div>

          {/* Texte */}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight">
              Gestion des Inventaires
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Vos inventaires de frigo sauvegardés
            </p>
          </div>
        </div>
      </div>

      {/* Divider subtil */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-plasma-cyan) 20%, transparent) 50%, transparent)',
          margin: '0 1.5rem'
        }}
      />

      {/* Nouveau bouton Scan - Design premium VisionOS 26 avec effet 3D profond */}
      <div className="p-6 pt-4" style={{ overflow: 'visible', padding: '1.5rem 1.5rem 2rem 1.5rem' }}>
        <button
          onClick={onStartNewScan}
          className="w-full btn-glass--primary px-6 py-4 text-base md:text-lg font-bold group"
          style={{
            background: `
              radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 100%, color-mix(in srgb, var(--color-plasma-cyan) 30%, transparent) 0%, transparent 60%),
              linear-gradient(135deg,
                color-mix(in srgb, var(--color-plasma-cyan) 92%, #ffffff) 0%,
                var(--color-plasma-cyan) 50%,
                color-mix(in srgb, var(--color-plasma-cyan) 85%, #000000) 100%)
            `,
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'color-mix(in srgb, var(--color-plasma-cyan) 90%, #ffffff)',
            borderRadius: '999px',
            boxShadow: `
              0 2px 8px rgba(0, 0, 0, 0.5),
              0 8px 24px color-mix(in srgb, var(--color-plasma-cyan) 30%, transparent),
              0 16px 48px color-mix(in srgb, var(--color-plasma-cyan) 20%, transparent),
              inset 0 1px 2px rgba(255, 255, 255, 0.3),
              inset 0 -2px 4px rgba(0, 0, 0, 0.2)
            `,
            color: '#0A1628',
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.4)',
            transform: 'translateZ(0) translateY(0)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'relative',
            overflow: 'visible',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            isolation: 'isolate'
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <div
              className="flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.35) 0%, transparent 60%),
                  linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.08))
                `,
                border: '2px solid rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: `
                  0 4px 12px rgba(0, 0, 0, 0.3),
                  inset 0 1px 2px rgba(255, 255, 255, 0.5),
                  inset 0 -1px 2px rgba(0, 0, 0, 0.2)
                `
              }}
            >
              <SpatialIcon
                Icon={ICONS.Scan}
                size={22}
                style={{
                  color: '#0A1628',
                  filter: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.6))'
                }}
              />
            </div>
            <span className="font-bold tracking-wide" style={{
              color: '#0A1628',
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)',
              letterSpacing: '0.02em'
            }}>Nouveau Scan de Frigo</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default InventoryManagementHeader;
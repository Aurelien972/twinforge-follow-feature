import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GlassCard from '../../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../../ui/icons/registry';

interface FridgeSession {
  id: string;
  created_at: string;
  inventory_final: any[];
  status: string;
}

interface FridgeSessionListProps {
  sessions: FridgeSession[];
  selectedInventorySessionId: string | null;
  onInventorySelect: (session: FridgeSession) => void;
  formatDate: (dateString: string) => string;
  getInventoryPreview: (inventory: any[]) => string;
}

const FridgeSessionList: React.FC<FridgeSessionListProps> = ({
  sessions,
  selectedInventorySessionId,
  onInventorySelect,
  formatDate,
  getInventoryPreview
}) => {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white/60">
          Aucun inventaire disponible. Scannez votre frigo pour commencer !
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {sessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard
              className={`p-6 h-full cursor-pointer group relative overflow-hidden rounded-3xl transform-gpu preserve-3d will-transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                selectedInventorySessionId === session.id
                  ? 'ring-2 ring-indigo-400/50'
                  : ''
              }`}
              style={{
                background: `
                  radial-gradient(circle at 30% 20%, color-mix(in srgb, #06B6D4 ${selectedInventorySessionId === session.id ? '15%' : '8%'}, transparent) 0%, transparent 60%),
                  radial-gradient(circle at 70% 80%, color-mix(in srgb, #06B6D4 ${selectedInventorySessionId === session.id ? '10%' : '6%'}, transparent) 0%, transparent 60%),
                  rgba(255, 255, 255, 0.06)
                `,
                borderColor: selectedInventorySessionId === session.id
                  ? 'color-mix(in srgb, #06B6D4 40%, transparent)'
                  : 'color-mix(in srgb, #06B6D4 20%, transparent)',
                borderRadius: '1.5rem',
                backdropFilter: 'blur(20px) saturate(160%)',
                boxShadow: selectedInventorySessionId === session.id
                  ? `
                    0 12px 40px rgba(0, 0, 0, 0.25),
                    0 0 40px color-mix(in srgb, #06B6D4 25%, transparent),
                    inset 0 2px 0 rgba(255, 255, 255, 0.2)
                  `
                  : `
                    0 8px 32px rgba(0, 0, 0, 0.2),
                    0 0 20px color-mix(in srgb, #06B6D4 10%, transparent),
                    inset 0 2px 0 rgba(255, 255, 255, 0.15)
                  `
              }}
              onClick={() => onInventorySelect(session)}
            >
              <div className="flex flex-col h-full">
                {/* En-tête de la Session */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center relative"
                      style={{
                        background: `
                          radial-gradient(circle at 30% 20%, color-mix(in srgb, #06B6D4 20%, transparent) 0%, transparent 60%),
                          rgba(255, 255, 255, 0.1)
                        `,
                        border: '2px solid color-mix(in srgb, #06B6D4 40%, transparent)',
                        boxShadow: `
                          0 4px 16px color-mix(in srgb, #06B6D4 20%, transparent),
                          inset 0 1px 0 rgba(255, 255, 255, 0.2)
                        `
                      }}
                    >
                      <SpatialIcon 
                        Icon={ICONS.Package} 
                        size={18}
                        style={{ 
                          color: '#06B6D4',
                          filter: 'drop-shadow(0 0 6px color-mix(in srgb, #06B6D4 30%, transparent))'
                        }}
                        variant="pure"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">
                        Inventaire
                      </h3>
                      <p className="text-white/60 text-xs">
                        {formatDate(session.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg"
                    style={{
                      background: 'color-mix(in srgb, #10B981 20%, transparent)',
                      border: '1px solid color-mix(in srgb, #10B981 30%, transparent)'
                    }}
                  >
                    <SpatialIcon 
                      Icon={ICONS.Package} 
                      size={12}
                      style={{ 
                        color: '#10B981',
                        filter: 'drop-shadow(0 0 4px color-mix(in srgb, #10B981 30%, transparent))'
                      }}
                      variant="pure"
                    />
                    <span className="text-emerald-300 text-xs font-medium">
                      {session.inventory_final?.length || 0}
                    </span>
                  </div>
                </div>

                {/* Aperçu de l'Inventaire */}
                <div className="flex-1 mb-4">
                  <p className="text-white/80 text-sm leading-relaxed">
                    {getInventoryPreview(session.inventory_final)}
                  </p>
                </div>

                {/* Indicateur de sélection */}
                <div className="flex items-center justify-center">
                  <div className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    selectedInventorySessionId === session.id
                      ? 'text-cyan-300'
                      : 'text-white/60'
                  }`}
                    style={{
                      background: selectedInventorySessionId === session.id
                        ? 'color-mix(in srgb, #06B6D4 30%, transparent)'
                        : 'rgba(255, 255, 255, 0.1)',
                      border: selectedInventorySessionId === session.id
                        ? '1px solid color-mix(in srgb, #06B6D4 40%, transparent)'
                        : '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {selectedInventorySessionId === session.id ? 'Sélectionné' : 'Cliquer pour sélectionner'}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FridgeSessionList;
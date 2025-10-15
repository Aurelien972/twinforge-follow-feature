/**
 * MedicalConditionsSection Component
 * Manages medical conditions and medications in Health Profile
 */

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import { ArrayItemManager } from '../../Profile/components/ProfileHealthComponents';

interface MedicalConditionsSectionProps {
  conditions: string[];
  medications: string[];
  newCondition: string;
  newMedication: string;
  setNewCondition: (value: string) => void;
  setNewMedication: (value: string) => void;
  onAddCondition: () => void;
  onAddMedication: () => void;
  onRemoveCondition: (index: number) => void;
  onRemoveMedication: (index: number) => void;
  onDeclareNoIssues?: () => void;
  hasDeclaredNoIssues?: boolean;
  onSave?: () => void;
  isSaving?: boolean;
  isDirty?: boolean;
}

export const MedicalConditionsSection: React.FC<MedicalConditionsSectionProps> = ({
  conditions,
  medications,
  newCondition,
  newMedication,
  setNewCondition,
  setNewMedication,
  onAddCondition,
  onAddMedication,
  onRemoveCondition,
  onRemoveMedication,
  onDeclareNoIssues,
  hasDeclaredNoIssues,
  onSave,
  isSaving,
  isDirty,
}) => {
  const hasNoData = conditions.length === 0 && medications.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard
        className="p-6"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(239, 68, 68, 0.08) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(239, 68, 68, 0.2)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, color-mix(in srgb, #EF4444 35%, transparent), color-mix(in srgb, #EF4444 25%, transparent))
                `,
                border: '2px solid color-mix(in srgb, #EF4444 50%, transparent)',
                boxShadow: '0 0 20px color-mix(in srgb, #EF4444 30%, transparent)',
              }}
            >
              <SpatialIcon Icon={ICONS.Shield} size={20} style={{ color: '#EF4444' }} variant="pure" />
            </div>
            <div>
              <div className="text-xl">Conditions Médicales</div>
              <div className="text-white/60 text-sm font-normal mt-0.5">
                Maladies, conditions et médicaments actuels
              </div>
            </div>
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-red-300 text-sm font-medium">Important</span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Info banner */}
          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/20">
            <div className="flex items-start gap-3">
              <SpatialIcon Icon={ICONS.Info} size={18} className="text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-cyan-200 text-sm leading-relaxed mb-2">
                  <strong>Important :</strong> Ces informations permettent de personnaliser vos programmes
                  et d'éviter les risques liés à votre santé.
                </p>
                <p className="text-cyan-300 text-xs">
                  Si vous n'avez aucun problème de santé, utilisez le bouton ci-dessous.
                </p>
              </div>
            </div>
          </div>

          {/* No Health Issues Button */}
          {hasNoData && !hasDeclaredNoIssues && onDeclareNoIssues && (
            <button
              type="button"
              disabled={isSaving}
              onClick={onDeclareNoIssues}
              className="w-full p-4 rounded-xl bg-green-500/10 border border-green-400/30 hover:bg-green-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-3">
                {isSaving ? (
                  <SpatialIcon Icon={ICONS.Loader2} size={20} className="text-green-400 animate-spin" />
                ) : (
                  <SpatialIcon Icon={ICONS.Check} size={20} className="text-green-400" />
                )}
                <div>
                  <div className="text-green-300 font-semibold text-base">
                    {isSaving ? 'Sauvegarde...' : 'Je n\'ai aucun problème de santé'}
                  </div>
                  <div className="text-green-400 text-xs mt-1">
                    {isSaving
                      ? 'Enregistrement de votre déclaration...'
                      : 'Cliquez ici si vous n\'avez pas de conditions médicales ou médicaments'}
                  </div>
                </div>
              </div>
            </button>
          )}

          {/* Confirmation if declared no issues */}
          {hasDeclaredNoIssues && (
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-400/20">
              <div className="flex items-center gap-3">
                <SpatialIcon Icon={ICONS.CheckCircle} size={20} className="text-green-400" />
                <div>
                  <div className="text-green-300 font-medium">Déclaration enregistrée</div>
                  <div className="text-green-400 text-xs mt-0.5">
                    Aucun problème de santé déclaré
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Medical Conditions */}
          <div>
            <label className="block text-white/90 text-sm font-medium mb-3">
              Conditions médicales
            </label>
            <ArrayItemManager
              items={conditions}
              newItem={newCondition}
              setNewItem={setNewCondition}
              onAdd={onAddCondition}
              onRemove={onRemoveCondition}
              placeholder="Ajouter une condition médicale..."
              itemColor="rgba(239, 68, 68"
              itemLabel="condition"
            />
          </div>

          {/* Medications */}
          <div>
            <label className="block text-white/90 text-sm font-medium mb-3">
              Médicaments actuels
            </label>
            <ArrayItemManager
              items={medications}
              newItem={newMedication}
              setNewItem={setNewMedication}
              onAdd={onAddMedication}
              onRemove={onRemoveMedication}
              placeholder="Ajouter un médicament..."
              itemColor="rgba(59, 130, 246"
              itemLabel="médicament"
            />
          </div>
        </div>

        {isDirty && onSave && (
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="btn-glass px-4 py-2 text-sm"
            >
              <div className="flex items-center gap-2">
                {isSaving ? (
                  <SpatialIcon Icon={ICONS.Loader2} size={14} className="animate-spin" />
                ) : (
                  <SpatialIcon Icon={ICONS.Save} size={14} />
                )}
                <span>{isSaving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
              </div>
            </button>
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
};

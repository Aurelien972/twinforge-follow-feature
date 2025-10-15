import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../../../ui/cards/GlassCard';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import { useUserStore } from '../../../system/store/userStore';
import { useProfileHealthForm } from './hooks/useProfileHealthForm';
import { ProgressBar, SectionSaveButton, ArrayItemManager } from './components/ProfileHealthComponents';
import { calculateHealthCompletion } from './utils/profileCompletion';
import { CountryHealthDataDisplay } from './components/health/CountryHealthDataDisplay';
import { HealthProfileCTA } from './components/health/HealthProfileCTA';
import { InjuriesLimitationsSection } from './components/health/InjuriesLimitationsSection';
import { useCountryHealthData } from '../../../hooks/useCountryHealthData';

/**
 * Profile Health Tab - Santé & Médical TwinForge
 * Gestion complète des données de santé avec design VisionOS 26
 */
const ProfileHealthTab: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useUserStore();
  const { form, actions, state } = useProfileHealthForm();
  const { register, handleSubmit, errors, isDirty, watchedValues, setValue } = form;
  const { saveBasicHealthSection, saveMedicalSection, saveConstraintsSection, onSubmit } = actions;
  const { saving, sectionSaving, hasBasicChanges, hasMedicalChanges, hasConstraintsChanges } = state;

  // Country health data
  const { countryData, loading: countryLoading, error: countryError, refresh: refreshCountryData } = useCountryHealthData();
  
  const [newCondition, setNewCondition] = React.useState('');
  const [newMedication, setNewMedication] = React.useState('');
  const [newConstraint, setNewConstraint] = React.useState('');
  const [newPhysicalLimitation, setNewPhysicalLimitation] = React.useState('');

  // Calculate completion percentage
  const completionPercentage = calculateHealthCompletion(profile);

  // Add/remove functions for arrays
  const addCondition = () => {
    if (newCondition.trim()) {
      const current = watchedValues.conditions || [];
      setValue('conditions', [...current, newCondition.trim()], { shouldDirty: true });
      setNewCondition('');
    }
  };

  const removeCondition = (index: number) => {
    const current = watchedValues.conditions || [];
    setValue('conditions', current.filter((_, i) => i !== index), { shouldDirty: true });
  };

  const addMedication = () => {
    if (newMedication.trim()) {
      const current = watchedValues.medications || [];
      setValue('medications', [...current, newMedication.trim()], { shouldDirty: true });
      setNewMedication('');
    }
  };

  const removeMedication = (index: number) => {
    const current = watchedValues.medications || [];
    setValue('medications', current.filter((_, i) => i !== index), { shouldDirty: true });
  };

  const addConstraint = () => {
    if (newConstraint.trim()) {
      const current = watchedValues.constraints || [];
      setValue('constraints', [...current, newConstraint.trim()], { shouldDirty: true });
      setNewConstraint('');
    }
  };

  const removeConstraint = (index: number) => {
    const current = watchedValues.constraints || [];
    setValue('constraints', current.filter((_, i) => i !== index), { shouldDirty: true });
  };

  const addPhysicalLimitation = () => {
    if (newPhysicalLimitation.trim()) {
      const current = watchedValues.physicalLimitations || [];
      setValue('physicalLimitations', [...current, newPhysicalLimitation.trim()], { shouldDirty: true });
      setNewPhysicalLimitation('');
    }
  };

  const removePhysicalLimitation = (index: number) => {
    const current = watchedValues.physicalLimitations || [];
    setValue('physicalLimitations', current.filter((_, i) => i !== index), { shouldDirty: true });
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <ProgressBar
        percentage={completionPercentage}
        title="Profil Santé & Médical"
        subtitle="Configurez vos informations médicales et contraintes"
        color="#EF4444"
      />

      {/* Health Profile CTA */}
      <HealthProfileCTA />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Medical Conditions & Medications Card - Simplified */}
        <GlassCard className="p-6" style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(239, 68, 68, 0.08) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(239, 68, 68, 0.2)'
        }}>
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
                  boxShadow: '0 0 20px color-mix(in srgb, #EF4444 30%, transparent)'
                }}
              >
                <SpatialIcon Icon={ICONS.Shield} size={20} style={{ color: '#EF4444' }} variant="pure" />
              </div>
              <div>
                <div className="text-xl">Conditions & Médicaments</div>
                <div className="text-white/60 text-sm font-normal mt-0.5">Conditions médicales et traitements actuels</div>
              </div>
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-red-300 text-sm font-medium">Confidentiel</span>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Info banner explaining health section importance */}
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/20">
              <div className="flex items-start gap-3">
                <SpatialIcon Icon={ICONS.Info} size={18} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-cyan-200 text-sm leading-relaxed mb-2">
                    <strong>Important :</strong> Ces informations permettent de personnaliser vos programmes d'entraînement et d'éviter les mouvements à risque.
                  </p>
                  <p className="text-cyan-300 text-xs">
                    Si vous n'avez aucun problème de santé, cliquez sur le bouton ci-dessous pour valider cette section.
                  </p>
                </div>
              </div>
            </div>

            {/* "No Health Issues" Quick Action Button */}
            {(!watchedValues.conditions || watchedValues.conditions.length === 0) &&
             (!watchedValues.medications || watchedValues.medications.length === 0) &&
             (!watchedValues.physicalLimitations || watchedValues.physicalLimitations.length === 0) &&
             !profile?.health?.declaredNoIssues && (
              <button
                type="button"
                disabled={sectionSaving === 'medical'}
                onClick={async () => {
                  setValue('conditions', [], { shouldDirty: true });
                  setValue('medications', [], { shouldDirty: true });
                  setValue('physicalLimitations', [], { shouldDirty: true });
                  setValue('declaredNoIssues', true, { shouldDirty: true });
                  await saveMedicalSection();
                }}
                className="w-full p-4 rounded-xl bg-green-500/10 border border-green-400/30 hover:bg-green-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-center gap-3">
                  {sectionSaving === 'medical' ? (
                    <SpatialIcon Icon={ICONS.Loader2} size={20} className="text-green-400 animate-spin" />
                  ) : (
                    <SpatialIcon Icon={ICONS.Check} size={20} className="text-green-400" />
                  )}
                  <div>
                    <div className="text-green-300 font-semibold text-base">
                      {sectionSaving === 'medical' ? 'Sauvegarde...' : 'Je n\'ai aucun problème de santé'}
                    </div>
                    <div className="text-green-400 text-xs mt-1">
                      {sectionSaving === 'medical'
                        ? 'Enregistrement de votre déclaration...'
                        : 'Cliquez ici si vous n\'avez pas de conditions médicales, médicaments ou limitations'
                      }
                    </div>
                  </div>
                </div>
              </button>
            )}

            {/* Show confirmation if declared no issues */}
            {profile?.health?.declaredNoIssues && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-400/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <SpatialIcon Icon={ICONS.CheckCircle} size={20} className="text-green-400" />
                    <div>
                      <div className="text-green-300 font-medium">Déclaration enregistrée</div>
                      <div className="text-green-400 text-xs mt-0.5">
                        Aucun problème de santé déclaré - Vous pouvez maintenant générer des plans d'entraînement
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      setValue('declaredNoIssues', false, { shouldDirty: true });
                      await saveMedicalSection();
                    }}
                    className="text-green-400 hover:text-green-300 text-xs underline"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            )}
          </div>

          <SectionSaveButton
            isDirty={hasMedicalChanges}
            isSaving={sectionSaving === 'medical'}
            onSave={saveMedicalSection}
            sectionName="Médical"
          />
        </GlassCard>

        {/* Injuries and Limitations */}
        <InjuriesLimitationsSection
          physicalLimitations={watchedValues.physicalLimitations || []}
          newPhysicalLimitation={newPhysicalLimitation}
          setNewPhysicalLimitation={setNewPhysicalLimitation}
          onAddPhysicalLimitation={addPhysicalLimitation}
          onRemovePhysicalLimitation={removePhysicalLimitation}
          onSave={saveMedicalSection}
          isSaving={sectionSaving === 'medical'}
          isDirty={hasConstraintsChanges}
        />

        {/* Health Constraints Card */}
        <GlassCard className="p-6" style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(239, 68, 68, 0.08) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(239, 68, 68, 0.2)'
        }}>
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
                  boxShadow: '0 0 20px color-mix(in srgb, #EF4444 30%, transparent)'
                }}
              >
                <SpatialIcon Icon={ICONS.Lock} size={20} style={{ color: '#EF4444' }} variant="pure" />
              </div>
              <div>
                <div className="text-xl">Contraintes Alimentaires</div>
                <div className="text-white/60 text-sm font-normal mt-0.5">Restrictions spécifiques et contraintes médicales</div>
              </div>
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-red-300 text-sm font-medium">Spécifique</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-white/90 text-sm font-medium mb-3">
                Contraintes spécifiques (ex: faible en sodium, sans gluten)
              </label>
              <ArrayItemManager
                items={watchedValues.constraints || []}
                newItem={newConstraint}
                setNewItem={setNewConstraint}
                onAdd={addConstraint}
                onRemove={removeConstraint}
                placeholder="Ajouter une contrainte..."
                itemColor="rgba(139, 92, 246"
                itemLabel="contrainte"
              />
            </div>
          </div>

          <SectionSaveButton
            isDirty={hasConstraintsChanges}
            isSaving={sectionSaving === 'constraints'}
            onSave={saveConstraintsSection}
            sectionName="Contraintes"
          />
        </GlassCard>

        {/* Country Health Context Section */}
        {!profile?.country ? (
          <GlassCard className="p-6" style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.08) 0%, transparent 60%),
              var(--glass-opacity)
            `,
            borderColor: 'rgba(6, 182, 212, 0.2)'
          }}>
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, color-mix(in srgb, #06B6D4 35%, transparent), color-mix(in srgb, #06B6D4 25%, transparent))
                  `,
                  border: '2px solid color-mix(in srgb, #06B6D4 50%, transparent)',
                  boxShadow: '0 0 20px color-mix(in srgb, #06B6D4 30%, transparent)'
                }}
              >
                <SpatialIcon Icon={ICONS.MapPin} size={20} style={{ color: '#06B6D4' }} variant="pure" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-2">Contexte sanitaire non disponible</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  Sélectionnez votre pays dans l'onglet Identité pour voir les risques sanitaires locaux,
                  les maladies endémiques et les vaccinations recommandées.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const params = new URLSearchParams(window.location.search);
                    params.set('tab', 'identity');
                    navigate(`/profile?${params.toString()}`);
                  }}
                  className="btn-glass--primary px-4 py-2 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <SpatialIcon Icon={ICONS.User} size={16} />
                    <span>Aller à l'onglet Identité</span>
                  </div>
                </button>
              </div>
            </div>
          </GlassCard>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: `
                      radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                      linear-gradient(135deg, color-mix(in srgb, #06B6D4 35%, transparent), color-mix(in srgb, #06B6D4 25%, transparent))
                    `,
                    border: '2px solid color-mix(in srgb, #06B6D4 50%, transparent)',
                    boxShadow: '0 0 20px color-mix(in srgb, #06B6D4 30%, transparent)'
                  }}
                >
                  <SpatialIcon Icon={ICONS.Globe} size={20} style={{ color: '#06B6D4' }} variant="pure" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Contexte Sanitaire Local</h3>
                  <p className="text-white/60 text-sm">Risques et recommandations pour {profile.country}</p>
                </div>
              </div>
              {countryData && (
                <button
                  type="button"
                  onClick={() => refreshCountryData()}
                  disabled={countryLoading}
                  className="btn-glass px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Rafraîchir les données sanitaires"
                >
                  <SpatialIcon
                    Icon={ICONS.RefreshCw}
                    size={16}
                    className={countryLoading ? 'animate-spin' : ''}
                  />
                </button>
              )}
            </div>

            {countryError && (
              <GlassCard className="p-4" style={{
                background: 'rgba(239, 68, 68, 0.1)',
                borderColor: 'rgba(239, 68, 68, 0.3)'
              }}>
                <div className="flex items-start gap-3">
                  <SpatialIcon Icon={ICONS.AlertCircle} size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-300 text-sm font-medium mb-1">Erreur de chargement</p>
                    <p className="text-red-200 text-xs">{countryError.message}</p>
                  </div>
                </div>
              </GlassCard>
            )}

            <CountryHealthDataDisplay
              countryData={countryData}
              loading={countryLoading}
            />
          </div>
        )}

        {/* Global Save Action */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={saving || !isDirty}
            className={`btn-glass--primary px-8 py-4 text-lg font-semibold ${
              !isDirty ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              {saving ? (
                <SpatialIcon Icon={ICONS.Loader2} size={20} className="animate-spin" />
              ) : (
                <SpatialIcon Icon={ICONS.Save} size={20} />
              )}
              <span>{saving ? 'Sauvegarde globale...' : 'Sauvegarder Tout'}</span>
            </div>
          </button>
        </div>

        {/* Validation Summary */}
        {Object.keys(errors).length > 0 && (
          <GlassCard className="p-4" style={{
            background: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.3)'
          }}>
            <h4 className="text-red-300 font-medium mb-3 flex items-center gap-2">
              <SpatialIcon Icon={ICONS.AlertCircle} size={16} />
              Erreurs de validation
            </h4>
            <div className="space-y-2">
              {Object.entries(errors).map(([field, error]) => (
                <p key={field} className="text-red-200 text-sm flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-red-400" />
                  {error.message}
                </p>
              ))}
            </div>
          </GlassCard>
        )}
      </form>
    </div>
  );
};

export default ProfileHealthTab;
/**
 * Privacy Settings Tab
 * Complete RGPD compliance with data export and account deletion
 */

import React, { useEffect, useState } from 'react';
import {
  Shield,
  Download,
  Trash2,
  FileText,
  AlertTriangle,
  Clock,
  Database,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useDataPrivacyStore } from '../../../system/store/dataPrivacyStore';
import { useUserStore } from '../../../system/store/userStore';
import { dataExportService } from '../../../system/services/dataExportService';
import { accountDeletionService } from '../../../system/services/accountDeletionService';
import {
  SettingsSection,
  SettingsToggle,
  SettingsInfoCard,
  SettingsButton,
} from '../../../ui/components/settings';
import {
  DATA_CATEGORY_CONFIGS,
  RETENTION_POLICIES,
  getDaysUntilDeletion,
  getExportSizeFormatted,
} from '../../../domain/privacy';
import type { DataRetentionPreference, ExportableDataCategory } from '../../../domain/privacy';

export const PrivacySettingsTab: React.FC = () => {
  const { profile } = useUserStore();
  const userId = profile?.id;

  const {
    preferences,
    activeDeletionRequest,
    recentExportRequests,
    isLoading,
    isSaving,
    error,
    loadPrivacyPreferences,
    updatePrivacyPreference,
    loadExportRequests,
    requestDataExport,
    loadDeletionRequest,
    requestAccountDeletion,
    cancelAccountDeletion,
    clearError,
  } = useDataPrivacyStore();

  const [selectedExportCategories, setSelectedExportCategories] = useState<ExportableDataCategory[]>(
    DATA_CATEGORY_CONFIGS.filter((c) => c.includeByDefault).map((c) => c.category)
  );
  const [showDeletionConfirm, setShowDeletionConfirm] = useState(false);
  const [deletionReason, setDeletionReason] = useState('');

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      if (!userId) return;

      try {
        await Promise.all([
          loadPrivacyPreferences(userId),
          loadExportRequests(userId),
          loadDeletionRequest(userId),
        ]);
      } catch (err) {
        console.error('Failed to load privacy settings:', err);
      }
    };

    loadData();
  }, [userId]);

  // Handle data export
  const handleRequestExport = async () => {
    if (!userId) return;

    await requestDataExport(
      {
        request_type: 'partial_export',
        export_format: 'json',
        included_data: selectedExportCategories,
      },
      userId
    );
  };

  // Handle account deletion request
  const handleRequestDeletion = async () => {
    if (!userId) return;

    const requestId = await requestAccountDeletion(
      {
        delete_all_data: true,
        anonymize_only: false,
        reason: deletionReason || undefined,
      },
      userId
    );

    if (requestId) {
      setShowDeletionConfirm(false);
      setDeletionReason('');
    }
  };

  // Handle deletion cancellation
  const handleCancelDeletion = async () => {
    if (!userId) return;

    const success = await cancelAccountDeletion(
      {
        reason: 'Annulation par l\'utilisateur',
      },
      userId
    );

    if (success) {
      await loadDeletionRequest(userId);
    }
  };

  // Handle export download
  const handleDownloadExport = async (requestId: string) => {
    await dataExportService.downloadExport(requestId);
  };

  // Toggle export category
  const toggleExportCategory = (category: ExportableDataCategory) => {
    setSelectedExportCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Calculate estimated export size
  const estimatedSize = dataExportService.estimateExportSize(selectedExportCategories);

  // Get deletion warning info if exists
  const deletionInfo = activeDeletionRequest
    ? accountDeletionService.getDeletionWarningInfo(activeDeletionRequest)
    : null;

  return (
    <div className="privacy-settings-tab">
      {/* Error Display */}
      {error && (
        <SettingsInfoCard
          type="error"
          message={error}
          actions={
            <SettingsButton variant="ghost" onClick={clearError}>
              Fermer
            </SettingsButton>
          }
        />
      )}

      {/* Active Deletion Warning */}
      {activeDeletionRequest && deletionInfo && (
        <SettingsInfoCard
          type={deletionInfo.warningLevel}
          title="Suppression de compte programmée"
          message={
            <div>
              <p>{deletionInfo.message}</p>
              <p style={{ marginTop: '0.5rem' }}>
                <strong>Date prévue:</strong>{' '}
                {deletionInfo.scheduledDate.toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          }
          actions={
            deletionInfo.canCancel && (
              <SettingsButton
                variant="secondary"
                onClick={handleCancelDeletion}
                loading={isSaving}
                icon={<Clock size={18} />}
              >
                Annuler la suppression
              </SettingsButton>
            )
          }
        />
      )}

      {/* Privacy Preferences */}
      <SettingsSection
        title="Préférences de confidentialité"
        description="Contrôlez comment vos données sont utilisées"
        icon={<Shield size={20} />}
      >
        <div className="retention-preference">
          <label>Durée de conservation des données</label>
          <select
            value={preferences.data_retention_preference}
            onChange={(e) =>
              updatePrivacyPreference(
                'data_retention_preference',
                e.target.value as DataRetentionPreference,
                userId
              )
            }
            disabled={isLoading}
          >
            <option value="minimal">Minimale (30 jours)</option>
            <option value="standard">Standard (2 ans)</option>
            <option value="extended">Étendue (indéfinie)</option>
          </select>
        </div>

        <SettingsToggle
          label="Suivi analytique"
          description="Nous aide à améliorer l'application en analysant votre utilisation"
          enabled={preferences.analytics_tracking_enabled}
          onChange={(value) => updatePrivacyPreference('analytics_tracking_enabled', value, userId)}
          disabled={isLoading}
          loading={isSaving}
        />

        <SettingsToggle
          label="Partage avec des tiers"
          description="Permet le partage anonymisé de données avec nos partenaires"
          enabled={preferences.third_party_sharing_enabled}
          onChange={(value) =>
            updatePrivacyPreference('third_party_sharing_enabled', value, userId)
          }
          disabled={isLoading}
          loading={isSaving}
        />

        <SettingsToggle
          label="Communications marketing"
          description="Recevez des actualités et offres promotionnelles"
          enabled={preferences.marketing_communications_enabled}
          onChange={(value) =>
            updatePrivacyPreference('marketing_communications_enabled', value, userId)
          }
          disabled={isLoading}
          loading={isSaving}
        />
      </SettingsSection>

      {/* Data Export */}
      <SettingsSection
        title="Export de vos données"
        description="Téléchargez une copie complète de vos données (droit à la portabilité)"
        icon={<Download size={20} />}
      >
        <SettingsInfoCard
          type="info"
          message="Sélectionnez les catégories de données que vous souhaitez exporter. Le fichier sera disponible pendant 7 jours."
        />

        <div className="export-categories">
          {DATA_CATEGORY_CONFIGS.map((config) => (
            <label key={config.category} className="export-category-item">
              <input
                type="checkbox"
                checked={selectedExportCategories.includes(config.category)}
                onChange={() => toggleExportCategory(config.category)}
              />
              <div className="export-category-info">
                <span className="export-category-label">{config.label}</span>
                <span className="export-category-size">{config.estimatedSize}</span>
              </div>
            </label>
          ))}
        </div>

        <div className="export-summary">
          <p>
            <strong>Taille estimée:</strong> {estimatedSize}
          </p>
          <p>
            <strong>Format:</strong> JSON
          </p>
        </div>

        <SettingsButton
          onClick={handleRequestExport}
          loading={isSaving}
          disabled={selectedExportCategories.length === 0}
          icon={<Download size={18} />}
          fullWidth
        >
          Demander un export
        </SettingsButton>

        {/* Recent Exports */}
        {recentExportRequests.length > 0 && (
          <div className="recent-exports">
            <h4>Exports récents</h4>
            {recentExportRequests.map((request) => (
              <div key={request.id} className="export-request-item">
                <div className="export-request-info">
                  <span className="export-request-date">
                    {new Date(request.requested_at).toLocaleDateString()}
                  </span>
                  <span className={`export-request-status export-status-${request.status}`}>
                    {request.status === 'completed' && '✓ Prêt'}
                    {request.status === 'processing' && '⏳ En cours'}
                    {request.status === 'pending' && '⏳ En attente'}
                    {request.status === 'failed' && '✗ Échec'}
                  </span>
                </div>
                {request.status === 'completed' && request.file_url && (
                  <SettingsButton
                    variant="secondary"
                    onClick={() => handleDownloadExport(request.id)}
                    icon={<Download size={16} />}
                  >
                    Télécharger
                  </SettingsButton>
                )}
              </div>
            ))}
          </div>
        )}
      </SettingsSection>

      {/* Account Deletion */}
      {!activeDeletionRequest && (
        <SettingsSection
          title="Suppression de compte"
          description="Supprimer définitivement votre compte et toutes vos données"
          icon={<Trash2 size={20} />}
        >
          <SettingsInfoCard
            type="warning"
            title="⚠️ Action irréversible"
            message={
              <div>
                <p>La suppression de votre compte entraînera:</p>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  <li>Suppression de toutes vos données personnelles</li>
                  <li>Perte définitive de votre progression</li>
                  <li>Annulation de vos abonnements</li>
                </ul>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Délai de grâce:</strong> Vous aurez 30 jours pour annuler cette demande.
                </p>
              </div>
            }
          />

          {!showDeletionConfirm ? (
            <SettingsButton
              variant="danger"
              onClick={() => setShowDeletionConfirm(true)}
              icon={<AlertTriangle size={18} />}
              fullWidth
            >
              Demander la suppression du compte
            </SettingsButton>
          ) : (
            <div className="deletion-confirm-form">
              <p>Veuillez nous indiquer pourquoi vous souhaitez supprimer votre compte (optionnel):</p>
              <textarea
                value={deletionReason}
                onChange={(e) => setDeletionReason(e.target.value)}
                placeholder="Raison de la suppression..."
                rows={3}
              />
              <div className="deletion-actions">
                <SettingsButton
                  variant="ghost"
                  onClick={() => {
                    setShowDeletionConfirm(false);
                    setDeletionReason('');
                  }}
                >
                  Annuler
                </SettingsButton>
                <SettingsButton
                  variant="danger"
                  onClick={handleRequestDeletion}
                  loading={isSaving}
                  icon={<Trash2 size={18} />}
                >
                  Confirmer la suppression
                </SettingsButton>
              </div>
            </div>
          )}
        </SettingsSection>
      )}

      {/* Data Retention Policies */}
      <SettingsSection
        title="Politiques de conservation"
        description="Durées de conservation selon votre préférence"
        icon={<Database size={20} />}
      >
        <div className="retention-policies">
          {RETENTION_POLICIES.map((policy) => (
            <div key={policy.dataCategory} className="retention-policy-item">
              <h4>{DATA_CATEGORY_CONFIGS.find((c) => c.category === policy.dataCategory)?.label}</h4>
              <p>{policy.description}</p>
              <div className="retention-durations">
                <span>
                  <strong>Minimale:</strong> {policy.minimal}
                </span>
                <span>
                  <strong>Standard:</strong> {policy.standard}
                </span>
                <span>
                  <strong>Étendue:</strong> {policy.extended}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SettingsSection>

      {/* Loading State */}
      {isLoading && !error && (
        <SettingsInfoCard type="info" message="Chargement des paramètres de confidentialité..." />
      )}
    </div>
  );
};

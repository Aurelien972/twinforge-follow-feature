/**
 * Notifications Settings Tab
 * Complete notification preferences management with Web Push support
 */

import React, { useEffect, useState } from 'react';
import { Bell, BellOff, Smartphone, Mail, Volume2, Vibrate, Clock, Shield } from 'lucide-react';
import { useNotificationPreferencesStore } from '../../../system/store/notificationPreferencesStore';
import { useUserStore } from '../../../system/store/userStore';
import { webPushService } from '../../../system/services/webPushService';
import {
  SettingsSection,
  SettingsToggle,
  SettingsInfoCard,
  SettingsButton,
} from '../../../ui/components/settings';
import { NOTIFICATION_CATEGORY_CONFIGS } from '../../../domain/notifications';
import type { NotificationCategory } from '../../../domain/notifications';

export const NotificationsSettingsTab: React.FC = () => {
  const { profile } = useUserStore();
  const userId = profile?.id;

  const {
    globalSettings,
    categoryPreferences,
    pushSubscriptions,
    activePushSubscription,
    isLoading,
    isSaving,
    error,
    loadGlobalSettings,
    updateGlobalSetting,
    loadCategoryPreferences,
    updateCategoryPreference,
    loadPushSubscriptions,
    subscribeToPush,
    unsubscribeFromPush,
    clearError,
  } = useNotificationPreferencesStore();

  const [pushPermission, setPushPermission] = useState<NotificationPermission>('default');
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Load data on mount
  useEffect(() => {
    loadGlobalSettings(userId);
    loadCategoryPreferences(userId);
    loadPushSubscriptions(userId);
    checkPushPermission();
  }, [userId]);

  // Check push permission
  const checkPushPermission = async () => {
    const permission = await webPushService.checkPushPermission();
    setPushPermission(permission);
  };

  // Handle push subscription toggle
  const handlePushSubscribe = async () => {
    if (!userId) return;

    setIsSubscribing(true);
    try {
      const subscription = await webPushService.subscribe(userId);
      if (subscription) {
        await subscribeToPush(subscription, userId);
        await checkPushPermission();
      }
    } catch (error) {
      console.error('Failed to subscribe to push notifications', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  const handlePushUnsubscribe = async () => {
    if (!activePushSubscription || !userId) return;

    setIsSubscribing(true);
    try {
      await unsubscribeFromPush(activePushSubscription.id, userId);
      await webPushService.unsubscribe();
      await checkPushPermission();
    } catch (error) {
      console.error('Failed to unsubscribe from push notifications', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  // Handle global setting changes
  const handleGlobalToggle = async (key: keyof typeof globalSettings, value: boolean) => {
    await updateGlobalSetting(key, value, userId);
  };

  // Handle category preference changes
  const handleCategoryToggle = async (category: NotificationCategory, field: string, value: boolean) => {
    await updateCategoryPreference(category, { [field]: value }, userId);
  };

  const isPushEnabled = globalSettings.push_notifications_enabled;
  const hasActivePush = !!activePushSubscription;
  const pushNotSupported = !('Notification' in window) || !('serviceWorker' in navigator);

  return (
    <div className="notifications-settings-tab">
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

      {/* Global Notification Settings */}
      <SettingsSection
        title="Paramètres globaux"
        description="Contrôlez tous vos types de notifications"
        icon={<Bell size={20} />}
      >
        <SettingsToggle
          label="Notifications push"
          description="Recevez des notifications sur votre appareil même quand l'app est fermée"
          enabled={isPushEnabled}
          onChange={(enabled) => handleGlobalToggle('push_notifications_enabled', enabled)}
          disabled={isLoading}
          loading={isSaving}
        />

        <SettingsToggle
          label="Notifications in-app"
          description="Affichez les notifications quand vous utilisez l'application"
          enabled={globalSettings.in_app_notifications_enabled}
          onChange={(enabled) => handleGlobalToggle('in_app_notifications_enabled', enabled)}
          disabled={isLoading}
          loading={isSaving}
        />

        <SettingsToggle
          label="Notifications email"
          description="Recevez des emails pour les notifications importantes"
          enabled={globalSettings.email_notifications_enabled}
          onChange={(enabled) => handleGlobalToggle('email_notifications_enabled', enabled)}
          disabled={isLoading}
          loading={isSaving}
        />

        <SettingsToggle
          label="Son des notifications"
          description="Jouez un son lors de la réception d'une notification"
          enabled={globalSettings.notification_sound_enabled}
          onChange={(enabled) => handleGlobalToggle('notification_sound_enabled', enabled)}
          disabled={isLoading}
          loading={isSaving}
        />

        <SettingsToggle
          label="Vibration"
          description="Faites vibrer l'appareil lors de la réception d'une notification"
          enabled={globalSettings.notification_vibration_enabled}
          onChange={(enabled) => handleGlobalToggle('notification_vibration_enabled', enabled)}
          disabled={isLoading}
          loading={isSaving}
        />
      </SettingsSection>

      {/* Web Push Configuration */}
      {isPushEnabled && (
        <SettingsSection
          title="Configuration Web Push"
          description="Gérez vos abonnements aux notifications push"
          icon={<Smartphone size={20} />}
        >
          {pushNotSupported && (
            <SettingsInfoCard
              type="warning"
              message="Les notifications push ne sont pas supportées par votre navigateur."
            />
          )}

          {!pushNotSupported && pushPermission === 'denied' && (
            <SettingsInfoCard
              type="error"
              title="Permission refusée"
              message="Vous avez refusé les notifications. Vous devez autoriser les notifications dans les paramètres de votre navigateur."
            />
          )}

          {!pushNotSupported && pushPermission === 'granted' && !hasActivePush && (
            <SettingsInfoCard
              type="info"
              title="Activez les notifications push"
              message="Abonnez-vous aux notifications push pour recevoir des alertes même quand l'app est fermée."
              actions={
                <SettingsButton
                  onClick={handlePushSubscribe}
                  loading={isSubscribing}
                  icon={<Bell size={18} />}
                >
                  Activer les notifications push
                </SettingsButton>
              }
            />
          )}

          {!pushNotSupported && pushPermission === 'default' && (
            <SettingsInfoCard
              type="info"
              message="Cliquez sur le bouton ci-dessous pour autoriser les notifications push."
              actions={
                <SettingsButton
                  onClick={handlePushSubscribe}
                  loading={isSubscribing}
                  icon={<Bell size={18} />}
                >
                  Demander l'autorisation
                </SettingsButton>
              }
            />
          )}

          {hasActivePush && (
            <SettingsInfoCard
              type="success"
              title="Notifications push actives"
              message={`Abonné depuis ${new Date(activePushSubscription.created_at).toLocaleDateString()}`}
              actions={
                <SettingsButton
                  variant="danger"
                  onClick={handlePushUnsubscribe}
                  loading={isSubscribing}
                  icon={<BellOff size={18} />}
                >
                  Désactiver les notifications push
                </SettingsButton>
              }
            />
          )}
        </SettingsSection>
      )}

      {/* Category-Specific Preferences */}
      <SettingsSection
        title="Notifications par catégorie"
        description="Personnalisez vos préférences pour chaque type de notification"
        icon={<Shield size={20} />}
      >
        {NOTIFICATION_CATEGORY_CONFIGS.map((config) => {
          const preference = categoryPreferences.get(config.category);
          const isEnabled = preference?.push_enabled ?? true;

          return (
            <div key={config.category} className="category-preference-card">
              <div className="category-header">
                <h4 className="category-title">{config.label}</h4>
                <p className="category-description">{config.description}</p>
              </div>

              <div className="category-toggles">
                <SettingsToggle
                  label="Push"
                  enabled={preference?.push_enabled ?? true}
                  onChange={(value) =>
                    handleCategoryToggle(config.category, 'push_enabled', value)
                  }
                  disabled={isLoading || !config.canDisable}
                />

                <SettingsToggle
                  label="In-app"
                  enabled={preference?.in_app_enabled ?? true}
                  onChange={(value) =>
                    handleCategoryToggle(config.category, 'in_app_enabled', value)
                  }
                  disabled={isLoading || !config.canDisable}
                />

                <SettingsToggle
                  label="Email"
                  enabled={preference?.email_enabled ?? false}
                  onChange={(value) =>
                    handleCategoryToggle(config.category, 'email_enabled', value)
                  }
                  disabled={isLoading || !config.canDisable}
                />
              </div>
            </div>
          );
        })}
      </SettingsSection>

      {/* Loading State */}
      {isLoading && !error && (
        <SettingsInfoCard
          type="info"
          message="Chargement des préférences de notifications..."
        />
      )}
    </div>
  );
};

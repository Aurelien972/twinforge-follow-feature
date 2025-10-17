import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tabs from '../../ui/tabs/TabsComponent';
import PageHeader from '../../ui/page/PageHeader';
import GlassCard from '../../ui/cards/GlassCard';
import UnderConstructionCard from '../components/UnderConstructionCard';
import ConnectedDevicesTab from './Settings/ConnectedDevicesTab';
import GeneralTab from './Settings/GeneralTab';
import { PLACEHOLDER_PAGES_CONFIG } from '../../config/placeholderPagesConfig';

/**
 * SettingsPage - Réglages
 * Page de configuration et personnalisation de l'application
 */
const SettingsPage: React.FC = () => {
  const config = PLACEHOLDER_PAGES_CONFIG.settings;
  const [activeTab, setActiveTab] = useState(config.tabs[0].value);

  const activeTabConfig = config.tabs.find(tab => tab.value === activeTab) || config.tabs[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-6"
    >
      <PageHeader
        icon={activeTabConfig.icon || config.icon}
        title={activeTabConfig.label}
        subtitle={activeTabConfig.description}
        circuit={config.circuit as any}
        iconColor={config.color}
      />

      <Tabs
        defaultValue={config.tabs[0].value}
        className="w-full settings-tabs"
        onValueChange={(value) => setActiveTab(value)}
      >
        <Tabs.List role="tablist" aria-label="Sections des Réglages" className="mb-6 w-full">
          {config.tabs.map((tab) => (
            <Tabs.Trigger key={tab.value} value={tab.value} icon={tab.icon}>
              <span className="tab-text">{tab.label}</span>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {config.tabs.map((tab) => (
          <Tabs.Panel key={tab.value} value={tab.value}>
            {tab.value === 'general' ? (
              <GeneralTab />
            ) : tab.value === 'appareils' ? (
              <ConnectedDevicesTab />
            ) : (
              <GlassCard className="p-6">
                <UnderConstructionCard
                  title={tab.label}
                  description={tab.description}
                  icon={tab.icon}
                  color={config.color}
                  features={tab.features}
                />
              </GlassCard>
            )}
          </Tabs.Panel>
        ))}
      </Tabs>
    </motion.div>
  );
};

export default SettingsPage;
/**
 * HealthProfileLayout Component
 * Common layout for health profile page with navigation
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import { useHealthProfileNavigation, type HealthProfileTab } from './hooks/useHealthProfileNavigation';

interface HealthProfileLayoutProps {
  children: React.ReactNode;
  globalCompletion: number;
}

export const HealthProfileLayout: React.FC<HealthProfileLayoutProps> = ({
  children,
  globalCompletion,
}) => {
  const {
    activeTab,
    navigateToTab,
    completionByTab,
    allTabs,
  } = useHealthProfileNavigation();

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <motion.div
        className="sticky top-0 z-40 backdrop-blur-xl border-b"
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(239, 68, 68, 0.2))
                  `,
                  border: '2px solid rgba(239, 68, 68, 0.5)',
                  boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)',
                }}
              >
                <SpatialIcon Icon={ICONS.Heart} size={24} style={{ color: '#EF4444' }} variant="pure" />
              </div>
              <div>
                <h1 className="text-white font-bold text-2xl">Mon Profil de Santé</h1>
                <p className="text-white/60 text-sm mt-0.5">Médecine préventive par intelligence artificielle</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 8px rgba(6, 182, 212, 0.6)' }} />
                  <span className="text-white font-bold text-lg">{globalCompletion}%</span>
                </div>
                <span className="text-white/60 text-xs">Complété</span>
              </div>
              <div className="w-16 h-16 relative">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/10"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <motion.path
                    className="text-cyan-400"
                    strokeWidth="3"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    strokeDasharray="100"
                    strokeDashoffset={100 - globalCompletion}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    initial={{ strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: 100 - globalCompletion }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {allTabs.map((tab) => (
              <TabButton
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                completion={completionByTab[tab.id]}
                onClick={() => navigateToTab(tab.id)}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

interface TabButtonProps {
  tab: {
    id: HealthProfileTab;
    label: string;
    icon: string;
    color: string;
  };
  isActive: boolean;
  completion: number;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ tab, isActive, completion, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex-shrink-0"
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${tab.color}30, ${tab.color}20)`
          : 'rgba(255, 255, 255, 0.05)',
        border: isActive
          ? `2px solid ${tab.color}60`
          : '2px solid rgba(255, 255, 255, 0.1)',
        boxShadow: isActive
          ? `0 0 20px ${tab.color}30`
          : 'none',
      }}
    >
      <SpatialIcon
        Icon={ICONS[tab.icon as keyof typeof ICONS]}
        size={16}
        style={{ color: isActive ? tab.color : '#ffffff99' }}
      />
      <span
        className="text-sm font-medium"
        style={{ color: isActive ? '#ffffff' : '#ffffff99' }}
      >
        {tab.label}
      </span>
      {completion > 0 && (
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: `${tab.color}20`,
            color: tab.color,
          }}
        >
          {completion}%
        </span>
      )}
    </button>
  );
};

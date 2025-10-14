import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../../ui/page/PageHeader';
import GlassCard from '../../ui/cards/GlassCard';
import UnderConstructionCard from '../components/UnderConstructionCard';
import { PLACEHOLDER_PAGES_CONFIG } from '../../config/placeholderPagesConfig';

/**
 * FridgePage - Atelier de Recettes
 * Placeholder pour la fonctionnalité de gestion d'inventaire
 */
const FridgePage: React.FC = () => {
  const config = PLACEHOLDER_PAGES_CONFIG.fridge || {
    icon: 'Refrigerator',
    title: 'Atelier de Recettes',
    subtitle: 'Fonctionnalité en cours de développement',
    circuit: 'fridge',
    color: '#06B6D4',
    tabs: []
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-6"
    >
      <PageHeader
        icon={config.icon as any}
        title={config.title}
        subtitle={config.subtitle}
        circuit={config.circuit as any}
        iconColor={config.color}
      />

      <GlassCard className="p-6">
        <UnderConstructionCard
          title="Atelier de Recettes"
          description="Gérez votre inventaire, générez des recettes et planifiez vos repas"
          icon="Refrigerator"
          color={config.color}
          features={[
            'Scanner de frigo intelligent',
            'Génération de recettes personnalisées',
            'Planification de repas hebdomadaire',
            'Liste de courses automatique'
          ]}
        />
      </GlassCard>
    </motion.div>
  );
};

export default FridgePage;
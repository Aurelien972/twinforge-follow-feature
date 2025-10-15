import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../ui/page/PageHeader';
import GlassCard from '../../ui/cards/GlassCard';
import UnderConstructionCard from '../components/UnderConstructionCard';

/**
 * FridgeScanPage - Scanner de Frigo
 * Placeholder pour la fonctionnalité de scan d'inventaire
 */
const FridgeScanPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/fridge');
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-6"
    >
      <PageHeader
        icon="Camera"
        title="Scanner de Frigo"
        subtitle="Fonctionnalité temporairement désactivée"
        circuit="fridge"
        iconColor="#06B6D4"
      />

      <GlassCard className="p-6">
        <UnderConstructionCard
          title="Scanner de Frigo"
          description="Cette fonctionnalité est en cours de développement"
          icon="Camera"
          color="#06B6D4"
          features={[
            'Redirection automatique vers l\'atelier de recettes',
            'Scanner intelligent en développement',
            'Détection d\'ingrédients par IA',
            'Génération automatique de recettes'
          ]}
        />
      </GlassCard>
    </motion.div>
  );
};

export default FridgeScanPage;
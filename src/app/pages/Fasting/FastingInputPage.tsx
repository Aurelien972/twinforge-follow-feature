import React from 'react';
import GlassCard from '../../../ui/cards/GlassCard';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import PageHeader from '../../../ui/page/PageHeader';

const FastingInputPage: React.FC = () => {
  return (
    <div className="space-y-6 w-full">
      <PageHeader
        icon="Timer"
        title="Tracker de Jeûne"
        subtitle="Démarrez et suivez vos sessions de jeûne intermittent"
        circuit="fasting"
        iconColor="#F59E0B"
      />
      
      <GlassCard className="p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-500/20 flex items-center justify-center">
          <SpatialIcon Icon={ICONS.Timer} size={40} className="text-orange-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">
          Tracker de Jeûne en Développement
        </h3>
        <p className="text-white/70 text-lg mb-6 max-w-md mx-auto leading-relaxed">
          Le tracker de jeûne sera bientôt disponible. 
          Vous pourrez démarrer des sessions, suivre votre progression 
          et recevoir des notifications intelligentes.
        </p>
        <div className="text-orange-300 text-sm">
          Fonctionnalités à venir : Sessions de jeûne, Notifications, Suivi temps réel
        </div>
      </GlassCard>
    </div>
  );
};

export default FastingInputPage;
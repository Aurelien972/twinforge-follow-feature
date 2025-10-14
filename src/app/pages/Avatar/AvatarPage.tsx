// src/app/pages/Avatar/AvatarPage.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from '../../../ui/tabs'; // useTabsKeyboard est géré en interne par TabsComponent
import { useScrollMemory } from '../../../hooks/scroll/useScrollMemory';
import { useFeedback } from '../../../hooks/useFeedback';
import PageHeader from '../../../ui/page/PageHeader';
import AvatarTab from './tabs/AvatarTab';
import FaceTab from './tabs/FaceTab';
import InsightsTab from './tabs/InsightsTab';
import HistoryTab from './tabs/HistoryTab';
import ProjectionTab from './tabs/ProjectionTab';
import ScanCTA from './tabs/ScanCTA';
import logger from '../../../lib/utils/logger';

type TabKey = 'scanCta' | 'avatar' | 'projection' | 'insights' | 'history' | 'face';

/**
 * Récupère le contenu dynamique de l'en-tête en fonction de l'onglet actif.
 * Cela inclut l'icône, le titre, le sous-titre, le circuit et la couleur.
 */
function getTabHeaderContent(activeTab: TabKey) {
  switch (activeTab) {
    case 'scanCta':
      return {
        icon: 'Scan' as const,
        title: 'Forge Corporelle',
        subtitle: 'Capturez votre évolution corporelle avec un nouveau scan 3D',
        circuit: 'avatar' as const,
        color: '#8B5CF6', // Couleur violette pour le scan
      };
    case 'avatar':
      return {
        icon: 'Eye' as const,
        title: 'Votre Avatar 3D',
        subtitle: 'Visualisez et ajustez votre reflet numérique personnalisé',
        circuit: 'avatar' as const,
        color: '#06B6D4', // Couleur cyan pour l'avatar
      };
    case 'projection':
      return {
        icon: 'TrendingUp' as const,
        title: 'Projection Corporelle',
        subtitle: 'Visualisez votre évolution future selon vos habitudes de vie',
        circuit: 'avatar' as const,
        color: '#10B981', // Couleur verte pour la projection
      };
    case 'insights':
      return {
        icon: 'Zap' as const,
        title: 'Insights Avatar',
        subtitle:
          'Analyses IA personnalisées et recommandations basées sur votre scan corporel',
        circuit: 'avatar' as const,
        color: '#F59E0B', // Couleur orange pour les insights
      };
    case 'history':
      return {
        icon: 'History' as const,
        title: 'Historique des Scans',
        subtitle: 'Revivez vos transformations corporelles au fil du temps',
        circuit: 'avatar' as const,
        color: '#8B5CF6', // Couleur violette pour l'historique
      };
    case 'face':
      return {
        icon: 'ScanFace' as const,
        title: 'Votre Visage 3D',
        subtitle: 'Scannez et visualisez votre visage en haute définition',
        circuit: 'avatar' as const,
        color: '#EC4899', // Couleur rose pour le visage
      };
    default:
      // Fallback par défaut si l'onglet actif n'est pas reconnu.
      return {
        icon: 'Eye' as const,
        title: 'Votre Avatar 3D',
        subtitle: 'Visualisez et ajustez votre reflet numérique personnalisé',
        circuit: 'avatar' as const,
        color: '#8B5CF6',
      };
  }
}

/**
 * Page principale de l'Avatar.
 * Gère la navigation par onglets (Avatar, Insights, Historique)
 * et assure que les composants s'affichent en pleine largeur.
 */
const AvatarPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { click } = useFeedback();

  // Détermine l'onglet actif basé sur le hash de l'URL.
  // Si aucun hash n'est présent ou s'il est invalide, 'avatar' est utilisé par défaut.
  // Cette valeur est cruciale pour l'affichage de l'en-tête et la persistance du défilement.
  const activeTab = React.useMemo<TabKey>(() => {
    const hash = location.hash.replace('#', '');
    return (['scanCta', 'avatar', 'projection', 'insights', 'history', 'face'] as TabKey[]).includes(hash as TabKey)
      ? (hash as TabKey)
      : 'scanCta';
  }, [location.hash]);

  // Utilise le hook `useScrollMemory` pour sauvegarder et restaurer la position de défilement
  // de chaque onglet, assurant une meilleure expérience utilisateur lors de la navigation.
  useScrollMemory(`avatar:${activeTab}`);

  // Récupère le contenu de l'en-tête (titre, icône, couleurs) en fonction de l'onglet actif.
  const headerContent = getTabHeaderContent(activeTab);

  /**
   * Gère le changement d'onglet.
   * Met à jour le hash de l'URL pour refléter l'onglet sélectionné,
   * ce qui permet le partage de liens directs vers un onglet spécifique.
   */
  const handleTabChange = (value: string) => {
    const nextTab = (value || 'scanCta') as TabKey; // Assure que la valeur est une TabKey valide.
    click(); // Joue un son de feedback pour l'interaction utilisateur.
    logger.debug('AVATAR_PAGE', 'Changement d\'onglet déclenché', { nouvelOnglet: nextTab });

    // Met à jour l'URL sans recharger la page, en changeant seulement le hash.
    // `replace: false` permet de conserver l'historique de navigation pour le bouton "Retour".
    navigate(
      {
        pathname: location.pathname,
        search: location.search,
        hash: `#${nextTab}`,
      },
      { replace: false }
    );
  };

  return (
    // Le conteneur principal de la page utilise 'w-full' pour prendre 100% de la largeur
    // et 'max-w-none' pour annuler toute limite de largeur maximale définie par les parents.
    // Cela garantit que le contenu s'étend sur toute la largeur disponible de l'écran.
    <div className="space-y-6 w-full max-w-none">
      {/* Composant d'en-tête de la page, dynamique selon l'onglet actif. */}
      <PageHeader
        icon={headerContent.icon}
        title={headerContent.title}
        subtitle={headerContent.subtitle}
        circuit={headerContent.circuit}
        iconColor={headerContent.color}
      />

      {/* Composant `Tabs` pour organiser le contenu en onglets. */}
      <Tabs
        // `defaultValue` spécifie l'onglet actif par défaut si aucun hash n'est présent dans l'URL.
        defaultValue="scanCta"
        // `className` assure que le composant `Tabs` lui-même prend toute la largeur disponible.
        className="w-full min-w-0 avatar-tabs"
        // `onValueChange` est le callback appelé lorsque l'utilisateur clique sur un onglet.
        onValueChange={handleTabChange}
      >
        {/* Liste des déclencheurs d'onglets (les boutons cliquables). */}
        <Tabs.List
          role="tablist" // Rôle ARIA pour une liste d'onglets.
          aria-label="Sections de l'avatar" // Libellé ARIA pour l'accessibilité.
          // `w-full` assure que la liste des onglets prend toute la largeur.
          className="mb-4 md:mb-6 w-full"
        >
          {/* Chaque `Tabs.Trigger` représente un bouton d'onglet. */}
          {/* `value` correspond à l'ID de l'onglet, `icon` à l'icône Lucide, */}
          {/* et `aria-controls` lie le déclencheur au panneau de contenu correspondant. */}
          <Tabs.Trigger value="scanCta" icon="Scan" aria-controls="panel-scancta">
            <span className="tab-text">Scanner</span>
          </Tabs.Trigger>

          <Tabs.Trigger value="avatar" icon="Eye" aria-controls="panel-avatar">
            <span className="tab-text">Avatar</span>
          </Tabs.Trigger>

          <Tabs.Trigger value="projection" icon="TrendingUp" aria-controls="panel-projection">
            <span className="tab-text">Projection</span>
          </Tabs.Trigger>

          <Tabs.Trigger value="insights" icon="Zap" aria-controls="panel-insights">
            <span className="tab-text">Insights</span>
          </Tabs.Trigger>

          <Tabs.Trigger value="history" icon="History" aria-controls="panel-history">
            <span className="tab-text">Historique</span>
          </Tabs.Trigger>

          <Tabs.Trigger value="face" icon="ScanFace" aria-controls="panel-face">
            <span className="tab-text">Visage</span>
          </Tabs.Trigger>
        </Tabs.List>

        {/* Panneaux de contenu pour chaque onglet. */}
        {/* Chaque `Tabs.Panel` a un `id` correspondant à `aria-controls` de son `Tabs.Trigger` associé. */}
        <Tabs.Panel id="panel-scancta" value="scanCta">
          {/* `ScanCTA` est le composant de contenu pour l'onglet 'Nouveau Scan'. */}
          <ScanCTA />
        </Tabs.Panel>

        <Tabs.Panel id="panel-avatar" value="avatar">
          {/* `AvatarTab` est le composant de contenu pour l'onglet 'Avatar'. */}
          {/* Il est attendu que `AvatarTab` (et les autres composants de panneau) gèrent leur propre largeur interne, */}
          {/* généralement en utilisant `w-full` sur leur élément racine pour s'adapter au conteneur parent. */}
          <AvatarTab />
        </Tabs.Panel>

        <Tabs.Panel id="panel-projection" value="projection">
          {/* `ProjectionTab` est le composant de contenu pour l'onglet 'Projection'. */}
          <ProjectionTab />
        </Tabs.Panel>

        <Tabs.Panel id="panel-insights" value="insights">
          {/* `InsightsTab` est le composant de contenu pour l'onglet 'Insights'. */}
          <InsightsTab />
        </Tabs.Panel>

        <Tabs.Panel id="panel-history" value="history">
          {/* `HistoryTab` est le composant de contenu pour l'onglet 'Historique'. */}
          <HistoryTab />
        </Tabs.Panel>

        <Tabs.Panel id="panel-face" value="face">
          {/* `FaceTab` est le composant de contenu pour l'onglet 'Visage'. */}
          <FaceTab />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default AvatarPage;

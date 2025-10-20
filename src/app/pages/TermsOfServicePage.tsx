import React from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';
import GlassCard from '../../ui/cards/GlassCard';
import SpatialIcon from '../../ui/icons/SpatialIcon';
import { ICONS } from '../../ui/icons/registry';

export default function TermsOfServicePage() {
  const lastUpdated = "20 octobre 2025";

  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptation des Conditions',
      content: `En accédant et en utilisant TwinForge ("l'Application"), vous acceptez d'être lié par ces Conditions d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'Application. L'Application est exploitée par DFC Digital Freedom Caraïbe, SARL immatriculée sous le numéro SIREN 853 381 960.`
    },
    {
      id: 'description',
      title: '2. Description du Service',
      content: `TwinForge est une application de coaching fitness personnel qui offre :`,
      list: [
        'Suivi d\'activité physique et synchronisation avec appareils connectés',
        'Analyse nutritionnelle et plans alimentaires personnalisés',
        'Body Scan 3D pour visualiser l\'évolution corporelle',
        'Plans d\'entraînement adaptatifs générés par intelligence artificielle',
        'Suivi du jeûne intermittent et phases métaboliques',
        'Analyses avancées et recommandations personnalisées'
      ],
      additional: `L'Application nécessite une connexion internet et un appareil compatible. Certaines fonctionnalités peuvent nécessiter des intégrations tierces (Google Fit, Apple Health, Strava).`
    },
    {
      id: 'account',
      title: '3. Compte Utilisateur',
      content: `Pour utiliser TwinForge, vous devez créer un compte en fournissant des informations exactes et à jour. Vous êtes responsable de :`,
      list: [
        'Maintenir la confidentialité de vos identifiants de connexion',
        'Toutes les activités effectuées depuis votre compte',
        'Informer immédiatement DFC en cas d\'utilisation non autorisée',
        'Fournir des informations véridiques (âge, santé, objectifs)',
        'Ne pas partager votre compte avec des tiers',
        'Être âgé d\'au moins 16 ans (ou avoir le consentement parental)'
      ]
    },
    {
      id: 'subscription',
      title: '4. Abonnement et Paiement',
      content: `TwinForge propose différents forfaits d'abonnement consultables dans l'onglet "Forfait" de l'Application :`,
      list: [
        'Forfait Gratuit : accès limité aux fonctionnalités de base',
        'Forfaits Payants : accès complet avec analyses IA illimitées',
        'Paiements traités via Stripe de manière sécurisée',
        'Renouvellement automatique sauf résiliation',
        'Tarifs et fonctionnalités sujets à modifications avec préavis de 30 jours',
        'Aucun remboursement pour périodes non utilisées sauf obligation légale'
      ],
      additional: `Vous pouvez annuler votre abonnement à tout moment dans les paramètres de l'Application. L'annulation prend effet à la fin de la période payée en cours.`
    },
    {
      id: 'intellectual-property',
      title: '5. Propriété Intellectuelle',
      content: `Tous les droits de propriété intellectuelle sur l'Application appartiennent à DFC Digital Freedom Caraïbe :`,
      list: [
        'Le code source, design, logos, marques sont protégés par le droit d\'auteur',
        'Les contenus générés par IA (plans, analyses) restent la propriété de DFC',
        'Vous conservez la propriété de vos données personnelles (photos, profil)',
        'Vous accordez à DFC une licence d\'utilisation de vos données pour le service',
        'Interdiction de copier, modifier, distribuer ou revendre l\'Application',
        'Interdiction d\'utiliser l\'Application à des fins commerciales sans autorisation'
      ]
    },
    {
      id: 'acceptable-use',
      title: '6. Utilisation Acceptable',
      content: `Vous vous engagez à ne pas :`,
      list: [
        'Utiliser l\'Application à des fins illégales ou frauduleuses',
        'Tenter de contourner les mesures de sécurité ou limitations',
        'Introduire des virus, malwares ou codes malveillants',
        'Extraire des données de manière automatisée (scraping)',
        'Créer de faux comptes ou usurper l\'identité d\'autrui',
        'Harceler, menacer ou abuser d\'autres utilisateurs ou du support',
        'Publier du contenu offensant, diffamatoire ou illégal',
        'Utiliser l\'Application pour promouvoir des produits tiers sans autorisation'
      ],
      additional: `La violation de ces règles peut entraîner la suspension ou la suppression définitive de votre compte sans préavis ni remboursement.`
    },
    {
      id: 'health-disclaimer',
      title: '7. Avertissement Santé et Fitness',
      content: `IMPORTANT : TwinForge est un outil d'assistance fitness, pas un dispositif médical :`,
      list: [
        'Les recommandations sont générées par IA et peuvent contenir des erreurs',
        'Consultez toujours un professionnel de santé avant de débuter un programme',
        'Ne remplace pas un avis médical, diagnostic ou traitement professionnel',
        'Arrêtez immédiatement en cas de douleur, malaise ou symptômes inhabituels',
        'Les résultats varient selon les individus et ne sont pas garantis',
        'DFC n\'est pas responsable des blessures résultant de l\'utilisation',
        'Certaines conditions médicales nécessitent une surveillance spécialisée'
      ],
      additional: `En utilisant TwinForge, vous reconnaissez avoir lu et compris cet avertissement et dégagez DFC de toute responsabilité liée à votre santé.`
    },
    {
      id: 'liability',
      title: '8. Limitation de Responsabilité',
      content: `Dans les limites autorisées par la loi :`,
      list: [
        'L\'Application est fournie "en l\'état" sans garantie d\'aucune sorte',
        'DFC ne garantit pas l\'exactitude, fiabilité ou disponibilité continue',
        'DFC n\'est pas responsable des pertes de données, interruptions de service',
        'Responsabilité limitée au montant payé les 12 derniers mois',
        'Exclusion de responsabilité pour dommages indirects, perte de profits',
        'Pas de garantie de résultats fitness ou perte de poids spécifiques',
        'Intégrations tierces (Google Fit, etc.) sous leur propre responsabilité'
      ]
    },
    {
      id: 'termination',
      title: '9. Résiliation',
      content: `Vous pouvez résilier votre compte à tout moment via les paramètres. DFC peut suspendre ou supprimer votre compte si :`,
      list: [
        'Vous violez ces Conditions d\'Utilisation',
        'Votre compte est inactif depuis plus de 24 mois',
        'Activité suspecte ou frauduleuse détectée',
        'Non-paiement des frais d\'abonnement',
        'Demande des autorités légales'
      ],
      additional: `En cas de résiliation, vos données personnelles seront supprimées conformément à notre Politique de Confidentialité (conservation de 30 jours pour raisons techniques).`
    },
    {
      id: 'modifications',
      title: '10. Modifications des Conditions',
      content: `DFC se réserve le droit de modifier ces Conditions d'Utilisation à tout moment. Les modifications importantes seront notifiées par email et dans l'Application avec un préavis de 30 jours. La poursuite de l'utilisation après notification constitue une acceptation des nouvelles conditions.`
    },
    {
      id: 'applicable-law',
      title: '11. Loi Applicable et Juridiction',
      content: `Ces Conditions d'Utilisation sont régies par le droit français. Tout litige relatif à l'Application relève de la compétence exclusive des tribunaux de Fort-de-France, Martinique. En cas de conflit, nous encourageons la résolution amiable avant toute action judiciaire.`
    },
    {
      id: 'contact',
      title: '12. Contact et Support',
      content: `Pour toute question concernant ces conditions ou l'utilisation de TwinForge :`,
      list: [
        'Email : contact@digitalfreedomcaraibe.com',
        'Téléphone : 0596 58 22 98 ou 0615 60 31 24',
        'Adresse : 81 Rue Lamartine, 97200 Fort-de-France, Martinique',
        'Support en ligne : disponible dans l\'Application'
      ],
      additional: `Notre équipe répond généralement sous 48 heures ouvrées.`
    }
  ];

  return (
    <div className="min-h-screen bg-twinforge-visionos">
      <PublicHeader />

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Conditions d'Utilisation
            </h1>
            <p className="text-white/70 text-lg">
              Dernière mise à jour : {lastUpdated}
            </p>
          </div>

          {/* Important Notice */}
          <GlassCard
            className="p-6 mb-8"
            style={{
              background: 'rgba(247, 147, 30, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(247, 147, 30, 0.3)'
            }}
          >
            <div className="flex items-start gap-3">
              <SpatialIcon
                Icon={ICONS.AlertTriangle}
                size={24}
                className="text-orange-400 mt-1 shrink-0"
              />
              <div>
                <h3 className="text-white font-bold text-lg mb-2">
                  Veuillez lire attentivement
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Ces Conditions d'Utilisation constituent un contrat juridiquement contraignant entre vous et DFC Digital Freedom Caraïbe. En utilisant TwinForge, vous acceptez ces conditions dans leur intégralité. Veuillez accorder une attention particulière aux sections 7 (Avertissement Santé) et 8 (Limitation de Responsabilité).
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Table of Contents */}
          <GlassCard
            className="p-6 mb-8"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <SpatialIcon Icon={ICONS.List} size={20} />
              Table des Matières
            </h2>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Content Sections */}
          <div className="space-y-8">
            {sections.map((section) => (
              <GlassCard
                key={section.id}
                id={section.id}
                className="p-6 scroll-mt-24"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  {section.title}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {section.content}
                </p>
                {section.list && (
                  <ul className="space-y-2 mb-4">
                    {section.list.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/70">
                        <SpatialIcon
                          Icon={ICONS.CheckCircle2}
                          size={16}
                          className="text-blue-400 mt-1 shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.additional && (
                  <p className="text-white/70 leading-relaxed mt-4 p-4 rounded-lg"
                    style={{
                      background: 'rgba(24, 227, 255, 0.05)',
                      border: '1px solid rgba(24, 227, 255, 0.2)'
                    }}
                  >
                    {section.additional}
                  </p>
                )}
              </GlassCard>
            ))}
          </div>

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <SpatialIcon Icon={ICONS.ArrowLeft} size={18} />
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

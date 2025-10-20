import React from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';
import GlassCard from '../../ui/cards/GlassCard';
import SpatialIcon from '../../ui/icons/SpatialIcon';
import { ICONS } from '../../ui/icons/registry';

export default function LegalMentionsPage() {
  const sections = [
    {
      id: 'editor',
      title: '1. Éditeur du Site',
      content: `L'application TwinForge est éditée par :`,
      details: [
        { label: 'Raison sociale', value: 'DFC DIGITAL FREEDOM CARAÏBE' },
        { label: 'Forme juridique', value: 'SARL (Société à Responsabilité Limitée)' },
        { label: 'Capital social', value: '5 500,00 €' },
        { label: 'SIREN', value: '853 381 960' },
        { label: 'SIRET (siège)', value: '853 381 960 00022' },
        { label: 'Numéro RCS', value: '853 381 960 R.C.S. Fort-de-France' },
        { label: 'Code NAF/APE', value: '47.91A - Vente à distance sur catalogue général' },
        { label: 'Numéro TVA intracommunautaire', value: 'FR60853381960' },
        { label: 'Date de création', value: '01/08/2019' },
        { label: 'Date d\'inscription RCS', value: '28/11/2019' }
      ]
    },
    {
      id: 'address',
      title: '2. Siège Social',
      content: `Adresse du siège social :`,
      details: [
        { label: 'Adresse', value: '81 Rue Lamartine' },
        { label: 'Code postal', value: '97200' },
        { label: 'Ville', value: 'Fort-de-France' },
        { label: 'Département', value: 'Martinique (972)' },
        { label: 'Pays', value: 'France 🇫🇷' }
      ]
    },
    {
      id: 'management',
      title: '3. Direction et Gérance',
      content: `L'entreprise est dirigée par :`,
      details: [
        { label: 'Gérant 1', value: 'Ryfer Ronald' },
        { label: 'Gérant 2', value: 'Filin Aurélien' }
      ]
    },
    {
      id: 'contact',
      title: '4. Contact',
      content: `Pour toute question ou demande concernant TwinForge :`,
      details: [
        { label: 'Email général', value: 'contact@digitalfreedomcaraibe.com' },
        { label: 'Email confidentialité', value: 'privacy@digitalfreedomcaraibe.com' },
        { label: 'Téléphone 1', value: '0596 58 22 98' },
        { label: 'Téléphone 2', value: '0615 60 31 24' }
      ]
    },
    {
      id: 'hosting',
      title: '5. Hébergement',
      content: `L'application TwinForge est hébergée par :`,
      details: [
        {
          label: 'Infrastructure Backend',
          value: 'Supabase Inc. (hébergement base de données et edge functions)'
        },
        {
          label: 'Infrastructure Frontend',
          value: 'Netlify, Inc. (hébergement application web)'
        },
        {
          label: 'Localisation des serveurs',
          value: 'Union Européenne (conformité RGPD)'
        }
      ]
    },
    {
      id: 'activity',
      title: '6. Activité',
      content: `Activité principale de l'entreprise :`,
      details: [
        {
          label: 'Activité déclarée',
          value: 'Commerce en ligne, création de site internet, conseil en matière de digital marketing et e-commerce'
        },
        {
          label: 'Activité TwinForge',
          value: 'Application de coaching fitness personnel avec intelligence artificielle'
        },
        { label: 'Effectif', value: 'Entre 3 et 5 salariés (donnée 2022)' },
        { label: 'Date de clôture exercice', value: '31/05/2026' }
      ]
    },
    {
      id: 'intellectual-property',
      title: '7. Propriété Intellectuelle',
      content: `Tous les éléments de TwinForge sont protégés par le droit de la propriété intellectuelle :`,
      list: [
        'Le nom "TwinForge" est une marque commerciale de DFC Digital Freedom Caraïbe',
        'Le logo, la charte graphique et les éléments visuels sont protégés par copyright',
        'Le code source de l\'application est la propriété exclusive de DFC',
        'Toute reproduction non autorisée est strictement interdite',
        'Les contenus générés par IA appartiennent à DFC',
        'Les utilisateurs conservent la propriété de leurs données personnelles'
      ]
    },
    {
      id: 'data-protection',
      title: '8. Protection des Données',
      content: `DFC Digital Freedom Caraïbe est responsable du traitement des données personnelles collectées via TwinForge. Le traitement est conforme au Règlement Général sur la Protection des Données (RGPD) et à la loi française Informatique et Libertés.`,
      list: [
        'Responsable du traitement : DFC Digital Freedom Caraïbe',
        'Finalité : fourniture du service TwinForge et analyses personnalisées',
        'Base légale : consentement de l\'utilisateur et exécution du contrat',
        'Durée de conservation : durée du compte + 30 jours après suppression',
        'Droits : accès, rectification, effacement, portabilité, opposition',
        'Autorité de contrôle : CNIL (Commission Nationale de l\'Informatique et des Libertés)'
      ],
      additional: 'Pour plus de détails, consultez notre Politique de Confidentialité.'
    },
    {
      id: 'cookies',
      title: '9. Cookies',
      content: `TwinForge utilise des cookies pour améliorer l'expérience utilisateur :`,
      list: [
        'Cookies essentiels : authentification et sécurité (obligatoires)',
        'Cookies de performance : analyse de l\'utilisation (optionnels)',
        'Cookies de préférence : mémorisation des paramètres (optionnels)',
        'Aucun cookie publicitaire ou de tracking tiers'
      ],
      additional: 'Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.'
    },
    {
      id: 'applicable-law',
      title: '10. Droit Applicable',
      content: `Les mentions légales et l'utilisation de TwinForge sont régies par le droit français. En cas de litige, les tribunaux de Fort-de-France, Martinique, sont seuls compétents.`
    },
    {
      id: 'credits',
      title: '11. Crédits',
      content: `Technologies et services utilisés par TwinForge :`,
      list: [
        'Framework : React + TypeScript + Vite',
        'UI/Animation : Framer Motion, Tailwind CSS',
        'Backend : Supabase (PostgreSQL, Auth, Storage, Edge Functions)',
        'Intelligence Artificielle : OpenAI GPT-4, Vision API',
        'Intégrations fitness : Google Fit API, Apple HealthKit, Strava API',
        'Paiements : Stripe',
        'Hébergement : Netlify (Frontend), Supabase (Backend)',
        'Icônes : Lucide React'
      ]
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
              Mentions Légales
            </h1>
            <p className="text-white/70 text-lg">
              Informations légales concernant TwinForge et DFC Digital Freedom Caraïbe
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {sections.map((section) => (
              <GlassCard
                key={section.id}
                id={section.id}
                className="p-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  {section.title}
                </h2>
                {section.content && (
                  <p className="text-white/80 leading-relaxed mb-4">
                    {section.content}
                  </p>
                )}

                {section.details && (
                  <div className="space-y-3">
                    {section.details.map((detail, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-lg"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.05)'
                        }}
                      >
                        <span className="text-white/60 text-sm font-semibold min-w-[180px]">
                          {detail.label} :
                        </span>
                        <span className="text-white/90 text-sm">
                          {detail.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

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

          {/* Links to Other Legal Pages */}
          <GlassCard
            className="p-6 mt-8"
            style={{
              background: 'rgba(247, 147, 30, 0.08)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(247, 147, 30, 0.2)'
            }}
          >
            <h3 className="text-white font-bold text-lg mb-4">
              Documents légaux complémentaires
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/privacy"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <SpatialIcon Icon={ICONS.Shield} size={18} />
                Politique de Confidentialité
              </Link>
              <Link
                to="/terms"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <SpatialIcon Icon={ICONS.FileText} size={18} />
                Conditions d'Utilisation
              </Link>
            </div>
          </GlassCard>

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

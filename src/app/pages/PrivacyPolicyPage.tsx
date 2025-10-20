import React from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';
import GlassCard from '../../ui/cards/GlassCard';
import SpatialIcon from '../../ui/icons/SpatialIcon';
import { ICONS } from '../../ui/icons/registry';

export default function PrivacyPolicyPage() {
  const lastUpdated = "20 octobre 2025";

  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: `TwinForge est une application de coaching fitness personnel développée et exploitée par DFC Digital Freedom Caraïbe. Nous prenons très au sérieux la protection de vos données personnelles et nous nous engageons à respecter votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos informations.`
    },
    {
      id: 'data-collected',
      title: '2. Données Collectées',
      content: `Nous collectons les types de données suivants :`,
      list: [
        'Données de profil : nom, email, date de naissance, sexe, poids, taille, objectifs fitness',
        'Données d\'activité physique : entraînements, calories brûlées, distance parcourue, fréquence cardiaque (synchronisées depuis Google Fit, Apple Health, Strava)',
        'Données nutritionnelles : repas scannés, apports caloriques, macronutriments',
        'Photos corporelles : images pour le Body Scan 3D (stockées de manière sécurisée)',
        'Données de jeûne : fenêtres de jeûne, durée, fréquence',
        'Données d\'utilisation : interactions avec l\'application, préférences'
      ]
    },
    {
      id: 'data-usage',
      title: '3. Utilisation des Données',
      content: `Vos données sont utilisées exclusivement pour :`,
      list: [
        'Personnaliser votre expérience et vos recommandations fitness',
        'Générer des analyses et insights IA sur vos progrès',
        'Synchroniser vos données entre appareils',
        'Améliorer nos services et algorithmes',
        'Vous envoyer des notifications importantes (avec votre consentement)',
        'Assurer la sécurité et le bon fonctionnement de l\'application'
      ]
    },
    {
      id: 'data-storage',
      title: '4. Stockage et Sécurité',
      content: `Vos données sont stockées de manière sécurisée sur l\'infrastructure Supabase avec les garanties suivantes :`,
      list: [
        'Chiffrement des données au repos et en transit (SSL/TLS)',
        'Serveurs hébergés dans des data centers certifiés',
        'Accès restreint aux données (uniquement personnel autorisé)',
        'Sauvegardes régulières et redondance des données',
        'Conformité RGPD et normes de sécurité internationales',
        'Conservation des données : durée de votre compte + 30 jours après suppression'
      ]
    },
    {
      id: 'data-sharing',
      title: '5. Partage des Données',
      content: `Nous ne vendons jamais vos données à des tiers. Le partage est limité à :`,
      list: [
        'Fournisseurs de services essentiels (hébergement Supabase, APIs IA) sous contrat strict',
        'Obligations légales : demandes des autorités compétentes',
        'Aucun partage commercial, marketing ou publicitaire'
      ]
    },
    {
      id: 'user-rights',
      title: '6. Vos Droits (RGPD)',
      content: `Conformément au RGPD, vous disposez des droits suivants :`,
      list: [
        'Droit d\'accès : consulter toutes vos données personnelles',
        'Droit de rectification : corriger vos informations',
        'Droit à l\'effacement : supprimer votre compte et données associées',
        'Droit à la portabilité : exporter vos données dans un format standard',
        'Droit d\'opposition : refuser certains traitements',
        'Droit de limitation : restreindre l\'utilisation de vos données'
      ],
      additional: `Pour exercer ces droits, contactez-nous à privacy@digitalfreedomcaraibe.com. Nous répondrons sous 30 jours maximum.`
    },
    {
      id: 'cookies',
      title: '7. Cookies et Technologies de Suivi',
      content: `TwinForge utilise des cookies et technologies similaires pour :`,
      list: [
        'Cookies essentiels : authentification, sécurité (obligatoires)',
        'Cookies de performance : analyser l\'utilisation pour améliorer l\'app',
        'Cookies de préférence : mémoriser vos paramètres',
        'Pas de cookies publicitaires ou de tracking tiers'
      ],
      additional: `Vous pouvez gérer vos préférences cookies dans les paramètres de votre navigateur.`
    },
    {
      id: 'third-party',
      title: '8. Services Tiers',
      content: `TwinForge intègre les services suivants, chacun avec sa propre politique de confidentialité :`,
      list: [
        'Google Fit : synchronisation données fitness (politique Google)',
        'Apple Health : synchronisation données santé iOS (politique Apple)',
        'Strava : synchronisation activités sportives (politique Strava)',
        'OpenAI : analyses IA (données anonymisées, non stockées)',
        'Supabase : hébergement base de données (conformité RGPD)'
      ]
    },
    {
      id: 'minors',
      title: '9. Protection des Mineurs',
      content: `TwinForge est destiné aux utilisateurs de 16 ans et plus. Si vous avez moins de 16 ans, l\'utilisation nécessite le consentement parental. Si nous découvrons qu\'un mineur de moins de 16 ans a créé un compte sans autorisation, nous le supprimerons immédiatement.`
    },
    {
      id: 'updates',
      title: '10. Modifications de la Politique',
      content: `Cette politique peut être mise à jour pour refléter les évolutions de nos pratiques ou changements réglementaires. Les modifications significatives seront notifiées par email et dans l\'application. La date de dernière mise à jour est indiquée en haut de cette page.`
    },
    {
      id: 'contact',
      title: '11. Contact',
      content: `Pour toute question concernant vos données personnelles ou cette politique :`,
      list: [
        'Email : privacy@digitalfreedomcaraibe.com',
        'Support général : contact@digitalfreedomcaraibe.com',
        'Téléphone : 0596 58 22 98',
        'Adresse : 81 Rue Lamartine, 97200 Fort-de-France, Martinique'
      ],
      additional: `Autorité de contrôle : CNIL (Commission Nationale de l\'Informatique et des Libertés) - www.cnil.fr`
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
              Politique de Confidentialité
            </h1>
            <p className="text-white/70 text-lg">
              Dernière mise à jour : {lastUpdated}
            </p>
          </div>

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
                          className="text-green-400 mt-1 shrink-0"
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

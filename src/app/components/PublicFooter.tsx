import React from 'react';
import { Link } from 'react-router-dom';
import TwinForgeLogo from '../../ui/components/branding/TwinForgeLogo';
import SpatialIcon from '../../ui/icons/SpatialIcon';
import { ICONS } from '../../ui/icons/registry';

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative py-12 px-4 mt-20"
      style={{
        background: `
          linear-gradient(180deg, transparent 0%, rgba(11, 14, 23, 0.8) 50%),
          rgba(11, 14, 23, 0.95)
        `,
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <TwinForgeLogo variant="desktop" isHovered={false} />
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-md mb-4">
              Votre coach fitness IA personnel. Atteignez vos objectifs avec un suivi ultra-complet de votre nutrition, entraînement et évolution corporelle.
            </p>
            <div className="flex items-center gap-4">
              {/* Social Links Placeholders */}
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                aria-label="Facebook"
              >
                <SpatialIcon Icon={ICONS.Facebook} size={18} className="text-white/80" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                aria-label="Twitter"
              >
                <SpatialIcon Icon={ICONS.Twitter} size={18} className="text-white/80" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                aria-label="Instagram"
              >
                <SpatialIcon Icon={ICONS.Instagram} size={18} className="text-white/80" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                aria-label="LinkedIn"
              >
                <SpatialIcon Icon={ICONS.Linkedin} size={18} className="text-white/80" />
              </a>
            </div>
          </div>

          {/* Features Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Fonctionnalités</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <SpatialIcon Icon={ICONS.Activity} size={14} />
                  Suivi d'Activité
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <SpatialIcon Icon={ICONS.Utensils} size={14} />
                  Nutrition Intelligente
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <SpatialIcon Icon={ICONS.Scan} size={14} />
                  Body Scan 3D
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <SpatialIcon Icon={ICONS.Dumbbell} size={14} />
                  Plans d'Entraînement
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <SpatialIcon Icon={ICONS.Clock} size={14} />
                  Jeûne Intermittent
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Légal & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <SpatialIcon Icon={ICONS.Shield} size={14} />
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <SpatialIcon Icon={ICONS.FileText} size={14} />
                  Conditions d'Utilisation
                </Link>
              </li>
              <li>
                <Link
                  to="/legal"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <SpatialIcon Icon={ICONS.Info} size={14} />
                  Mentions Légales
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@digitalfreedomcaraibe.com"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <SpatialIcon Icon={ICONS.Mail} size={14} />
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="tel:+596596582298"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <SpatialIcon Icon={ICONS.Phone} size={14} />
                  0596 58 22 98
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/60 text-sm text-center md:text-left">
            © {currentYear} TwinForge. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <SpatialIcon Icon={ICONS.MapPin} size={14} />
            <span>Made in Martinique 🇲🇶</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

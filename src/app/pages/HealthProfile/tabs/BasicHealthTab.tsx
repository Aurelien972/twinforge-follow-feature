/**
 * Basic Health Tab
 * Collects fundamental health information (blood type, height, weight)
 */

import React from 'react';
import { motion } from 'framer-motion';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import { useBasicHealthForm } from '../hooks/useBasicHealthForm';

export const BasicHealthTab: React.FC = () => {
  const { form, state } = useBasicHealthForm();
  const { register, handleSubmit, errors, isDirty, watchedValues } = form;
  const { saving, completion, calculatedBMI } = state;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Informations de Base</h2>
          <p className="text-white/60 text-sm mt-1">
            Données médicales fondamentales nécessaires pour l'analyse IA
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-white/40">Complétude</div>
            <div className="text-lg font-bold text-white">{completion}%</div>
          </div>
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: `conic-gradient(#10B981 ${completion * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
            }}
          >
            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
              <SpatialIcon Icon={ICONS.CheckCircle} size={20} style={{ color: '#10B981' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <motion.div
        className="glass-card rounded-2xl p-4"
        style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-start gap-3">
          <SpatialIcon Icon={ICONS.Info} size={20} style={{ color: '#10B981' }} />
          <div className="flex-1">
            <p className="text-white/90 text-sm">
              <strong>Pourquoi ces informations ?</strong> Ces données de base permettent à l'IA de calculer votre IMC,
              d'identifier les risques métaboliques et d'adapter les recommandations à votre morphologie.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Blood Type Section */}
        <motion.div
          className="glass-card rounded-2xl p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(239, 68, 68, 0.15))',
                border: '1px solid rgba(239, 68, 68, 0.4)',
              }}
            >
              <SpatialIcon Icon={ICONS.Droplet} size={20} style={{ color: '#EF4444' }} />
            </div>
            <div>
              <h3 className="text-white font-semibold">Groupe sanguin</h3>
              <p className="text-white/50 text-xs">Important pour les urgences et certaines analyses</p>
            </div>
          </div>

          <select
            {...register('bloodType')}
            className="glass-input w-full"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '12px 16px',
              borderRadius: '12px',
              color: 'white',
              fontSize: '15px',
            }}
          >
            <option value="">Sélectionnez votre groupe sanguin</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          {errors.bloodType && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.bloodType.message}
            </p>
          )}
        </motion.div>

        {/* Physical Measurements Section */}
        <motion.div
          className="glass-card rounded-2xl p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.15))',
                border: '1px solid rgba(59, 130, 246, 0.4)',
              }}
            >
              <SpatialIcon Icon={ICONS.Ruler} size={20} style={{ color: '#3B82F6' }} />
            </div>
            <div>
              <h3 className="text-white font-semibold">Mesures physiques</h3>
              <p className="text-white/50 text-xs">Taille et poids pour le calcul de l'IMC</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="height_cm" className="block text-white/90 text-sm font-medium mb-2">
                Taille (cm)
              </label>
              <input
                {...register('height_cm', { valueAsNumber: true })}
                type="number"
                id="height_cm"
                min="120"
                max="230"
                step="1"
                placeholder="175"
                className="glass-input w-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '15px',
                }}
              />
              {errors.height_cm && (
                <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
                  <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
                  {errors.height_cm.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="weight_kg" className="block text-white/90 text-sm font-medium mb-2">
                Poids (kg)
              </label>
              <input
                {...register('weight_kg', { valueAsNumber: true })}
                type="number"
                id="weight_kg"
                min="30"
                max="300"
                step="0.1"
                placeholder="70"
                className="glass-input w-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '15px',
                }}
              />
              {errors.weight_kg && (
                <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
                  <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
                  {errors.weight_kg.message}
                </p>
              )}
            </div>
          </div>

          {/* BMI Display */}
          {calculatedBMI && (
            <motion.div
              className="mt-4 p-4 rounded-xl"
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SpatialIcon Icon={ICONS.Activity} size={18} style={{ color: '#10B981' }} />
                  <span className="text-white/90 text-sm font-medium">IMC calculé automatiquement</span>
                </div>
                <span className="text-white text-lg font-bold">{calculatedBMI}</span>
              </div>
              <p className="text-white/50 text-xs mt-1">
                {calculatedBMI < 18.5 && 'Sous-poids'}
                {calculatedBMI >= 18.5 && calculatedBMI < 25 && 'Poids normal'}
                {calculatedBMI >= 25 && calculatedBMI < 30 && 'Surpoids'}
                {calculatedBMI >= 30 && 'Obésité'}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Save Button */}
        <motion.button
          type="submit"
          disabled={!isDirty || saving}
          className="w-full py-4 rounded-xl font-semibold text-white transition-all"
          style={{
            background: isDirty
              ? 'linear-gradient(135deg, #10B981, #059669)'
              : 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.5)',
            opacity: isDirty ? 1 : 0.5,
            cursor: isDirty && !saving ? 'pointer' : 'not-allowed',
          }}
          whileHover={isDirty && !saving ? { scale: 1.02 } : {}}
          whileTap={isDirty && !saving ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {saving ? (
            <span className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <SpatialIcon Icon={ICONS.Loader} size={20} />
              </motion.div>
              Sauvegarde en cours...
            </span>
          ) : isDirty ? (
            <span className="flex items-center justify-center gap-2">
              <SpatialIcon Icon={ICONS.Save} size={20} />
              Sauvegarder les modifications
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <SpatialIcon Icon={ICONS.CheckCircle} size={20} />
              Aucune modification
            </span>
          )}
        </motion.button>
      </form>
    </div>
  );
};

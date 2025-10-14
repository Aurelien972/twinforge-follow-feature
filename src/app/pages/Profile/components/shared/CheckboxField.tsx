import React from 'react';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';

/**
 * Checkbox Field Component - Shared across profile tabs
 */
export const CheckboxField: React.FC<{
  register: any;
  name: string;
  label: string;
  description: string;
  checked: boolean;
  color?: string;
  icon?: any;
  compact?: boolean;
}> = ({ register, name, label, description, checked, color = '#06B6D4', icon, compact = false }) => {
  return (
    <label className={`flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/8 transition-colors ${
      compact ? 'p-3' : 'p-4'
    }`}>
      <input
        {...register(name)}
        type="checkbox"
        className="sr-only"
      />
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
        checked 
          ? 'border-cyan-400' 
          : 'border-white/30'
      }`}
      style={{
        backgroundColor: checked ? color : 'transparent'
      }}>
        {checked && (
          <SpatialIcon Icon={ICONS.Check} size={12} className="text-white" />
        )}
      </div>
      <div className="flex-1">
        <div className={`text-white font-medium flex items-center gap-2 ${compact ? 'text-sm' : ''}`}>
          {icon && <SpatialIcon Icon={icon} size={16} className="text-white/60" />}
          {label}
        </div>
        {description && !compact && (
          <div className="text-white/60 text-sm">{description}</div>
        )}
      </div>
    </label>
  );
};
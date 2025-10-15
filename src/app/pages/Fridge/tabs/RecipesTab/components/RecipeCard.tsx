import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../../ui/icons/registry';
import { useFeedback } from '../../../../../../hooks/useFeedback';
import type { Recipe } from '../../../../../../domain/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
  isSaved: boolean;
  isNewlyGenerated?: boolean;
  isLoading?: boolean;
  onToggleSaveStatus: () => void;
  onView?: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  index,
  isSaved,
  isNewlyGenerated = false,
  isLoading = false,
  onToggleSaveStatus,
  onView
}) => {
  const { click } = useFeedback();

  // Skeleton loading state
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="h-full"
      >
        <GlassCard className="p-6 h-full flex flex-col">
          {/* Skeleton Image */}
          <div className="relative mb-4 h-48 rounded-lg overflow-hidden">
            <div className="w-full h-full skeleton-glass"></div>
          </div>

          {/* Skeleton Title and Description */}
          <div className="space-y-3 mb-4">
            <div className="h-6 skeleton-glass rounded w-4/5"></div>
            <div className="space-y-2">
              <div className="h-4 skeleton-glass rounded w-full"></div>
              <div className="h-4 skeleton-glass rounded w-3/4"></div>
              <div className="h-4 skeleton-glass rounded w-1/2"></div>
            </div>
          </div>

          {/* Skeleton Metadata */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-4 w-12 skeleton-glass rounded"></div>
            <div className="h-4 w-16 skeleton-glass rounded"></div>
            <div className="h-4 w-8 skeleton-glass rounded"></div>
          </div>

          {/* Skeleton Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="h-6 w-16 skeleton-glass rounded-full"></div>
            <div className="h-6 w-20 skeleton-glass rounded-full"></div>
            <div className="h-6 w-14 skeleton-glass rounded-full"></div>
          </div>

          {/* Skeleton Reasons */}
          <div className="space-y-2 mb-4">
            <div className="h-3 w-32 skeleton-glass rounded"></div>
            <div className="space-y-1">
              <div className="h-3 skeleton-glass rounded w-full"></div>
              <div className="h-3 skeleton-glass rounded w-4/5"></div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    );
  }

  const handleToggleSaveStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    click();
    onToggleSaveStatus();
  };

  const handleCardClick = () => {
    if (onView) {
      click();
      onView(recipe);
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'facile':
        return 'text-green-400';
      case 'moyen':
        return 'text-yellow-400';
      case 'difficile':
        return 'text-red-400';
      default:
        return 'text-white/70';
    }
  };

  const getDifficultyIcon = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'facile':
        return ICONS.Zap;
      case 'moyen':
        return ICONS.Clock;
      case 'difficile':
        return ICONS.Flame;
      default:
        return ICONS.ChefHat;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      <GlassCard 
        className={`p-6 transition-all duration-300 cursor-pointer ${
          isNewlyGenerated 
            ? 'ring-1 ring-yellow-400 bg-yellow-500/10' 
            : isSaved
            ? 'ring-1 ring-green-400/50 bg-green-500/5'
            : 'hover:bg-white/5'
        }`}
        onClick={handleCardClick}
      >
        {/* Badge Nouveau */}
        {isNewlyGenerated && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 left-4 z-10"
          >
            <div 
              className="px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md border"
              style={{
                background: 'color-mix(in srgb, #eab308 20%, rgba(255,255,255,0.1))',
                borderColor: 'color-mix(in srgb, #eab308 40%, transparent)',
                boxShadow: '0 4px 12px rgba(234, 179, 8, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                color: '#fbbf24'
              }}
            >
              NOUVEAU
            </div>
          </motion.div>
        )}

        {/* Bouton Sauvegarder/Supprimer */}
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            onClick={handleToggleSaveStatus}
            className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-md border hover:scale-110"
            style={{
              background: isSaved 
                ? 'color-mix(in srgb, #ef4444 20%, rgba(255,255,255,0.1))'
                : 'color-mix(in srgb, #22c55e 20%, rgba(255,255,255,0.1))',
              borderColor: isSaved
                ? 'color-mix(in srgb, #ef4444 40%, transparent)'
                : 'color-mix(in srgb, #22c55e 40%, transparent)',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <SpatialIcon 
              Icon={isSaved ? ICONS.Trash2 : ICONS.Plus} 
              size={18} 
              className={isSaved ? 'text-red-300' : 'text-green-300'}
            />
          </motion.div>
        </div>

        {/* Image de la Recette */}
        <div className="relative mb-4 h-48 rounded-lg overflow-hidden bg-gradient-to-br from-pink-500/20 to-rose-500/20">
          {isLoading || recipe.isGeneratingImage ? (
            <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center">
              <div className="space-y-3 text-center">
                <div className="w-12 h-12 mx-auto bg-white/10 rounded-full animate-pulse" />
                <div className="space-y-2">
                  <div className="h-3 bg-white/20 rounded animate-pulse" />
                  <div className="h-2 bg-white/15 rounded animate-pulse w-3/4 mx-auto" />
                </div>
              </div>
            </div>
          ) : recipe.imageGenerationError ? (
            <div className="w-full h-full bg-gradient-to-br from-red-500/10 to-red-600/5 backdrop-blur-sm border border-red-400/20 rounded-lg flex flex-col items-center justify-center text-center p-4">
              <SpatialIcon 
                Icon={ICONS.Image} 
                size={32} 
                className="text-red-400 mb-2" 
              />
              <p className="text-xs text-red-300">Image indisponible</p>
            </div>
          ) : recipe.imageUrl ? (
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center">
              <SpatialIcon 
                Icon={ICONS.ChefHat} 
                size={48} 
                className="text-white/40" 
              />
            </div>
          )}
        </div>

        {/* Titre et Description */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white line-clamp-2">
            {recipe.title}
          </h3>
          
          {recipe.description && (
            <p className="text-white/80 text-sm line-clamp-3">
              {recipe.description}
            </p>
          )}
        </div>

        {/* Métadonnées */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {/* Temps de Préparation */}
          {recipe.prepTimeMin && (
            <div 
              className="flex items-center gap-1 px-2 py-1 rounded-full backdrop-blur-md border text-xs"
              style={{
                background: 'color-mix(in srgb, #3b82f6 15%, rgba(255,255,255,0.1))',
                borderColor: 'color-mix(in srgb, #3b82f6 30%, transparent)',
                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)'
              }}
            >
              <SpatialIcon Icon={ICONS.Clock} size={12} className="text-blue-300" />
              <span className="text-blue-200 font-medium">{recipe.prepTimeMin}min</span>
            </div>
          )}

          {/* Temps de Cuisson */}
          {recipe.cookTimeMin && (
            <div 
              className="flex items-center gap-1 px-2 py-1 rounded-full backdrop-blur-md border text-xs"
              style={{
                background: 'color-mix(in srgb, #f59e0b 15%, rgba(255,255,255,0.1))',
                borderColor: 'color-mix(in srgb, #f59e0b 30%, transparent)',
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.2)'
              }}
            >
              <SpatialIcon Icon={ICONS.Flame} size={12} className="text-amber-300" />
              <span className="text-amber-200 font-medium">{recipe.cookTimeMin}min</span>
            </div>
          )}

          {/* Portions */}
          {recipe.servings && (
            <div 
              className="flex items-center gap-1 px-2 py-1 rounded-full backdrop-blur-md border text-xs"
              style={{
                background: 'color-mix(in srgb, #8b5cf6 15%, rgba(255,255,255,0.1))',
                borderColor: 'color-mix(in srgb, #8b5cf6 30%, transparent)',
                boxShadow: '0 2px 8px rgba(139, 92, 246, 0.2)'
              }}
            >
              <SpatialIcon Icon={ICONS.Users} size={12} className="text-violet-300" />
              <span className="text-violet-200 font-medium">{recipe.servings}</span>
            </div>
          )}

          {/* Calories */}
          {recipe.nutritionalInfo?.calories && (
            <div 
              className="flex items-center gap-1 px-2 py-1 rounded-full backdrop-blur-md border text-xs"
              style={{
                background: 'color-mix(in srgb, #ef4444 15%, rgba(255,255,255,0.1))',
                borderColor: 'color-mix(in srgb, #ef4444 30%, transparent)',
                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.2)'
              }}
            >
              <SpatialIcon Icon={ICONS.Flame} size={12} className="text-red-300" />
              <span className="text-red-200 font-medium">{recipe.nutritionalInfo.calories} kcal</span>
            </div>
          )}
        </div>

        {/* Tags Diététiques */}
        {recipe.dietaryTags && recipe.dietaryTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {recipe.dietaryTags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/80"
              >
                {tag}
              </span>
            ))}
            {recipe.dietaryTags.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/60">
                +{recipe.dietaryTags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Raisons de Recommandation */}
        {recipe.reasons && recipe.reasons.length > 0 && (
          <div className="mt-3 space-y-1">
            <p className="text-xs text-white/60 font-medium">Pourquoi cette recette :</p>
            <ul className="text-xs text-white/70 space-y-1">
              {recipe.reasons.slice(0, 2).map((reason, reasonIndex) => (
                <li key={reasonIndex} className="flex items-start gap-1">
                  <span className="text-pink-400 mt-0.5">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Statut de Sauvegarde */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SpatialIcon 
              Icon={isSaved ? ICONS.BookOpen : ICONS.Book} 
              size={14} 
              className={isSaved ? 'text-green-400' : 'text-white/50'} 
            />
            <span className={`text-xs ${isSaved ? 'text-green-400' : 'text-white/50'}`}>
              {isSaved ? 'Dans votre bibliothèque' : 'Non sauvegardée'}
            </span>
          </div>
          
          <span className={`text-xs px-2 py-1 rounded-full ${
            isSaved 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-white/10 text-white/60'
          }`}>
            {isSaved ? 'Sauvegardée' : 'Temporaire'}
          </span>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default React.memo(RecipeCard);
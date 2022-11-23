import { useState, useEffect } from 'react';

import { Badge as BadgeProps, GraphProps } from 'types/BadgesProps';

import { useToast } from 'contexts/Toast';

export function useFavorites() {
  const { toast } = useToast();
  const [badge, setBadge] = useState<BadgeProps>();
  const [graphResult, setGraphResult] = useState<GraphProps>();
  const [isFavorite, setIsFavorite] = useState(false);

  function addFavorite(badge?: BadgeProps) {
    const favorites = JSON.parse(
      localStorage.getItem('@nv99badges:favorites') || '[]',
    );

    if (
      favorites.find((favorite: BadgeProps) => favorite.code === badge?.code)
    ) {
      toast.error('Badge já está nos favoritos', { id: 'toast' });
      return;
    }

    favorites.push(badge);
    localStorage.setItem('@nv99badges:favorites', JSON.stringify(favorites));
    setIsFavorite(true);
    toast.success('Badge adicionada aos favoritos', { id: 'toast' });
  }

  function removeFavorite(badge?: BadgeProps) {
    const favorites = JSON.parse(
      localStorage.getItem('@nv99badges:favorites') || '[]',
    );

    const newFavorites = favorites.filter(
      (favorite: BadgeProps) => favorite.code !== badge?.code,
    );

    localStorage.setItem('@nv99badges:favorites', JSON.stringify(newFavorites));
    setIsFavorite(false);
    toast.success('Badge removida dos favoritos', { id: 'toast' });
  }

  useEffect(() => {
    const favorites = JSON.parse(
      localStorage.getItem('@nv99badges:favorites') || '[]',
    );

    if (
      favorites.find((favorite: BadgeProps) => favorite.code === badge?.code)
    ) {
      setIsFavorite(true);
    }
  }, [badge]);

  return {
    addFavorite,
    removeFavorite,
    isFavorite,
    badge,
    setBadge,
    graphResult,
    setGraphResult,
  };
}

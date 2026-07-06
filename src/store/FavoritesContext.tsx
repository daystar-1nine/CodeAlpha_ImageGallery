import { createContext, useCallback, useEffect, useState } from "react";
import { ImageDetails } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface FavoritesContextType {
  favorites: ImageDetails[];
  addFavorite: (image: ImageDetails) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (image: ImageDetails) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [storedFavorites, setStoredFavorites] = useLocalStorage<ImageDetails[]>("codealpha-gallery-favorites", []);
  
  // Local state for immediate UI updates, synced with localStorage
  const [favorites, setFavorites] = useState<ImageDetails[]>(storedFavorites);

  // Sync state when storedFavorites changes (e.g. from other tabs)
  useEffect(() => {
    setFavorites(storedFavorites);
  }, [storedFavorites]);

  const addFavorite = useCallback((image: ImageDetails) => {
    setStoredFavorites((prev) => {
      if (prev.some((fav) => fav.id === image.id)) return prev;
      return [...prev, image];
    });
  }, [setStoredFavorites]);

  const removeFavorite = useCallback((id: string) => {
    setStoredFavorites((prev) => prev.filter((fav) => fav.id !== id));
  }, [setStoredFavorites]);

  const isFavorite = useCallback((id: string) => {
    return favorites.some((fav) => fav.id === id);
  }, [favorites]);

  const toggleFavorite = useCallback((image: ImageDetails) => {
    if (isFavorite(image.id)) {
      removeFavorite(image.id);
    } else {
      addFavorite(image);
    }
  }, [isFavorite, removeFavorite, addFavorite]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

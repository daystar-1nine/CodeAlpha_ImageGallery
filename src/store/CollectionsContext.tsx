import { createContext, useCallback, useEffect, useState } from "react";
import { Collection, ImageDetails } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface CollectionsContextType {
  collections: Collection[];
  createCollection: (name: string) => Collection;
  deleteCollection: (id: string) => void;
  updateCollection: (id: string, name: string) => void;
  addImageToCollection: (collectionId: string, image: ImageDetails) => void;
  removeImageFromCollection: (collectionId: string, imageId: string) => void;
  isImageInCollection: (collectionId: string, imageId: string) => boolean;
}

export const CollectionsContext = createContext<CollectionsContextType | undefined>(undefined);

export function CollectionsProvider({ children }: { children: React.ReactNode }) {
  const [storedCollections, setStoredCollections] = useLocalStorage<Collection[]>("codealpha-gallery-collections", []);
  const [collections, setCollections] = useState<Collection[]>(storedCollections);

  useEffect(() => {
    setCollections(storedCollections);
  }, [storedCollections]);

  const createCollection = useCallback((name: string) => {
    const newCollection: Collection = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
      name,
      imageIds: [],
      createdAt: new Date().toISOString(),
    };
    
    setStoredCollections((prev) => [...prev, newCollection]);
    return newCollection;
  }, [setStoredCollections]);

  const deleteCollection = useCallback((id: string) => {
    setStoredCollections((prev) => prev.filter((c) => c.id !== id));
  }, [setStoredCollections]);

  const updateCollection = useCallback((id: string, name: string) => {
    setStoredCollections((prev) => 
      prev.map((c) => (c.id === id ? { ...c, name } : c))
    );
  }, [setStoredCollections]);

  const addImageToCollection = useCallback((collectionId: string, image: ImageDetails) => {
    setStoredCollections((prev) => 
      prev.map((c) => {
        if (c.id === collectionId) {
          if (c.imageIds.includes(image.id)) return c;
          return {
            ...c,
            imageIds: [...c.imageIds, image.id],
            coverImage: c.coverImage || image.thumb,
          };
        }
        return c;
      })
    );
  }, [setStoredCollections]);

  const removeImageFromCollection = useCallback((collectionId: string, imageId: string) => {
    setStoredCollections((prev) => 
      prev.map((c) => {
        if (c.id === collectionId) {
          const newImageIds = c.imageIds.filter((id) => id !== imageId);
          return {
            ...c,
            imageIds: newImageIds,
            // Simple logic: if cover image was removed, just remove it or we could find a new one
            coverImage: newImageIds.length > 0 ? c.coverImage : undefined,
          };
        }
        return c;
      })
    );
  }, [setStoredCollections]);

  const isImageInCollection = useCallback((collectionId: string, imageId: string) => {
    const collection = collections.find((c) => c.id === collectionId);
    return collection?.imageIds.includes(imageId) || false;
  }, [collections]);

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        createCollection,
        deleteCollection,
        updateCollection,
        addImageToCollection,
        removeImageFromCollection,
        isImageInCollection,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
}

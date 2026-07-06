import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { MasonryGrid } from "@/components/gallery/MasonryGrid";
import { Lightbox } from "@/components/gallery/Lightbox";
import { useCollections } from "@/hooks/useCollections";
import { useFavorites } from "@/hooks/useFavorites";
import { ImageDetails } from "@/types";
import { LayoutGrid, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Collections() {
  const { collections, deleteCollection } = useCollections();
  const { favorites } = useFavorites();
  
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const selectedCollection = collections.find(c => c.id === selectedCollectionId);

  // Get the actual image objects for the selected collection from favorites
  // (In a real app, we might fetch these by ID from the API if not in favorites)
  const collectionImages = selectedCollection 
    ? favorites.filter(img => selectedCollection.imageIds.includes(img.id))
    : [];

  const handleImageClick = (image: ImageDetails) => {
    const index = collectionImages.findIndex(img => img.id === image.id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const handleDeleteCollection = () => {
    if (selectedCollection) {
      if (confirm("Are you sure you want to delete this collection?")) {
        deleteCollection(selectedCollection.id);
        setSelectedCollectionId(null);
      }
    }
  };

  if (selectedCollectionId && selectedCollection) {
    return (
      <PageWrapper className="container mx-auto px-4 py-8 flex flex-col min-h-[80vh]">
        <div className="flex items-center justify-between mb-8 pb-4 border-b">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSelectedCollectionId(null)} className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{selectedCollection.name}</h1>
              <p className="text-sm text-muted-foreground">{selectedCollection.imageIds.length} images</p>
            </div>
          </div>
          <Button variant="destructive" size="icon" onClick={handleDeleteCollection} className="rounded-full">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {collectionImages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center text-muted-foreground">
            <p>This collection is empty.</p>
          </div>
        ) : (
          <MasonryGrid
            images={collectionImages}
            isLoading={false}
            hasMore={false}
            onImageClick={handleImageClick}
          />
        )}

        {lightboxIndex !== null && (
          <Lightbox
            images={collectionImages}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="container mx-auto px-4 py-8 flex flex-col min-h-[80vh]">
      <div className="mb-10 flex flex-col items-center text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Collections</h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Organize your favorite images into beautiful collections.
        </p>
      </div>

      {collections.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center">
            <LayoutGrid className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">No collections yet</h2>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Save images to collections to organize them.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collections.map(collection => (
            <div 
              key={collection.id}
              className="group relative rounded-2xl border bg-card overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:border-primary/50"
              onClick={() => setSelectedCollectionId(collection.id)}
            >
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                {collection.coverImage ? (
                  <img src={collection.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={collection.name} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <LayoutGrid className="h-10 w-10 text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-semibold text-lg truncate">{collection.name}</h3>
                  <p className="text-xs text-white/80">{collection.imageIds.length} items</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}

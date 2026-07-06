import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { MasonryGrid } from "@/components/gallery/MasonryGrid";
import { Lightbox } from "@/components/gallery/Lightbox";
import { CollectionModal } from "@/components/gallery/CollectionModal";
import { useFavorites } from "@/hooks/useFavorites";
import { ImageDetails } from "@/types";
import { Heart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

export default function Favorites() {
  const { favorites } = useFavorites();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [collectionImage, setCollectionImage] = useState<ImageDetails | null>(null);

  const handleImageClick = (image: ImageDetails) => {
    const index = favorites.findIndex(img => img.id === image.id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  return (
    <PageWrapper className="container mx-auto px-4 py-8 flex flex-col min-h-[80vh]">
      <div className="mb-8 flex flex-col items-center text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Your Favorites</h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          A personal collection of the images you love.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">No favorites yet</h2>
            <p className="text-muted-foreground max-w-sm mx-auto">
              You haven't saved any images. Explore the gallery and click the heart icon to save your favorites here.
            </p>
          </div>
          <Link to="/gallery" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8 mt-4")}>
            Explore Gallery
          </Link>
        </div>
      ) : (
        <div className="flex-1">
          <MasonryGrid
            images={favorites}
            isLoading={false}
            hasMore={false}
            onImageClick={handleImageClick}
            onAddToCollection={setCollectionImage}
          />
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          images={favorites}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* Collection Modal */}
      <CollectionModal 
        image={collectionImage} 
        onClose={() => setCollectionImage(null)} 
      />
    </PageWrapper>
  );
}

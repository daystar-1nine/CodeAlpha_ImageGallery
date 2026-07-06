import { ImageDetails } from "@/types";
import { ImageCard } from "./ImageCard";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MasonryGridProps {
  images: ImageDetails[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onImageClick: (image: ImageDetails) => void;
  onAddToCollection?: (image: ImageDetails) => void;
}

export function MasonryGrid({
  images,
  isLoading = false,
  hasMore = false,
  onLoadMore,
  onImageClick,
  onAddToCollection
}: MasonryGridProps) {
  
  if (!isLoading && images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-xl font-medium text-muted-foreground">No images found</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <motion.div 
        layout
        className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
      >
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onClick={onImageClick}
            onAddToCollection={onAddToCollection}
          />
        ))}
      </motion.div>
      
      {/* Load More Button instead of Infinite Scroll */}
      <div className="py-12 flex flex-col items-center justify-center w-full min-h-[100px]">
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-6 py-3 rounded-full border border-border backdrop-blur-sm shadow-sm">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="text-sm font-medium">Loading more images...</span>
          </div>
        ) : hasMore ? (
          <Button 
            variant="outline" 
            size="lg"
            onClick={onLoadMore}
            className="rounded-full px-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 border-border/50 bg-background/50 backdrop-blur-sm font-semibold"
          >
            Load More
          </Button>
        ) : images.length > 0 ? (
          <p className="text-muted-foreground text-sm font-medium">You've reached the end of the gallery.</p>
        ) : null}
      </div>
    </div>
  );
}

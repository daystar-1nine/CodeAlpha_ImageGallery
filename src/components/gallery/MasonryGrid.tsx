import { ImageDetails } from "@/types";
import { ImageCard } from "./ImageCard";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

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
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "400px 0px", // Trigger earlier
  });

  useEffect(() => {
    if (inView && hasMore && !isLoading && onLoadMore) {
      onLoadMore();
    }
  }, [inView, hasMore, isLoading, onLoadMore]);

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
      
      {/* Loading Indicator for Infinite Scroll */}
      <div ref={ref} className="py-8 flex justify-center w-full min-h-[100px]">
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-4 py-2 rounded-full border border-border backdrop-blur-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">Loading more images...</span>
          </div>
        )}
      </div>
    </div>
  );
}

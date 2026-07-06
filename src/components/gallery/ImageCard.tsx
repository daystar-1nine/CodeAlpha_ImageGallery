import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Heart, Plus } from "lucide-react";
import { ImageDetails } from "@/types";
import { useFavorites } from "@/hooks/useFavorites";
import { BlurImage } from "./BlurImage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  image: ImageDetails;
  onClick: (image: ImageDetails) => void;
  onAddToCollection?: (image: ImageDetails) => void;
}

export function ImageCard({ image, onClick, onAddToCollection }: ImageCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isHovered, setIsHovered] = useState(false);
  const favorite = isFavorite(image.id);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would trigger a download. Here we just open the image in a new tab.
    window.open(image.url, "_blank");
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(image);
  };

  const handleAddToCollection = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCollection) onAddToCollection(image);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl cursor-zoom-in border border-border/50 shadow-sm hover:shadow-xl transition-shadow duration-500 bg-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(image)}
    >
      {/* Aspect Ratio Preservation via padding trick or just letting Masonry handle it */}
      <BlurImage
        src={image.thumb}
        alt={image.alt_description || "Gallery image"}
        color={image.color}
        className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
        loading="lazy"
      />

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/30 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Top Actions */}
      <div className={cn(
        "absolute top-3 right-3 flex items-center gap-2 transition-opacity duration-300",
        isHovered ? "opacity-100" : "opacity-0"
      )}>
        <Button
          variant="secondary"
          size="icon"
          className={cn("h-9 w-9 rounded-full shadow-md hover:scale-105 transition-transform", favorite && "text-red-500")}
          onClick={handleFavorite}
        >
          <Heart className={cn("h-4 w-4", favorite && "fill-current")} />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-9 w-9 rounded-full shadow-md hover:scale-105 transition-transform"
          onClick={handleAddToCollection}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Bottom Info */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between transition-opacity duration-300",
        isHovered ? "opacity-100" : "opacity-0"
      )}>
        <div className="flex items-center gap-3 overflow-hidden">
          {image.author.avatar && (
            <img 
              src={image.author.avatar} 
              alt={image.author.name}
              className="h-8 w-8 rounded-full border-2 border-white/20 object-cover" 
            />
          )}
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium text-white truncate">{image.author.name}</span>
          </div>
        </div>
        
        <Button
          variant="secondary"
          size="icon"
          className="h-9 w-9 rounded-full shadow-md shrink-0 hover:scale-105 transition-transform"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}

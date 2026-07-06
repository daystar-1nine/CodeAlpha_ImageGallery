import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Heart, Plus, Maximize2 } from "lucide-react";
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

export const ImageCard = memo(function ImageCard({ image, onClick, onAddToCollection }: ImageCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isHovered, setIsHovered] = useState(false);
  const favorite = isFavorite(image.id);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(image);
  };

  // Stagger variants for the action buttons
  const buttonContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const buttonItem = {
    hidden: { opacity: 0, y: -10, scale: 0.8 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 20 } as any }
  };

  const bottomInfo = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25, delay: 0.15 } as any }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 } as any}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
      whileTap={{ scale: 0.98 }}
      className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl cursor-zoom-in border border-border/20 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 bg-card/50 backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(image)}
    >
      <div className="relative overflow-hidden w-full h-full">
        <BlurImage
          src={image.thumb}
          alt={image.alt_description || "Gallery image"}
          color={image.color}
          className="w-full h-auto transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          style={{ aspectRatio: `${image.width} / ${image.height}` }}
          loading="lazy"
        />

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none backdrop-blur-[2px]"
            />
          )}
        </AnimatePresence>

        {/* Top Actions Container */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              variants={buttonContainer}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="absolute top-3 right-3 flex items-center gap-2"
            >
              <motion.div variants={buttonItem}>
                <Button
                  variant="secondary"
                  size="icon"
                  aria-label="Preview image"
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-lg transition-all"
                  onClick={handlePreview}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div variants={buttonItem}>
                <Button
                  variant="secondary"
                  size="icon"
                  aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                  className={cn(
                    "h-10 w-10 rounded-full backdrop-blur-md border shadow-lg transition-all",
                    favorite 
                      ? "bg-red-500/20 border-red-500/50 text-red-500 hover:bg-red-500/30" 
                      : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                  )}
                  onClick={handleFavorite}
                >
                  <Heart className={cn("h-4 w-4", favorite && "fill-current")} />
                </Button>
              </motion.div>
              <motion.div variants={buttonItem}>
                <Button
                  variant="secondary"
                  size="icon"
                  aria-label="Add to collection"
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-lg transition-all"
                  onClick={handleAddToCollection}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Info */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              variants={bottomInfo}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                {image.author.avatar && (
                  <img 
                    src={image.author.avatar} 
                    alt={image.author.name}
                    className="h-9 w-9 rounded-full border-2 border-white/30 object-cover shadow-md" 
                  />
                )}
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-semibold text-white truncate drop-shadow-md">{image.author.name}</span>
                </div>
              </div>
              
              <Button
                variant="secondary"
                size="icon"
                aria-label="Download image"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-lg transition-all hover:-translate-y-1"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

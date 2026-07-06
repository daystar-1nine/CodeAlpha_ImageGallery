import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, 
  Download, Heart, Info, ExternalLink 
} from "lucide-react";
import { ImageDetails } from "@/types";
import { useKeyPress } from "@/hooks/useKeyPress";
import { Button, buttonVariants } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { BlurImage } from "./BlurImage";
import { cn } from "@/lib/utils";

interface LightboxProps {
  images: ImageDetails[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const currentImage = images[currentIndex];
  const favorite = currentImage ? isFavorite(currentImage.id) : false;

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsZoomed(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsZoomed(false);
    }
  };

  // Keyboard controls
  useKeyPress("ArrowRight", handleNext);
  useKeyPress("ArrowLeft", handlePrev);
  useKeyPress("Escape", onClose);
  useKeyPress("i", () => setShowInfo(prev => !prev));
  
  if (!currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
      >
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-50 bg-gradient-to-b from-black/50 to-transparent">
          <div className="text-white/70 text-sm font-medium tracking-widest uppercase">
            {currentIndex + 1} / {images.length}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={() => setIsZoomed(!isZoomed)}>
              {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={() => setShowInfo(!showInfo)}>
              <Info className={cn("h-5 w-5", showInfo && "fill-white")} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Previous Button */}
        {currentIndex > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-black/20 text-white hover:bg-white/20 backdrop-blur-md"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}

        {/* Next Button */}
        {currentIndex < images.length - 1 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-black/20 text-white hover:bg-white/20 backdrop-blur-md"
            onClick={handleNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}

        {/* Main Image */}
        <div 
          className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <motion.div
            key={currentImage.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn("relative transition-all duration-300", isZoomed ? "cursor-zoom-out" : "cursor-zoom-in")}
          >
            <BlurImage
              src={currentImage.url}
              alt={currentImage.alt_description || "Fullscreen image"}
              color={currentImage.color}
              className={cn(
                "max-h-[85vh] max-w-full object-contain shadow-2xl rounded-sm",
                isZoomed ? "object-cover" : "object-contain"
              )}
            />
          </motion.div>
        </div>

        {/* Info Panel */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-4 top-20 bottom-4 w-80 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl overflow-y-auto z-50 flex flex-col gap-6"
            >
              {/* Author */}
              <div className="flex items-center gap-4">
                {currentImage.author.avatar && (
                  <img src={currentImage.author.avatar} alt="Author" className="h-12 w-12 rounded-full border border-border" />
                )}
                <div>
                  <h3 className="font-semibold text-foreground">{currentImage.author.name}</h3>
                  <a href={currentImage.author.portfolio_url || "#"} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
                    @{currentImage.author.username} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button className="flex-1 rounded-xl" variant={favorite ? "default" : "secondary"} onClick={() => toggleFavorite(currentImage)}>
                  <Heart className={cn("mr-2 h-4 w-4", favorite && "fill-current")} />
                  {favorite ? "Saved" : "Save"}
                </Button>
                <a href={currentImage.url} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "default" }), "flex-1 rounded-xl flex items-center justify-center")}>
                  <Download className="mr-2 h-4 w-4" /> Download
                </a>
              </div>

              {/* Details */}
              <div className="space-y-4 text-sm">
                {currentImage.description && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Description</h4>
                    <p className="text-muted-foreground leading-relaxed">{currentImage.description}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-muted-foreground mb-1">Resolution</h4>
                    <p className="font-medium">{currentImage.width} × {currentImage.height}</p>
                  </div>
                  <div>
                    <h4 className="text-muted-foreground mb-1">Likes</h4>
                    <p className="font-medium">{currentImage.likes.toLocaleString()}</p>
                  </div>
                  <div>
                    <h4 className="text-muted-foreground mb-1">Published</h4>
                    <p className="font-medium">{new Date(currentImage.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Tags */}
                {currentImage.tags && currentImage.tags.length > 0 && (
                  <div>
                    <h4 className="text-muted-foreground mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentImage.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </AnimatePresence>
  );
}

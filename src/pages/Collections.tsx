import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { MasonryGrid } from "@/components/gallery/MasonryGrid";
import { Lightbox } from "@/components/gallery/Lightbox";
import { useCollections } from "@/hooks/useCollections";
import { useFavorites } from "@/hooks/useFavorites";
import { ImageDetails } from "@/types";
import { LayoutGrid, ArrowLeft, Trash2, FolderHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Collections() {
  const { collections, deleteCollection } = useCollections();
  const { favorites } = useFavorites();
  
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const selectedCollection = collections.find(c => c.id === selectedCollectionId);

  // Get the actual image objects for the selected collection from favorites
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
      <PageWrapper className="container mx-auto px-4 py-12 flex flex-col min-h-[85vh]">
        {/* Centered Premium Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center mb-16 pb-8 border-b border-border/40"
        >
          {/* Background subtle glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[600px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="w-full flex items-center justify-between z-10">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSelectedCollectionId(null)} 
              className="rounded-full hover:bg-secondary transition-all hover:-translate-x-1"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex flex-col items-center text-center">
              <h1 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
                {selectedCollection.name}
              </h1>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                <FolderHeart className="h-4 w-4 text-primary" />
                <span>{selectedCollection.imageIds.length} items</span>
              </div>
            </div>

            <Button 
              variant="destructive" 
              size="icon" 
              onClick={handleDeleteCollection} 
              className="rounded-full hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {collectionImages.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative h-24 w-24 rounded-full bg-secondary border border-border/50 flex items-center justify-center shadow-2xl">
                <LayoutGrid className="h-10 w-10 text-muted-foreground/50" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Empty Collection</h2>
              <p className="text-muted-foreground">
                You haven't added any images to this collection yet. Browse the gallery and click the plus icon to add some.
              </p>
            </div>
            <Button variant="default" className="rounded-full px-8 shadow-lg hover:shadow-primary/25 transition-all mt-4" onClick={() => setSelectedCollectionId(null)}>
              Browse Gallery
            </Button>
          </motion.div>
        ) : (
          <div className="flex-1">
            <MasonryGrid
              images={collectionImages}
              isLoading={false}
              hasMore={false}
              onImageClick={handleImageClick}
            />
          </div>
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
    <PageWrapper className="container mx-auto px-4 py-12 flex flex-col min-h-[85vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 flex flex-col items-center text-center space-y-6"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-3 py-1 text-sm font-medium text-muted-foreground backdrop-blur-sm mb-2">
          <FolderHeart className="h-4 w-4" />
          <span>Your Library</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
          Collections
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg md:text-xl leading-relaxed">
          Organize your favorite high-resolution photography into beautiful, curated collections.
        </p>
      </motion.div>

      {collections.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
            <div className="relative h-24 w-24 rounded-full bg-secondary border border-border/50 flex items-center justify-center shadow-xl">
              <LayoutGrid className="h-10 w-10 text-muted-foreground/50" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">No collections yet</h2>
            <p className="text-muted-foreground">
              Create collections to organize images by project, mood, or theme.
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {collections.map(collection => (
            <motion.div 
              key={collection.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative rounded-3xl border border-border/40 bg-card overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col"
              onClick={() => setSelectedCollectionId(collection.id)}
            >
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                {collection.coverImage ? (
                  <img 
                    src={collection.coverImage} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" 
                    alt={collection.name} 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary/30">
                    <LayoutGrid className="h-10 w-10 text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-5 left-5 right-5 text-white transform transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="font-display font-bold text-xl truncate mb-1 drop-shadow-md">{collection.name}</h3>
                  <p className="text-sm text-white/80 font-medium flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                    {collection.imageIds.length} items
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </PageWrapper>
  );
}

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { MasonryGrid } from "@/components/gallery/MasonryGrid";
import { Lightbox } from "@/components/gallery/Lightbox";
import { CategoryChips } from "@/components/gallery/CategoryChips";
import { CollectionModal } from "@/components/gallery/CollectionModal";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { fetchImages } from "@/services/api";
import { ImageDetails } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [images, setImages] = useState<ImageDetails[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [category, setCategory] = useState("All");
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Collection Modal state
  const [collectionImage, setCollectionImage] = useState<ImageDetails | null>(null);

  const activeQuery = category !== "All" ? `${category} ${debouncedSearch}`.trim() : debouncedSearch;

  const loadImages = useCallback(async (pageNum: number, query: string) => {
    setIsLoading(true);
    try {
      const response = await fetchImages(pageNum, 20, query);
      setImages(prev => pageNum === 1 ? response.images : [...prev, ...response.images]);
      setHasMore(pageNum < response.totalPages);
    } catch (error) {
      console.error("Error loading images:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Reset and reload when query changes
  useEffect(() => {
    setPage(1);
    setImages([]);
    loadImages(1, activeQuery);
  }, [activeQuery, loadImages]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadImages(nextPage, activeQuery);
    }
  };

  const handleImageClick = (image: ImageDetails) => {
    const index = images.findIndex(img => img.id === image.id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchParams({});
  };

  return (
    <PageWrapper className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
      <div className="mb-8 flex flex-col items-center text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Explore</h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Discover a curated collection of stunning high-resolution photography.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto w-full mb-8 relative">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for high-resolution images..."
            className="w-full pl-12 pr-12 h-14 rounded-full bg-secondary/30 border-border/50 focus-visible:ring-1 focus-visible:ring-primary shadow-sm text-base backdrop-blur-md transition-all"
            autoFocus={initialSearch !== ""}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full text-muted-foreground hover:text-foreground"
              onClick={clearSearch}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Category Filters */}
      <div className="mx-auto max-w-5xl w-full">
        <CategoryChips selected={category} onSelect={setCategory} />
      </div>

      {/* Gallery Grid */}
      <div className="flex-1 mt-4">
        <MasonryGrid
          images={images}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          onImageClick={handleImageClick}
          onAddToCollection={setCollectionImage}
        />
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
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

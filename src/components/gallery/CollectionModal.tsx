import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageDetails } from "@/types";
import { useCollections } from "@/hooks/useCollections";
import { Plus, Check, FolderPlus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface CollectionModalProps {
  image: ImageDetails | null;
  onClose: () => void;
}

export function CollectionModal({ image, onClose }: CollectionModalProps) {
  const { collections, createCollection, addImageToCollection, isImageInCollection } = useCollections();
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  if (!image) return null;

  const handleCreateAndAdd = () => {
    if (newCollectionName.trim()) {
      const newCol = createCollection(newCollectionName.trim());
      addImageToCollection(newCol.id, image);
      setNewCollectionName("");
      setIsCreating(false);
    }
  };

  const handleToggleCollection = (collectionId: string) => {
    // If it's already in the collection, maybe we shouldn't remove it from this UI, or maybe we do.
    // For simplicity, let's just add it if it's not there.
    if (!isImageInCollection(collectionId, image.id)) {
      addImageToCollection(collectionId, image);
    }
  };

  return (
    <Dialog open={!!image} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Save to Collection</DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center gap-4 p-4 border rounded-xl bg-muted/50 mb-4">
          <img src={image.thumb} alt={image.alt_description || ""} className="h-16 w-16 object-cover rounded-md shadow-sm" />
          <div className="overflow-hidden">
            <p className="font-medium truncate">Save image by {image.author.name}</p>
            <p className="text-xs text-muted-foreground truncate">{image.description || "No description"}</p>
          </div>
        </div>

        <ScrollArea className="max-h-[200px] pr-4">
          <div className="space-y-2">
            {collections.map(collection => {
              const inCollection = isImageInCollection(collection.id, image.id);
              return (
                <div 
                  key={collection.id} 
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all hover:border-primary",
                    inCollection ? "bg-primary/5 border-primary/20" : "bg-card"
                  )}
                  onClick={() => handleToggleCollection(collection.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-secondary flex items-center justify-center overflow-hidden">
                      {collection.coverImage ? (
                         <img src={collection.coverImage} className="w-full h-full object-cover" alt="" />
                      ) : (
                         <FolderPlus className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{collection.name}</p>
                      <p className="text-xs text-muted-foreground">{collection.imageIds.length} items</p>
                    </div>
                  </div>
                  {inCollection ? (
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <Check className="h-3 w-3" />
                    </div>
                  ) : (
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              );
            })}
            
            {collections.length === 0 && !isCreating && (
              <p className="text-sm text-center text-muted-foreground py-4">No collections yet.</p>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col sm:flex-col gap-2 mt-4 sm:space-x-0">
          {isCreating ? (
            <div className="flex w-full items-center gap-2">
              <Input
                placeholder="Collection name"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                autoFocus
                className="rounded-xl"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreateAndAdd();
                  if (e.key === "Escape") setIsCreating(false);
                }}
              />
              <Button onClick={handleCreateAndAdd} className="rounded-xl shrink-0" disabled={!newCollectionName.trim()}>
                Create
              </Button>
            </div>
          ) : (
            <Button variant="outline" className="w-full rounded-xl border-dashed" onClick={() => setIsCreating(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Collection
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

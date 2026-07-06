import { useContext } from "react";
import { CollectionsContext } from "@/store/CollectionsContext";

export function useCollections() {
  const context = useContext(CollectionsContext);
  if (context === undefined) {
    throw new Error("useCollections must be used within a CollectionsProvider");
  }
  return context;
}

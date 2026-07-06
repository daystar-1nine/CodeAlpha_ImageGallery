import { FavoritesProvider } from "./FavoritesContext";
import { CollectionsProvider } from "./CollectionsContext";

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <CollectionsProvider>
        {children}
      </CollectionsProvider>
    </FavoritesProvider>
  );
}

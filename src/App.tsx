import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./components/theme-provider";
import { AppStoreProvider } from "./store";
import { MainLayout } from "./components/layout/MainLayout";
import { Loader2 } from "lucide-react";

const Home = lazy(() => import("./pages/Home"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Collections = lazy(() => import("./pages/Collections"));
const NotFound = lazy(() => import("./pages/NotFound"));

function LoadingScreen() {
  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

function App() {
  const location = useLocation();

  return (
    <ThemeProvider defaultTheme="system" storageKey="codealpha-gallery-theme">
      <AppStoreProvider>
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingScreen />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="collections" element={<Collections />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </AnimatePresence>
      </AppStoreProvider>
    </ThemeProvider>
  );
}

export default App;

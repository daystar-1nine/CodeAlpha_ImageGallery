import { buttonVariants } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ArrowRight, Image as ImageIcon, Heart, Search, LayoutGrid } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <PageWrapper className="relative min-h-screen flex flex-col items-center overflow-hidden pt-20 pb-16 px-4 md:pt-28">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[128px] opacity-70 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[128px] opacity-70 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mt-8 md:mt-12">
        {/* Left content area */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(var(--primary),0.1)]"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            CodeAlpha Premium Gallery
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl mb-6 text-foreground leading-[1.1]"
          >
            Explore <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-purple-500">
              the extraordinary
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl text-lg text-muted-foreground mb-10 md:text-xl leading-relaxed"
          >
            An advanced responsive image gallery engineered with elegant UI, fluid animations, and a modern frontend architecture. Designed to inspire.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link to="/gallery" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto rounded-full px-8 h-14 text-base shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:shadow-[0_0_40px_rgba(var(--primary),0.5)] hover:-translate-y-1 transition-all duration-300")}>
              Explore Gallery
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/collections" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full sm:w-auto rounded-full px-8 h-14 text-base backdrop-blur-md bg-background/30 border-border/50 hover:bg-muted/50 transition-all duration-300")}>
              View Collections
            </Link>
          </motion.div>
        </div>

        {/* Right visual showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full max-w-[600px] mx-auto hidden md:block perspective-1000"
        >
          {/* Main big image */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-20 bg-card"
          >
            <img src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=800&q=80" alt="Showcase" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <p className="text-white font-medium text-lg">Mountain Sunset</p>
                <p className="text-white/70 text-sm">NEOM</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-lg">
                <Heart className="h-5 w-5 fill-white" />
              </div>
            </div>
          </motion.div>

          {/* Top floating card */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute -top-4 right-4 w-48 h-32 rounded-xl overflow-hidden shadow-2xl border border-white/10 z-30"
          >
            <img src="https://images.unsplash.com/photo-1707343843437-caacff5cfa74?auto=format&fit=crop&w=400&q=80" alt="Showcase 2" className="w-full h-full object-cover" />
          </motion.div>

          {/* Bottom left floating card */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-8 left-4 w-40 h-40 rounded-xl overflow-hidden shadow-2xl border border-white/10 z-30 flex flex-col items-center justify-center bg-card/80 backdrop-blur-xl"
          >
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <p className="font-medium text-sm">Smart Search</p>
            <p className="text-xs text-muted-foreground">Find any image instantly</p>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 blur-2xl -z-10" />
          <div className="absolute bottom-1/4 -left-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/30 to-primary/30 blur-2xl -z-10" />
        </motion.div>
      </div>
      
      {/* Stats Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 w-full max-w-5xl border-y border-border/40 py-12 bg-muted/10 backdrop-blur-sm rounded-3xl"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
            <ImageIcon className="h-6 w-6 text-primary" />
          </div>
          <span className="text-4xl font-bold text-foreground tracking-tighter">10k+</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">High-Res Photos</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
            <LayoutGrid className="h-6 w-6 text-primary" />
          </div>
          <span className="text-4xl font-bold text-foreground tracking-tighter">12</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Unique Categories</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <span className="text-4xl font-bold text-foreground tracking-tighter">100%</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Locally Saved</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
            <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
          </div>
          <span className="text-4xl font-bold text-foreground tracking-tighter">60fps</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Fluid Animations</span>
        </div>
      </motion.div>
    </PageWrapper>
  );
}

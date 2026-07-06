import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import Strands from "@/components/ui/Strands";
import GooeyNav from "@/components/ui/GooeyNav";

const wordAnim = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)", transform: "rotateX(-20deg)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    transform: "rotateX(0deg)", 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } as any
  }
};

const Word = ({ children }: { children: React.ReactNode }) => (
  <motion.span variants={wordAnim} className="inline-block origin-bottom">{children}</motion.span>
);

export default function Home() {
  return (
    <PageWrapper className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Animated Strands */}
      <div className="absolute inset-0 z-0 bg-background transition-colors duration-500">
        <div className="opacity-100 h-full w-full dark:opacity-80 opacity-60">
          <Strands 
            colors={["#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6"]}
            count={6}
            speed={0.4}
            amplitude={1.2}
            waviness={1.0}
            thickness={1.5}
            glow={2.0}
            taper={4}
            spread={1.5}
            intensity={0.6}
            opacity={0.8}
            scale={1.2}
          />
        </div>
        {/* Subtle radial gradient overlay to match image vignette */}
        <div 
          className="absolute inset-0 pointer-events-none transition-colors duration-500"
          style={{ background: "radial-gradient(circle at center, transparent 0%, hsl(var(--background)) 100%)" }}
        />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 -mt-20">
        
        {/* Badge */}
        <div className="relative mb-8 group cursor-pointer">
          {/* Animated Glow Behind Badge */}
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/30 via-purple-500/30 to-primary/30 opacity-50 blur-md group-hover:opacity-75 transition-opacity duration-500" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative inline-flex items-center gap-3 rounded-full border border-border/50 bg-background/80 py-1 px-3 text-sm text-foreground/90 backdrop-blur-md shadow-sm group-hover:shadow-md transition-all duration-300"
          >
            <span className="flex h-5 items-center rounded-full bg-primary/80 backdrop-blur-sm px-2.5 text-[11px] font-bold tracking-wide text-primary-foreground uppercase shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]">
              NEW
            </span>
            <span className="pr-2 tracking-tight font-medium">CodeAlpha Gallery</span>
          </motion.div>
        </div>
        
        {/* Headline */}
        <motion.h1 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1, 
              transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
            }
          }}
          className="relative text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem] mb-12 text-foreground leading-[1.05] max-w-4xl font-display flex flex-col items-center"
          style={{ letterSpacing: "-0.04em", perspective: "1000px" }}
        >
          <span className="absolute inset-0 blur-3xl bg-background/80 dark:bg-black/60 -z-10 rounded-full w-full h-full" />
          
          <span className="inline-flex flex-wrap justify-center gap-x-[0.25em]">
            <Word>Photography</Word>
            <Word>cascading</Word>
          </span>
          <span className="inline-flex flex-wrap justify-center gap-x-[0.25em]">
            <Word>from</Word>
            <Word>the</Word>
            <Word>corner</Word>
          </span>
        </motion.h1>
        
        {/* Call to action buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center w-full mt-4"
        >
          <div className="bg-zinc-900/90 dark:bg-transparent rounded-full px-2 py-1 shadow-xl dark:shadow-none backdrop-blur-md">
            <GooeyNav 
              items={[
                { label: "Get started", href: "/gallery" }
              ]}
              initialActiveIndex={-1}
              colors={["#ffffff", "#3b82f6", "#8b5cf6"]}
            />
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}

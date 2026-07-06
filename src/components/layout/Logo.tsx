import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <motion.div 
      className={cn("flex items-center gap-2 group cursor-pointer", className)}
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        variants={{
          initial: { rotate: 0, scale: 1, boxShadow: "0px 0px 0px rgba(255,255,255,0)" },
          hover: { 
            rotate: 90, 
            scale: 1.15,
            boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.2)",
            transition: { type: "spring", stiffness: 400, damping: 17 } 
          }
        }}
        className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60 text-primary-foreground overflow-hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 absolute z-10"
        >
          <path d="m3 16 4 4 4-4" />
          <path d="m17 8-4-4-4 4" />
          <path d="M13 4v16" />
        </svg>
        
        {/* Shimmer sweep effect on hover */}
        <motion.div 
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-20"
          variants={{
            initial: { left: "-100%" },
            hover: { 
              left: "200%", 
              transition: { duration: 0.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 } 
            }
          }}
        />
      </motion.div>
      <span className="text-xl font-bold tracking-tighter relative overflow-hidden">
        CodeAlpha
        <span className="text-primary font-normal relative inline-block">
          Gallery
          {/* Subtle underline glow on hover */}
          <motion.span 
            className="absolute -bottom-0.5 left-0 h-[2px] bg-primary blur-[1px] rounded-full"
            variants={{
              initial: { width: "0%", opacity: 0 },
              hover: { width: "100%", opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }
            }}
          />
        </span>
      </span>
    </motion.div>
  );
}

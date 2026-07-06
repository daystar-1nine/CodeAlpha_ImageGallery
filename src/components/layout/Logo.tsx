import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2 group", className)}>
      <motion.div
        whileHover={{ rotate: 90, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-sm overflow-hidden"
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
        <div className="absolute inset-0 bg-white/20 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
      </motion.div>
      <span className="text-xl font-bold tracking-tighter">
        CodeAlpha<span className="text-primary font-normal">Gallery</span>
      </span>
    </div>
  );
}

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  color?: string;
}

export function BlurImage({ src, alt, color, className, ...props }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setLoading(false);
    };
  }, [src]);

  return (
    <div 
      className={cn("overflow-hidden relative bg-muted", className)}
      style={{ backgroundColor: color || "var(--muted)" }}
    >
      <img
        src={currentSrc}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-700 ease-in-out",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-foreground/10" />
      )}
    </div>
  );
}

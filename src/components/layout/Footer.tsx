import { Link } from "react-router";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 md:py-12 bg-background">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between text-center md:text-left">
        <div className="flex flex-col gap-2">
          <p className="text-sm leading-loose text-muted-foreground">
            Built for the CodeAlpha Frontend Development Internship.
          </p>
          <p className="text-sm font-medium text-foreground flex items-center justify-center md:justify-start gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> by You
          </p>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/gallery" className="hover:text-foreground transition-colors">
            Gallery
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

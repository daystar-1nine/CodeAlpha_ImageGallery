import { Heart, Code, Briefcase, Camera, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 md:py-12 bg-background">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 md:px-6 md:flex-row md:justify-between text-center md:text-left">
        
        {/* Branding & Details */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-foreground flex items-center justify-center md:justify-start gap-1">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500 hover:scale-110 transition-transform" /> by 
            <span className="font-bold tracking-tight ms-1">Suraj Sawant</span>
          </p>
          <p className="text-xs text-muted-foreground max-w-sm">
            Designed and developed for the CodeAlpha Frontend Development Internship. Exploring premium web experiences.
          </p>
        </div>
        
        {/* Social Links */}
        <div className="flex items-center gap-5 text-muted-foreground">
          <a
            href="https://github.com/daystar-1nine"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Code className="h-5 w-5 hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://www.linkedin.com/in/surajsawant19062005/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0A66C2] transition-colors"
            aria-label="LinkedIn"
          >
            <Briefcase className="h-5 w-5 hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://www.instagram.com/daystar.drafts/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E1306C] transition-colors"
            aria-label="Instagram"
          >
            <Camera className="h-5 w-5 hover:scale-110 transition-transform" />
          </a>
          <a
            href="mailto:surajonenine@gmail.com"
            className="hover:text-[#EA4335] transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5 hover:scale-110 transition-transform" />
          </a>
        </div>
        
      </div>
    </footer>
  );
}

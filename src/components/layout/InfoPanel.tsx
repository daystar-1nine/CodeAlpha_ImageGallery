import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Info, Code, Camera, Mail, Briefcase, Sparkles, Code2, Rocket, Globe } from "lucide-react";
import { motion } from "framer-motion";

export function InfoPanel() {
  const socialLinks = [
    {
      name: "Portfolio",
      icon: Globe,
      href: "https://suraj1nine.vercel.app/",
      color: "hover:bg-[#10B981]/10 hover:text-[#10B981] hover:border-[#10B981]/50",
      glow: "group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]"
    },
    {
      name: "LinkedIn",
      icon: Briefcase,
      href: "https://www.linkedin.com/in/surajsawant19062005/",
      color: "hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] hover:border-[#0A66C2]/50",
      glow: "group-hover:shadow-[0_0_15px_rgba(10,102,194,0.4)]"
    },
    {
      name: "GitHub",
      icon: Code,
      href: "https://github.com/daystar-1nine",
      color: "hover:bg-white/10 hover:text-white hover:border-white/50",
      glow: "group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
    },
    {
      name: "Instagram",
      icon: Camera,
      href: "https://www.instagram.com/daystar.drafts/",
      color: "hover:bg-[#E1306C]/10 hover:text-[#E1306C] hover:border-[#E1306C]/50",
      glow: "group-hover:shadow-[0_0_15px_rgba(225,48,108,0.4)]"
    },
    {
      name: "Gmail",
      icon: Mail,
      href: "mailto:surajonenine@gmail.com",
      color: "hover:bg-[#EA4335]/10 hover:text-[#EA4335] hover:border-[#EA4335]/50",
      glow: "group-hover:shadow-[0_0_15px_rgba(234,67,53,0.4)]"
    }
  ];

  const techStack = ["React", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Unsplash API", "Shadcn UI"];

  return (
    <Sheet>
      <SheetTrigger>
        <div className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary/80 h-10 w-10 rounded-full cursor-pointer">
          <Info className="h-5 w-5" />
          <span className="sr-only">About</span>
        </div>
      </SheetTrigger>
      
      {/* Increased width for a more premium card feel */}
      <SheetContent className="w-full sm:max-w-md border-l border-border/40 bg-background/60 backdrop-blur-3xl overflow-y-auto custom-scrollbar">
        <SheetHeader className="mb-6 text-left px-6 pt-6">
          <SheetTitle className="text-2xl font-display font-bold" tabIndex={0}>About</SheetTitle>
          <SheetDescription className="sr-only">
            Information about the developer and this project.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-8 px-6 pb-10">
          
          {/* Profile Card Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 shadow-xl"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary/20 p-0.5">
                <div className="h-full w-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  <img 
                    src="/profile.jpg" 
                    alt="Suraj Sawant" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">Suraj Sawant</h3>
                <p className="text-sm text-primary font-medium flex items-center gap-1.5">
                  <Code2 className="h-3.5 w-3.5" /> Frontend Developer
                </p>
              </div>
            </div>
            
            <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground mb-4 border border-border/50">
              <Briefcase className="h-3 w-3" />
              CodeAlpha Internship Task
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="space-y-3"
          >
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> About CodeAlphaGallery
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              "I created this project as part of my CodeAlpha Frontend Development Internship. Instead of building a basic image gallery, I challenged myself to design a modern, premium web application that demonstrates my frontend engineering skills, UI/UX design principles, responsive development, and smooth user interactions. My goal was to build something that feels like a real product rather than just an internship assignment."
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="space-y-3"
          >
            <h4 className="font-semibold text-sm text-foreground/80 uppercase tracking-wider">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="inline-flex items-center rounded-md bg-secondary/50 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground border border-border/30">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Let's Connect */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="space-y-4 pt-4 border-t border-border/40"
          >
            <div>
              <h4 className="font-bold text-lg flex items-center gap-2">
                <Rocket className="h-4 w-4 text-primary" /> Let's Connect
              </h4>
              <p className="text-sm text-muted-foreground">Feel free to reach out for collaborations or opportunities.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center gap-3 rounded-xl border border-border/50 bg-card p-3 transition-all duration-300 hover:-translate-y-1 ${link.color} ${link.glow}`}
                >
                  <link.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-center space-y-1"
          >
            <p className="text-xs text-muted-foreground">Built with ❤️ by Suraj Sawant</p>
          </motion.div>

        </div>
      </SheetContent>
    </Sheet>
  );
}

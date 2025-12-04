import { Heart, ExternalLink } from "lucide-react";
import logo from "@/assets/budfi-logo.png";

const Footer = () => {
  const webApps = [
    { name: "budfi.in", url: "https://www.budfi.in" },
    { name: "periodicity.in", url: "https://www.periodicity.in" },
    { name: "journal.budfi.in", url: "https://journal.budfi.in" },
  ];

  return (
    <footer className="relative bg-navy-dark py-16 border-t border-gold/10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-4 mb-4">
            <img src={logo} alt="ai.budfi Logo" className="h-14 w-14 rounded-full border-2 border-gold/30" />
            <div className="text-left">
              <span className="text-2xl font-serif font-bold text-gold">ai.budfi</span>
              <p className="text-sm text-primary-foreground/60">Plan. Grow. Achieve.</p>
            </div>
          </div>
          <p className="text-primary-foreground/50 max-w-md">
            Empowering individuals with AI knowledge to transform their careers and businesses.
          </p>
        </div>

        {/* Web Apps */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <span className="text-primary-foreground/50 text-sm mr-2">Our Apps:</span>
          {webApps.map((app) => (
            <a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy/50 border border-gold/20 text-primary-foreground/70 hover:text-gold hover:border-gold/40 transition-all text-sm group"
            >
              {app.name}
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/40">
          <p>© {new Date().getFullYear()} ai.budfi. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

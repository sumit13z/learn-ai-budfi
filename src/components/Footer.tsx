import logo from "@/assets/budfi-logo.png";

const Footer = () => {
  return (
    <footer className="bg-navy-dark py-12 border-t border-border/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ai.budfi Logo" className="h-10 w-10 rounded-full" />
            <div>
              <span className="text-lg font-serif font-bold text-gold">ai.budfi</span>
              <p className="text-sm text-primary-foreground/60">Plan. Grow. Achieve.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a
              href="https://www.budfi.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/70 hover:text-gold transition-colors"
            >
              budfi.in
            </a>
            <a
              href="https://www.periodicity.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/70 hover:text-gold transition-colors"
            >
              periodicity.in
            </a>
            <a
              href="https://journal.budfi.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/70 hover:text-gold transition-colors"
            >
              journal.budfi.in
            </a>
          </div>

          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} ai.budfi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

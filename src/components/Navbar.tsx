import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/budfi-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-dark/95 backdrop-blur-md border-b border-border/20">
      {/* Promo Banner */}
      <div className="bg-gradient-gold py-2 px-4">
        <div className="container mx-auto flex items-center justify-center gap-4 flex-wrap">
          <p className="text-navy-dark font-semibold text-sm md:text-base animate-flash">
            🎯 Learn AI tools and Maximize your knowledge @ ₹99 only
          </p>
          <Button
            onClick={() => scrollToSection("services")}
            size="sm"
            className="bg-navy-dark hover:bg-navy text-gold font-bold shadow-lg hover:scale-105 transition-all"
          >
            Buy Now
          </Button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="ai.budfi Logo" className="h-12 w-12 rounded-full" />
            <span className="text-xl font-serif font-bold text-gold">ai.budfi</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-primary-foreground/80 hover:text-gold transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-primary-foreground/80 hover:text-gold transition-colors font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-primary-foreground/80 hover:text-gold transition-colors font-medium"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 animate-slide-up">
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left py-2 text-primary-foreground/80 hover:text-gold transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left py-2 text-primary-foreground/80 hover:text-gold transition-colors font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left py-2 text-primary-foreground/80 hover:text-gold transition-colors font-medium"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

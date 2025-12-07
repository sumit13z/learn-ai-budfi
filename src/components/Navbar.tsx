import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/budfi-logo.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-navy-dark/98 backdrop-blur-xl shadow-xl" : "bg-transparent"}`}>
      {/* Promo Banner */}
      <div className="relative bg-gradient-to-r from-luxury-gold via-luxury-gold-light to-luxury-gold py-2.5 px-4 overflow-hidden">
        <div className="absolute inset-0 shimmer" />
        <div className="container mx-auto flex items-center justify-center gap-4 flex-wrap relative">
          <p className="text-luxury-black font-bold text-sm md:text-base animate-flash flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Register Now for the Live AI Mastermind Session
            <Sparkles className="w-4 h-4" />
          </p>
          <Button
            onClick={() => navigate("/live-session")}
            size="sm"
            className="bg-luxury-black hover:bg-luxury-black/90 text-luxury-gold font-bold shadow-lg hover:scale-105 transition-all rounded-full px-5"
          >
            Register Now →
          </Button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="relative">
              <img src={logo} alt="ai.budfi Logo" className="h-12 w-12 rounded-full border-2 border-gold/30 group-hover:border-gold transition-colors" />
              <div className="absolute inset-0 rounded-full bg-gold/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-2xl font-serif font-bold text-gold group-hover:text-gold-light transition-colors">ai.budfi</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {["about", "services"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="relative px-5 py-2 text-primary-foreground/80 hover:text-gold transition-colors font-medium capitalize group"
              >
                {section}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold group-hover:w-3/4 transition-all duration-300" />
              </button>
            ))}
            <button
              onClick={() => navigate("/live-session")}
              className="relative px-5 py-2 text-primary-foreground/80 hover:text-luxury-gold transition-colors font-medium group"
            >
              Live Session
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-luxury-gold group-hover:w-3/4 transition-all duration-300" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="relative px-5 py-2 text-primary-foreground/80 hover:text-gold transition-colors font-medium capitalize group"
            >
              contact
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold group-hover:w-3/4 transition-all duration-300" />
            </button>
            <Button
              onClick={() => scrollToSection("services")}
              className="ml-4 bg-gradient-gold text-navy-dark font-bold hover:scale-105 transition-all rounded-full px-6"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground p-2 hover:bg-gold/10 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-slide-up bg-navy-dark/90 backdrop-blur-xl rounded-2xl p-4 border border-gold/20">
            {["about", "services"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left py-3 px-4 text-primary-foreground/80 hover:text-gold hover:bg-gold/10 transition-all font-medium capitalize rounded-xl"
              >
                {section}
              </button>
            ))}
            <button
              onClick={() => { navigate("/live-session"); setIsOpen(false); }}
              className="block w-full text-left py-3 px-4 text-primary-foreground/80 hover:text-luxury-gold hover:bg-luxury-gold/10 transition-all font-medium rounded-xl"
            >
              Live Session
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left py-3 px-4 text-primary-foreground/80 hover:text-gold hover:bg-gold/10 transition-all font-medium capitalize rounded-xl"
            >
              contact
            </button>
            <Button
              onClick={() => scrollToSection("services")}
              className="w-full mt-2 bg-gradient-gold text-navy-dark font-bold rounded-xl"
            >
              Get Started →
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

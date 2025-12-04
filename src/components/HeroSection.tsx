import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/budfi-logo.png";

const HeroSection = () => {
  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-teal rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-40 pb-20 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Logo Animation */}
          <div className="mb-8 animate-float">
            <div className="relative">
              <img
                src={logo}
                alt="ai.budfi"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full glow-gold"
              />
              <div className="absolute -top-2 -right-2 bg-gold rounded-full p-2 animate-pulse-glow">
                <Sparkles className="w-5 h-5 text-navy-dark" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 animate-fade-in-up">
            <span className="text-primary-foreground">Master</span>{" "}
            <span className="text-gradient">AI Tools</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 mb-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Plan. Grow. Achieve.
          </p>

          <p className="text-base md:text-lg text-primary-foreground/60 max-w-2xl mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            Unlock the power of AI with our comprehensive masterclass materials.
            Learn the latest tools, techniques, and strategies to maximize your knowledge
            and stay ahead in the AI revolution.
          </p>

          {/* Price Badge */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="inline-flex items-center gap-3 bg-gold/10 border border-gold/30 rounded-full px-6 py-3 animate-pulse-glow">
              <span className="text-primary-foreground/60 line-through text-sm">₹999</span>
              <span className="text-3xl font-bold text-gold">₹99</span>
              <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
                90% OFF
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <Button
              onClick={scrollToServices}
              size="lg"
              className="bg-gradient-gold text-navy-dark font-bold text-lg px-8 py-6 hover:scale-105 transition-all shadow-xl glow-gold"
            >
              Get Started Now
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce">
            <ArrowDown className="w-6 h-6 text-gold/60" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

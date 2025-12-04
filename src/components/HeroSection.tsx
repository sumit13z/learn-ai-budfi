import { ArrowDown, Sparkles, Zap, Star } from "lucide-react";
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
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gold/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]" />
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold rounded-full animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-teal rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-gold-light rounded-full animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-teal-light rounded-full animate-float" style={{ animationDelay: "0.5s" }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-4 pt-36 pb-20 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Logo Animation */}
          <div className="mb-10 animate-float">
            <div className="relative">
              <div className="absolute inset-0 bg-gold/30 rounded-full blur-2xl scale-150" />
              <img
                src={logo}
                alt="ai.budfi"
                className="relative w-36 h-36 md:w-44 md:h-44 rounded-full glow-gold border-4 border-gold/30"
              />
              <div className="absolute -top-3 -right-3 bg-gradient-gold rounded-full p-3 animate-pulse-glow shadow-lg">
                <Sparkles className="w-6 h-6 text-navy-dark" />
              </div>
              <div className="absolute -bottom-2 -left-2 bg-teal rounded-full p-2 animate-bounce-slow">
                <Zap className="w-4 h-4 text-accent-foreground" />
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="mb-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 bg-teal/20 text-teal px-4 py-2 rounded-full text-sm font-medium border border-teal/30">
              <Star className="w-4 h-4 fill-current" />
              #1 AI Learning Platform in India
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 animate-fade-in-up leading-tight">
            <span className="text-primary-foreground">Master</span>{" "}
            <span className="text-gradient">AI Tools</span>
          </h1>

          <p className="text-xl md:text-2xl text-gold font-semibold mb-4 animate-fade-in-up tracking-wide" style={{ animationDelay: "0.2s" }}>
            Plan. Grow. Achieve.
          </p>

          <p className="text-base md:text-lg text-primary-foreground/60 max-w-2xl mb-10 animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.3s" }}>
            Unlock the power of AI with our comprehensive masterclass materials.
            Learn 50+ cutting-edge tools and strategies to stay ahead in the AI revolution.
          </p>

          {/* Price Badge */}
          <div className="mb-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-gold rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="relative inline-flex items-center gap-4 bg-navy-dark/80 backdrop-blur-sm border border-gold/40 rounded-2xl px-8 py-5">
                <span className="text-primary-foreground/40 line-through text-lg">₹999</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-gold">₹99</span>
                  <span className="text-primary-foreground/60 text-sm">only</span>
                </div>
                <span className="bg-teal text-accent-foreground text-sm font-bold px-3 py-1.5 rounded-full animate-pulse">
                  90% OFF
                </span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <Button
              onClick={scrollToServices}
              size="lg"
              className="relative overflow-hidden bg-gradient-gold text-navy-dark font-bold text-xl px-12 py-7 hover:scale-105 transition-all duration-300 shadow-2xl glow-gold rounded-xl group"
            >
              <span className="relative z-10">Get Started Now →</span>
              <div className="absolute inset-0 shimmer" />
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex items-center gap-6 text-primary-foreground/40 text-sm animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-teal rounded-full" />
              Instant Access
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full" />
              Lifetime Updates
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-teal rounded-full" />
              50+ AI Tools
            </span>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce">
            <div className="w-6 h-10 border-2 border-gold/40 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-gold rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

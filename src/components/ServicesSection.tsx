import { BookOpen, Globe, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServicesSectionProps {
  onBuyClick: () => void;
}

const ServicesSection = ({ onBuyClick }: ServicesSectionProps) => {
  const webApps = [
    { name: "BudFi", url: "https://www.budfi.in", description: "Financial Planning Platform" },
    { name: "Periodicity", url: "https://www.periodicity.in", description: "Period Tracking App" },
    { name: "Journal", url: "https://journal.budfi.in", description: "Personal Journaling App" },
  ];

  const masterclassFeatures = [
    "Complete AI Tools Masterclass",
    "50+ AI Tools Covered",
    "Practical Tutorials & Guides",
    "Lifetime Access",
    "Regular Updates",
    "Certificate of Completion",
  ];

  return (
    <section id="services" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal font-medium mb-2 block">Our Services</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary-foreground mb-6">
            What We <span className="text-gradient">Offer</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg">
            Explore our comprehensive AI learning materials and discover our portfolio
            of innovative web applications.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* AI Masterclass Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-gold rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative bg-navy/80 backdrop-blur-md border border-gold/30 rounded-2xl p-8 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-navy-dark" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary-foreground">
                    AI Masterclass Materials
                  </h3>
                  <p className="text-primary-foreground/60">Complete Learning Package</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {masterclassFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-primary-foreground/80">
                    <div className="w-5 h-5 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-teal" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex items-end justify-between">
                <div>
                  <span className="text-primary-foreground/50 line-through text-sm">₹999</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gold">₹99</span>
                    <span className="text-primary-foreground/60 text-sm">only</span>
                  </div>
                </div>
                <Button
                  onClick={onBuyClick}
                  className="bg-gradient-gold text-navy-dark font-bold text-lg px-8 py-6 hover:scale-105 transition-all shadow-xl"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>

          {/* Web Apps Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-teal rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative bg-navy/80 backdrop-blur-md border border-teal/30 rounded-2xl p-8 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-teal flex items-center justify-center">
                  <Globe className="w-8 h-8 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary-foreground">
                    Our Web Apps
                  </h3>
                  <p className="text-primary-foreground/60">Developed by Our Team</p>
                </div>
              </div>

              <p className="text-primary-foreground/70 mb-6">
                Explore our portfolio of innovative web applications, each designed
                to solve real-world problems and enhance your daily life.
              </p>

              <div className="space-y-4">
                {webApps.map((app) => (
                  <a
                    key={app.name}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-navy-dark/50 border border-border/20 hover:border-teal/50 hover:bg-navy-dark/80 transition-all group/link"
                  >
                    <div>
                      <h4 className="font-bold text-primary-foreground group-hover/link:text-teal transition-colors">
                        {app.name}
                      </h4>
                      <p className="text-sm text-primary-foreground/60">{app.description}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-teal opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

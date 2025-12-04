import { Target, Lightbulb, TrendingUp, Users, Sparkles } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Target,
      title: "Focused Learning",
      description: "Curated content designed to help you master AI tools quickly and efficiently.",
      color: "gold",
    },
    {
      icon: Lightbulb,
      title: "Practical Knowledge",
      description: "Real-world applications and hands-on examples you can implement immediately.",
      color: "teal",
    },
    {
      icon: TrendingUp,
      title: "Stay Ahead",
      description: "Keep up with the latest AI developments and emerging technologies.",
      color: "gold",
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Learn from our team's experience building successful web applications.",
      color: "teal",
    },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 text-teal font-medium mb-4 bg-teal/10 px-4 py-2 rounded-full text-sm">
            <Sparkles className="w-4 h-4" />
            About Us
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Empowering Your <span className="text-gradient">AI Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            At ai.budfi, we believe in making AI education accessible to everyone.
            Our mission is to help individuals and businesses leverage the power of
            artificial intelligence to achieve their goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-gold/30 transition-all duration-500 card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`relative w-16 h-16 rounded-2xl ${feature.color === "gold" ? "bg-gradient-gold" : "bg-teal"} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <feature.icon className={`w-8 h-8 ${feature.color === "gold" ? "text-navy-dark" : "text-accent-foreground"}`} />
              </div>
              <h3 className="relative text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="relative text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "500+", label: "Happy Students", icon: "🎓" },
            { value: "50+", label: "AI Tools Covered", icon: "🛠️" },
            { value: "3", label: "Web Apps Built", icon: "🚀" },
            { value: "24/7", label: "Support", icon: "💬" },
          ].map((stat, index) => (
            <div 
              key={stat.label} 
              className="relative text-center p-8 rounded-2xl bg-gradient-to-br from-card to-muted/50 border border-border/30 group hover:border-gold/30 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-3xl mb-3 block">{stat.icon}</span>
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

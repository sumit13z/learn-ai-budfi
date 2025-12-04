import { Target, Lightbulb, TrendingUp, Users } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Target,
      title: "Focused Learning",
      description: "Curated content designed to help you master AI tools quickly and efficiently.",
    },
    {
      icon: Lightbulb,
      title: "Practical Knowledge",
      description: "Real-world applications and hands-on examples you can implement immediately.",
    },
    {
      icon: TrendingUp,
      title: "Stay Ahead",
      description: "Keep up with the latest AI developments and emerging technologies.",
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Learn from our team's experience building successful web applications.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal font-medium mb-2 block">About Us</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Empowering Your <span className="text-gradient">AI Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            At ai.budfi, we believe in making AI education accessible to everyone.
            Our mission is to help individuals and businesses leverage the power of
            artificial intelligence to achieve their goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl glass-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-navy-dark" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "500+", label: "Students" },
            { value: "50+", label: "AI Tools Covered" },
            { value: "3", label: "Web Apps Built" },
            { value: "24/7", label: "Support" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-xl bg-muted/50">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

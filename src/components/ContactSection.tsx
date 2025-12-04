import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent! ✨",
      description: "We'll get back to you as soon as possible.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: Mail, title: "Email Us", value: "contact@budfi.in", color: "gold" },
    { icon: Phone, title: "Call Us", value: "+91 98765 43210", color: "teal" },
    { icon: MapPin, title: "Location", value: "India", color: "primary" },
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-teal/5 rounded-full blur-[100px]" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gold/5 rounded-full blur-[80px]" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 text-teal font-medium mb-4 bg-teal/10 px-4 py-2 rounded-full text-sm border border-teal/20">
            <MessageCircle className="w-4 h-4" />
            Contact Us
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Have questions about our AI masterclass or web applications?
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            {contactInfo.map((item, index) => (
              <div 
                key={item.title}
                className="flex items-start gap-5 p-5 rounded-2xl bg-card border border-border/30 hover:border-gold/30 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.color === "gold" ? "bg-gradient-gold" : item.color === "teal" ? "bg-teal" : "bg-primary"} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                  <item.icon className={`w-6 h-6 ${item.color === "gold" ? "text-navy-dark" : "text-accent-foreground"}`} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1 text-lg">{item.title}</h3>
                  <p className="text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="pt-8 border-t border-border/30">
              <h3 className="font-bold text-foreground mb-4">Visit Our Apps</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "BudFi", url: "https://www.budfi.in" },
                  { name: "Periodicity", url: "https://www.periodicity.in" },
                  { name: "Journal", url: "https://journal.budfi.in" },
                ].map((app) => (
                  <a
                    key={app.name}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border/30 hover:border-gold/50 hover:bg-gold/10 transition-all text-sm"
                  >
                    <Globe className="w-4 h-4 text-gold" />
                    {app.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-teal/10 rounded-3xl blur-xl" />
            <div className="relative bg-card/80 backdrop-blur-xl border border-border/30 rounded-3xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                    className="bg-background/50 border-border/30 focus:border-gold rounded-xl h-12"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    required
                    className="bg-background/50 border-border/30 focus:border-gold rounded-xl h-12"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..."
                    rows={5}
                    required
                    className="bg-background/50 border-border/30 focus:border-gold rounded-xl resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-gold text-navy-dark font-bold py-6 hover:scale-[1.02] transition-all rounded-xl text-lg shadow-lg"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

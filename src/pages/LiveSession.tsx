import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Brain, Sparkles, Layers, Rocket, Calendar, Clock, Video, ArrowRight, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const features = [
  {
    icon: Brain,
    title: "LLM Logic",
    description: "Master the architecture behind large language models and how they reason.",
  },
  {
    icon: Sparkles,
    title: "Elite Prompting",
    description: "Learn advanced prompting techniques used by industry professionals.",
  },
  {
    icon: Layers,
    title: "The Stack",
    description: "Discover the no-code tools that power million-dollar AI products.",
  },
  {
    icon: Rocket,
    title: "Live Build",
    description: "Watch as we build a complete AI product from scratch in real-time.",
  },
];

const LiveSession = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; phone?: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Invalid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load payment gateway");
      }

      const { data: purchaseData, error: insertError } = await supabase
        .from("purchases")
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          product_name: "AI Live Masterclass",
          amount: 149,
          payment_status: "pending",
        })
        .select()
        .single();

      if (insertError) throw insertError;

      const { data: orderData, error: orderError } = await supabase.functions.invoke(
        "create-livesession-order",
        {
          body: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            purchaseId: purchaseData.id,
          },
        }
      );

      if (orderError) throw orderError;

      const options: RazorpayOptions = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "BudFi AI Masterclass",
        description: "AI Live Masterclass - Dec 21",
        order_id: orderData.orderId,
        handler: async (response: RazorpayResponse) => {
          try {
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
              "verify-livesession-payment",
              {
                body: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  purchaseId: purchaseData.id,
                },
              }
            );

            if (verifyError) throw verifyError;

            if (verifyData.success) {
              navigate("/live-session/thank-you");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#D97706",
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToRegistration = () => {
    document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>AI Live Masterclass | Build Your Legacy with AI</title>
        <meta name="description" content="An exclusive 2-hour masterclass. Learn to command LLMs and build a no-code product." />
      </Helmet>

      <div className="min-h-screen bg-luxury-black text-luxury-cream font-inter">
        {/* Ambient Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-luxury-gold/[0.02] rounded-full blur-[200px]" />
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            {/* Exclusive Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 border border-luxury-gold/30 rounded-full bg-luxury-gold/5 backdrop-blur-sm animate-fade-in-up">
              <Star className="w-4 h-4 text-luxury-gold" />
              <span className="text-sm text-luxury-gold font-medium tracking-widest uppercase">Exclusive Masterclass</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Build Your Legacy with
              <br />
              <span className="inline-block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 animate-shimmer-gold">
                Artificial Intelligence
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-luxury-cream/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up font-light" style={{ animationDelay: "0.2s" }}>
              An exclusive 2-hour masterclass. Learn to command LLMs and build a no-code product.
            </p>

            {/* CTA Button */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Button
                onClick={scrollToRegistration}
                className="group relative px-10 py-6 text-lg font-semibold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-luxury-black rounded-full overflow-hidden transition-all duration-500 hover:scale-105 shadow-[0_0_40px_rgba(217,119,6,0.3)] hover:shadow-[0_0_60px_rgba(217,119,6,0.5)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Reserve Your Seat
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-12 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              {["Limited Seats", "Live Q&A", "Certificate Included"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-luxury-cream/50">
                  <CheckCircle className="w-4 h-4 text-luxury-gold/70" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow">
            <div className="w-6 h-10 border-2 border-luxury-gold/30 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-luxury-gold/50 rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="relative py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-4">
              What You'll <span className="text-luxury-gold">Master</span>
            </h2>
            <p className="text-luxury-cream/60 text-center mb-16 max-w-xl mx-auto">
              Four pillars of AI excellence that will transform how you build products
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group relative p-8 rounded-2xl bg-luxury-card/50 backdrop-blur-xl border border-luxury-gold/10 hover:border-luxury-gold/30 transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-luxury-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 mb-6 rounded-xl bg-luxury-gold/10 flex items-center justify-center group-hover:bg-luxury-gold/20 transition-colors duration-300">
                      <feature.icon className="w-7 h-7 text-luxury-gold" />
                    </div>
                    <h3 className="font-playfair text-xl font-semibold mb-3 text-luxury-cream group-hover:text-luxury-gold transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-luxury-cream/60 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Logistics Bar */}
        <section className="relative py-16 px-4 border-y border-luxury-gold/10 bg-luxury-card/30 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-luxury-gold/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-luxury-gold" />
                </div>
                <div>
                  <p className="text-sm text-luxury-cream/50 uppercase tracking-wider">Date</p>
                  <p className="font-playfair text-2xl font-semibold text-luxury-cream">Dec 21</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-luxury-gold/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-luxury-gold" />
                </div>
                <div>
                  <p className="text-sm text-luxury-cream/50 uppercase tracking-wider">Time</p>
                  <p className="font-playfair text-2xl font-semibold text-luxury-cream">11 AM - 1 PM</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-luxury-gold/10 flex items-center justify-center">
                  <Video className="w-6 h-6 text-luxury-gold" />
                </div>
                <div>
                  <p className="text-sm text-luxury-cream/50 uppercase tracking-wider">Venue</p>
                  <p className="font-playfair text-2xl font-semibold text-luxury-cream">Zoom Live</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section id="registration" className="relative py-24 px-4">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
                Secure Your <span className="text-luxury-gold">Spot</span>
              </h2>
              <p className="text-luxury-cream/60">
                Join the elite few who will master AI product development
              </p>
            </div>

            <div className="relative p-8 md:p-10 rounded-3xl bg-luxury-card/50 backdrop-blur-xl border border-luxury-gold/20 shadow-[0_0_80px_rgba(217,119,6,0.1)]">
              <div className="text-center mb-8">
                <div className="inline-flex items-baseline gap-2">
                  <span className="text-sm text-luxury-cream/50 line-through">₹499</span>
                  <span className="font-playfair text-5xl font-bold text-luxury-gold">₹149</span>
                </div>
                <p className="text-sm text-luxury-cream/50 mt-2">Early bird pricing • Limited time only</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm text-luxury-cream/70 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-luxury-black/50 border border-luxury-gold/20 text-luxury-cream placeholder-luxury-cream/30 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm text-luxury-cream/70 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-luxury-black/50 border border-luxury-gold/20 text-luxury-cream placeholder-luxury-cream/30 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm text-luxury-cream/70 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-luxury-black/50 border border-luxury-gold/20 text-luxury-cream placeholder-luxury-cream/30 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-luxury-black rounded-xl hover:opacity-90 transition-all duration-300 shadow-[0_0_30px_rgba(217,119,6,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-luxury-black/30 border-t-luxury-black rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Pay ₹149 & Register
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </form>

              <p className="text-center text-xs text-luxury-cream/40 mt-6">
                🔒 Secure payment powered by Razorpay
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-luxury-gold/10">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-luxury-cream/40 text-sm">
              © 2024 BudFi. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LiveSession;
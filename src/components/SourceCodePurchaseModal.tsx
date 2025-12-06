import { useState, useEffect } from "react";
import { X, User, Mail, Phone, Code, Sparkles, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

interface SourceCodePurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const purchaseSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be less than 15 digits"),
});

const SourceCodePurchaseModal = ({ isOpen, onClose }: SourceCodePurchaseModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isIndian, setIsIndian] = useState(true);

  useEffect(() => {
    // Detect user's location for currency
    const detectLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setIsIndian(data.country_code === 'IN');
      } catch (error) {
        console.log('Could not detect location, defaulting to INR');
        setIsIndian(true);
      }
    };
    if (isOpen) {
      detectLocation();
    }
  }, [isOpen]);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
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

  const downloadFile = (content: string, fileName: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = purchaseSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string; phone?: string } = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof fieldErrors;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const amount = isIndian ? 2999 : 3499;
      const currency = isIndian ? 'INR' : 'USD';

      // Save purchase to database
      const { data: purchase, error: dbError } = await supabase
        .from("purchases")
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          product_name: "Source Code Bundle",
          amount: amount,
          payment_status: "pending",
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load payment gateway");
      }

      // Create Razorpay order
      const { data: orderData, error: orderError } = await supabase.functions.invoke('create-sourcecode-order', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          purchaseId: purchase.id,
          currency: currency
        }
      });

      if (orderError || orderData?.error) {
        throw new Error(orderData?.error || 'Failed to create order');
      }

      // Initialize Razorpay checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ai.budfi",
        description: "Source Code Bundle - BEAT & Daily Journal",
        order_id: orderData.orderId,
        prefill: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          contact: formData.phone.trim(),
        },
        theme: {
          color: "#14B8A6",
        },
        handler: async function (response: any) {
          try {
            // Verify payment and get file content
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-sourcecode-payment', {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                purchaseId: purchase.id
              }
            });

            if (verifyError || verifyData?.error) {
              throw new Error(verifyData?.error || 'Payment verification failed');
            }

            toast({
              title: "Payment Successful! 🎉",
              description: "Your source code file is downloading...",
            });

            // Download the file
            downloadFile(verifyData.fileContent, verifyData.fileName);

            setFormData({ name: "", email: "", phone: "" });
            onClose();

          } catch (error: any) {
            toast({
              title: "Verification Failed",
              description: error.message || "Please contact support.",
              variant: "destructive",
            });
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
            toast({
              title: "Payment Cancelled",
              description: "You can try again anytime.",
            });
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const price = isIndian ? "₹2,999" : "$34.99";
  const originalPrice = isIndian ? "₹9,999" : "$99";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-navy-dark/90 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md mx-4 bg-gradient-to-b from-card to-navy rounded-3xl shadow-2xl animate-scale-in overflow-hidden border border-teal/30">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <div className="relative bg-gradient-to-r from-teal via-teal to-teal-dark p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-accent-foreground/80 hover:text-accent-foreground transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-accent-foreground/20 backdrop-blur-sm flex items-center justify-center">
              <Code className="w-8 h-8 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-accent-foreground">
                Source Code Bundle
              </h2>
              <p className="text-accent-foreground/70 flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> BEAT & Daily Journal Apps
              </p>
            </div>
          </div>
        </div>

        {/* Currency indicator */}
        <div className="relative px-6 py-3 bg-navy-dark/30 border-b border-teal/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
            <Globe className="w-4 h-4" />
            <span>{isIndian ? 'Indian pricing (INR)' : 'International pricing (USD)'}</span>
          </div>
          <button 
            onClick={() => setIsIndian(!isIndian)}
            className="text-xs text-teal hover:underline"
          >
            Switch to {isIndian ? 'USD' : 'INR'}
          </button>
        </div>

        {/* Price Summary */}
        <div className="relative px-6 py-5 bg-navy-dark/50 border-b border-teal/10">
          <div className="flex items-center justify-between">
            <span className="text-primary-foreground/70">Total Amount</span>
            <div className="flex items-baseline gap-3">
              <span className="text-primary-foreground/40 line-through text-sm">{originalPrice}</span>
              <div className="relative">
                <span className="text-3xl font-bold text-teal">{price}</span>
                <span className="absolute -top-2 -right-8 text-xs bg-gold text-navy-dark px-2 py-0.5 rounded-full font-bold">
                  70% OFF
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative p-6 space-y-5">
          <div>
            <label htmlFor="sourcecode-name" className="block text-sm font-medium text-primary-foreground/80 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal/60" />
              <Input
                id="sourcecode-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                required
                className="pl-12 bg-navy-dark/50 border-teal/20 focus:border-teal text-primary-foreground placeholder:text-primary-foreground/40 rounded-xl h-12"
              />
            </div>
            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="sourcecode-email" className="block text-sm font-medium text-primary-foreground/80 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal/60" />
              <Input
                id="sourcecode-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                required
                className="pl-12 bg-navy-dark/50 border-teal/20 focus:border-teal text-primary-foreground placeholder:text-primary-foreground/40 rounded-xl h-12"
              />
            </div>
            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="sourcecode-phone" className="block text-sm font-medium text-primary-foreground/80 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal/60" />
              <Input
                id="sourcecode-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter your phone number"
                required
                className="pl-12 bg-navy-dark/50 border-teal/20 focus:border-teal text-primary-foreground placeholder:text-primary-foreground/40 rounded-xl h-12"
              />
            </div>
            {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-teal via-teal to-teal-dark text-accent-foreground font-bold py-6 hover:scale-[1.02] transition-all mt-4 rounded-xl text-lg shadow-lg shadow-teal/20"
          >
            {isSubmitting ? "Processing..." : `Pay ${price} & Download Code →`}
          </Button>

          <p className="text-xs text-primary-foreground/50 text-center">
            🔒 Secured by Razorpay. Instant download after payment.
          </p>
        </form>
      </div>
    </div>
  );
};

export default SourceCodePurchaseModal;

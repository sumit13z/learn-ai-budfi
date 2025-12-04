import { useState } from "react";
import { X, User, Mail, Phone, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const purchaseSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be less than 15 digits"),
});

const PurchaseModal = ({ isOpen, onClose }: PurchaseModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
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
      // Save purchase to database
      const { data, error } = await supabase
        .from("purchases")
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          product_name: "AI Masterclass Materials",
          amount: 99,
          payment_status: "pending",
        })
        .select()
        .single();

      if (error) throw error;

      // Open Razorpay payment page
      // Note: You need to configure Razorpay with your API keys
      toast({
        title: "Redirecting to Payment",
        description: "You will be redirected to Razorpay payment gateway.",
      });

      // For now, we'll show a message about Razorpay integration
      // The actual Razorpay integration will be done after API keys are provided
      toast({
        title: "Information Saved!",
        description: "Please configure Razorpay API keys to enable payments. Your details have been saved.",
        variant: "default",
      });

      setFormData({ name: "", email: "", phone: "" });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-dark/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-card rounded-2xl shadow-2xl animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-primary p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center">
              <ShoppingCart className="w-7 h-7 text-navy-dark" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-primary-foreground">
                AI Masterclass Materials
              </h2>
              <p className="text-primary-foreground/70">Complete your purchase</p>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="px-6 py-4 bg-muted/50 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Amount</span>
            <div className="flex items-baseline gap-2">
              <span className="text-muted-foreground line-through text-sm">₹999</span>
              <span className="text-2xl font-bold text-gradient">₹99</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="purchase-name" className="block text-sm font-medium text-foreground mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="purchase-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                required
                className="pl-10"
              />
            </div>
            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="purchase-email" className="block text-sm font-medium text-foreground mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="purchase-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                required
                className="pl-10"
              />
            </div>
            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="purchase-phone" className="block text-sm font-medium text-foreground mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="purchase-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter your phone number"
                required
                className="pl-10"
              />
            </div>
            {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-gold text-navy-dark font-bold py-6 hover:scale-[1.02] transition-all mt-6"
          >
            {isSubmitting ? "Processing..." : "Proceed to Payment →"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By clicking proceed, you agree to our terms and conditions.
            Your payment will be processed securely via Razorpay.
          </p>
        </form>
      </div>
    </div>
  );
};

export default PurchaseModal;

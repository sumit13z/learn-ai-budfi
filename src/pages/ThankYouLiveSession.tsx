import { Helmet } from "react-helmet-async";
import { CheckCircle, Calendar, Clock, Video, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ThankYouLiveSession = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Registration Confirmed | AI Live Masterclass</title>
        <meta name="description" content="Your registration for the AI Live Masterclass is confirmed. See you on Dec 28!" />
      </Helmet>

      <div className="min-h-screen bg-luxury-black text-luxury-cream font-inter">
        {/* Ambient Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-luxury-gold/[0.02] rounded-full blur-[200px]" />
        </div>

        {/* Main Content */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-br from-luxury-gold/20 to-luxury-gold/5 border border-luxury-gold/30 animate-fade-in-up">
              <CheckCircle className="w-12 h-12 text-luxury-gold" />
            </div>

            {/* Success Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 border border-luxury-gold/30 rounded-full bg-luxury-gold/5 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <Sparkles className="w-4 h-4 text-luxury-gold" />
              <span className="text-sm text-luxury-gold font-medium tracking-widest uppercase">Registration Confirmed</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              You're <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">In!</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-luxury-cream/70 max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in-up font-light" style={{ animationDelay: "0.3s" }}>
              Thank you for registering for the AI Live Masterclass on Dec 28. The Zoom link will be sent to your email before the session.
            </p>

            {/* Session Details Card */}
            <div className="relative p-8 rounded-3xl bg-luxury-card/50 backdrop-blur-xl border border-luxury-gold/20 shadow-[0_0_80px_rgba(217,119,6,0.1)] mb-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <h3 className="font-playfair text-xl font-semibold mb-6 text-luxury-gold">Session Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-luxury-cream/50 uppercase tracking-wider">Date</p>
                    <p className="font-playfair text-lg font-semibold text-luxury-cream">Dec 28</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-luxury-cream/50 uppercase tracking-wider">Time</p>
                    <p className="font-playfair text-lg font-semibold text-luxury-cream">11 AM - 1 PM</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center">
                    <Video className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-luxury-cream/50 uppercase tracking-wider">Venue</p>
                    <p className="font-playfair text-lg font-semibold text-luxury-cream">Zoom Live</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="text-left p-6 rounded-2xl bg-luxury-card/30 border border-luxury-gold/10 mb-10 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <h4 className="font-playfair text-lg font-semibold mb-4 text-luxury-cream">What's Next?</h4>
              <ul className="space-y-3 text-luxury-cream/70">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                  <span>Check your email for the payment confirmation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                  <span>Zoom link will be sent 24 hours before the session</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                  <span>Add the event to your calendar to never miss it</span>
                </li>
              </ul>
            </div>

            {/* Back to Home Button */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <Button
                onClick={() => navigate("/")}
                className="group relative px-10 py-6 text-lg font-semibold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-luxury-black rounded-full overflow-hidden transition-all duration-500 hover:scale-105 shadow-[0_0_40px_rgba(217,119,6,0.3)] hover:shadow-[0_0_60px_rgba(217,119,6,0.5)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Back to Home
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ThankYouLiveSession;

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PurchaseModal from "@/components/PurchaseModal";
import SourceCodePurchaseModal from "@/components/SourceCodePurchaseModal";

const Index = () => {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isSourceCodeModalOpen, setIsSourceCodeModalOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>ai.budfi - Master AI Tools @ ₹99 | AI Masterclass Materials</title>
        <meta
          name="description"
          content="Learn AI tools and maximize your knowledge with ai.budfi's comprehensive AI Masterclass Materials. Get lifetime access to 50+ AI tools tutorials at just ₹99."
        />
        <meta name="keywords" content="AI tools, AI masterclass, learn AI, AI course India, BudFi, artificial intelligence" />
        <link rel="canonical" href="https://ai.budfi.in" />
        
        {/* Open Graph */}
        <meta property="og:title" content="ai.budfi - Master AI Tools @ ₹99" />
        <meta property="og:description" content="Learn AI tools and maximize your knowledge with comprehensive AI Masterclass Materials. Lifetime access at just ₹99." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ai.budfi.in" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ai.budfi - Master AI Tools @ ₹99" />
        <meta name="twitter:description" content="Learn AI tools and maximize your knowledge with comprehensive AI Masterclass Materials." />
      </Helmet>

      <main className="min-h-screen">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ServicesSection 
          onBuyClick={() => setIsPurchaseModalOpen(true)} 
          onSourceCodeBuyClick={() => setIsSourceCodeModalOpen(true)}
        />
        <ContactSection />
        <Footer />
        <PurchaseModal
          isOpen={isPurchaseModalOpen}
          onClose={() => setIsPurchaseModalOpen(false)}
        />
        <SourceCodePurchaseModal
          isOpen={isSourceCodeModalOpen}
          onClose={() => setIsSourceCodeModalOpen(false)}
        />
      </main>
    </>
  );
};

export default Index;

import { useState } from "react";
import Navbar from "@/components/Navbar";
import FeeCalculator from "@/components/FeeCalculator";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import RewardsSection from "@/components/RewardsSection";
import PaymentSection from "@/components/PaymentSection";
import LiveRewardsFeed from "@/components/LiveRewardsFeed";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ApplicationModal from "@/components/ApplicationModal";

const Index = () => {
  const [applyOpen, setApplyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onApply={() => setApplyOpen(true)} />
      <div className="pt-16">
        <FeeCalculator onApply={() => setApplyOpen(true)} />
      </div>
      <HeroSection onApply={() => setApplyOpen(true)} />
      <FeaturesSection />
      <HowItWorksSection />
      <RewardsSection />
      <PaymentSection />
      <LiveRewardsFeed />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <ApplicationModal open={applyOpen} onOpenChange={setApplyOpen} />
    </div>
  );
};

export default Index;

// src/pages/LandingPage.tsx
console.log("Landing Page Loaded ✅");
import { Button } from "@/components/LandingPageUI/button";
import { Card } from "@/components/LandingPageUI/card";
import { Input } from "@/components/LandingPageUI/input";
import { Tooltip } from "@/components/LandingPageUI/tooltip";
import HeroSection from "@/components/LandingPage/HeroSection";
import TradingChart from "@/components/LandingPage/TradingChart";
import FeatureHighlights from "@/components/LandingPage/FeatureHighlights";
import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";


const LandingPage = () => {
  return (
      <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TradingChart />
      <FeatureHighlights />
      <Footer />
      <Button />
      <Input />
      <Tooltip />
      <Card />
      {/* Add any additional components or sections as needed */}
    </div>
  );
};

export default LandingPage;

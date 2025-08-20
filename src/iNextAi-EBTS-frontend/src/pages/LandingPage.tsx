
import { Tooltip } from "@/components/LandingPageUI/tooltip";
import HeroSection from "@/components/LandingPage/HeroSection";
import TradingChart from "@/components/LandingPage/TradingChart";
import FeatureHighlights from "@/components/LandingPage/FeatureHighlights";
import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */}
      <HeroSection />
      <TradingChart />
      <FeatureHighlights />
      <Footer />
      <Tooltip />
      {/* Add any additional components or sections as needed */}
    </div>
  );
};

export default LandingPage;
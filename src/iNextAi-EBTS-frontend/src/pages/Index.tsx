import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PerformanceMetrics } from "@/components/dashboard/PerformanceMetrics";
import { EmotionalTriggers } from "@/components/dashboard/EmotionalTriggers";
import { MoodTracker } from "@/components/dashboard/MoodTracker";
import { AdvancedPerformanceChart } from "@/components/dashboard/AdvancedPerformanceChart";
import { RealTimeTradeFeed } from "@/components/dashboard/RealTimeTradeFeed";
import { AIInsightCards } from "@/components/dashboard/AIInsightCards";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import HeroSection from "@/components/LandingPage/HeroSection";
import TradingChart from "@/components/LandingPage/TradingChart";
import FeatureHighlights from "@/components/LandingPage/FeatureHighlights";
import Footer from "@/components/LandingPage/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <TradingChart />
      <FeatureHighlights />
      <Footer />
    </div>
  );
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6">
        {/* Top Row - Performance Overview */}
        <AdvancedPerformanceChart />
        
        {/* Second Row - Core Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <PerformanceMetrics />
            <RecentActivities />
          </div>
          <div>
            <MoodTracker />
          </div>
        </div>
        
        {/* Third Row - Emotional Intelligence */}
        <EmotionalTriggers />
        
        {/* Fourth Row - AI Insights */}
        <AIInsightCards />
        
        {/* Fifth Row - Real-time Data */}
        <RealTimeTradeFeed />
      </div>
    </DashboardLayout>
};

export default Index;

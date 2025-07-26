// src/pages/Dashboard.tsx
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PerformanceMetrics } from "@/components/dashboard/PerformanceMetrics";
import { EmotionalTriggers } from "@/components/dashboard/EmotionalTriggers";
import { MoodTracker } from "@/components/dashboard/MoodTracker";
import { AdvancedPerformanceChart } from "@/components/dashboard/AdvancedPerformanceChart";
import { RealTimeTradeFeed } from "@/components/dashboard/RealTimeTradeFeed";
import { AIInsightCards } from "@/components/dashboard/AIInsightCards";
import { RecentActivities } from "@/components/dashboard/RecentActivities";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6">
        <AdvancedPerformanceChart />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <PerformanceMetrics />
            <RecentActivities />
          </div>
          <MoodTracker />
        </div>
        <EmotionalTriggers />
        <AIInsightCards />
        <RealTimeTradeFeed />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

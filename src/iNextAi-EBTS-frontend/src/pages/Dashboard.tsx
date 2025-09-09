// src/pages/Dashboard.tsx
import { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PerformanceMetrics } from "@/components/dashboard/PerformanceMetrics";
import { EmotionalTriggers } from "@/components/dashboard/EmotionalTriggers";
import { MoodTracker } from "@/components/dashboard/MoodTracker";
import { AdvancedPerformanceChart } from "@/components/dashboard/AdvancedPerformanceChart";
import { RealTimeTradeFeed } from "@/components/dashboard/RealTimeTradeFeed";
import { AIInsightCards } from "@/components/dashboard/AIInsightCards";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { QuickActionBar } from '@/components/dashboard/QuickActionBar';
import { WindowLayer } from '@/components/window/WindowLayer';
import { DockTray } from '@/components/window/DockTray';
import { useWindowStore } from '@/store/useWindowStore';

const Dashboard = () => {
    const { focusedId, close, minimize, maximize, setFocused } = useWindowStore();

  // Keyboard shortcuts
    useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      
      if (e.key === 'Escape' && focusedId) {
        close(focusedId);
        setFocused(null);
      } else if (isCtrlOrCmd && e.key === 'm' && focusedId) {
        e.preventDefault();
        minimize(focusedId);
        setFocused(null);
      } else if (isCtrlOrCmd && e.shiftKey && e.key === 'F' && focusedId) {
        e.preventDefault();
        maximize(focusedId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedId, close, minimize, maximize, setFocused]);
  return (
    <DashboardLayout>
  
      <div className="space-y-4 md:space-y-6">
        <AdvancedPerformanceChart />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">

          </div>
        </div>
      </div>
      <QuickActionBar />
        
        {/* Window Layer for floating windows */}
        <WindowLayer />
        
        {/* Dock Tray for minimized windows */}
        <DockTray />
    </DashboardLayout>
  );
};

export default Dashboard;

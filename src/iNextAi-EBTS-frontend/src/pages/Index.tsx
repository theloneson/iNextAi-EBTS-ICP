import React, { useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { AdvancedPerformanceChart } from '@/components/dashboard/AdvancedPerformanceChart';
import { QuickActionBar } from '@/components/dashboard/QuickActionBar';
import { WindowLayer } from '@/components/window/WindowLayer';
import { DockTray } from '@/components/window/DockTray';
import { useWindowStore } from '@/store/useWindowStore';

const Index = () => {
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
      <div className="space-y-6 pb-20 min-h-screen relative">
        {/* Always Visible Performance Analytics */}
        <AdvancedPerformanceChart />
        
        {/* Quick Action Bar */}
        <QuickActionBar />
        
        {/* Window Layer for floating windows */}
        <WindowLayer />
        
        {/* Dock Tray for minimized windows */}
        <DockTray />
      </div>
    </DashboardLayout>
  );
};

export default Index;

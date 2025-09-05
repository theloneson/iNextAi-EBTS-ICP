import React from 'react';
import { BarChart3, Smile, Zap, Bot, Radio, Activity } from 'lucide-react';
import { PerformanceMetrics } from '@/components/dashboard/PerformanceMetrics';
import { MoodTracker } from '@/components/dashboard/MoodTracker';
import { EmotionalTriggers } from '@/components/dashboard/EmotionalTriggers';
import { AIInsightCards } from '@/components/dashboard/AIInsightCards';
import { RealTimeTradeFeed } from '@/components/dashboard/RealTimeTradeFeed';
import { RecentActivities } from '@/components/dashboard/RecentActivities';
import type { WidgetType } from '@/store/useWindowStore';

export interface WidgetConfig {
  title: string;
  emoji: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;
}

export const widgetMap: Record<WidgetType, WidgetConfig> = {
  performance: {
    title: 'Performance Metrics',
    emoji: '📊',
    icon: BarChart3,
    component: PerformanceMetrics,
  },
  mood: {
    title: 'Mood Tracker',
    emoji: '😀',
    icon: Smile,
    component: MoodTracker,
  },
  emotional: {
    title: 'Emotional Triggers',
    emoji: '⚡',
    icon: Zap,
    component: EmotionalTriggers,
  },
  ai: {
    title: 'AI Insights',
    emoji: '🤖',
    icon: Bot,
    component: AIInsightCards,
  },
  feed: {
    title: 'Real-Time Feed',
    emoji: '📰',
    icon: Radio,
    component: RealTimeTradeFeed,
  },
  activities: {
    title: 'Recent Activities',
    emoji: '📝',
    icon: Activity,
    component: RecentActivities,
  },
};

export const widgetTypes: WidgetType[] = Object.keys(widgetMap) as WidgetType[];
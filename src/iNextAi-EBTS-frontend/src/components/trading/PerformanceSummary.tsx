import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, Clock, Brain, DollarSign } from "lucide-react";

export const PerformanceSummary = () => {
  const performanceData = {
    totalPnL: 1247.83,
    totalPnLPercent: 12.48,
    winRate: 68.5,
    totalTrades: 73,
    avgHoldTime: "4h 23m",
    emotionalStability: 7.2,
    bestPair: "BTC/USDT",
    worstPair: "SOL/USDT",
    weeklyPnL: 324.67,
    monthlyPnL: 1247.83
  };

  const isPositive = performanceData.totalPnL > 0;

  const metrics = [
    {
      icon: DollarSign,
      label: "Total P&L",
      value: `$${performanceData.totalPnL.toLocaleString()}`,
      subValue: `${isPositive ? '+' : ''}${performanceData.totalPnLPercent}%`,
      color: isPositive ? "text-success" : "text-destructive",
      bgColor: isPositive ? "bg-success/10" : "bg-destructive/10"
    },
    {
      icon: Target,
      label: "Win Rate",
      value: `${performanceData.winRate}%`,
      subValue: `${performanceData.totalTrades} trades`,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Clock,
      label: "Avg Hold Time",
      value: performanceData.avgHoldTime,
      subValue: "Optimal range",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: Brain,
      label: "Emotional Score",
      value: `${performanceData.emotionalStability}/10`,
      subValue: "Stable",
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  return (
    <Card className="glass-card p-6">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Performance Summary</h3>
          <Badge variant="outline" className="border-border/50">
            Simulation Mode
          </Badge>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className={`${metric.bgColor} rounded-lg p-4`}>
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
                <div className="text-right">
                  <div className={`text-lg font-bold ${metric.color}`}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {metric.subValue}
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium text-foreground">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Win Rate Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Win Rate Progress</span>
            <span className="text-sm text-muted-foreground">Target: 70%</span>
          </div>
          <Progress value={performanceData.winRate} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Current: {performanceData.winRate}%</span>
            <span>2% to target</span>
          </div>
        </div>

        {/* Best & Worst Performers */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Asset Performance</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Best: {performanceData.bestPair}</span>
              </div>
              <Badge variant="secondary" className="bg-success/20 text-success">
                +23.4%
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium">Worst: {performanceData.worstPair}</span>
              </div>
              <Badge variant="secondary" className="bg-destructive/20 text-destructive">
                -8.7%
              </Badge>
            </div>
          </div>
        </div>

        {/* Time-based Performance */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/10 rounded-lg">
            <div className="text-lg font-bold text-foreground">
              ${performanceData.weeklyPnL.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">This Week</div>
          </div>
          
          <div className="text-center p-3 bg-muted/10 rounded-lg">
            <div className="text-lg font-bold text-foreground">
              ${performanceData.monthlyPnL.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">This Month</div>
          </div>
        </div>

        {/* Emotional Trading Insights */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Emotional Insights</span>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Best emotional state:</span>
              <span className="font-medium">Confident</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Worst emotional state:</span>
              <span className="font-medium">Fearful</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Improvement area:</span>
              <span className="font-medium">Reduce anxiety trades</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
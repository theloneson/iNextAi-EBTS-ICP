import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Percent, Plus, BarChart3 } from "lucide-react";

export function PerformanceMetrics() {
  // Donut chart data
  const data = {
    profit: 60,
    loss: 30,
    breakEven: 10
  };
  
  const total = data.profit + data.loss + data.breakEven;
  const profitAngle = (data.profit / total) * 360;
  const lossAngle = (data.loss / total) * 360;
  const breakEvenAngle = (data.breakEven / total) * 360;

  const radius = 80;
  const strokeWidth = 20;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  return (
    <Card className="glass-card border-white/10 glow-primary">
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-foreground text-base md:text-lg">
          <div className="flex items-center gap-2">
            <div className="p-1.5 md:p-2 rounded-lg gradient-primary glow-primary">
              <Shield size={16} className="text-white md:w-[18px] md:h-[18px]" />
            </div>
            Performance Metrics
          </div>
          <div className="sm:ml-auto">
            <div className="text-left sm:text-right">
              <div className="text-lg md:text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                +343.50 USDT
              </div>
              <div className="text-xs text-success">+12.5% today</div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left side - Enhanced Metrics */}
          <div className="space-y-3 md:space-y-4">
            <div className="glass-card p-3 md:p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="p-1.5 md:p-2 rounded-lg bg-success/10">
                    <Percent size={14} className="text-success md:w-4 md:h-4" />
                  </div>
                  <span className="text-muted-foreground text-sm md:text-base">Win Rate</span>
                </div>
                <span className="text-lg md:text-2xl font-bold text-success glow-success">68%</span>
              </div>
            </div>
            
            <div className="glass-card p-3 md:p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="p-1.5 md:p-2 rounded-lg bg-primary/10">
                    <Plus size={14} className="text-primary md:w-4 md:h-4" />
                  </div>
                  <span className="text-muted-foreground text-sm md:text-base">Profit Factor</span>
                </div>
                <span className="text-lg md:text-2xl font-bold text-primary">2.34</span>
              </div>
            </div>
            
            <div className="glass-card p-3 md:p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="p-1.5 md:p-2 rounded-lg bg-accent/10">
                    <BarChart3 size={14} className="text-accent md:w-4 md:h-4" />
                  </div>
                  <span className="text-muted-foreground text-sm md:text-base">Total Trades</span>
                </div>
                <span className="text-lg md:text-2xl font-bold text-foreground">47</span>
              </div>
            </div>
          </div>

          {/* Right side - Donut Chart */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <svg width={radius * 2} height={radius * 2} className="transform -rotate-90 w-32 h-32 md:w-40 md:h-40">
                {/* Profit segment */}
                <circle
                  cx={radius}
                  cy={radius}
                  r={normalizedRadius}
                  stroke="hsl(var(--success))"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={`${(profitAngle / 360) * circumference} ${circumference}`}
                  strokeLinecap="round"
                />
                {/* Loss segment */}
                <circle
                  cx={radius}
                  cy={radius}
                  r={normalizedRadius}
                  stroke="hsl(var(--destructive))"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={`${(lossAngle / 360) * circumference} ${circumference}`}
                  strokeDashoffset={-((profitAngle / 360) * circumference)}
                  strokeLinecap="round"
                />
                {/* Break-even segment */}
                <circle
                  cx={radius}
                  cy={radius}
                  r={normalizedRadius}
                  stroke="hsl(var(--warning))"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={`${(breakEvenAngle / 360) * circumference} ${circumference}`}
                  strokeDashoffset={-(((profitAngle + lossAngle) / 360) * circumference)}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            
            {/* Legend */}
            <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 mt-3 md:mt-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-success rounded-full"></div>
                <span className="text-muted-foreground">Profit</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-destructive rounded-full"></div>
                <span className="text-muted-foreground">Loss</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-warning rounded-full"></div>
                <span className="text-muted-foreground">Break-Even</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
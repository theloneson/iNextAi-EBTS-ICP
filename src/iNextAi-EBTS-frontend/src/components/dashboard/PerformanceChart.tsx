import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp } from "lucide-react";

export function PerformanceChart() {
  // Generate mock data for the chart
  const chartData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    profit: Math.random() * 2000 - 500,
    emotion: Math.random() * 100,
    volume: Math.random() * 100 + 20,
  }));

  const totalProfit = chartData.reduce((sum, day) => sum + day.profit, 0);
  const avgEmotion = chartData.reduce((sum, day) => sum + day.emotion, 0) / chartData.length;

  const maxProfit = Math.max(...chartData.map(d => d.profit));
  const minProfit = Math.min(...chartData.map(d => d.profit));
  const range = maxProfit - minProfit;

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <BarChart3 size={20} className="text-primary" />
          Performance & Emotion Correlation
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-xs">7D</Button>
          <Button variant="ghost" size="sm" className="text-xs bg-primary/20 text-primary">30D</Button>
          <Button variant="ghost" size="sm" className="text-xs">90D</Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className={`text-lg font-bold ${totalProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
              {totalProfit >= 0 ? '+' : ''}{totalProfit.toFixed(0)} USDT
            </div>
            <div className="text-xs text-muted-foreground">Total P&L</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{avgEmotion.toFixed(0)}</div>
            <div className="text-xs text-muted-foreground">Avg Emotion</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">68%</div>
            <div className="text-xs text-muted-foreground">Win Rate</div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="h-64 bg-muted/30 rounded-lg p-4 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="0"
                y1={i * 50}
                x2="400"
                y2={i * 50}
                stroke="hsl(var(--border))"
                strokeWidth="1"
                opacity="0.3"
              />
            ))}
            
            {/* Profit/Loss bars */}
            {chartData.slice(0, 20).map((data, index) => {
              const x = (index * 20) + 5;
              const height = Math.abs(data.profit) / range * 120;
              const y = data.profit > 0 ? 100 - height : 100;
              
              return (
                <rect
                  key={index}
                  x={x}
                  y={y}
                  width="10"
                  height={height}
                  fill={data.profit > 0 ? "hsl(var(--success))" : "hsl(var(--destructive))"}
                  rx="2"
                  opacity="0.8"
                />
              );
            })}
            
            {/* Emotion line */}
            <polyline
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              points={chartData.slice(0, 20).map((data, index) => 
                `${(index * 20) + 10},${200 - (data.emotion * 1.5)}`
              ).join(' ')}
            />
            
            {/* Zero line */}
            <line
              x1="0"
              y1="100"
              x2="400"
              y2="100"
              stroke="hsl(var(--foreground))"
              strokeWidth="1"
              opacity="0.3"
              strokeDasharray="5,5"
            />
          </svg>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded"></div>
            <span className="text-muted-foreground">Profit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-destructive rounded"></div>
            <span className="text-muted-foreground">Loss</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-primary rounded"></div>
            <span className="text-muted-foreground">Emotion Score</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
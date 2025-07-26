import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";

export function TradingChart() {
  // Mock chart data
  const chartData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    profit: Math.random() * 1000 - 200,
    volume: Math.random() * 50 + 10,
  }));

  const maxProfit = Math.max(...chartData.map(d => d.profit));
  const minProfit = Math.min(...chartData.map(d => d.profit));
  const range = maxProfit - minProfit;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <BarChart3 size={16} className="text-primary" />
          </div>
          Trading Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
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
                const x = (index * 20) + 10;
                const height = Math.abs(data.profit) / range * 150;
                const y = data.profit > 0 ? 100 - height : 100;
                
                return (
                  <rect
                    key={index}
                    x={x}
                    y={y}
                    width="15"
                    height={height}
                    fill={data.profit > 0 ? "hsl(142 76% 36%)" : "hsl(0 84% 60%)"}
                    rx="2"
                  />
                );
              })}
              
              {/* Zero line */}
              <line
                x1="0"
                y1="100"
                x2="400"
                y2="100"
                stroke="hsl(var(--foreground))"
                strokeWidth="2"
                opacity="0.5"
              />
            </svg>
          </div>
          
          {/* Legend */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-muted-foreground">Profit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-muted-foreground">Loss</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TradingChartProps {
  asset: string;
  mode: string;
}

export const TradingChart = ({ asset, mode }: TradingChartProps) => {
  // Mock price data
  const currentPrice = asset === "BTC" ? 42850.32 : asset === "ETH" ? 2641.18 : 98.45;
  const change24h = asset === "BTC" ? 3.42 : asset === "ETH" ? -1.28 : 5.67;
  const isPositive = change24h > 0;

  return (
    <Card className="glass-card h-full min-h-[400px] lg:min-h-[500px] p-6">
      <div className="flex flex-col h-full">
        
        {/* Chart Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground">{asset}/USDT</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-3xl font-mono font-bold text-foreground">
                  ${currentPrice.toLocaleString()}
                </span>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                  isPositive ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                }`}>
                  {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="text-sm font-medium">
                    {isPositive ? '+' : ''}{change24h}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
            </Badge>
            <Badge variant="outline" className="border-border/50">
              Simulated
            </Badge>
          </div>
        </div>

        {/* Chart Area - Placeholder for TradingView */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-border/20">
            
            {/* Mock Chart Visualization */}
            <div className="flex items-end justify-center h-full p-8">
              {Array.from({ length: 50 }, (_, i) => {
                const height = Math.random() * 80 + 20;
                const isUp = Math.random() > 0.5;
                return (
                  <div
                    key={i}
                    className={`w-2 mx-0.5 rounded-t transition-all duration-300 ${
                      isUp ? 'bg-success/60' : 'bg-destructive/60'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                );
              })}
            </div>

            {/* Chart Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="text-6xl">📈</div>
                <div className="text-lg font-semibold text-muted-foreground">
                  TradingView Chart Integration
                </div>
                <div className="text-sm text-muted-foreground max-w-md">
                  Real-time {asset} price data and advanced charting tools will be integrated here
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/20">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Timeframe:</span>
            {['1m', '5m', '15m', '1h', '4h', '1d'].map((tf) => (
              <button
                key={tf}
                className="px-3 py-1 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {tf}
              </button>
            ))}
          </div>
          
          <div className="text-sm text-muted-foreground">
            Volume: {(Math.random() * 1000000).toFixed(0)} {asset}
          </div>
        </div>
      </div>
    </Card>
  );
};
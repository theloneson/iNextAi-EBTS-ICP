import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdvancedTradingChartProps {
  asset: string;
  mode: string;
}

export const AdvancedTradingChart = ({ asset, mode }: AdvancedTradingChartProps) => {
  const [currentPrice, setCurrentPrice] = useState(0);
  const [change24h, setChange24h] = useState(0);
  const [isConnected, setIsConnected] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');
  const [priceData, setPriceData] = useState<number[]>([]);

  // Generate smooth realistic price data
  const generatePriceData = (asset: string) => {
    const basePrice = asset === "BTC" ? 42850 : asset === "ETH" ? 2641 : 98;
    const data = [];
    let currentPrice = basePrice;
    
    for (let i = 0; i < 150; i++) {
      const volatility = 0.008;
      const trend = Math.sin(i * 0.1) * 0.002;
      const randomChange = (Math.random() - 0.5) * volatility;
      currentPrice *= (1 + trend + randomChange);
      data.push(Number(currentPrice.toFixed(2)));
    }
    
    setCurrentPrice(data[data.length - 1]);
    setChange24h(((data[data.length - 1] - data[data.length - 24] || data[0]) / (data[data.length - 24] || data[0])) * 100);
    
    return data;
  };

  useEffect(() => {
    const data = generatePriceData(asset);
    setPriceData(data);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setPriceData(prev => {
        const newData = [...prev];
        const lastPrice = newData[newData.length - 1];
        const change = (Math.random() - 0.5) * 0.005;
        const newPrice = lastPrice * (1 + change);
        newData.push(Number(newPrice.toFixed(2)));
        return newData.slice(-150);
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, [asset]);

  const isPositive = change24h > 0;
  const timeframes = ['1m', '5m', '15m', '1h', '4h', '1d', '1w'];

  return (
    <Card className="glass-card h-[420px] p-4">
      <div className="flex flex-col h-full">
        
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success animate-pulse' : 'bg-destructive'}`} />
              <h3 className="text-lg font-semibold text-foreground">{asset}/USDT</h3>
            </div>
            <span className="text-xl font-mono font-bold text-foreground">
              ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
              isPositive ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
            }`}>
              {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>{isPositive ? '+' : ''}{change24h.toFixed(2)}%</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/20 text-primary text-xs px-2 py-0.5">
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Badge>
          </div>
        </div>

        {/* Professional Chart Area */}
        <div className="flex-1 relative rounded-xl border border-border/30 overflow-hidden bg-gradient-to-br from-card/80 to-background/60 backdrop-blur-sm">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px_16px]" />
          <div className="relative h-full p-3">
            <svg className="w-full h-full" viewBox="0 0 1000 280">
              <defs>
                <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                  <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.01" />
                </linearGradient>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Subtle grid */}
              {[...Array(6)].map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="40"
                  y1={40 + (i * 40)}
                  x2="960"
                  y2={40 + (i * 40)}
                  stroke="hsl(var(--border))"
                  strokeOpacity="0.15"
                  strokeWidth="0.5"
                />
              ))}
              {[...Array(12)].map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={80 + (i * 80)}
                  y1="40"
                  x2={80 + (i * 80)}
                  y2="240"
                  stroke="hsl(var(--border))"
                  strokeOpacity="0.1"
                  strokeWidth="0.5"
                />
              ))}

              {/* Price line */}
              <path
                d={priceData.map((price, i) => {
                  const x = 40 + (i * (920 / priceData.length));
                  const maxPrice = Math.max(...priceData);
                  const minPrice = Math.min(...priceData);
                  const y = 240 - ((price - minPrice) / (maxPrice - minPrice)) * 200;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                stroke="url(#lineGradient)"
                strokeWidth="2.5"
                fill="none"
                filter="url(#glow)"
              />

              {/* Fill area */}
              <path
                d={priceData.map((price, i) => {
                  const x = 40 + (i * (920 / priceData.length));
                  const maxPrice = Math.max(...priceData);
                  const minPrice = Math.min(...priceData);
                  const y = 240 - ((price - minPrice) / (maxPrice - minPrice)) * 200;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ') + ' L 960 240 L 40 240 Z'}
                fill="url(#priceGradient)"
              />

              {/* Current price indicator */}
              <circle
                cx={40 + ((priceData.length - 1) * (920 / priceData.length))}
                cy={240 - ((priceData[priceData.length - 1] - Math.min(...priceData)) / (Math.max(...priceData) - Math.min(...priceData))) * 200}
                r="3"
                fill="hsl(var(--primary))"
                stroke="hsl(var(--background))"
                strokeWidth="2"
                className="animate-pulse"
              />
              
              {/* Price labels */}
              <text
                x="20"
                y={45 + ((Math.max(...priceData) - Math.max(...priceData)) / (Math.max(...priceData) - Math.min(...priceData))) * 200}
                className="fill-muted-foreground text-[10px] font-mono"
              >
                {Math.max(...priceData).toFixed(0)}
              </text>
              <text
                x="20"
                y={245}
                className="fill-muted-foreground text-[10px] font-mono"
              >
                {Math.min(...priceData).toFixed(0)}
              </text>
            </svg>
          </div>
          
          {/* Live price overlay */}
          <div className="absolute top-3 right-3 glass-card p-2 rounded-lg">
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                <span className="text-muted-foreground">Live</span>
              </div>
              <span className="font-mono font-semibold text-foreground">
                ${currentPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 pt-4 border-t border-border/20 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Timeframe:</span>
            <div className="flex gap-1">
              {timeframes.map((tf) => (
                <Button
                  key={tf}
                  variant={selectedTimeframe === tf ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedTimeframe(tf)}
                  className="px-3 py-1 h-7 text-xs"
                >
                  {tf}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div>Volume: {(Math.random() * 1000000).toFixed(0)} {asset}</div>
            <div className={`flex items-center gap-1 ${isConnected ? 'text-success' : 'text-destructive'}`}>
              {isConnected ? (
                <>
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span>Live</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-destructive rounded-full" />
                  <span>Disconnected</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
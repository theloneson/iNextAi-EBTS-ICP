import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PriceData {
  time: string;
  price: number;
  volume: number;
}

const TradingChart = () => {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [currentPrice, setCurrentPrice] = useState(5.512);
  const [priceChange, setPriceChange] = useState(+0.15);

  useEffect(() => {
    // Generate mock price data
    const generatePriceData = () => {
      const data: PriceData[] = [];
      let basePrice = 5.5;
      
      for (let i = 0; i < 24; i++) {
        const time = new Date();
        time.setHours(i, 0, 0, 0);
        
        // Add some randomness to price
        basePrice += (Math.random() - 0.5) * 0.5;
        basePrice = Math.max(4.5, Math.min(6.5, basePrice)); // Keep within range
        
        data.push({
          time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          price: Number(basePrice.toFixed(2)),
          volume: Math.random() * 1000000
        });
      }
      
      return data;
    };

    setPriceData(generatePriceData());

    // Simulate real-time price updates
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 0.1;
      setCurrentPrice(prev => Number((prev + change).toFixed(2)));
      setPriceChange(prev => Number((prev + change * 0.1).toFixed(2)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Live Market Data
          </h2>
          <p className="text-muted-foreground text-lg">Real-time ICP/USDT trading powered by iNextAI</p>
        </div>

        <div className="glass-card p-8 rounded-3xl max-w-6xl mx-auto">
          {/* Price Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-primary">ICP/USDT</h3>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-3xl font-bold">${currentPrice}</span>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                  priceChange >= 0 ? 'bg-accent/20 text-accent' : 'bg-destructive/20 text-destructive'
                }`}>
                  {priceChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="font-semibold">
                    {priceChange >= 0 ? '+' : ''}{priceChange} ({((priceChange / currentPrice) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-muted-foreground">24h Volume</div>
              <div className="text-lg font-semibold">$2.4M</div>
            </div>
          </div>

          {/* Mock Chart */}
          <div className="relative h-80 bg-background/50 rounded-2xl p-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            
            {/* Chart Grid */}
            <div className="absolute inset-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="absolute w-full border-t border-border/30" style={{ top: `${i * 25}%` }} />
              ))}
              {[...Array(7)].map((_, i) => (
                <div key={i} className="absolute h-full border-l border-border/30" style={{ left: `${i * 16.66}%` }} />
              ))}
            </div>

            {/* Mock Price Line */}
            <svg className="absolute inset-6 w-full h-full" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              <path
                d="M0,150 Q100,120 200,100 Q300,80 400,90"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                fill="none"
                className="animate-pulse"
              />
              
              <path
                d="M0,150 Q100,120 200,100 Q300,80 400,90 L400,200 L0,200 Z"
                fill="url(#priceGradient)"
              />
            </svg>

            {/* Current Price Indicator */}
            <div className="absolute right-6 top-1/3 flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium bg-primary/20 px-2 py-1 rounded">
                ${currentPrice}
              </span>
            </div>
          </div>

          {/* Trading Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">24h High</div>
              <div className="text-lg font-semibold text-accent">$5.89</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">24h Low</div>
              <div className="text-lg font-semibold text-destructive">$5.21</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Market Cap</div>
              <div className="text-lg font-semibold">$5.2B</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">AI Confidence</div>
              <div className="text-lg font-semibold text-primary">87%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradingChart;
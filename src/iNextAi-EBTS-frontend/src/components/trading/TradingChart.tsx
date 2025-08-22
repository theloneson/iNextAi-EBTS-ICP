import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { RealtimeCandlestickChart } from "@/components/trading/RealtimeCandlestickChart";
import axios from "axios";

interface TradingChartProps {
  asset: string; // e.g. "BTC", "ETH", "ICP"
  mode: string;
}

export const TradingChart = ({ asset, mode }: TradingChartProps) => {
  const [price, setPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const symbol = `${asset}USDT`.toUpperCase(); // e.g. ICPUSDT
      try {
        const response = await axios.get(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`
        );
        setPrice(parseFloat(response.data.lastPrice));
        setPriceChange(parseFloat(response.data.priceChangePercent));
        setError(false);
      } catch (err) {
        console.error(`❌ Failed to fetch price for ${symbol}`, err);
        setError(true);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // every 10 sec

    return () => clearInterval(interval);
  }, [asset]);

  const isPositive = (priceChange ?? 0) >= 0;

  return (
    <Card className="glass-card h-full min-h-[400px] lg:min-h-[500px] p-6">
      <div className="flex flex-col h-full">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground">{asset}/USDT</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-3xl font-mono font-bold text-foreground">
                  {error
                    ? "Unavailable"
                    : price !== null
                    ? `$${price.toLocaleString(undefined, {
                        maximumFractionDigits: 6,
                      })}`
                    : "Loading..."}
                </span>
                {priceChange !== null && !error && (
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                      isPositive ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span className="text-sm font-medium">
                      {isPositive ? "+" : ""}
                      {priceChange.toFixed(2)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
            </Badge>
            <Badge variant="outline" className="border-border/50">Simulated</Badge>
          </div>
        </div>

        {/* Chart Area */}
        {/* Real-Time Candlestick Chart */}
<div className="flex-1 relative">
  <RealtimeCandlestickChart symbol={`${asset}USDT`} interval="5m" />
</div>

        {/* Footer Controls */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/20">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Timeframe:</span>
            {["1m", "5m", "15m", "1h", "4h", "1d"].map((tf) => (
              <button
                key={tf}
                className="px-3 py-1 rounded-md hover:bg-primary/10 hover:text-primary"
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

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const PAIRS = ["BTCUSDT", "ETHUSDT", "ICPUSDT", "SOLUSDT", "ADAUSDT", "MATICUSDT", "DOTUSDT"];

export function TradingChart() {
  const [selectedPair, setSelectedPair] = useState("BTCUSDT");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.binance.com/api/v3/klines?symbol=${selectedPair}&interval=1h&limit=30`
        );
        const formatted = res.data.map(([timestamp, , , , close]) => ({
          time: new Date(timestamp).toLocaleTimeString(),
          price: parseFloat(close),
        }));
        setChartData(formatted);
      } catch (err) {
        console.error("Failed to fetch chart data", err);
      }
    };

    fetchData();
  }, [selectedPair]);

  const max = Math.max(...chartData.map((d) => d.price));
  const min = Math.min(...chartData.map((d) => d.price));
  const range = max - min;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <BarChart3 size={16} className="text-primary" />
          </div>
          {selectedPair} - Live Price Chart
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Token Tabs */}
        <div className="flex flex-wrap gap-2">
          {PAIRS.map((pair) => (
            <button
              key={pair}
              onClick={() => setSelectedPair(pair)}
              className={`px-3 py-1 text-sm rounded-full ${
                pair === selectedPair
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {pair.replace("USDT", "")}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="h-64 bg-muted/30 rounded-lg p-4 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            {/* Price Line */}
            {chartData.map((point, i) => {
              const x = (i / chartData.length) * 400;
              const y = 200 - ((point.price - min) / range) * 200;
              const next = chartData[i + 1];
              if (!next) return null;
              const x2 = ((i + 1) / chartData.length) * 400;
              const y2 = 200 - ((next.price - min) / range) * 200;
              return (
                <line
                  key={i}
                  x1={x}
                  y1={y}
                  x2={x2}
                  y2={y2}
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}

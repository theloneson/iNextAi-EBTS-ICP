// components/ui/Chart.tsx

import {
  createChart,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
  Time,
} from "lightweight-charts";
import { useEffect, useRef } from "react";
import axios from "axios";

interface Candle {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface RealTimeCandlestickChartProps {
  symbol: string; // e.g. BTCUSDT
  interval?: string; // e.g. "1m", "5m", "15m", etc.
}

export default function RealTimeCandlestickChart({
  symbol = "BTCUSDT",
  interval = "1m",
}: RealTimeCandlestickChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    const fetchHistoricalCandles = async () => {
      const res = await axios.get(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=100`
      );

      const candles: Candle[] = res.data.map((candle: any) => ({
        time: Math.floor(candle[0] / 1000), // UNIX timestamp (s)
        open: parseFloat(candle[1]),
        high: parseFloat(candle[2]),
        low: parseFloat(candle[3]),
        close: parseFloat(candle[4]),
      }));

      if (!chartRef.current && chartContainerRef.current) {
        const chart = createChart(chartContainerRef.current, {
          layout: {
            background: { color: "#0f172a" }, // bg-background
            textColor: "#cbd5e1", // text-muted
          },
          grid: {
            vertLines: { color: "#1e293b" },
            horzLines: { color: "#1e293b" },
          },
          crosshair: { mode: CrosshairMode.Normal },
          timeScale: { timeVisible: true },
        });

        chartRef.current = chart;
        const candleSeries = chart.addCandlestickSeries({
          upColor: "#4ade80",
          borderUpColor: "#4ade80",
          wickUpColor: "#4ade80",
          downColor: "#f87171",
          borderDownColor: "#f87171",
          wickDownColor: "#f87171",
        });

        candleSeries.setData(candles);
        seriesRef.current = candleSeries;
      } else if (seriesRef.current) {
        seriesRef.current.setData(candles);
      }
    };

    fetchHistoricalCandles();

    const intervalId = setInterval(fetchHistoricalCandles, 15000); // refresh every 15s

    return () => clearInterval(intervalId);
  }, [symbol, interval]);

  return (
    <div
      ref={chartContainerRef}
      className="rounded-lg border border-border bg-card w-full h-[400px]"
    />
  );
}

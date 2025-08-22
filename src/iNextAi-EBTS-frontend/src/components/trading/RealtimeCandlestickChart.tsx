// components/trading/RealtimeCandlestickChart.tsx
import { useEffect, useRef } from "react";
import { createChart, CrosshairMode, UTCTimestamp } from "lightweight-charts";
import axios from "axios";

interface Props {
  symbol: string; // e.g. "BTCUSDT"
  interval?: string; // default = "5m"
}

export const RealtimeCandlestickChart = ({
  symbol,
  interval = "5m",
}: Props) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current!, {
      width: chartContainerRef.current!.clientWidth,
      height: 400,
      layout: {
        background: { color: "transparent" },
        textColor: "#ccc",
      },
      grid: {
        vertLines: { color: "#2c2c2e" },
        horzLines: { color: "#2c2c2e" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candleSeries = chart.addCandlestickSeries();

    const fetchCandles = async () => {
      try {
        const res = await axios.get(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=100`
        );

        const formattedData = res.data.map((d: any) => ({
          time: Math.floor(d[0] / 1000) as UTCTimestamp,
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4]),
        }));

        candleSeries.setData(formattedData);
      } catch (err) {
        console.error("🛑 Error fetching candlestick data:", err);
      }
    };

    fetchCandles();

    return () => chart.remove();
  }, [symbol, interval]);

  return (
    <div
      ref={chartContainerRef}
      className="w-full rounded-lg overflow-hidden border border-border bg-background"
    />
  );
};

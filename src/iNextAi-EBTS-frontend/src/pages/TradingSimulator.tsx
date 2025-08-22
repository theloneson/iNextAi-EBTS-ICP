// TradingSimulator.tsx

import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, useAnimationControls } from "framer-motion";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { AdvancedTradingChart } from "@/components/trading/AdvancedTradingChart";
import { BuySellPanel } from "@/components/trading/BuySellPanel";
import { EmotionTracker } from "@/components/trading/EmotionTracker";
import { TradeFeedbackPanel } from "@/components/trading/TradeFeedbackPanel";
import { PerformanceSummary } from "@/components/trading/PerformanceSummary";
import { AssetSelector } from "@/components/trading/AssetSelector";
import { TradeHistory } from "@/components/trading/TradeHistory";

type TickerMap = Record<string, number>;

const TICKER_SYMBOLS = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "ICPUSDT"];

const TradingSimulator = () => {
  const navigate = useNavigate();

  const [selectedAsset, setSelectedAsset] = useState("BTC");
  const [simulationMode, setSimulationMode] = useState<"live" | "paper">("live");
  const [currentEmotion, setCurrentEmotion] = useState("");
  const [livePrice, setLivePrice] = useState<number | null>(null);
  const [tickerPrices, setTickerPrices] = useState<TickerMap>({});
  const [change24h, setChange24h] = useState<number | null>(null);

  // Fetch selected asset live price (+ 24h change)
  useEffect(() => {
    const pair = `${selectedAsset}USDT`.toUpperCase();

    const fetchSelected = async () => {
      try {
        const res = await axios.get(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`
        );
        setLivePrice(parseFloat(res.data.lastPrice));
        setChange24h(parseFloat(res.data.priceChangePercent));
      } catch (e) {
        console.error("Error fetching selected asset 24h", e);
      }
    };

    fetchSelected();
    const id = setInterval(fetchSelected, 10_000);
    return () => clearInterval(id);
  }, [selectedAsset]);

  // Fetch multi-asset ticker prices
  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const results = await Promise.all(
          TICKER_SYMBOLS.map(async (s) => {
            const r = await axios.get(
              `https://api.binance.com/api/v3/ticker/price?symbol=${s}`
            );
            return [s, parseFloat(r.data.price)] as const;
          })
        );
        const map: TickerMap = {};
        results.forEach(([s, p]) => (map[s] = p));
        setTickerPrices(map);
      } catch (e) {
        console.error("Error fetching ticker prices", e);
      }
    };

    fetchTicker();
    const id = setInterval(fetchTicker, 10_000);
    return () => clearInterval(id);
  }, []);

  const isUp = (change24h ?? 0) >= 0;

  const marqueeItems = useMemo(() => {
    const list = TICKER_SYMBOLS.map((s) => ({
      sym: s.replace("USDT", "/USDT"),
      price: tickerPrices[s],
    }));
    return [...list, ...list];
  }, [tickerPrices]);

  const marqueeControls = useAnimationControls();
  useEffect(() => {
    marqueeControls.start({
      x: ["0%", "-50%"],
      transition: { duration: 30, ease: "linear", repeat: Infinity },
    });
  }, [marqueeControls]);

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <div className="container mx-auto px-4 pt-6">
        <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-xl shadow-lg overflow-hidden">
          <div className="p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile: icon-only */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/dashboard")}
                className="md:hidden rounded-full hover:bg-primary/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              {/* Desktop: full button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
                className="hidden md:flex hover:bg-primary/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>

              <div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                  Trading Simulator
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Practice executions, track emotions, and review performance.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                  simulationMode === "live"
                    ? "bg-primary/15 text-primary ring-1 ring-primary/20"
                    : "bg-muted/40 text-foreground ring-1 ring-border/60"
                }`}
              >
                {simulationMode === "live" ? "Live Mode" : "Paper Mode"}
              </span>
              {change24h !== null && (
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium ${
                    isUp
                      ? "bg-success/15 text-success"
                      : "bg-destructive/15 text-destructive"
                  }`}
                >
                  {isUp ? (
                    <TrendingUp className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5" />
                  )}
                  {isUp ? "+" : ""}
                  {change24h.toFixed(2)}%
                </span>
              )}
            </div>
          </div>

          {/* Asset selector + price */}
          <div className="flex flex-col gap-3 px-4 pb-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full md:w-auto">
              <AssetSelector
                selectedAsset={selectedAsset}
                onAssetChange={setSelectedAsset}
                simulationMode={simulationMode}
                onModeChange={(m) => setSimulationMode(m as "live" | "paper")}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {selectedAsset}/USDT
              </span>{" "}
              {livePrice !== null ? (
                `$${livePrice.toLocaleString(undefined, {
                  maximumFractionDigits: 6,
                })}`
              ) : (
                <span className="opacity-70">Loading…</span>
              )}
            </div>
          </div>

          {/* Price ticker */}
          <div className="relative h-10 overflow-hidden border-t border-border/60 bg-background/40">
            <motion.div
              className="absolute left-0 top-0 flex h-10 w-[200%] items-center"
              animate={marqueeControls}
            >
              {marqueeItems.map((item, idx) => (
                <div
                  key={`${item.sym}-${idx}`}
                  className="mx-3 flex items-center gap-2 border border-border/50 bg-card/60 px-3 py-1 rounded-md text-xs font-mono"
                >
                  <span className="text-muted-foreground">{item.sym}</span>
                  <span className="text-foreground">
                    {item.price
                      ? `$${item.price.toLocaleString(undefined, {
                          maximumFractionDigits: 5,
                        })}`
                      : "—"}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* LEFT: Chart + History + Feedback */}
          <div className="xl:col-span-2 flex flex-col gap-6">
            <Card className="glass-card rounded-2xl p-3 md:p-4">
              <AdvancedTradingChart asset={selectedAsset} mode={simulationMode} />
            </Card>

            <Card className="glass-card rounded-2xl p-3 md:p-4">
              <TradeHistory />
            </Card>

            <Card className="glass-card rounded-2xl p-3 md:p-4">
              <TradeFeedbackPanel currentEmotion={currentEmotion} />
            </Card>

            <div className="xl:hidden">
              <Card className="glass-card rounded-2xl p-3 md:p-4">
                <PerformanceSummary />
              </Card>
            </div>
          </div>

          {/* RIGHT: Controls */}
          <div className="xl:col-span-1 flex flex-col gap-6">
            <Card className="glass-card rounded-2xl p-3 md:p-4">
              <BuySellPanel
                asset={selectedAsset}
                onTradeExecuted={(emotion) => setCurrentEmotion(emotion)}
              />
            </Card>

            <Card className="glass-card rounded-2xl p-3 md:p-4">
              <EmotionTracker
                currentEmotion={currentEmotion}
                onEmotionChange={setCurrentEmotion}
              />
            </Card>

            <div className="hidden xl:block">
              <Card className="glass-card rounded-2xl p-3 md:p-4 h-full">
                <PerformanceSummary />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingSimulator;

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AdvancedTradingChart } from "@/components/trading/AdvancedTradingChart";
import { BuySellPanel } from "@/components/trading/BuySellPanel";
import { EmotionTracker } from "@/components/trading/EmotionTracker";
import { TradeFeedbackPanel } from "@/components/trading/TradeFeedbackPanel";
import { PerformanceSummary } from "@/components/trading/PerformanceSummary";
import { AssetSelector } from "@/components/trading/AssetSelector";
import { TradeHistory } from "@/components/trading/TradeHistory";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TradingSimulator = () => {
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState("BTC");
  const [simulationMode, setSimulationMode] = useState("live");
  const [currentEmotion, setCurrentEmotion] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/")}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Trading Simulator</h1>
                <p className="text-sm text-muted-foreground">Practice crypto trading & analyze your emotions</p>
              </div>
            </div>
            <AssetSelector 
              selectedAsset={selectedAsset}
              onAssetChange={setSelectedAsset}
              simulationMode={simulationMode}
              onModeChange={setSimulationMode}
            />
          </div>
        </div>
      </div>

      {/* Main Trading Interface */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col xl:flex-row xl:gap-6 xl:items-stretch">
  {/* Left Column - Chart */}
  <div className="xl:w-2/3 flex flex-col space-y-6 h-full">
    <AdvancedTradingChart asset={selectedAsset} mode={simulationMode} />
    <TradeHistory />
    
    {/* Mobile: Performance Summary */}
    <div className="xl:hidden">
      <PerformanceSummary />
    </div>

     {/* Desktop: Performance Summary */}
    <div className="hidden xl:block">
      <PerformanceSummary />
    </div>
  </div>

  {/* Right Column - Trading Controls */}
  <div className="xl:w-1/3 flex flex-col space-y-6 h-full">
    <BuySellPanel 
      asset={selectedAsset}
      onTradeExecuted={(emotion) => setCurrentEmotion(emotion)}
    />
    <EmotionTracker 
      currentEmotion={currentEmotion}
      onEmotionChange={setCurrentEmotion}
    />
    <TradeFeedbackPanel currentEmotion={currentEmotion} />
  </div>
</div>

      </div>
    </div>
  );
};

export default TradingSimulator;
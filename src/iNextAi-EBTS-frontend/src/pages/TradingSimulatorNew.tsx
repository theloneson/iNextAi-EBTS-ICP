import { useState, useEffect } from "react";
import { ArrowLeft, Settings, TrendingUp, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ProfessionalChart } from "@/components/trading/ProfessionalChart";
import { OrderBook } from "@/components/trading/OrderBook";
import { TradingPanel } from "@/components/trading/TradingPanel";

const TradingSimulatorNew = () => {
  const navigate = useNavigate();
  const [selectedSymbol, setSelectedSymbol] = useState('BTC');
  const [currentPrice, setCurrentPrice] = useState(67000);
  const [priceChange, setPriceChange] = useState(2.45);
  const [isLive, setIsLive] = useState(true);

  const cryptoSymbols = [
    { symbol: 'BTC', name: 'Bitcoin', price: 67000 },
    { symbol: 'ETH', name: 'Ethereum', price: 3200 },
    { symbol: 'SOL', name: 'Solana', price: 120 },
    { symbol: 'ADA', name: 'Cardano', price: 0.45 },
    { symbol: 'DOT', name: 'Polkadot', price: 7.20 }
  ];

  useEffect(() => {
    const selectedCrypto = cryptoSymbols.find(c => c.symbol === selectedSymbol);
    if (selectedCrypto) {
      setCurrentPrice(selectedCrypto.price);
    }
  }, [selectedSymbol]);

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Trading Header */}
      <div className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/")}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-foreground">Professional Trading</h1>
                <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                  <Activity className="h-3 w-3 mr-1" />
                  Live Market
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Symbol Selector */}
              <div className="flex items-center gap-2">
                {cryptoSymbols.map((crypto) => (
                  <Button
                    key={crypto.symbol}
                    variant={selectedSymbol === crypto.symbol ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSymbol(crypto.symbol)}
                    className="h-8 px-3"
                  >
                    {crypto.symbol}
                  </Button>
                ))}
              </div>
              
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Trading Interface */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          
          {/* Left Panel - Order Book */}
          <div className="col-span-3">
            <OrderBook symbol={selectedSymbol} className="h-full" />
          </div>

          {/* Center Panel - Professional Chart */}
          <div className="col-span-6">
            <ProfessionalChart 
              symbol={selectedSymbol}
              className="h-full"
            />
          </div>

          {/* Right Panel - Trading Controls */}
          <div className="col-span-3">
            <TradingPanel 
              symbol={selectedSymbol}
              currentPrice={currentPrice}
              className="h-full"
            />
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="border-t border-border bg-card/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-muted-foreground">Market Status:</span>
                <span className="text-success font-medium">Open</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">24h Volume:</span>
                <span className="font-mono font-medium">1.2B USDT</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Active Pairs:</span>
                <span className="font-medium">650+</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                Simulation Mode
              </Badge>
              <span className="text-xs text-muted-foreground">
                Real-time data • 0ms latency
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingSimulatorNew;
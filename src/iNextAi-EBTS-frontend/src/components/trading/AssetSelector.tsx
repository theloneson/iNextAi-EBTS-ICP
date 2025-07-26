import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface AssetSelectorProps {
  selectedAsset: string;
  onAssetChange: (asset: string) => void;
  simulationMode: string;
  onModeChange: (mode: string) => void;
}

export const AssetSelector = ({ selectedAsset, onAssetChange, simulationMode, onModeChange }: AssetSelectorProps) => {
  const assets = [
    { 
      symbol: "BTC", 
      name: "Bitcoin",
      price: 42850.32,
      change: 3.42,
      volume: "24.8B"
    },
    { 
      symbol: "ETH", 
      name: "Ethereum",
      price: 2641.18,
      change: -1.28,
      volume: "12.3B"
    },
    { 
      symbol: "SOL", 
      name: "Solana",
      price: 98.45,
      change: 5.67,
      volume: "2.1B"
    },
    { 
      symbol: "ADA", 
      name: "Cardano",
      price: 0.485,
      change: -2.14,
      volume: "892M"
    },
    { 
      symbol: "MATIC", 
      name: "Polygon",
      price: 0.742,
      change: 1.89,
      volume: "456M"
    },
    { 
      symbol: "DOT", 
      name: "Polkadot",
      price: 7.23,
      change: -0.95,
      volume: "234M"
    }
  ];

  const selectedAssetData = assets.find(asset => asset.symbol === selectedAsset);

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
      
      {/* Asset Selector */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Asset</label>
        <Select value={selectedAsset} onValueChange={onAssetChange}>
          <SelectTrigger className="w-[200px] bg-card/50 backdrop-blur-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {assets.map((asset) => (
              <SelectItem key={asset.symbol} value={asset.symbol}>
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium">{asset.symbol}/USDT</div>
                      <div className="text-xs text-muted-foreground">{asset.name}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-mono text-sm">
                      ${asset.price.toLocaleString()}
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${
                      asset.change > 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      {asset.change > 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {asset.change > 0 ? '+' : ''}{asset.change}%
                    </div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Current Asset Info */}
      {selectedAssetData && (
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-lg font-mono font-bold">
              ${selectedAssetData.price.toLocaleString()}
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              selectedAssetData.change > 0 ? 'text-success' : 'text-destructive'
            }`}>
              {selectedAssetData.change > 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {selectedAssetData.change > 0 ? '+' : ''}{selectedAssetData.change}%
            </div>
          </div>
          
          <Badge variant="secondary" className="bg-muted/20">
            <Activity className="h-3 w-3 mr-1" />
            Vol: {selectedAssetData.volume}
          </Badge>
        </div>
      )}

      {/* Simulation Mode */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Mode</label>
        <Tabs value={simulationMode} onValueChange={onModeChange}>
          <TabsList className="bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="live" className="text-xs">Live Feed</TabsTrigger>
            <TabsTrigger value="historical" className="text-xs">Historical</TabsTrigger>
            <TabsTrigger value="manual" className="text-xs">Manual</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="text-xs bg-card/50 backdrop-blur-sm">
          Reset Session
        </Button>
        <Button variant="outline" size="sm" className="text-xs bg-card/50 backdrop-blur-sm">
          Save Strategy
        </Button>
      </div>
    </div>
  );
};
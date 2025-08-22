import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, TrendingDown, Clock, Zap } from "lucide-react";

const trades = [
  {
    id: 1,
    pair: "BTC/USDT",
    type: "LONG",
    entry: 42150.50,
    exit: 42580.25,
    pnl: 429.75,
    time: "2m ago",
    emotion: "confident",
    confidence: 85
  },
  {
    id: 2,
    pair: "ETH/USDT",
    type: "SHORT",
    entry: 2285.30,
    exit: 2245.60,
    pnl: 198.50,
    time: "5m ago",
    emotion: "calm",
    confidence: 72
  },
  {
    id: 3,
    pair: "SOL/USDT",
    type: "LONG",
    entry: 95.80,
    exit: 93.20,
    pnl: -130.00,
    time: "12m ago",
    emotion: "frustrated",
    confidence: 45
  },
  {
    id: 4,
    pair: "ADA/USDT",
    type: "SHORT",
    entry: 0.485,
    exit: 0.492,
    pnl: -35.00,
    time: "18m ago",
    emotion: "anxious",
    confidence: 38
  },
  {
    id: 5,
    pair: "MATIC/USDT",
    type: "LONG",
    entry: 0.925,
    exit: 0.968,
    pnl: 215.75,
    time: "25m ago",
    emotion: "excited",
    confidence: 78
  }
];

export function RealTimeTradeFeed() {
  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "confident":
      case "calm":
      case "excited":
        return "text-success";
      case "frustrated":
      case "anxious":
        return "text-destructive";
      default:
        return "text-warning";
    }
  };

  const getEmotionBg = (emotion: string) => {
    switch (emotion) {
      case "confident":
      case "calm":
      case "excited":
        return "bg-success/10 border-success/20";
      case "frustrated":
      case "anxious":
        return "bg-destructive/10 border-destructive/20";
      default:
        return "bg-warning/10 border-warning/20";
    }
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-foreground text-base md:text-lg">
          <div className="flex items-center gap-2">
            <div className="p-1.5 md:p-2 rounded-lg gradient-accent glow-accent">
              <Activity size={16} className="text-white md:w-[18px] md:h-[18px]" />
            </div>
            Real-Time Trade Feed
          </div>
          <div className="sm:ml-auto">
            <Badge variant="outline" className="border-primary/20 text-primary text-xs">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full mr-1 md:mr-2 animate-pulse"></div>
              Live
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 md:space-y-3 max-h-[400px] md:max-h-[500px] overflow-y-auto">
          {trades.map((trade) => (
            <div key={trade.id} className="glass-card p-3 md:p-4 rounded-lg hover:bg-white/10 transition-all duration-200">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="flex items-center gap-2 md:gap-3">
                  <Badge 
                    variant={trade.type === "LONG" ? "default" : "secondary"}
                    className={`text-xs ${trade.type === "LONG" ? "bg-success text-white" : "bg-destructive text-white"}`}
                  >
                    {trade.type}
                  </Badge>
                  <span className="font-semibold text-foreground text-sm md:text-base">{trade.pair}</span>
                </div>
                <div className="flex items-center gap-1 md:gap-2 text-xs text-muted-foreground">
                  <Clock size={10} className="md:w-3 md:h-3" />
                  {trade.time}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 md:gap-4 mb-2 md:mb-3 text-xs md:text-sm">
                <div>
                  <span className="text-muted-foreground">Entry: </span>
                  <span className="text-foreground font-medium">${trade.entry.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Exit: </span>
                  <span className="text-foreground font-medium">${trade.exit.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 md:gap-2">
                  {trade.pnl > 0 ? (
                    <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-success" />
                  ) : (
                    <TrendingDown className="w-3 h-3 md:w-4 md:h-4 text-destructive" />
                  )}
                  <span className={`font-semibold text-sm md:text-base ${trade.pnl > 0 ? 'text-success' : 'text-destructive'}`}>
                    {trade.pnl > 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs capitalize ${getEmotionBg(trade.emotion)}`}
                  >
                    <Zap className={`w-2 h-2 md:w-3 md:h-3 mr-1 ${getEmotionColor(trade.emotion)}`} />
                    {trade.emotion}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {trade.confidence}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
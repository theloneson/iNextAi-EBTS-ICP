import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, ArrowRight, TrendingUp, TrendingDown } from "lucide-react";

export function RecentTrades() {
  const trades = [
    {
      id: 1,
      symbol: "BTC/USDT",
      type: "Long",
      entry: 45250.0,
      exit: 46100.0,
      pnl: 850.0,
      size: 0.5,
      time: "10:45 AM",
      emotion: "Confident",
      isProfit: true,
    },
    {
      id: 2,
      symbol: "ETH/USDT",
      type: "Short",
      entry: 3250.0,
      exit: 3180.0,
      pnl: 350.0,
      size: 2.0,
      time: "09:30 AM",
      emotion: "Calm",
      isProfit: true,
    },
    {
      id: 3,
      symbol: "SOL/USDT",
      type: "Long",
      entry: 125.5,
      exit: 123.2,
      pnl: -115.0,
      size: 5.0,
      time: "08:15 AM",
      emotion: "FOMO",
      isProfit: false,
    },
    {
      id: 4,
      symbol: "ADA/USDT",
      type: "Long",
      entry: 0.485,
      exit: 0.492,
      pnl: 70.0,
      size: 1000,
      time: "Yesterday",
      emotion: "Patient",
      isProfit: true,
    },
  ];

  const getEmotionColor = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case "confident":
      case "calm":
      case "patient":
        return "text-green-500";
      case "fomo":
      case "revenge":
      case "panic":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <span className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Activity size={16} className="text-primary" />
            </div>
            Recent Trades
          </span>
          <Button variant="ghost" size="sm" className="text-primary">
            View All <ArrowRight size={14} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trades.map((trade) => (
            <div key={trade.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-8 rounded-full ${trade.isProfit ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{trade.symbol}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      trade.type === 'Long' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                    }`}>
                      {trade.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{trade.time}</span>
                    <span>•</span>
                    <span className={getEmotionColor(trade.emotion)}>{trade.emotion}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`flex items-center gap-1 font-medium ${
                  trade.isProfit ? 'text-green-500' : 'text-red-500'
                }`}>
                  {trade.isProfit ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {trade.isProfit ? '+' : ''}{trade.pnl.toFixed(2)} USDT
                </div>
                <div className="text-sm text-muted-foreground">
                  Size: {trade.size} {trade.symbol.split('/')[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
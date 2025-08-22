import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, TrendingUp, TrendingDown, Clock } from "lucide-react";

export function TradeFeedCard() {
  const trades = [
    {
      id: 1,
      symbol: "BTC/USDT",
      type: "BUY",
      amount: "0.25",
      price: "45,250",
      emotion: "Confident",
      time: "2 min ago",
      pnl: 450,
      isProfit: true
    },
    {
      id: 2,
      symbol: "ETH/USDT", 
      type: "SELL",
      amount: "2.5",
      price: "3,180",
      emotion: "Fearful",
      time: "5 min ago",
      pnl: -120,
      isProfit: false
    },
    {
      id: 3,
      symbol: "SOL/USDT",
      type: "BUY", 
      amount: "10",
      price: "125.50",
      emotion: "FOMO",
      time: "12 min ago",
      pnl: 80,
      isProfit: true
    },
    {
      id: 4,
      symbol: "ADA/USDT",
      type: "SELL",
      amount: "1000",
      price: "0.485",
      emotion: "Calm",
      time: "25 min ago",
      pnl: -45,
      isProfit: false
    }
  ];

  const getEmotionColor = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case "confident":
      case "calm":
        return "text-success";
      case "fearful":
      case "fomo":
        return "text-destructive";
      default:
        return "text-warning";
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Activity size={20} className="text-primary" />
          Live Trade Feed
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-primary text-sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trades.map((trade) => (
            <div key={trade.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  trade.type === 'BUY' ? 'bg-success/20' : 'bg-destructive/20'
                }`}>
                  {trade.type === 'BUY' ? (
                    <TrendingUp size={16} className="text-success" />
                  ) : (
                    <TrendingDown size={16} className="text-destructive" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{trade.symbol}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      trade.type === 'BUY' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                    }`}>
                      {trade.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{trade.amount} @ ${trade.price}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`flex items-center gap-1 font-medium ${
                  trade.isProfit ? 'text-success' : 'text-destructive'
                }`}>
                  {trade.isProfit ? '+' : ''}{trade.pnl} USDT
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={12} />
                  {trade.time}
                </div>
                <div className={`text-xs ${getEmotionColor(trade.emotion)}`}>
                  {trade.emotion}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
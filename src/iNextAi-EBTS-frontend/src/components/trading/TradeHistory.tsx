import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, TrendingUp, TrendingDown, Activity } from "lucide-react";

export const TradeHistory = () => {
  const trades = [
    {
      id: 1,
      asset: "BTC",
      type: "BUY",
      amount: 0.045,
      price: 42850.32,
      time: "2 mins ago",
      pnl: "+$245.50",
      emotion: "Confident"
    },
    {
      id: 2,
      asset: "ETH",
      type: "SELL",
      amount: 1.2,
      price: 2641.18,
      time: "5 mins ago",
      pnl: "-$89.30",
      emotion: "FOMO"
    },
    {
      id: 3,
      asset: "SOL",
      type: "BUY",
      amount: 15.5,
      price: 98.45,
      time: "12 mins ago",
      pnl: "+$156.80",
      emotion: "Optimistic"
    },
    {
      id: 4,
      asset: "BTC",
      type: "SELL",
      amount: 0.023,
      price: 42945.60,
      time: "18 mins ago",
      pnl: "+$67.20",
      emotion: "Strategic"
    },
    {
      id: 5,
      asset: "ETH",
      type: "BUY",
      amount: 0.8,
      price: 2638.90,
      time: "25 mins ago",
      pnl: "+$34.10",
      emotion: "Cautious"
    }
  ];

  return (
    <Card className="glass-card border-white/10">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <div className="p-2 rounded-lg gradient-primary glow-primary">
            <Activity size={16} className="text-white" />
          </div>
          Recent Trades
          <Badge variant="secondary" className="ml-auto bg-primary/20 text-primary">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px]">
          <div className="space-y-3">
            {trades.map((trade) => (
              <div key={trade.id} className="glass-card p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      trade.type === "BUY" ? "bg-success/10" : "bg-destructive/10"
                    }`}>
                      {trade.type === "BUY" ? 
                        <TrendingUp size={14} className="text-success" /> : 
                        <TrendingDown size={14} className="text-destructive" />
                      }
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{trade.type}</span>
                        <span className="text-sm text-primary font-bold">{trade.asset}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {trade.amount} @ ${trade.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      trade.pnl.startsWith("+") ? "text-success" : "text-destructive"
                    }`}>
                      {trade.pnl}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={10} />
                      {trade.time}
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 pt-2 border-t border-border/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Emotion:</span>
                    <Badge variant="outline" className="text-xs">
                      {trade.emotion}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
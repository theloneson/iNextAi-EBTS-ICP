import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

interface OrderBookProps {
  symbol: string;
  className?: string;
}

export const OrderBook = ({ symbol, className }: OrderBookProps) => {
  const [asks, setAsks] = useState<OrderBookEntry[]>([]);
  const [bids, setBids] = useState<OrderBookEntry[]>([]);
  const [spreadPercent, setSpreadPercent] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);

  // Generate realistic orderbook data
  useEffect(() => {
    const basePrice = symbol === 'BTC' ? 67000 : symbol === 'ETH' ? 3200 : 120;
    setCurrentPrice(basePrice);
    setPriceChange((Math.random() - 0.5) * 5); // Random price change

    const generateOrderBook = () => {
      const newAsks: OrderBookEntry[] = [];
      const newBids: OrderBookEntry[] = [];
      
      // Generate asks (sell orders) - prices above current price
      let cumulativeAskTotal = 0;
      for (let i = 0; i < 15; i++) {
        const price = basePrice + (i + 1) * (basePrice * 0.0001) + (Math.random() * basePrice * 0.0002);
        const amount = Math.random() * 2 + 0.1;
        cumulativeAskTotal += amount;
        
        newAsks.push({
          price: parseFloat(price.toFixed(2)),
          amount: parseFloat(amount.toFixed(6)),
          total: parseFloat(cumulativeAskTotal.toFixed(6))
        });
      }

      // Generate bids (buy orders) - prices below current price
      let cumulativeBidTotal = 0;
      for (let i = 0; i < 15; i++) {
        const price = basePrice - (i + 1) * (basePrice * 0.0001) - (Math.random() * basePrice * 0.0002);
        const amount = Math.random() * 2 + 0.1;
        cumulativeBidTotal += amount;
        
        newBids.push({
          price: parseFloat(price.toFixed(2)),
          amount: parseFloat(amount.toFixed(6)),
          total: parseFloat(cumulativeBidTotal.toFixed(6))
        });
      }

      // Calculate spread
      const spread = newAsks[0].price - newBids[0].price;
      const spreadPercentage = (spread / basePrice) * 100;
      
      setAsks(newAsks);
      setBids(newBids);
      setSpreadPercent(spreadPercentage);
    };

    generateOrderBook();

    // Update orderbook every 2 seconds
    const interval = setInterval(generateOrderBook, 2000);
    return () => clearInterval(interval);
  }, [symbol]);

  const formatPrice = (price: number) => {
    return price.toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const formatAmount = (amount: number) => {
    return amount.toFixed(6);
  };

  return (
    <Card className={`bg-card/95 backdrop-blur-sm border-border/50 h-full ${className}`}>
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Order Book</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Spread: {spreadPercent.toFixed(3)}%
            </Badge>
            <Button variant="ghost" size="sm">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {/* Headers */}
        <div className="px-4 py-2 border-b border-border/30">
          <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground font-medium">
            <div className="text-right">Price (USDT)</div>
            <div className="text-right">Amount ({symbol})</div>
            <div className="text-right">Total</div>
          </div>
        </div>

        <div className="h-[600px] overflow-y-auto">
          {/* Asks (Sell Orders) */}
          <div className="px-4 py-1">
            {asks.map((ask, index) => {
              const maxTotal = Math.max(...asks.map(a => a.total));
              const widthPercent = (ask.total / maxTotal) * 100;
              
              return (
                <div 
                  key={`ask-${index}`} 
                  className="relative grid grid-cols-3 gap-2 py-0.5 text-xs font-mono hover:bg-destructive/10 transition-colors cursor-pointer"
                >
                  <div 
                    className="absolute right-0 top-0 bottom-0 bg-destructive/5 rounded-sm transition-all"
                    style={{ width: `${widthPercent}%` }}
                  />
                  <div className="text-right text-destructive font-medium z-10">
                    {formatPrice(ask.price)}
                  </div>
                  <div className="text-right text-foreground z-10">
                    {formatAmount(ask.amount)}
                  </div>
                  <div className="text-right text-muted-foreground z-10">
                    {formatAmount(ask.total)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Current Price */}
          <div className="px-4 py-3 border-y border-border/50 bg-muted/20">
            <div className="text-center">
              <div className={`text-lg font-mono font-bold ${
                priceChange >= 0 ? 'text-success' : 'text-destructive'
              }`}>
                {formatPrice(currentPrice)} {priceChange >= 0 ? '↑' : '↓'}
              </div>
              <div className="text-xs text-muted-foreground">
                ≈ ${formatPrice(currentPrice * 1.0003)} {/* Mock conversion rate */}
              </div>
            </div>
          </div>

          {/* Bids (Buy Orders) */}
          <div className="px-4 py-1">
            {bids.map((bid, index) => {
              const maxTotal = Math.max(...bids.map(b => b.total));
              const widthPercent = (bid.total / maxTotal) * 100;
              
              return (
                <div 
                  key={`bid-${index}`} 
                  className="relative grid grid-cols-3 gap-2 py-0.5 text-xs font-mono hover:bg-success/10 transition-colors cursor-pointer"
                >
                  <div 
                    className="absolute right-0 top-0 bottom-0 bg-success/5 rounded-sm transition-all"
                    style={{ width: `${widthPercent}%` }}
                  />
                  <div className="text-right text-success font-medium z-10">
                    {formatPrice(bid.price)}
                  </div>
                  <div className="text-right text-foreground z-10">
                    {formatAmount(bid.amount)}
                  </div>
                  <div className="text-right text-muted-foreground z-10">
                    {formatAmount(bid.total)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};
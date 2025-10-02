import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TradingPanelProps {
  symbol: string;
  currentPrice: number;
  className?: string;
}

interface Position {
  id: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  total: number;
  timestamp: Date;
  status: 'pending' | 'filled' | 'cancelled';
}

export const TradingPanel = ({ symbol, currentPrice, className }: TradingPanelProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'spot' | 'margin' | 'futures'>('spot');
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop-limit'>('limit');
  const [buyAmount, setBuyAmount] = useState('');
  const [buyPrice, setBuyPrice] = useState(currentPrice.toString());
  const [sellAmount, setSellAmount] = useState('');
  const [sellPrice, setSellPrice] = useState(currentPrice.toString());
  const [leverage, setLeverage] = useState([1]);
  const [positions, setPositions] = useState<Position[]>([]);
  
  // Mock balance data
  const [balance] = useState({
    USDT: 10000,
    [symbol]: 0.5,
    availableMargin: 5000
  });

  useEffect(() => {
    setBuyPrice(currentPrice.toString());
    setSellPrice(currentPrice.toString());
  }, [currentPrice]);

  const calculateTotal = (amount: string, price: string): number => {
    const amt = parseFloat(amount) || 0;
    const prc = parseFloat(price) || 0;
    return amt * prc;
  };

  const calculateFees = (total: number): number => {
    return total * 0.001; // 0.1% trading fee
  };

  const handleBuyOrder = () => {
    const amount = parseFloat(buyAmount);
    const price = parseFloat(buyPrice);
    
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to buy.",
        variant: "destructive"
      });
      return;
    }

    if (orderType !== 'market' && (!price || price <= 0)) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid price.",
        variant: "destructive"
      });
      return;
    }

    const total = calculateTotal(buyAmount, buyPrice);
    const fees = calculateFees(total);
    
    if (total + fees > balance.USDT) {
      toast({
        title: "Insufficient Balance",
        description: `You need ${(total + fees).toFixed(2)} USDT but only have ${balance.USDT.toFixed(2)} USDT.`,
        variant: "destructive"
      });
      return;
    }

    const newPosition: Position = {
      id: `buy-${Date.now()}`,
      type: 'buy',
      amount,
      price: orderType === 'market' ? currentPrice : price,
      total,
      timestamp: new Date(),
      status: orderType === 'market' ? 'filled' : 'pending'
    };

    setPositions(prev => [newPosition, ...prev]);
    setBuyAmount('');
    
    toast({
      title: "Buy Order Placed",
      description: `${orderType === 'market' ? 'Market' : 'Limit'} buy order for ${amount} ${symbol} placed successfully.`,
      className: "border-success/50 bg-success/10"
    });
  };

  const handleSellOrder = () => {
    const amount = parseFloat(sellAmount);
    const price = parseFloat(sellPrice);
    
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to sell.",
        variant: "destructive"
      });
      return;
    }

    if (amount > balance[symbol]) {
      toast({
        title: "Insufficient Balance",
        description: `You need ${amount} ${symbol} but only have ${balance[symbol]} ${symbol}.`,
        variant: "destructive"
      });
      return;
    }

    const total = calculateTotal(sellAmount, sellPrice);
    
    const newPosition: Position = {
      id: `sell-${Date.now()}`,
      type: 'sell',
      amount,
      price: orderType === 'market' ? currentPrice : price,
      total,
      timestamp: new Date(),
      status: orderType === 'market' ? 'filled' : 'pending'
    };

    setPositions(prev => [newPosition, ...prev]);
    setSellAmount('');
    
    toast({
      title: "Sell Order Placed",
      description: `${orderType === 'market' ? 'Market' : 'Limit'} sell order for ${amount} ${symbol} placed successfully.`,
      className: "border-destructive/50 bg-destructive/10"
    });
  };

  const getQuickAmountPercentages = (side: 'buy' | 'sell') => {
    const availableBalance = side === 'buy' ? balance.USDT : balance[symbol];
    const currentPriceNum = parseFloat(side === 'buy' ? buyPrice : sellPrice) || currentPrice;
    
    return [25, 50, 75, 100].map(percent => {
      if (side === 'buy') {
        const maxAmount = (availableBalance * (percent / 100)) / currentPriceNum;
        return {
          label: `${percent}%`,
          value: maxAmount.toFixed(6)
        };
      } else {
        const maxAmount = availableBalance * (percent / 100);
        return {
          label: `${percent}%`,
          value: maxAmount.toFixed(6)
        };
      }
    });
  };

  return (
    <Card className={`bg-card/95 backdrop-blur-sm border-border/50 ${className}`}>
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Trading Panel</h3>
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Spot Trading</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Order Type Selection */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground">Order Type</Label>
          <Select value={orderType} onValueChange={(value: any) => setOrderType(value)}>
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="market">Market</SelectItem>
              <SelectItem value="limit">Limit</SelectItem>
              <SelectItem value="stop-limit">Stop Limit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Buy/Sell Tabs */}
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy" className="text-success data-[state=active]:bg-success/20">
              Buy {symbol}
            </TabsTrigger>
            <TabsTrigger value="sell" className="text-destructive data-[state=active]:bg-destructive/20">
              Sell {symbol}
            </TabsTrigger>
          </TabsList>
          
          {/* Buy Panel */}
          <TabsContent value="buy" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Available</span>
                <span className="font-mono font-medium">{balance.USDT.toFixed(2)} USDT</span>
              </div>

              {orderType !== 'market' && (
                <div className="space-y-1">
                  <Label className="text-xs font-medium">Price (USDT)</Label>
                  <Input
                    type="number"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(e.target.value)}
                    className="h-8 font-mono"
                    placeholder="0.00"
                  />
                </div>
              )}

              <div className="space-y-1">
                <Label className="text-xs font-medium">Amount ({symbol})</Label>
                <Input
                  type="number"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  className="h-8 font-mono"
                  placeholder="0.000000"
                />
                
                {/* Quick Amount Buttons */}
                <div className="flex gap-1 mt-2">
                  {getQuickAmountPercentages('buy').map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => setBuyAmount(item.value)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 p-2 bg-muted/20 rounded border">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-mono font-medium">
                    {calculateTotal(buyAmount, buyPrice).toFixed(2)} USDT
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Est. Fee</span>
                  <span className="font-mono">
                    {calculateFees(calculateTotal(buyAmount, buyPrice)).toFixed(2)} USDT
                  </span>
                </div>
              </div>

              <Button 
                onClick={handleBuyOrder}
                className="w-full bg-success hover:bg-success/90 text-white"
                disabled={!buyAmount}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Buy {symbol}
              </Button>
            </div>
          </TabsContent>

          {/* Sell Panel */}
          <TabsContent value="sell" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Available</span>
                <span className="font-mono font-medium">{balance[symbol].toFixed(6)} {symbol}</span>
              </div>

              {orderType !== 'market' && (
                <div className="space-y-1">
                  <Label className="text-xs font-medium">Price (USDT)</Label>
                  <Input
                    type="number"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    className="h-8 font-mono"
                    placeholder="0.00"
                  />
                </div>
              )}

              <div className="space-y-1">
                <Label className="text-xs font-medium">Amount ({symbol})</Label>
                <Input
                  type="number"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  className="h-8 font-mono"
                  placeholder="0.000000"
                />
                
                {/* Quick Amount Buttons */}
                <div className="flex gap-1 mt-2">
                  {getQuickAmountPercentages('sell').map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => setSellAmount(item.value)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 p-2 bg-muted/20 rounded border">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-mono font-medium">
                    {calculateTotal(sellAmount, sellPrice).toFixed(2)} USDT
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Est. Fee</span>
                  <span className="font-mono">
                    {calculateFees(calculateTotal(sellAmount, sellPrice)).toFixed(2)} USDT
                  </span>
                </div>
              </div>

              <Button 
                onClick={handleSellOrder}
                className="w-full bg-destructive hover:bg-destructive/90 text-white"
                disabled={!sellAmount}
              >
                <TrendingDown className="h-4 w-4 mr-2" />
                Sell {symbol}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Recent Orders */}
        {positions.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium text-muted-foreground">Recent Orders</Label>
              <Badge variant="secondary" className="text-xs">
                {positions.length}
              </Badge>
            </div>
            
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {positions.slice(0, 3).map((position) => (
                <div key={position.id} className="flex items-center justify-between p-2 bg-muted/10 rounded text-xs">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={position.type === 'buy' ? 'default' : 'destructive'} 
                      className="text-xs px-1 py-0"
                    >
                      {position.type.toUpperCase()}
                    </Badge>
                    <span className="font-mono">{position.amount} {symbol}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono">${position.price}</div>
                    <div className={`text-xs ${
                      position.status === 'filled' ? 'text-success' :
                      position.status === 'pending' ? 'text-warning' : 'text-muted-foreground'
                    }`}>
                      {position.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
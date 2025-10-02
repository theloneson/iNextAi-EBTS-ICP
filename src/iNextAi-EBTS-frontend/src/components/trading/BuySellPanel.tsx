import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BuySellPanelProps {
  asset: string;
  onTradeExecuted: (emotion: string) => void;
}

export const BuySellPanel = ({ asset, onTradeExecuted }: BuySellPanelProps) => {
  const [orderType, setOrderType] = useState("market");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [leverage, setLeverage] = useState([1]);
  const [activeTab, setActiveTab] = useState("buy");

  const currentPrice = asset === "BTC" ? 42850.32 : asset === "ETH" ? 2641.18 : 98.45;
  const availableBalance = 10000; // Mock balance

  const handleTrade = () => {
    if (!amount) {
      toast({
        title: "Missing Information",
        description: "Please enter an amount to trade",
        variant: "destructive"
      });
      return;
    }

    const tradeAmount = parseFloat(amount);
    const totalValue = tradeAmount * currentPrice;
    
    if (totalValue > availableBalance) {
      toast({
        title: "Insufficient Balance",
        description: "Not enough funds for this trade",
        variant: "destructive"
      });
      return;
    }

    // Simulate trade execution
    toast({
      title: "Trade Executed!",
      description: `${activeTab.toUpperCase()} ${tradeAmount} ${asset} at $${currentPrice.toLocaleString()}`,
    });

    // Trigger emotion tracking
    onTradeExecuted("excited");
    
    // Reset form
    setAmount("");
    setPrice("");
  };

  return (
    <Card className="glass-card p-6">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Place Order</h3>
          <Badge variant="outline" className="border-border/50">
            Balance: ${availableBalance.toLocaleString()}
          </Badge>
        </div>

        {/* Buy/Sell Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy" className="data-[state=active]:bg-success/20 data-[state=active]:text-success">
              <TrendingUp className="h-4 w-4 mr-2" />
              Buy
            </TabsTrigger>
            <TabsTrigger value="sell" className="data-[state=active]:bg-destructive/20 data-[state=active]:text-destructive">
              <TrendingDown className="h-4 w-4 mr-2" />
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4 mt-6">
            <OrderForm 
              orderType={orderType}
              setOrderType={setOrderType}
              amount={amount}
              setAmount={setAmount}
              price={price}
              setPrice={setPrice}
              leverage={leverage}
              setLeverage={setLeverage}
              currentPrice={currentPrice}
              asset={asset}
              type="buy"
              onTrade={handleTrade}
            />
          </TabsContent>

          <TabsContent value="sell" className="space-y-4 mt-6">
            <OrderForm 
              orderType={orderType}
              setOrderType={setOrderType}
              amount={amount}
              setAmount={setAmount}
              price={price}
              setPrice={setPrice}
              leverage={leverage}
              setLeverage={setLeverage}
              currentPrice={currentPrice}
              asset={asset}
              type="sell"
              onTrade={handleTrade}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

interface OrderFormProps {
  orderType: string;
  setOrderType: (type: string) => void;
  amount: string;
  setAmount: (amount: string) => void;
  price: string;
  setPrice: (price: string) => void;
  leverage: number[];
  setLeverage: (leverage: number[]) => void;
  currentPrice: number;
  asset: string;
  type: "buy" | "sell";
  onTrade: () => void;
}

const OrderForm = ({ 
  orderType, setOrderType, amount, setAmount, price, setPrice, 
  leverage, setLeverage, currentPrice, asset, type, onTrade 
}: OrderFormProps) => {
  const totalValue = parseFloat(amount) * currentPrice || 0;
  const isBuy = type === "buy";

  return (
    <>
      {/* Order Type */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Order Type</Label>
        <Select value={orderType} onValueChange={setOrderType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="market">Market Order</SelectItem>
            <SelectItem value="limit">Limit Order</SelectItem>
            <SelectItem value="stop">Stop Order</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Amount ({asset})</Label>
        <Input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="text-lg font-mono"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>≈ ${totalValue.toLocaleString()}</span>
          <span>Max: 0.234 {asset}</span>
        </div>
      </div>

      {/* Price (for limit orders) */}
      {orderType === "limit" && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Price (USDT)</Label>
          <Input
            type="number"
            placeholder={currentPrice.toString()}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="text-lg font-mono"
          />
        </div>
      )}

      {/* Leverage */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Leverage</Label>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-primary">{leverage[0]}x</span>
          </div>
        </div>
        <Slider
          value={leverage}
          onValueChange={setLeverage}
          max={20}
          min={1}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1x</span>
          <span>10x</span>
          <span>20x</span>
        </div>
      </div>

      {/* Quick Amount Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {["25%", "50%", "75%", "100%"].map((percentage) => (
          <Button
            key={percentage}
            variant="outline"
            size="sm"
            onClick={() => {
              const percent = parseInt(percentage) / 100;
              const maxAmount = 0.234; // Mock max amount
              setAmount((maxAmount * percent).toFixed(6));
            }}
            className="text-xs"
          >
            {percentage}
          </Button>
        ))}
      </div>

      {/* Execute Button */}
      <Button
        onClick={onTrade}
        className={`w-full h-12 text-lg font-semibold transition-all duration-200 ${
          isBuy 
            ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-600/25' 
            : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-600/25'
        }`}
        disabled={!amount}
      >
        {isBuy ? '🚀 Buy' : '📉 Sell'} {asset}
      </Button>

      {/* Order Summary */}
      {amount && (
        <div className="bg-muted/20 rounded-lg p-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Estimated Cost:</span>
            <span className="font-mono">${totalValue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Fees:</span>
            <span className="font-mono">$0.00 (Simulation)</span>
          </div>
          <div className="flex justify-between border-t border-border/20 pt-2">
            <span className="font-medium">Total:</span>
            <span className="font-mono font-bold">${totalValue.toLocaleString()}</span>
          </div>
        </div>
      )}
    </>
  );
};
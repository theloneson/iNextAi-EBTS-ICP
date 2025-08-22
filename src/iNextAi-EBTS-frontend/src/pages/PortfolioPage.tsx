import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, Plus, Target, Calendar, PieChart, BarChart3, Eye, EyeOff } from "lucide-react";
import btcIcon from "@/assets/BTC.png";
import ethIcon from "@/assets/ETH.png";
import solIcon from "@/assets/SOL.png";
import usdtIcon from "@/assets/USDT.png";
import { useState } from "react";

const PortfolioPage = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  
  const portfolioData = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      icon: btcIcon,
      amount: 0.5,
      value: 21625.40,
      change: 2.45,
      allocation: 45.2,
      performance7d: 8.3,
      performance30d: 15.7
    },
    {
      symbol: "ETH", 
      name: "Ethereum",
      icon: ethIcon,
      amount: 8.3,
      value: 19795.36,
      change: 5.23,
      allocation: 41.3,
      performance7d: 12.1,
      performance30d: 22.4
    },
    {
      symbol: "SOL",
      name: "Solana", 
      icon: solIcon,
      amount: 102.5,
      value: 10096.25,
      change: -1.23,
      allocation: 21.1,
      performance7d: -5.2,
      performance30d: 35.8
    },
    {
      symbol: "USDT",
      name: "Tether",
      icon: usdtIcon,
      amount: 5000,
      value: 5000.00,
      change: 0.01,
      allocation: 10.4,
      performance7d: 0.02,
      performance30d: 0.08
    }
  ];

  const totalBalance = portfolioData.reduce((sum, asset) => sum + asset.value, 0);
  const todayChange = 343.50;
  const todayChangePercent = 2.1;
  
  const portfolioGoal = 100000;
  const goalProgress = (totalBalance / portfolioGoal) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <PieChart className="text-primary" size={20} />
            <h1 className="text-xl font-semibold text-foreground">Portfolio</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              This Month
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Add Asset
            </Button>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Balance Card */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setBalanceVisible(!balanceVisible)}
                      className="h-6 w-6 p-0"
                    >
                      {balanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    {balanceVisible ? `$${totalBalance.toLocaleString()}` : "••••••"}
                  </h2>
                </div>
                <div className="text-right">
                  <div className={`flex items-center gap-1 text-sm ${todayChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {todayChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                    {balanceVisible ? `$${Math.abs(todayChange).toFixed(2)} (${todayChangePercent}%)` : "••••••"}
                  </div>
                  <p className="text-xs text-muted-foreground">24h change</p>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="glass-card p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground">7 Day Change</p>
                  <p className="text-lg font-semibold text-success">
                    {balanceVisible ? "+$2,156.80" : "••••••"}
                  </p>
                </div>
                <div className="glass-card p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground">30 Day Change</p>
                  <p className="text-lg font-semibold text-primary">
                    {balanceVisible ? "+$4,832.40" : "••••••"}
                  </p>
                </div>
                <div className="glass-card p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground">Best Performer</p>
                  <p className="text-lg font-semibold text-success">ETH +22.4%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Goal & Allocation */}
          <div className="space-y-6">
            <Card className="bg-card border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="text-primary h-5 w-5" />
                  <h3 className="text-lg font-semibold text-foreground">Portfolio Goal</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{goalProgress.toFixed(1)}%</span>
                  </div>
                  <Progress value={goalProgress} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current</span>
                    <span className="font-medium">${totalBalance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Target</span>
                    <span className="font-medium">${portfolioGoal.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Asset Allocation</h3>
                <div className="space-y-4">
                  {portfolioData.map((asset) => (
                    <div key={asset.symbol} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={asset.icon} alt={asset.name} className="w-6 h-6" />
                          <span className="text-sm font-medium text-foreground">{asset.symbol}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{asset.allocation}%</span>
                      </div>
                      <Progress value={asset.allocation} className="h-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Assets with Tabs */}
        <Tabs defaultValue="holdings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="holdings">
            <Card className="bg-card border border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Your Assets</h3>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {portfolioData.map((asset) => (
                    <div key={asset.symbol} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <img src={asset.icon} alt={asset.name} className="w-12 h-12" />
                        <div>
                          <h4 className="font-semibold text-foreground">{asset.name}</h4>
                          <p className="text-sm text-muted-foreground">{asset.amount} {asset.symbol}</p>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {asset.allocation}% of portfolio
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-foreground text-lg">
                          {balanceVisible ? `$${asset.value.toLocaleString()}` : "••••••"}
                        </p>
                        <div className={`flex items-center gap-1 text-sm ${asset.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {asset.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {asset.change >= 0 ? '+' : ''}{asset.change}%
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">24h change</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card className="bg-card border border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Performance Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {portfolioData.map((asset) => (
                    <div key={asset.symbol} className="p-4 rounded-lg border border-border">
                      <div className="flex items-center gap-3 mb-4">
                        <img src={asset.icon} alt={asset.name} className="w-8 h-8" />
                        <div>
                          <h4 className="font-semibold text-foreground">{asset.name}</h4>
                          <p className="text-sm text-muted-foreground">{asset.symbol}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">7 Day</span>
                          <span className={`text-sm font-medium ${asset.performance7d >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {asset.performance7d >= 0 ? '+' : ''}{asset.performance7d}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">30 Day</span>
                          <span className={`text-sm font-medium ${asset.performance30d >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {asset.performance30d >= 0 ? '+' : ''}{asset.performance30d}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Value</span>
                          <span className="text-sm font-medium text-foreground">
                            {balanceVisible ? `$${asset.value.toLocaleString()}` : "••••••"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card className="bg-card border border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Recent Transactions</h3>
                <div className="space-y-4">
                  {[
                    { type: "buy", asset: "BTC", amount: "0.1", value: "$4,325", date: "2 hours ago", status: "completed" },
                    { type: "sell", asset: "ETH", amount: "2.5", value: "$5,962", date: "1 day ago", status: "completed" },
                    { type: "buy", asset: "SOL", amount: "50", value: "$4,922", date: "3 days ago", status: "completed" },
                    { type: "buy", asset: "USDT", amount: "2000", value: "$2,000", date: "1 week ago", status: "completed" }
                  ].map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'buy' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                        }`}>
                          {tx.type === 'buy' ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground capitalize">
                            {tx.type} {tx.asset}
                          </h4>
                          <p className="text-sm text-muted-foreground">{tx.amount} {tx.asset}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{tx.value}</p>
                        <p className="text-sm text-muted-foreground">{tx.date}</p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioPage;
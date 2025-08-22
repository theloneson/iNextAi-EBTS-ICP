import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TrendingUp, TrendingDown, Search, Star, Filter, ArrowUpDown } from "lucide-react";
import { useState } from "react";

const MarketPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("market_cap");
  const [filterBy, setFilterBy] = useState("all");

  const cryptoData = [
    {
      id: "ethereum",
      symbol: "ETH",
      name: "Ethereum",
      price: 2385.92,
      change24h: 5.23,
      volume: "12.5B",
      marketCap: "286.7B",
      sparkline: [2200, 2250, 2300, 2280, 2350, 2385],
      isFavorite: true
    },
    {
      id: "bitcoin",
      symbol: "BTC", 
      name: "Bitcoin",
      price: 43250.80,
      change24h: 2.45,
      volume: "28.3B",
      marketCap: "846.2B",
      sparkline: [42000, 42500, 43000, 42800, 43100, 43250],
      isFavorite: false
    },
    {
      id: "solana",
      symbol: "SOL",
      name: "Solana", 
      price: 98.45,
      change24h: -1.23,
      volume: "1.8B",
      marketCap: "42.1B",
      sparkline: [105, 102, 100, 98, 99, 98.45],
      isFavorite: true
    },
    {
      id: "cardano",
      symbol: "ADA",
      name: "Cardano",
      price: 0.485,
      change24h: 3.12,
      volume: "340M",
      marketCap: "17.2B", 
      sparkline: [0.46, 0.47, 0.48, 0.47, 0.485, 0.485],
      isFavorite: false
    },
    {
      id: "polygon",
      symbol: "MATIC",
      name: "Polygon",
      price: 0.823,
      change24h: -2.87,
      volume: "290M",
      marketCap: "7.8B",
      sparkline: [0.85, 0.84, 0.83, 0.82, 0.825, 0.823],
      isFavorite: false
    },
    {
      id: "chainlink",
      symbol: "LINK",
      name: "Chainlink",
      price: 14.67,
      change24h: 4.56,
      volume: "580M",
      marketCap: "8.2B",
      sparkline: [14.1, 14.3, 14.5, 14.4, 14.6, 14.67],
      isFavorite: true
    }
  ];

  const filteredCryptos = cryptoData.filter(crypto => {
    const matchesSearch = crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === "all" || 
                         (filterBy === "favorites" && crypto.isFavorite) ||
                         (filterBy === "gainers" && crypto.change24h > 0) ||
                         (filterBy === "losers" && crypto.change24h < 0);
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-primary" size={20} />
            <h1 className="text-xl font-semibold text-foreground">Market</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Market Cap</p>
                  <p className="text-xl font-bold text-foreground">$1.2T</p>
                </div>
                <div className="flex items-center text-success text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  2.4%
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">24h Volume</p>
                  <p className="text-xl font-bold text-foreground">$45.2B</p>
                </div>
                <div className="flex items-center text-destructive text-sm">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  1.2%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">BTC Dominance</p>
                  <p className="text-xl font-bold text-foreground">52.3%</p>
                </div>
                <div className="flex items-center text-success text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  0.8%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Fear & Greed</p>
                  <p className="text-xl font-bold text-foreground">68</p>
                </div>
                <Badge variant="secondary" className="bg-success/20 text-success">Greed</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-4">
          {["all", "favorites", "gainers", "losers"].map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterBy(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterBy === filter
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Market Table */}
        <Card className="bg-card border border-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-2">
                        Coin
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                      <div className="flex items-center justify-end gap-2">
                        Price
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                      <div className="flex items-center justify-end gap-2">
                        24h Change
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                      <div className="flex items-center justify-end gap-2">
                        Volume
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                      <div className="flex items-center justify-end gap-2">
                        Market Cap
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="text-center p-4 text-sm font-medium text-muted-foreground">7d Chart</th>
                    <th className="text-center p-4 text-sm font-medium text-muted-foreground">Trade</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCryptos.map((crypto, index) => (
                    <tr key={crypto.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <button className="text-muted-foreground hover:text-primary">
                            <Star className={`h-4 w-4 ${crypto.isFavorite ? 'fill-primary text-primary' : ''}`} />
                          </button>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary/20 to-primary/40 flex items-center justify-center">
                              <span className="text-xs font-bold text-primary">{crypto.symbol.slice(0, 2)}</span>
                            </div>
                            <div>
                              <div className="font-medium text-foreground">{crypto.name}</div>
                              <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-medium text-foreground">
                          ${crypto.price.toLocaleString()}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className={`flex items-center justify-end gap-1 ${
                          crypto.change24h >= 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          {crypto.change24h >= 0 ? 
                            <TrendingUp className="h-4 w-4" /> : 
                            <TrendingDown className="h-4 w-4" />
                          }
                          {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                        </div>
                      </td>
                      <td className="p-4 text-right text-muted-foreground">
                        ${crypto.volume}
                      </td>
                      <td className="p-4 text-right text-muted-foreground">
                        ${crypto.marketCap}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <div className="w-20 h-8 flex items-end gap-1">
                            {crypto.sparkline.map((point, i) => (
                              <div
                                key={i}
                                className={`flex-1 rounded-sm ${
                                  crypto.change24h >= 0 ? 'bg-success/30' : 'bg-destructive/30'
                                }`}
                                style={{
                                  height: `${((point - Math.min(...crypto.sparkline)) / 
                                    (Math.max(...crypto.sparkline) - Math.min(...crypto.sparkline))) * 100}%`
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <Button 
                            size="sm" 
                            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
                          >
                            Trade
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MarketPage;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

const data = [
  { time: '00:00', pnl: 0, emotional: 50, volume: 1200 },
  { time: '04:00', pnl: -150, emotional: 35, volume: 800 },
  { time: '08:00', pnl: 200, emotional: 75, volume: 2100 },
  { time: '12:00', pnl: 343, emotional: 65, volume: 1800 },
  { time: '16:00', pnl: 280, emotional: 45, volume: 1500 },
  { time: '20:00', pnl: 343, emotional: 60, volume: 1900 },
];

export function AdvancedPerformanceChart() {
  const currentPnL = 343.50;
  const dailyChange = 12.5;
  const isPositive = currentPnL > 0;

  return (
    <Card className="glass-card border-white/10">
      <CardHeader className="pb-3 md:pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-foreground text-base md:text-lg">
            <div className="p-1.5 md:p-2 rounded-lg gradient-primary glow-primary">
              <DollarSign size={16} className="text-white md:w-[18px] md:h-[18px]" />
            </div>
            Performance Analytics
          </CardTitle>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="text-left sm:text-right">
              <p className="text-lg md:text-2xl font-bold text-foreground">
                {isPositive ? '+' : ''}{currentPnL} USDT
              </p>
              <div className="flex items-center gap-1 text-xs md:text-sm">
                {isPositive ? (
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-success" />
                ) : (
                  <TrendingDown className="w-3 h-3 md:w-4 md:h-4 text-destructive" />
                )}
                <span className={isPositive ? 'text-success' : 'text-destructive'}>
                  {dailyChange}% today
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* PnL Chart */}
          <div className="lg:col-span-2">
            <div className="mb-3 md:mb-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">P&L Over Time</h4>
            </div>
            <ResponsiveContainer width="100%" height={200} className="md:!h-[250px]">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(210 100% 60%)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(210 100% 60%)" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  className="text-muted-foreground"
                  tick={{ fontSize: 10 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  className="text-muted-foreground"
                  tick={{ fontSize: 10 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                    color: 'hsl(var(--foreground))',
                    fontSize: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="pnl" 
                  stroke="hsl(210 100% 60%)" 
                  strokeWidth={2}
                  fill="url(#pnlGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Side Metrics */}
          <div className="space-y-3 md:space-y-4">
            <div className="glass-card p-3 md:p-4 rounded-lg">
              <h4 className="text-sm font-medium text-muted-foreground mb-2 md:mb-3">Quick Stats</h4>
              <div className="space-y-2 md:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-muted-foreground">Best Trade</span>
                  <span className="text-xs md:text-sm font-semibold text-success">+85.20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-muted-foreground">Worst Trade</span>
                  <span className="text-xs md:text-sm font-semibold text-destructive">-32.10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-muted-foreground">Avg Trade</span>
                  <span className="text-xs md:text-sm font-semibold text-foreground">+13.74</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-muted-foreground">Sharpe Ratio</span>
                  <span className="text-xs md:text-sm font-semibold text-primary">2.34</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-3 md:p-4 rounded-lg">
              <h4 className="text-sm font-medium text-muted-foreground mb-2 md:mb-3">Emotional Correlation</h4>
              <ResponsiveContainer width="100%" height={100} className="md:!h-[120px]">
                <LineChart data={data}>
                  <Line 
                    type="monotone" 
                    dataKey="emotional" 
                    stroke="hsl(200 100% 50%)" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(200 100% 50%)', r: 2 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                      fontSize: '12px'
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
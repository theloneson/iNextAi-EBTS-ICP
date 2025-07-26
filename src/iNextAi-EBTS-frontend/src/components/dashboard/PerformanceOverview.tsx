import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";

export function PerformanceOverview() {
  const metrics = [
    {
      title: "Total P&L",
      value: "+$12,543.89",
      change: "+12.4%",
      isPositive: true,
      icon: DollarSign,
    },
    {
      title: "Win Rate",
      value: "68.2%",
      change: "+2.1%",
      isPositive: true,
      icon: Target,
    },
    {
      title: "Total Trades",
      value: "847",
      change: "+23",
      isPositive: true,
      icon: TrendingUp,
    },
    {
      title: "Risk Score",
      value: "4.2/10",
      change: "-0.3",
      isPositive: true,
      icon: TrendingDown,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                <p className={`text-sm flex items-center gap-1 ${
                  metric.isPositive ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {metric.change}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <metric.icon size={24} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
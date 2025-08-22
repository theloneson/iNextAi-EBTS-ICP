import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, AlertTriangle, CheckCircle, TrendingUp, ArrowRight } from "lucide-react";

export function AIInsights() {
  const insights = [
    {
      type: "warning",
      title: "High Risk Pattern Detected",
      description: "You've made 3 consecutive FOMO trades after losses. Consider taking a break.",
      icon: AlertTriangle,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      type: "success",
      title: "Emotional Control Improving",
      description: "Your revenge trading frequency has decreased by 40% this week.",
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      type: "opportunity",
      title: "Optimal Trading Window",
      description: "Based on your patterns, you perform best between 10 AM - 2 PM EST.",
      icon: TrendingUp,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
  ];

  const recommendations = [
    "Set position size limits based on recent emotional state",
    "Take a 15-minute break after 2 consecutive losses",
    "Focus on BTC/ETH pairs during high volatility periods",
    "Avoid trading 1 hour after major news events",
  ];

  return (
    <div className="space-y-6">
      {/* AI Insights */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Brain size={16} className="text-primary" />
            </div>
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${insight.bgColor}`}>
                <insight.icon size={16} className={insight.color} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{insight.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-foreground">
            <span className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp size={16} className="text-primary" />
              </div>
              Recommendations
            </span>
            <Button variant="ghost" size="sm" className="text-primary">
              View All <ArrowRight size={14} />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span className="text-sm text-muted-foreground">{rec}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
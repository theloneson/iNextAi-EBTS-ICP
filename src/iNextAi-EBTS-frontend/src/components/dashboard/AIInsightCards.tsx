import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, AlertTriangle, TrendingUp, Clock, ArrowRight, Lightbulb, Target } from "lucide-react";

const insights = [
  {
    id: 1,
    type: "warning",
    title: "FOMO Pattern Detected",
    description: "You've made 3 quick trades after a loss. Consider taking a break to reset your emotional state.",
    confidence: 92,
    timeAgo: "2m ago",
    action: "Take Break",
    priority: "high"
  },
  {
    id: 2,
    type: "opportunity",
    title: "Optimal Entry Window",
    description: "BTC showing strong support at $42,000. Your historical win rate at this level is 78%.",
    confidence: 85,
    timeAgo: "5m ago",
    action: "View Setup",
    priority: "medium"
  },
  {
    id: 3,
    type: "insight",
    title: "Emotional Correlation",
    description: "Your best trades happen when emotional score is between 60-75. Current: 65.",
    confidence: 89,
    timeAgo: "8m ago",
    action: "Learn More",
    priority: "low"
  },
  {
    id: 4,
    type: "strategy",
    title: "Risk Management Alert",
    description: "Current position size exceeds your typical 2% rule. Consider reducing exposure.",
    confidence: 94,
    timeAgo: "12m ago",
    action: "Adjust Size",
    priority: "high"
  }
];

export function AIInsightCards() {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return AlertTriangle;
      case "opportunity":
        return TrendingUp;
      case "insight":
        return Lightbulb;
      case "strategy":
        return Target;
      default:
        return Brain;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "warning":
        return "text-warning bg-warning/10 border-warning/20";
      case "opportunity":
        return "text-success bg-success/10 border-success/20";
      case "insight":
        return "text-primary bg-primary/10 border-primary/20";
      case "strategy":
        return "text-accent bg-accent/10 border-accent/20";
      default:
        return "text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-foreground text-base md:text-lg">
          <div className="flex items-center gap-2">
            <div className="p-1.5 md:p-2 rounded-lg gradient-primary glow-primary">
              <Brain size={16} className="text-white md:w-[18px] md:h-[18px]" />
            </div>
            AI Insights & Recommendations
          </div>
          <div className="sm:ml-auto">
            <Badge variant="outline" className="border-primary/20 text-primary text-xs">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full mr-1 md:mr-2 animate-pulse"></div>
              Active
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {insights.map((insight) => {
            const IconComponent = getInsightIcon(insight.type);
            return (
              <div key={insight.id} className="glass-card p-3 md:p-4 rounded-lg hover:bg-white/10 transition-all duration-200">
                <div className="flex items-start justify-between mb-2 md:mb-3">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <div className={`p-1 md:p-1.5 rounded-md ${getInsightColor(insight.type)}`}>
                      <IconComponent size={12} className="md:w-[14px] md:h-[14px]" />
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs capitalize ${getPriorityColor(insight.priority)}`}
                    >
                      {insight.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={8} className="md:w-[10px] md:h-[10px]" />
                    {insight.timeAgo}
                  </div>
                </div>
                
                <h4 className="font-semibold text-foreground mb-1 md:mb-2 text-sm md:text-base">{insight.title}</h4>
                <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3 leading-relaxed">
                  {insight.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Confidence: <span className="text-primary font-medium">{insight.confidence}%</span>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs h-7 md:h-8">
                    {insight.action}
                    <ArrowRight size={10} className="ml-1 md:w-3 md:h-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
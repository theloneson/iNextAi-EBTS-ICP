import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Activity
} from "lucide-react";

export const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      type: "trade",
      title: "Profitable BTC Trade",
      description: "Executed BUY order with 85% confidence",
      time: "3 mins ago",
      icon: TrendingUp,
      color: "success",
      value: "+$245.50"
    },
    {
      id: 2,
      type: "emotion",
      title: "Emotion Alert",
      description: "FOMO detected during ETH volatility",
      time: "8 mins ago",
      icon: AlertTriangle,
      color: "warning",
      value: "High Risk"
    },
    {
      id: 3,
      type: "ai",
      title: "AI Insight Generated",
      description: "Market pattern recognition: Bullish divergence",
      time: "15 mins ago",
      icon: Brain,
      color: "primary",
      value: "87% Accuracy"
    },
    {
      id: 4,
      type: "goal",
      title: "Daily Goal Achieved",
      description: "Reached +2.5% profit target",
      time: "1 hour ago",
      icon: Target,
      color: "success",
      value: "Goal Met"
    },
    {
      id: 5,
      type: "trade",
      title: "Stop Loss Triggered",
      description: "SOL position closed automatically",
      time: "2 hours ago",
      icon: TrendingDown,
      color: "destructive",
      value: "-$89.30"
    },
    {
      id: 6,
      type: "milestone",
      title: "Milestone Reached",
      description: "Completed 50 simulated trades",
      time: "3 hours ago",
      icon: CheckCircle,
      color: "accent",
      value: "Achievement"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "success":
        return "bg-success/10 text-success";
      case "destructive":
        return "bg-destructive/10 text-destructive";
      case "warning":
        return "bg-warning/10 text-warning";
      case "primary":
        return "bg-primary/10 text-primary";
      case "accent":
        return "bg-accent/10 text-accent";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <div className="p-2 rounded-lg gradient-primary glow-primary">
            <Activity size={16} className="text-white" />
          </div>
          Recent Activities
          <Badge variant="secondary" className="ml-auto bg-primary/20 text-primary">
            Live Feed
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px]">
          <div className="space-y-3">
            {activities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="glass-card p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getColorClasses(activity.color)}`}>
                      <IconComponent size={14} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-foreground">
                            {activity.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {activity.description}
                          </p>
                        </div>
                        
                        <div className="text-right ml-2">
                          <div className={`text-xs font-medium ${
                            activity.value.startsWith("+") ? "text-success" : 
                            activity.value.startsWith("-") ? "text-destructive" : 
                            "text-muted-foreground"
                          }`}>
                            {activity.value}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {activity.time}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getColorClasses(activity.color)} border-current`}
                        >
                          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
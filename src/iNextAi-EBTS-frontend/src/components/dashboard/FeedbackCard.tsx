import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";

export function FeedbackCard() {
  const feedbackItems = [
    {
      id: 1,
      type: "insight",
      icon: Lightbulb,
      title: "Pattern Recognition",
      message: "You tend to trade more emotionally during high volatility periods. Consider setting strict position sizes.",
      priority: "high",
      bgColor: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      id: 2,
      type: "warning",
      icon: AlertTriangle,
      title: "Risk Alert",
      message: "You've made 3 FOMO trades in the last 2 hours. Take a 15-minute break to reset.",
      priority: "urgent",
      bgColor: "bg-destructive/10",
      iconColor: "text-destructive"
    },
    {
      id: 3,
      type: "success",
      icon: CheckCircle,
      title: "Good Decision",
      message: "Your last trade showed excellent emotional control. You waited for confirmation.",
      priority: "positive",
      bgColor: "bg-success/10",
      iconColor: "text-success"
    },
    {
      id: 4,
      type: "recommendation",
      icon: TrendingUp,
      title: "Optimization Tip",
      message: "Your best performance occurs between 10 AM - 2 PM EST. Focus trading during these hours.",
      priority: "medium",
      bgColor: "bg-warning/10",
      iconColor: "text-warning"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-l-destructive";
      case "high":
        return "border-l-primary";
      case "positive":
        return "border-l-success";
      default:
        return "border-l-warning";
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Brain size={20} className="text-primary" />
          AI Feedback
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-primary text-sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {feedbackItems.map((item) => (
            <div 
              key={item.id} 
              className={`p-3 rounded-lg border-l-4 ${item.bgColor} ${getPriorityColor(item.priority)} transition-all hover:bg-opacity-80`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <item.icon size={16} className={item.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.message}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-primary">
                      Learn More
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground">
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
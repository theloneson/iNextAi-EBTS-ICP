import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Bot, TrendingUp, AlertTriangle, Lightbulb, Target } from "lucide-react";

interface TradeFeedbackPanelProps {
  currentEmotion: string;
}

export const TradeFeedbackPanel = ({ currentEmotion }: TradeFeedbackPanelProps) => {
  
  // Generate AI insights based on current emotion
  const getEmotionInsight = (emotion: string) => {
    const insights = {
      fearful: {
        type: "warning",
        icon: AlertTriangle,
        title: "Fear Detected",
        message: "Fear-driven trades often lead to missed opportunities. Consider waiting for a calmer state.",
        suggestion: "Take 3 deep breaths and reassess your analysis."
      },
      excited: {
        type: "info",
        icon: TrendingUp,
        title: "High Excitement",
        message: "Excitement can lead to overconfidence. Double-check your risk management.",
        suggestion: "Reduce position size by 25% when highly excited."
      },
      anxious: {
        type: "warning",
        icon: AlertTriangle,
        title: "Anxiety Present",
        message: "Anxious trades are often rushed. Slow down and verify your strategy.",
        suggestion: "Use smaller position sizes until anxiety subsides."
      },
      confident: {
        type: "success",
        icon: Target,
        title: "Optimal State",
        message: "Confidence with analysis is ideal for trading. Maintain this balanced approach.",
        suggestion: "Good time to execute well-planned trades."
      },
      frustrated: {
        type: "destructive",
        icon: AlertTriangle,
        title: "Frustration Alert",
        message: "Frustrated traders often revenge trade. Take a break before continuing.",
        suggestion: "Step away for 15 minutes to reset your mindset."
      }
    };

    return insights[emotion as keyof typeof insights] || {
      type: "info",
      icon: Lightbulb,
      title: "Neutral State",
      message: "Good emotional balance for making rational trading decisions.",
      suggestion: "Continue with your planned strategy."
    };
  };

  const currentInsight = getEmotionInsight(currentEmotion);

  const recentFeedback = [
    {
      timestamp: "2 minutes ago",
      type: "pattern",
      message: "You tend to overtrade when BTC drops >5%. Consider setting alerts instead.",
      accuracy: 87
    },
    {
      timestamp: "15 minutes ago", 
      type: "emotional",
      message: "Your confidence correlates with 23% better trade outcomes. Current state: Optimal.",
      accuracy: 92
    },
    {
      timestamp: "1 hour ago",
      type: "technical",
      message: "RSI oversold signals have worked well for your strategy today (3/4 wins).",
      accuracy: 75
    }
  ];

  return (
    <Card className="glass-card p-6">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">AI Trade Feedback</h3>
          <Badge variant="outline" className="border-border/50">
            <Bot className="h-3 w-3 mr-1" />
            Real-time
          </Badge>
        </div>

        {/* Current Emotional Insight */}
        {currentEmotion && (
          <Alert className={`border-l-4 ${
            currentInsight.type === 'success' ? 'border-l-success bg-success/5' :
            currentInsight.type === 'warning' ? 'border-l-warning bg-warning/5' :
            currentInsight.type === 'destructive' ? 'border-l-destructive bg-destructive/5' :
            'border-l-primary bg-primary/5'
          }`}>
            <currentInsight.icon className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <div className="font-semibold">{currentInsight.title}</div>
                <div className="text-sm">{currentInsight.message}</div>
                <div className="text-xs bg-muted/50 rounded px-2 py-1">
                  💡 Suggestion: {currentInsight.suggestion}
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Recent AI Insights */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Recent Insights</Label>
            <Button variant="ghost" size="sm" className="text-xs">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentFeedback.map((feedback, index) => (
              <div key={index} className="bg-muted/10 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${
                      feedback.type === 'emotional' ? 'bg-primary/20 text-primary' :
                      feedback.type === 'pattern' ? 'bg-warning/20 text-warning' :
                      'bg-secondary/20 text-secondary'
                    }`}
                  >
                    {feedback.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {feedback.timestamp}
                  </span>
                </div>
                
                <p className="text-sm text-foreground">
                  {feedback.message}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">Accuracy:</span>
                    <Badge variant="outline" className="text-xs">
                      {feedback.accuracy}%
                    </Badge>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-xs">
                      👍
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-xs">
                      👎
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Learning Status */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">AI Learning Status</span>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pattern Recognition:</span>
              <Badge variant="secondary">Training</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Emotional Analysis:</span>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data Points Collected:</span>
              <span className="font-mono">1,247</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            Request Analysis
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Export Insights
          </Button>
        </div>
      </div>
    </Card>
  );
};

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={className}>{children}</label>
);
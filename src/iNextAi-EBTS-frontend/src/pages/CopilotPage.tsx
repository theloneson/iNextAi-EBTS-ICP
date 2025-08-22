import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, TrendingUp, AlertTriangle, Target, Lightbulb } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const CopilotPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "ai",
      content: "Hi! I'm your AI Trading Copilot. I can help you analyze your trading patterns, emotions, and provide personalized insights. What would you like to know?",
      timestamp: new Date(),
    },
  ]);

  const insights = [
    {
      icon: TrendingUp,
      title: "Performance Trend",
      content: "Your trading performance has improved 23% this week. You're making more calculated decisions.",
      type: "success",
    },
    {
      icon: AlertTriangle,
      title: "Emotional Pattern",
      content: "You tend to trade impulsively when BTC drops >5%. Consider setting alerts instead.",
      type: "warning",
    },
    {
      icon: Target,
      title: "Strategy Suggestion",
      content: "Your win rate is highest during 9-11 AM. Consider focusing your trading during these hours.",
      type: "info",
    },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      type: "user",
      content: message,
      timestamp: new Date(),
    };

    const aiResponse = {
      type: "ai",
      content: "I understand you're asking about " + message + ". Based on your trading history, I'd recommend taking a more conservative approach. Your emotional state shows signs of FOMO. Let me analyze your recent trades...",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setMessage("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center glow-primary">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Trading Copilot</h1>
            <p className="text-sm text-muted-foreground">Your intelligent trading assistant</p>
          </div>
          <Badge variant="secondary" className="bg-success/20 text-success ml-auto">
            Online
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="glass-card p-6 h-[500px] flex flex-col">
              <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.type === "user"
                          ? "gradient-primary text-white"
                          : "glass-card border border-border/50"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about your trading patterns, emotions, or strategies..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm" className="px-3">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* AI Insights Panel */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Real-time Insights</h3>
            
            {insights.map((insight, index) => (
              <Card key={index} className="glass-card p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    insight.type === "success" ? "bg-success/20 text-success" :
                    insight.type === "warning" ? "bg-warning/20 text-warning" :
                    "bg-primary/20 text-primary"
                  }`}>
                    <insight.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground mb-1">
                      {insight.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {insight.content}
                    </p>
                  </div>
                </div>
              </Card>
            ))}

            {/* Quick Actions */}
            <Card className="glass-card p-4">
              <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Quick Actions
              </h4>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs"
                  onClick={() => setMessage("Analyze my emotional trading patterns")}
                >
                  Analyze Emotional Patterns
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs"
                  onClick={() => setMessage("What's my optimal trading time?")}
                >
                  Find Optimal Trading Times
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs"
                  onClick={() => setMessage("Review my risk management")}
                >
                  Review Risk Management
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CopilotPage;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";

export function EmotionalGauge() {
  const emotionalScore = 7.2; // Out of 10
  const maxScore = 10;
  const percentage = (emotionalScore / maxScore) * 100;
  
  // Calculate color based on score
  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-500";
    if (score >= 6) return "text-yellow-500";
    if (score >= 4) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 8) return "from-green-500/20 to-green-600/20";
    if (score >= 6) return "from-yellow-500/20 to-yellow-600/20";
    if (score >= 4) return "from-orange-500/20 to-orange-600/20";
    return "from-red-500/20 to-red-600/20";
  };

  // Generate gauge path
  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Brain size={16} className="text-primary" />
          </div>
          Emotional Control Score
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        {/* Gauge */}
        <div className="relative">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              stroke="hsl(var(--muted))"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {/* Progress circle */}
            <circle
              stroke="currentColor"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className={getScoreColor(emotionalScore)}
            />
          </svg>
          
          {/* Score display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor(emotionalScore)}`}>
              {emotionalScore}
            </span>
            <span className="text-sm text-muted-foreground">/ 10</span>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="w-full space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Discipline</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
              </div>
              <span className="text-sm font-medium text-foreground">8.5</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Patience</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: "65%" }}></div>
              </div>
              <span className="text-sm font-medium text-foreground">6.5</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Risk Control</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: "70%" }}></div>
              </div>
              <span className="text-sm font-medium text-foreground">7.0</span>
            </div>
          </div>
        </div>

        {/* Status message */}
        <div className={`w-full p-3 rounded-lg bg-gradient-to-r ${getScoreBgColor(emotionalScore)}`}>
          <p className="text-sm text-center text-foreground">
            {emotionalScore >= 8 ? "Excellent emotional control! Keep it up." :
             emotionalScore >= 6 ? "Good control, but room for improvement." :
             emotionalScore >= 4 ? "Moderate control. Consider taking breaks." :
             "High emotional stress detected. Take a break."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
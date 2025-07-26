import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";

export function EmotionalScoreGauge() {
  const score = 76;
  const radius = 45;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 70) return "hsl(var(--success))";
    if (score >= 40) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return "Good";
    if (score >= 40) return "Neutral";
    return "Poor";
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Brain size={16} className="text-primary" />
          Emotional Score
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
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
              stroke={getScoreColor(score)}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className="transition-all duration-500 ease-in-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">{score}</span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm font-medium" style={{ color: getScoreColor(score) }}>
            {getScoreLabel(score)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Your emotional state is stable
          </p>
        </div>

        <div className="w-full space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Fear</span>
            <span className="text-foreground">25%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div className="bg-destructive h-1.5 rounded-full" style={{ width: "25%" }}></div>
          </div>
          
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Greed</span>
            <span className="text-foreground">40%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div className="bg-warning h-1.5 rounded-full" style={{ width: "40%" }}></div>
          </div>
          
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Confidence</span>
            <span className="text-foreground">76%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div className="bg-success h-1.5 rounded-full" style={{ width: "76%" }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
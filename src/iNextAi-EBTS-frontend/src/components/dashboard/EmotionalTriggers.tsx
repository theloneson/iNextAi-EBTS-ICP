import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Zap, RotateCcw, DollarSign, AlertTriangle, Info } from "lucide-react";

export function EmotionalTriggers() {
  const metrics = [
    { icon: Zap, label: "FOMO Index", value: 0, color: "text-primary" },
    { icon: RotateCcw, label: "Revenge Trades", value: 0, color: "text-primary" },
    { icon: DollarSign, label: "Greed Index", value: 0, color: "text-primary" },
    { icon: AlertTriangle, label: "Fear Index", value: 0, color: "text-primary" },
  ];

  // Radar chart data (0-100 scale)
  const radarData = {
    greed: 20,
    confidence: 75,
    fear: 30,
    revenge: 15,
    fomo: 25
  };

  // Convert to coordinates for pentagon
  const centerX = 100;
  const centerY = 100;
  const maxRadius = 70;
  
  const getPoint = (angle: number, value: number) => {
    const radian = (angle - 90) * (Math.PI / 180);
    const radius = (value / 100) * maxRadius;
    return {
      x: centerX + radius * Math.cos(radian),
      y: centerY + radius * Math.sin(radian)
    };
  };

  const angles = [0, 72, 144, 216, 288]; // Pentagon angles
  const values = [radarData.greed, radarData.confidence, radarData.fear, radarData.revenge, radarData.fomo];
  const labels = ['Greed', 'Confidence', 'Fear', 'Revenge', 'FOMO'];

  // Create pentagon grid lines
  const gridLevels = [20, 40, 60, 80, 100];
  
  return (
    <Card className="glass-card border-white/10 glow-accent">
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-foreground text-base md:text-lg">
          <div className="flex items-center gap-2">
            <div className="p-1.5 md:p-2 rounded-lg gradient-accent glow-accent">
              <Brain size={16} className="text-white md:w-[18px] md:h-[18px]" />
            </div>
            Emotional Intelligence Dashboard
          </div>
          <div className="sm:ml-auto">
            <div className="text-left sm:text-right">
              <div className="text-xs md:text-sm text-muted-foreground">Emotional Score</div>
              <div className="text-lg md:text-xl font-bold text-primary">65/100</div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Left side - Enhanced Emotional Metrics */}
          <div className="space-y-2 md:space-y-3">
            {[
              { icon: Zap, label: "FOMO Triggers", value: 3, color: "warning", description: "Last 24h" },
              { icon: RotateCcw, label: "Revenge Trades", value: 1, color: "destructive", description: "This week" },
              { icon: DollarSign, label: "Greed Episodes", value: 5, color: "success", description: "This month" },
              { icon: AlertTriangle, label: "Fear Spikes", value: 2, color: "primary", description: "Today" },
            ].map((metric, index) => (
              <div key={index} className="glass-card p-2 md:p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className={`p-1 md:p-1.5 rounded-lg bg-${metric.color}/10`}>
                      <metric.icon size={12} className={`text-${metric.color} md:w-[14px] md:h-[14px]`} />
                    </div>
                    <div>
                      <span className="text-foreground text-xs md:text-sm font-medium">{metric.label}</span>
                      <div className="text-xs text-muted-foreground">{metric.description}</div>
                    </div>
                  </div>
                  <span className="text-base md:text-lg font-bold text-foreground">{metric.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Radar Chart */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <svg width="160" height="160" viewBox="0 0 200 200" className="md:w-[200px] md:h-[200px]">
                {/* Grid lines */}
                {gridLevels.map((level, index) => {
                  const points = angles.map(angle => getPoint(angle, level)).map(p => `${p.x},${p.y}`).join(' ');
                  return (
                    <polygon
                      key={index}
                      points={points}
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  );
                })}
                
                {/* Axis lines */}
                {angles.map((angle, index) => {
                  const outerPoint = getPoint(angle, 100);
                  return (
                    <line
                      key={index}
                      x1={centerX}
                      y1={centerY}
                      x2={outerPoint.x}
                      y2={outerPoint.y}
                      stroke="hsl(var(--border))"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  );
                })}
                
                {/* Data polygon */}
                <polygon
                  points={angles.map((angle, index) => {
                    const point = getPoint(angle, values[index]);
                    return `${point.x},${point.y}`;
                  }).join(' ')}
                  fill="hsl(var(--primary))"
                  fillOpacity="0.2"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                />
                
                {/* Data points */}
                {angles.map((angle, index) => {
                  const point = getPoint(angle, values[index]);
                  return (
                    <circle
                      key={index}
                      cx={point.x}
                      cy={point.y}
                      r="3"
                      fill="hsl(var(--primary))"
                    />
                  );
                })}
                
                {/* Labels */}
                {angles.map((angle, index) => {
                  const labelPoint = getPoint(angle, 110);
                  return (
                    <text
                      key={index}
                      x={labelPoint.x}
                      y={labelPoint.y}
                      textAnchor="middle"
                      className="fill-muted-foreground text-xs"
                      dominantBaseline="middle"
                    >
                      {labels[index]}
                    </text>
                  );
                })}
              </svg>
            </div>
            
            <div className="text-center mt-1 md:mt-2">
              <h4 className="text-xs md:text-sm font-medium text-foreground">Emotional Index</h4>
            </div>
          </div>
        </div>
        
        <div className="mt-3 md:mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Info size={10} className="md:w-3 md:h-3" />
          <span>FOMO triggered after 3 quick buys post-loss</span>
        </div>
      </CardContent>
    </Card>
  );
}
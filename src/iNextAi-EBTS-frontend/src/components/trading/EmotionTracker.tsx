import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Zap, Shield } from "lucide-react";

interface EmotionTrackerProps {
  currentEmotion: string;
  onEmotionChange: (emotion: string) => void;
}

export const EmotionTracker = ({ currentEmotion, onEmotionChange }: EmotionTrackerProps) => {
  const [confidence, setConfidence] = useState([7]);
  const [fear, setFear] = useState([3]);
  const [excitement, setExcitement] = useState([5]);
  const [stress, setStress] = useState([4]);

  const emotions = [
    { emoji: "😊", label: "Happy", value: "happy", color: "text-success" },
    { emoji: "😰", label: "Fearful", value: "fearful", color: "text-destructive" },
    { emoji: "😤", label: "Anxious", value: "anxious", color: "text-warning" },
    { emoji: "😎", label: "Confident", value: "confident", color: "text-primary" },
    { emoji: "🤔", label: "Uncertain", value: "uncertain", color: "text-muted-foreground" },
    { emoji: "🚀", label: "Excited", value: "excited", color: "text-secondary" },
    { emoji: "😑", label: "Neutral", value: "neutral", color: "text-muted-foreground" },
    { emoji: "😡", label: "Frustrated", value: "frustrated", color: "text-destructive" },
  ];

  const emotionalMetrics = [
    { 
      icon: Shield, 
      label: "Confidence", 
      value: confidence[0], 
      setValue: setConfidence, 
      color: "text-primary",
      description: "How sure are you about this trade?"
    },
    { 
      icon: Brain, 
      label: "Fear Level", 
      value: fear[0], 
      setValue: setFear, 
      color: "text-destructive",
      description: "How much fear/anxiety do you feel?"
    },
    { 
      icon: Zap, 
      label: "Excitement", 
      value: excitement[0], 
      setValue: setExcitement, 
      color: "text-success",
      description: "How excited are you about this opportunity?"
    },
    { 
      icon: Heart, 
      label: "Stress", 
      value: stress[0], 
      setValue: setStress, 
      color: "text-warning",
      description: "How stressed or pressured do you feel?"
    },
  ];

  return (
    <Card className="glass-card p-6">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Emotion Tracker</h3>
          <Badge variant="outline" className="border-border/50">
            <Brain className="h-3 w-3 mr-1" />
            Pre-Trade
          </Badge>
        </div>

        {/* Current Emotion Display */}
        {currentEmotion && (
          <div className="bg-primary/10 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">
              {emotions.find(e => e.value === currentEmotion)?.emoji}
            </div>
            <div className="text-sm font-medium text-primary">
              Current: {emotions.find(e => e.value === currentEmotion)?.label}
            </div>
          </div>
        )}

        {/* Quick Emotion Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">How are you feeling right now?</Label>
          <div className="grid grid-cols-4 gap-2">
            {emotions.map((emotion) => (
              <Button
                key={emotion.value}
                variant={currentEmotion === emotion.value ? "default" : "outline"}
                size="sm"
                onClick={() => onEmotionChange(emotion.value)}
                className="flex flex-col items-center gap-1 h-auto py-3"
              >
                <span className="text-lg">{emotion.emoji}</span>
                <span className="text-xs">{emotion.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Detailed Emotional Metrics */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Detailed Emotions (0-10)</Label>
          
          {emotionalMetrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {metric.value}/10
                </Badge>
              </div>
              
              <Slider
                value={[metric.value]}
                onValueChange={(value) => metric.setValue(value)}
                max={10}
                min={0}
                step={1}
                className="w-full"
              />
              
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Emotional State Summary */}
        <div className="bg-muted/20 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Emotional Stability</span>
            <Badge variant="outline" className="border-border/50">
              {Math.round((10 - stress[0] + confidence[0]) / 2)}/10
            </Badge>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Based on your confidence and stress levels. Higher stability indicates better decision-making state.
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setConfidence([7]);
              setFear([3]);
              setExcitement([5]);
              setStress([4]);
              onEmotionChange("neutral");
            }}
            className="flex-1"
          >
            Reset
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
          >
            Save State
          </Button>
        </div>
      </div>
    </Card>
  );
};
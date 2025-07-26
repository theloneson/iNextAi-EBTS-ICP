import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Smile, Meh, Frown, Zap, AlertTriangle, TrendingUp } from "lucide-react";
import { useState } from "react";

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string>("confident");
  const [moodNote, setMoodNote] = useState("");

  const moods = [
    { id: "confident", label: "Confident", emoji: "😎" },
    { id: "neutral", label: "Neutral", emoji: "😐" },
    { id: "anxious", label: "Anxious", emoji: "😰" },
    { id: "excited", label: "Excited", emoji: "🤗" },
    { id: "stress", label: "Stress", emoji: "😫" },
  ];

  const recentMoods = [
    { day: "Yesterday:", mood: "Excited", emoji: "😃" },
    { day: "Monday:", mood: "Stressed", emoji: "😫", note: "(after loss)" },
    { day: "Sunday:", mood: "Excited", emoji: "😃" },
    { day: "Friday:", mood: "Confident", emoji: "😎" },
  ];

  return (
    <Card className="glass-card border-white/10 h-fit">
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground text-base md:text-lg">
          <div className="p-1.5 md:p-2 rounded-lg gradient-secondary">
            <Heart size={16} className="text-primary md:w-[18px] md:h-[18px]" />
          </div>
          Mood & Wellness Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-4">
        {/* Current Emotional State */}
        <div className="glass-card p-3 md:p-4 rounded-lg mb-3 md:mb-4">
          <div className="text-center">
            <div className="text-3xl md:text-4xl mb-2">😎</div>
            <h3 className="font-semibold text-foreground text-sm md:text-base">Confident</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Feeling optimized for trading</p>
            <div className="flex items-center justify-center gap-1 md:gap-2 mt-2">
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-success" />
              <span className="text-xs md:text-sm text-success">+15% mood improvement</span>
            </div>
          </div>
        </div>

        {/* Mood Selection Grid */}
        <div className="grid grid-cols-2 gap-1.5 md:gap-2">
          {moods.slice(0, 4).map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`p-2 md:p-3 rounded-lg border transition-all text-center glass-card ${
                selectedMood === mood.id
                  ? "border-primary bg-primary/20 glow-primary"
                  : "border-white/10 hover:bg-white/10"
              }`}
            >
              <div className="text-lg md:text-xl mb-1">{mood.emoji}</div>
              <div className="text-xs text-muted-foreground">{mood.label}</div>
            </button>
          ))}
        </div>

        {/* Mood Note */}
        <div>
          <CardTitle className="flex items-center gap-2 text-foreground mb-2 md:mb-3 text-sm md:text-base">
            <Zap size={14} className="text-primary md:w-4 md:h-4" />
            Mood Note
          </CardTitle>
          <Textarea
            placeholder="Tell us more..."
            value={moodNote}
            onChange={(e) => setMoodNote(e.target.value)}
            className="min-h-[60px] md:min-h-[80px] text-xs md:text-sm bg-muted/30 border-border"
          />
        </div>

        <Button className="w-full gradient-primary hover:opacity-90 text-white glow-primary text-sm">
          Update Mood
        </Button>

        {/* Mood History */}
        <div>
          <CardTitle className="flex items-center gap-2 text-foreground mb-2 md:mb-3 text-sm md:text-base">
            <Smile size={14} className="text-primary md:w-4 md:h-4" />
            Mood History
          </CardTitle>
          <div className="space-y-1.5 md:space-y-2">
            {recentMoods.map((entry, index) => (
              <div key={index} className="glass-card p-2 rounded-lg flex items-center gap-2 md:gap-3">
                <div className="text-base md:text-lg">{entry.emoji}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm text-muted-foreground">{entry.day}</span>
                    <span className="text-xs md:text-sm text-foreground font-medium">{entry.mood}</span>
                  </div>
                  {entry.note && (
                    <div className="text-xs text-muted-foreground mt-1">{entry.note}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
public type EmotionType = { #FOMO; #Revenge; #Greed; #Fear; #Overtrading; #Neutral };
public type TradeStyle = { #Perpetual; #Degen; #Scalper; #Swing; #Unknown };
public type RiskLevel = { #Low; #Medium; #High; #Extreme };
public type AnalysisStatus = { #Pending; #Completed; #Failed };

public type StreakData = {
    currentWinStreak: Nat;
    currentLossStreak: Nat;
    longestWinStreak: Nat;
    longestLossStreak: Nat;
    totalProfitable: Nat;
    totalUnprofitable: Nat;
};

public type BehavioralAnalysis = {
    analysisId: Text;
    userPrincipal: Principal;
    timestamp: Int;
    tradeIds: [Text];
    emotionScore: Nat8;
    detectedEmotions: [EmotionType];
    dominantEmotion: EmotionType;
    tradeStyle: TradeStyle;
    riskLevel: RiskLevel;
    recommendationLevel: Nat8;
    patternFlags: [Text];
    streakData: StreakData;
    status: AnalysisStatus;
};
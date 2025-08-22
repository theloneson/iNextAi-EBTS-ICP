import Time "mo:base/Time";
import Array "mo:base/Array";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Nat8 "mo:base/Nat8";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";

// Import your types (assuming they're from a shared module)
public type EmotionType = { #FOMO; #Revenge; #Greed; #Fear; #Overtrading; #Neutral };
public type TradeStyle = { #Perpetual; #Degen; #Scalper; #Swing; #Unknown };
public type RiskLevel = { #Low; #Medium; #High; #Extreme };
public type TradeDirection = { #Buy; #Sell };

public type TradeRecord = {
  tradeId: Text;
  timestamp: Int;
  direction: TradeDirection;
  volume: Float;
  entryPrice: Float;
  exitPrice: ?Float;
  leverage: ?Nat8;
  profitLoss: ?Float;
  holdingDuration: ?Int;
  isActive: Bool;
  riskScore: Nat8;
  tokenPair: Text;
  emotionalTags: [EmotionType];
};

public type PatternResult = {
  patternType: Text;
  severity: Nat8; // 1-10
  confidence: Float; // 0.0-1.0
  description: Text;
  triggerTrades: [Text];
};

public type EmotionDetectionRule = {
  ruleId: Text;
  emotion: EmotionType;
  conditions: [Text];
  weight: Float;
  description: Text;
};

public type BehavioralScore = {
  emotionScore: Nat8; // 0-100 (higher = more stable)
  riskScore: Nat8;    // 0-100 (higher = more risky)
  disciplineScore: Nat8; // 0-100 (higher = more disciplined)
  consistencyScore: Nat8; // 0-100
  overallScore: Nat8; // Weighted average
};

actor BehavioralAnalysisEngine {
  
  // ========== EMOTION DETECTION RULES ========== //
  
  private func detectFOMO(trades: [TradeRecord]): PatternResult {
    var fomoScore: Nat8 = 0;
    var confidence: Float = 0.0;
    let triggerTrades = Buffer.Buffer<Text>(0);
    
    // Pattern: Multiple quick buys during price spikes
    if (trades.size() >= 2) {
      for (i in Iter.range(1, trades.size() - 1)) {
        let currentTrade = trades[i];
        let prevTrade = trades[i-1];
        
        // Check for rapid successive buys
        let timeDiff = currentTrade.timestamp - prevTrade.timestamp;
        let priceIncrease = (currentTrade.entryPrice - prevTrade.entryPrice) / prevTrade.entryPrice;
        
        if (currentTrade.direction == #Buy and 
            prevTrade.direction == #Buy and
            timeDiff < (15 * 60 * 1_000_000_000) and // Within 15 minutes
            priceIncrease > 0.05) { // Price increased by >5%
          
          fomoScore += 20;
          confidence += 0.3;
          triggerTrades.add(currentTrade.tradeId);
        };
        
        // Check for increasing position sizes during uptrends
        if (currentTrade.volume > prevTrade.volume * 1.5 and
            currentTrade.direction == #Buy) {
          fomoScore += 15;
          confidence += 0.2;
          triggerTrades.add(currentTrade.tradeId);
        };
      };
    };
    
    // Check for high leverage during volatile periods
    for (trade in trades.vals()) {
      switch (trade.leverage) {
        case (?lev) {
          if (lev > 10 and trade.direction == #Buy) {
            fomoScore += 10;
            confidence += 0.1;
          };
        };
        case null {};
      };
    };
    
    {
      patternType = "FOMO_BUYING";
      severity = if (fomoScore > 50) 8 else if (fomoScore > 30) 6 else if (fomoScore > 10) 4 else 0;
      confidence = Float.min(confidence, 1.0);
      description = "Detected fear of missing out pattern: rapid buying during price increases";
      triggerTrades = Buffer.toArray(triggerTrades);
    };
  };
  
  private func detectRevengeTrending(trades: [TradeRecord]): PatternResult {
    var revengeScore: Nat8 = 0;
    var confidence: Float = 0.0;
    let triggerTrades = Buffer.Buffer<Text>(0);
    
    // Look for pattern: Loss -> Immediate larger position in opposite direction
    if (trades.size() >= 2) {
      for (i in Iter.range(1, trades.size() - 1)) {
        let currentTrade = trades[i];
        let prevTrade = trades[i-1];
        
        // Check if previous trade was a loss
        switch (prevTrade.profitLoss) {
          case (?pnl) {
            if (pnl < 0) {
              let timeDiff = currentTrade.timestamp - prevTrade.timestamp;
              
              // Quick reversal with larger size
              if (timeDiff < (30 * 60 * 1_000_000_000) and // Within 30 minutes
                  currentTrade.volume > prevTrade.volume * 1.2 and
                  currentTrade.direction != prevTrade.direction) {
                
                revengeScore += 25;
                confidence += 0.4;
                triggerTrades.add(currentTrade.tradeId);
              };
              
              // Multiple losses followed by oversized bet
              if (currentTrade.volume > prevTrade.volume * 2.0) {
                revengeScore += 20;
                confidence += 0.3;
                triggerTrades.add(currentTrade.tradeId);
              };
            };
          };
          case null {};
        };
      };
    };
    
    // Check for emotional leverage spikes after losses
    var lossCount = 0;
    for (trade in trades.vals()) {
      switch (trade.profitLoss) {
        case (?pnl) {
          if (pnl < 0) lossCount += 1;
        };
        case null {};
      };
    };
    
    if (lossCount >= 2) {
      for (trade in trades.vals()) {
        switch (trade.leverage) {
          case (?lev) {
            if (lev > 15) {
              revengeScore += 15;
              confidence += 0.2;
            };
          };
          case null {};
        };
      };
    };
    
    {
      patternType = "REVENGE_TRADING";
      severity = if (revengeScore > 60) 9 else if (revengeScore > 40) 7 else if (revengeScore > 20) 5 else 0;
      confidence = Float.min(confidence, 1.0);
      description = "Detected revenge trading pattern: oversized bets after losses";
      triggerTrades = Buffer.toArray(triggerTrades);
    };
  };
  
  private func detectOvertrading(trades: [TradeRecord]): PatternResult {
    var overtradingScore: Nat8 = 0;
    var confidence: Float = 0.0;
    let triggerTrades = Buffer.Buffer<Text>(0);
    
    let tradeCount = trades.size();
    let timeSpan = if (tradeCount > 1) {
      trades[tradeCount-1].timestamp - trades[0].timestamp
    } else { 0 };
    
    // Calculate trade frequency
    if (timeSpan > 0) {
      let hoursSpan = Float.fromInt(timeSpan) / (60.0 * 60.0 * 1_000_000_000.0);
      let tradesPerHour = Float.fromInt(tradeCount) / hoursSpan;
      
      if (tradesPerHour > 5.0) { // More than 5 trades per hour
        overtradingScore += 30;
        confidence += 0.5;
      } else if (tradesPerHour > 2.0) { // More than 2 trades per hour
        overtradingScore += 20;
        confidence += 0.3;
      };
    };
    
    // Check for very short holding periods
    var shortHolds = 0;
    for (trade in trades.vals()) {
      switch (trade.holdingDuration) {
        case (?duration) {
          if (duration < (5 * 60 * 1_000_000_000)) { // Less than 5 minutes
            shortHolds += 1;
            overtradingScore += 10;
          };
        };
        case null {};
      };
    };
    
    // If more than 50% of trades are very short term
    if (shortHolds > tradeCount / 2 and tradeCount > 4) {
      overtradingScore += 25;
      confidence += 0.4;
    };
    
    // Check for excessive volume churning
    var totalVolume: Float = 0;
    for (trade in trades.vals()) {
      totalVolume += trade.volume;
    };
    
    let avgVolume = if (tradeCount > 0) totalVolume / Float.fromInt(tradeCount) else 0.0;
    var highVolumeCount = 0;
    
    for (trade in trades.vals()) {
      if (trade.volume > avgVolume * 3.0) {
        highVolumeCount += 1;
        overtradingScore += 5;
      };
    };
    
    // Add all high-frequency trades to trigger list
    if (overtradingScore > 30) {
      for (trade in trades.vals()) {
        triggerTrades.add(trade.tradeId);
      };
    };
    
    {
      patternType = "OVERTRADING";
      severity = if (overtradingScore > 70) 9 else if (overtradingScore > 50) 7 else if (overtradingScore > 30) 5 else 0;
      confidence = Float.min(confidence, 1.0);
      description = "Detected overtrading pattern: excessive trade frequency and short holding periods";
      triggerTrades = Buffer.toArray(triggerTrades);
    };
  };

  private func detectGreed(trades: [TradeRecord]): PatternResult {
    var greedScore: Nat8 = 0;
    var confidence: Float = 0.0;
    let triggerTrades = Buffer.Buffer<Text>(0);
    
    // Pattern: Increasing position sizes after wins
    if (trades.size() >= 2) {
      for (i in Iter.range(1, trades.size() - 1)) {
        let currentTrade = trades[i];
        let prevTrade = trades[i-1];
        
        switch (prevTrade.profitLoss) {
          case (?pnl) {
            if (pnl > 0 and currentTrade.volume > prevTrade.volume * 1.5) {
              greedScore += 20;
              confidence += 0.3;
              triggerTrades.add(currentTrade.tradeId);
            };
          };
          case null {};
        };
      };
    };
    
    // Check for leverage escalation after profitable trades
    var winStreak = 0;
    for (i in Iter.range(0, trades.size() - 1)) {
      let trade = trades[i];
      switch (trade.profitLoss) {
        case (?pnl) {
          if (pnl > 0) {
            winStreak += 1;
            // Check if leverage increased during win streak
            switch (trade.leverage) {
              case (?lev) {
                if (winStreak >= 2 and lev > 8) {
                  greedScore += 15;
                  confidence += 0.2;
                  triggerTrades.add(trade.tradeId);
                };
              };
              case null {};
            };
          } else {
            winStreak := 0;
          };
        };
        case null {};
      };
    };
    
    // Check for holding winners too long (unrealized profits turning to losses)
    for (trade in trades.vals()) {
      switch (trade.holdingDuration, trade.profitLoss) {
        case (?duration, ?pnl) {
          if (duration > (4 * 60 * 60 * 1_000_000_000) and pnl < 0) { // Held > 4 hours, ended negative
            greedScore += 10;
            confidence += 0.1;
          };
        };
        case (_, _) {};
      };
    };
    
    {
      patternType = "GREED_PATTERN";
      severity = if (greedScore > 50) 7 else if (greedScore > 30) 5 else if (greedScore > 15) 3 else 0;
      confidence = Float.min(confidence, 1.0);
      description = "Detected greed pattern: escalating position sizes and leverage after wins";
      triggerTrades = Buffer.toArray(triggerTrades);
    };
  };

  private func detectFear(trades: [TradeRecord]): PatternResult {
    var fearScore: Nat8 = 0;
    var confidence: Float = 0.0;
    let triggerTrades = Buffer.Buffer<Text>(0);
    
    // Pattern: Cutting winners short, holding losers too long
    var earlyExits = 0;
    var longLosers = 0;
    
    for (trade in trades.vals()) {
      switch (trade.holdingDuration, trade.profitLoss) {
        case (?duration, ?pnl) {
          if (pnl > 0 and duration < (30 * 60 * 1_000_000_000)) { // Profitable but held < 30 min
            earlyExits += 1;
            fearScore += 10;
          };
          if (pnl < 0 and duration > (2 * 60 * 60 * 1_000_000_000)) { // Loss held > 2 hours
            longLosers += 1;
            fearScore += 15;
            triggerTrades.add(trade.tradeId);
          };
        };
        case (_, _) {};
      };
    };
    
    // Check for decreasing position sizes after losses
    if (trades.size() >= 2) {
      for (i in Iter.range(1, trades.size() - 1)) {
        let currentTrade = trades[i];
        let prevTrade = trades[i-1];
        
        switch (prevTrade.profitLoss) {
          case (?pnl) {
            if (pnl < 0 and currentTrade.volume < prevTrade.volume * 0.7) {
              fearScore += 12;
              confidence += 0.2;
            };
          };
          case null {};
        };
      };
    };
    
    // Check for low leverage usage consistently
    var lowLevCount = 0;
    for (trade in trades.vals()) {
      switch (trade.leverage) {
        case (?lev) {
          if (lev <= 2) lowLevCount += 1;
        };
        case null { lowLevCount += 1; };
      };
    };
    
    if (lowLevCount > trades.size() * 8 / 10) { // 80% of trades with low/no leverage
      fearScore += 8;
      confidence += 0.1;
    };
    
    confidence += Float.fromInt(earlyExits + longLosers) * 0.1;
    
    {
      patternType = "FEAR_PATTERN";
      severity = if (fearScore > 40) 6 else if (fearScore > 25) 4 else if (fearScore > 10) 2 else 0;
      confidence = Float.min(confidence, 1.0);
      description = "Detected fear pattern: early profit-taking and holding losses too long";
      triggerTrades = Buffer.toArray(triggerTrades);
    };
  };

  // ========== COMPREHENSIVE ANALYSIS FUNCTIONS ========== //

  public func analyzeTradingBehavior(trades: [TradeRecord]): async {
    patterns: [PatternResult];
    behavioralScore: BehavioralScore;
    recommendations: [Text];
    riskLevel: RiskLevel;
  } {
    let sortedTrades = Array.sort(trades, func(a: TradeRecord, b: TradeRecord): {#less; #equal; #greater} {
      if (a.timestamp < b.timestamp) { #less }
      else if (a.timestamp > b.timestamp) { #greater }
      else { #equal }
    });

    // Run all pattern detections
    let fomoPattern = detectFOMO(sortedTrades);
    let revengePattern = detectRevengeTrending(sortedTrades);
    let overtradingPattern = detectOvertrading(sortedTrades);
    let greedPattern = detectGreed(sortedTrades);
    let fearPattern = detectFear(sortedTrades);

    let patterns = [fomoPattern, revengePattern, overtradingPattern, greedPattern, fearPattern];
    let activePatterns = Array.filter(patterns, func(p: PatternResult): Bool { p.severity > 0 });

    // Calculate behavioral scores
    let behavioralScore = calculateBehavioralScore(sortedTrades, activePatterns);
    
    // Generate recommendations
    let recommendations = generateRecommendations(activePatterns, behavioralScore);
    
    // Determine overall risk level
    let riskLevel = determineRiskLevel(behavioralScore, activePatterns);

    {
      patterns = activePatterns;
      behavioralScore = behavioralScore;
      recommendations = recommendations;
      riskLevel = riskLevel;
    };
  };

  private func calculateBehavioralScore(trades: [TradeRecord], patterns: [PatternResult]): BehavioralScore {
    var emotionScore: Nat8 = 100; // Start with perfect score
    var riskScore: Nat8 = 0;
    var disciplineScore: Nat8 = 100;
    var consistencyScore: Nat8 = 100;

    // Deduct points based on pattern severity
    for (pattern in patterns.vals()) {
      switch (pattern.patternType) {
        case "FOMO_BUYING" {
          emotionScore := Nat8.sub(emotionScore, pattern.severity * 3);
          disciplineScore := Nat8.sub(disciplineScore, pattern.severity * 2);
        };
        case "REVENGE_TRADING" {
          emotionScore := Nat8.sub(emotionScore, pattern.severity * 4);
          disciplineScore := Nat8.sub(disciplineScore, pattern.severity * 3);
          riskScore += pattern.severity * 2;
        };
        case "OVERTRADING" {
          disciplineScore := Nat8.sub(disciplineScore, pattern.severity * 2);
          consistencyScore := Nat8.sub(consistencyScore, pattern.severity * 2);
        };
        case "GREED_PATTERN" {
          emotionScore := Nat8.sub(emotionScore, pattern.severity * 2);
          riskScore += pattern.severity;
        };
        case "FEAR_PATTERN" {
          emotionScore := Nat8.sub(emotionScore, pattern.severity);
          consistencyScore := Nat8.sub(consistencyScore, pattern.severity);
        };
        case _ {};
      };
    };

    // Calculate average risk from trades
    var totalRisk: Nat = 0;
    for (trade in trades.vals()) {
      totalRisk += Nat8.toNat(trade.riskScore);
    };
    let avgTradeRisk = if (trades.size() > 0) {
      Nat8.fromNat(totalRisk / trades.size())
    } else { 0 };
    
    riskScore := Nat8.max(riskScore, avgTradeRisk);

    // Calculate overall score (weighted average)
    let overallScore = (emotionScore * 3 + disciplineScore * 2 + consistencyScore * 2 + (100 - riskScore)) / 8;

    {
      emotionScore = emotionScore;
      riskScore = riskScore;
      disciplineScore = disciplineScore;
      consistencyScore = consistencyScore;
      overallScore = overallScore;
    };
  };

  private func generateRecommendations(patterns: [PatternResult], score: BehavioralScore): [Text] {
    let recommendations = Buffer.Buffer<Text>(0);

    for (pattern in patterns.vals()) {
      switch (pattern.patternType) {
        case "FOMO_BUYING" {
          if (pattern.severity >= 6) {
            recommendations.add("Consider implementing cooling-off periods between trades");
            recommendations.add("Set price alerts instead of monitoring markets continuously");
          };
        };
        case "REVENGE_TRADING" {
          if (pattern.severity >= 7) {
            recommendations.add("Take a mandatory break after 2 consecutive losses");
            recommendations.add("Implement a maximum daily loss limit");
          };
        };
        case "OVERTRADING" {
          if (pattern.severity >= 5) {
            recommendations.add("Limit yourself to maximum 3 trades per day");
            recommendations.add("Focus on quality setups over quantity");
          };
        };
        case "GREED_PATTERN" {
          if (pattern.severity >= 5) {
            recommendations.add("Set profit targets and stick to them");
            recommendations.add("Avoid increasing position size after wins");
          };
        };
        case "FEAR_PATTERN" {
          if (pattern.severity >= 4) {
            recommendations.add("Practice holding profitable positions longer");
            recommendations.add("Set stop losses and honor them");
          };
        };
        case _ {};
      };
    };

    // General score-based recommendations
    if (score.emotionScore < 50) {
      recommendations.add("Consider taking a break from trading to reset emotionally");
    };
    if (score.disciplineScore < 60) {
      recommendations.add("Create and follow a written trading plan");
    };
    if (score.riskScore > 70) {
      recommendations.add("Reduce position sizes and leverage usage");
    };

    Buffer.toArray(recommendations);
  };

  private func determineRiskLevel(score: BehavioralScore, patterns: [PatternResult]): RiskLevel {
    var maxSeverity: Nat8 = 0;
    for (pattern in patterns.vals()) {
      maxSeverity := Nat8.max(maxSeverity, pattern.severity);
    };

    if (score.riskScore > 80 or maxSeverity >= 9) {
      #Extreme
    } else if (score.riskScore > 60 or maxSeverity >= 7) {
      #High
    } else if (score.riskScore > 40 or maxSeverity >= 5) {
      #Medium
    } else {
      #Low
    };
  };

  // ========== PUBLIC QUERY METHODS ========== //

  public query func getEmotionDetectionRules(): [EmotionDetectionRule] {
    [
      {
        ruleId = "FOMO_001";
        emotion = #FOMO;
        conditions = ["rapid_buying", "price_spike", "high_leverage"];
        weight = 1.0;
        description = "Rapid buying during price increases";
      },
      {
        ruleId = "REVENGE_001";
        emotion = #Revenge;
        conditions = ["loss_followed_by_larger_opposite", "leverage_spike"];
        weight = 1.2;
        description = "Oversized bets after losses";
      },
      {
        ruleId = "OVERTRADING_001";
        emotion = #Overtrading;
        conditions = ["high_frequency", "short_holds"];
        weight = 0.8;
        description = "Excessive trading frequency";
      },
      {
        ruleId = "GREED_001";
        emotion = #Greed;
        conditions = ["size_increase_after_wins", "leverage_escalation"];
        weight = 0.9;
        description = "Position size escalation after profits";
      },
      {
        ruleId = "FEAR_001";
        emotion = #Fear;
        conditions = ["early_profit_taking", "holding_losses"];
        weight = 0.7;
        description = "Fear-based trading decisions";
      }
    ];
  };

  public query func analyzeEmotionalTags(emotionalTags: [EmotionType]): {
    dominantEmotion: EmotionType;
    emotionDistribution: [(EmotionType, Nat)];
    stabilityScore: Nat8;
  } {
    var fomoCount = 0;
    var revengeCount = 0;
    var greedCount = 0;
    var fearCount = 0;
    var overtradingCount = 0;
    var neutralCount = 0;

    for (emotion in emotionalTags.vals()) {
      switch (emotion) {
        case (#FOMO) { fomoCount += 1; };
        case (#Revenge) { revengeCount += 1; };
        case (#Greed) { greedCount += 1; };
        case (#Fear) { fearCount += 1; };
        case (#Overtrading) { overtradingCount += 1; };
        case (#Neutral) { neutralCount += 1; };
      };
    };

    let distribution = [
      (#FOMO, fomoCount),
      (#Revenge, revengeCount),
      (#Greed, greedCount),
      (#Fear, fearCount),
      (#Overtrading, overtradingCount),
      (#Neutral, neutralCount)
    ];

    // Find dominant emotion
    var maxCount = neutralCount;
    var dominant = #Neutral;
    
    if (fomoCount > maxCount) { maxCount := fomoCount; dominant := #FOMO; };
    if (revengeCount > maxCount) { maxCount := revengeCount; dominant := #Revenge; };
    if (greedCount > maxCount) { maxCount := greedCount; dominant := #Greed; };
    if (fearCount > maxCount) { maxCount := fearCount; dominant := #Fear; };
    if (overtradingCount > maxCount) { maxCount := overtradingCount; dominant := #Overtrading; };

    // Calculate stability (higher neutral count = more stable)
    let stabilityScore = if (emotionalTags.size() > 0) {
      Nat8.fromNat((neutralCount * 100) / emotionalTags.size())
    } else { 100 };

    {
      dominantEmotion = dominant;
      emotionDistribution = distribution;
      stabilityScore = stabilityScore;
    };
  };
};
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Float "mo:base/Float";
import Bool "mo:base/Bool";
import Int "mo:base/Int";
import Hash "mo:base/Hash";

// ========== DATABASE ACTOR ========== //
actor iNextDatabase {
  // ========== TYPE DEFINITIONS ========== //
  // Enums
  type TradeDirection = { #Buy; #Sell };

  type Blockchain = { #Ethereum; #Base; #Polygon; #Solana };

  type EmotionType = {
    #FOMO;
    #Revenge;
    #Greed;
    #Fear;
    #Overtrading;
    #Neutral;
  };
  type TradeStyle = { #Perpetual; #Degen; #Scalper; #Swing; #Unknown };
  type FeedbackType = { #Warning; #Suggestion; #Praise; #Alert };
  type UrgencyLevel = { #Low; #Medium; #High; #Critical };
  type RiskLevel = { #Low; #Medium; #High; #Extreme };
  type UserStatus = { #Active; #Suspended; #Inactive };
  type AnalysisStatus = { #Pending; #Completed; #Failed };

  // Core Entities
  type UserProfile = {
    principalId : Principal;
    walletAddresses : [(Blockchain, Text)]; // Network -> Address mapping
    riskTolerance : Nat8; // 1-10 scale
    registrationTime : Int;
    lastActiveTime : Int;
    emotionalArchetype : ?TradeStyle;
    totalTrades : Nat;
    weeklyTradeLimit : ?Nat;
    status : UserStatus;
    preferences : UserPreferences;
  };

  type UserPreferences = {
    enableRealTimeAlerts : Bool;
    maxLeverageWarning : Nat8;
    dailyTradingLimit : ?Float;
    moodReminderFrequency : Nat; // hours
    aiPersonality : Text; // "supportive", "strict", "balanced"
  };

  type TradeRecord = {
    tradeId : Text;
    userPrincipal : Principal;
    timestamp : Int;
    blockchain : Blockchain;
    contractAddress : ?Text;
    tokenPair : Text;
    direction : TradeDirection;
    volume : Float;
    entryPrice : Float;
    exitPrice : ?Float;
    leverage : ?Nat8;
    profitLoss : ?Float;
    gasFeePaid : ?Float;
    liquidationPrice : ?Float;
    holdingDuration : ?Int; // seconds
    isActive : Bool; // position still open
    emotionalTags : [EmotionType];
    riskScore : Nat8; // 1-100
  };

  type BehavioralAnalysis = {
    analysisId : Text;
    userPrincipal : Principal;
    timestamp : Int;
    tradeIds : [Text]; // trades analyzed
    emotionScore : Nat8; // 0-100 stability
    detectedEmotions : [EmotionType];
    dominantEmotion : EmotionType;
    tradeStyle : TradeStyle;
    riskLevel : RiskLevel;
    recommendationLevel : UrgencyLevel;
    patternFlags : [Text]; // "revenge_trading", "fomo_buying"
    streakData : StreakData;
    status : AnalysisStatus;
  };

  type StreakData = {
    currentWinStreak : Nat;
    currentLossStreak : Nat;
    longestWinStreak : Nat;
    longestLossStreak : Nat;
    totalProfitable : Nat;
    totalUnprofitable : Nat;
  };

  type AIFeedback = {
    feedbackId : Text;
    userPrincipal : Principal;
    analysisId : ?Text;
    timestamp : Int;
    feedbackType : FeedbackType;
    title : Text;
    message : Text;
    urgency : UrgencyLevel;
    actionableSteps : [Text];
    userResponse : ?Bool;
    responseTime : ?Int;
    relatedTradeIds : [Text];
  };

  type MoodCheckIn = {
    checkInId : Text;
    userPrincipal : Principal;
    timestamp : Int;
    moodScore : Nat8; // 1-10 happiness
    stressLevel : Nat8; // 1-10 stress
    confidenceLevel : Nat8; // 1-10 confidence
    marketSentiment : Nat8; // 1-10 bullish
    notes : ?Text;
    tradingIntention : ?Text; // "bullish", "bearish", "neutral", "pause"
  };

  type SimulationTrade = {
    simTradeId : Text;
    userPrincipal : Principal;
    timestamp : Int;
    tokenPair : Text;
    direction : TradeDirection;
    volume : Float;
    entryPrice : Float;
    exitPrice : ?Float;
    leverage : ?Nat8;
    simulatedPnL : ?Float;
    isActive : Bool;
    marketCondition : Text; // "bull", "bear", "sideways"
  };

  type AlertRule = {
    ruleId : Text;
    userPrincipal : Principal;
    name : Text;
    condition : Text; // "leverage > 5", "loss_streak > 3"
    isActive : Bool;
    triggerCount : Nat;
    lastTriggered : ?Int;
  };

  // ========== STORAGE MAPS ==========
  // Core entity storage
  private stable var userEntries : [(Principal, UserProfile)] = [];
  private var users = HashMap.fromIter<Principal, UserProfile>(
    userEntries.vals(),
    userEntries.size(),
    Principal.equal,
    Principal.hash,
  );

  private stable var tradeEntries : [(Text, TradeRecord)] = [];
  private var trades = HashMap.fromIter<Text, TradeRecord>(
    tradeEntries.vals(),
    tradeEntries.size(),
    Text.equal,
    Text.hash,
  );

  private stable var analysisEntries : [(Text, BehavioralAnalysis)] = [];
  private var analyses = HashMap.fromIter<Text, BehavioralAnalysis>(
    analysisEntries.vals(),
    analysisEntries.size(),
    Text.equal,
    Text.hash,
  );

  private stable var feedbackEntries : [(Text, AIFeedback)] = [];
  private var feedbacks = HashMap.fromIter<Text, AIFeedback>(
    feedbackEntries.vals(),
    feedbackEntries.size(),
    Text.equal,
    Text.hash,
  );

  private stable var moodEntries : [(Text, MoodCheckIn)] = [];
  private var moods = HashMap.fromIter<Text, MoodCheckIn>(
    moodEntries.vals(),
    moodEntries.size(),
    Text.equal,
    Text.hash,
  );

  private stable var simTradeEntries : [(Text, SimulationTrade)] = [];
  private var simTrades = HashMap.fromIter<Text, SimulationTrade>(
    simTradeEntries.vals(),
    simTradeEntries.size(),
    Text.equal,
    Text.hash,
  );

  private stable var alertRuleEntries : [(Text, AlertRule)] = [];
  private var alertRules = HashMap.fromIter<Text, AlertRule>(
    alertRuleEntries.vals(),
    alertRuleEntries.size(),
    Text.equal,
    Text.hash,
  );

  // Index maps for efficient queries
  private stable var userTradesEntries : [(Principal, [Text])] = [];
  private var userTrades = HashMap.fromIter<Principal, [Text]>(
    userTradesEntries.vals(),
    userTradesEntries.size(),
    Principal.equal,
    Principal.hash,
  );

  private stable var userAnalysesEntries : [(Principal, [Text])] = [];
  private var userAnalyses = HashMap.fromIter<Principal, [Text]>(
    userAnalysesEntries.vals(),
    userAnalysesEntries.size(),
    Principal.equal,
    Principal.hash,
  );

  private stable var userFeedbackEntries : [(Principal, [Text])] = [];
  private var userFeedback = HashMap.fromIter<Principal, [Text]>(
    userFeedbackEntries.vals(),
    userFeedbackEntries.size(),
    Principal.equal,
    Principal.hash,
  );

  private stable var userMoodsEntries : [(Principal, [Text])] = [];
  private var userMoods = HashMap.fromIter<Principal, [Text]>(
    userMoodsEntries.vals(),
    userMoodsEntries.size(),
    Principal.equal,
    Principal.hash,
  );

  private stable var blockchainTradeEntries : [(Blockchain, [Text])] = [];
  private var blockchainTrades = HashMap.fromIter<Blockchain, [Text]>(
    blockchainTradeEntries.vals(),
    blockchainTradeEntries.size(),
    func(a : Blockchain, b : Blockchain) : Bool { a == b },
    func(blockchain : Blockchain) : Nat32 {
      switch (blockchain) {
        case (#Ethereum) { 0 };
        case (#Base) { 1 };
        case (#Polygon) { 2 };
        case (#Solana) { 3 };
      };
    },
  );

  // ========== UPGRADE HOOKS ==========
  system func preupgrade() {
    userEntries := Iter.toArray(users.entries());
    tradeEntries := Iter.toArray(trades.entries());
    analysisEntries := Iter.toArray(analyses.entries());
    feedbackEntries := Iter.toArray(feedbacks.entries());
    moodEntries := Iter.toArray(moods.entries());
    simTradeEntries := Iter.toArray(simTrades.entries());
    alertRuleEntries := Iter.toArray(alertRules.entries());
    userTradesEntries := Iter.toArray(userTrades.entries());
    userAnalysesEntries := Iter.toArray(userAnalyses.entries());
    userFeedbackEntries := Iter.toArray(userFeedback.entries());
    userMoodsEntries := Iter.toArray(userMoods.entries());
    blockchainTradeEntries := Iter.toArray(blockchainTrades.entries());
  };

  system func postupgrade() {
    userEntries := [];
    tradeEntries := [];
    analysisEntries := [];
    feedbackEntries := [];
    moodEntries := [];
    simTradeEntries := [];
    alertRuleEntries := [];
    userTradesEntries := [];
    userAnalysesEntries := [];
    userFeedbackEntries := [];
    userMoodsEntries := [];
    blockchainTradeEntries := [];
  };

  // ========== USER MUTATIONS ==========
  public func createUser(profile : UserProfile) : async Result.Result<Bool, Text> {
    switch (users.get(profile.principalId)) {
      case (?existing) { #err("User already exists") };
      case null {
        users.put(profile.principalId, profile);
        userTrades.put(profile.principalId, []);
        userAnalyses.put(profile.principalId, []);
        userFeedback.put(profile.principalId, []);
        userMoods.put(profile.principalId, []);
        #ok(true);
      };
    };
  };

  public func updateUserProfile(principal : Principal, profile : UserProfile) : async Result.Result<Bool, Text> {
    switch (users.get(principal)) {
      case null { #err("User not found") };
      case (?existing) {
        users.put(principal, profile);
        #ok(true);
      };
    };
  };

  public func updateUserStatus(principal : Principal, status : UserStatus) : async Result.Result<Bool, Text> {
    switch (users.get(principal)) {
      case null { #err("User not found") };
      case (?existing) {
        let updated = {
          existing with
          status = status;
          lastActiveTime = Time.now();
        };
        users.put(principal, updated);
        #ok(true);
      };
    };
  };

  // ========== TRADE MUTATIONS ==========
  public func addTrade(trade : TradeRecord) : async Result.Result<Bool, Text> {
    switch (trades.get(trade.tradeId)) {
      case (?existing) { #err("Trade already exists") };
      case null {
        trades.put(trade.tradeId, trade);
        // Update user's trade index
        switch (userTrades.get(trade.userPrincipal)) {
          case (?existing) {
            let updated = Array.append(existing, [trade.tradeId]);
            userTrades.put(trade.userPrincipal, updated);
          };
          case null {
            userTrades.put(trade.userPrincipal, [trade.tradeId]);
          };
        };
        // Update blockchain index
        switch (blockchainTrades.get(trade.blockchain)) {
          case (?existing) {
            let updated = Array.append(existing, [trade.tradeId]);
            blockchainTrades.put(trade.blockchain, updated);
          };
          case null {
            blockchainTrades.put(trade.blockchain, [trade.tradeId]);
          };
        };
        // Update user total trades
        switch (users.get(trade.userPrincipal)) {
          case (?user) {
            let updated = {
              user with
              totalTrades = user.totalTrades + 1;
              lastActiveTime = Time.now();
            };
            users.put(trade.userPrincipal, updated);
          };
          case null {};
        };
        #ok(true);
      };
    };
  };

  public func updateTrade(tradeId : Text, updates : TradeRecord) : async Result.Result<Bool, Text> {
    switch (trades.get(tradeId)) {
      case null { #err("Trade not found") };
      case (?existing) {
        trades.put(tradeId, updates);
        #ok(true);
      };
    };
  };

  public func closeTrade(tradeId : Text, exitPrice : Float, profitLoss : Float) : async Result.Result<Bool, Text> {
    switch (trades.get(tradeId)) {
      case null { #err("Trade not found") };
      case (?existing) {
        let updated = {
          existing with
          exitPrice = ?exitPrice;
          profitLoss = ?profitLoss;
          isActive = false;
          holdingDuration = ?(Time.now() - existing.timestamp);
        };
        trades.put(tradeId, updated);
        #ok(true);
      };
    };
  };

  // ========== ANALYSIS MUTATIONS ==========
  public func addAnalysis(analysis : BehavioralAnalysis) : async Result.Result<Bool, Text> {
    analyses.put(analysis.analysisId, analysis);
    switch (userAnalyses.get(analysis.userPrincipal)) {
      case (?existing) {
        let updated = Array.append(existing, [analysis.analysisId]);
        userAnalyses.put(analysis.userPrincipal, updated);
      };
      case null {
        userAnalyses.put(analysis.userPrincipal, [analysis.analysisId]);
      };
    };
    #ok(true);
  };

  public func addFeedback(feedback : AIFeedback) : async Result.Result<Bool, Text> {
    feedbacks.put(feedback.feedbackId, feedback);
    switch (userFeedback.get(feedback.userPrincipal)) {
      case (?existing) {
        let updated = Array.append(existing, [feedback.feedbackId]);
        userFeedback.put(feedback.userPrincipal, updated);
      };
      case null {
        userFeedback.put(feedback.userPrincipal, [feedback.feedbackId]);
      };
    };
    #ok(true);
  };

  public func respondToFeedback(feedbackId : Text, response : Bool) : async Result.Result<Bool, Text> {
    switch (feedbacks.get(feedbackId)) {
      case null { #err("Feedback not found") };
      case (?existing) {
        let updated = {
          existing with
          userResponse = ?response;
          responseTime = ?Time.now();
        };
        feedbacks.put(feedbackId, updated);
        #ok(true);
      };
    };
  };

  public func addMoodCheckIn(mood : MoodCheckIn) : async Result.Result<Bool, Text> {
    moods.put(mood.checkInId, mood);
    switch (userMoods.get(mood.userPrincipal)) {
      case (?existing) {
        let updated = Array.append(existing, [mood.checkInId]);
        userMoods.put(mood.userPrincipal, updated);
      };
      case null {
        userMoods.put(mood.userPrincipal, [mood.checkInId]);
      };
    };
    #ok(true);
  };

  // ========== SIMULATION MUTATIONS ==========
  public func addSimulationTrade(simTrade : SimulationTrade) : async Result.Result<Bool, Text> {
    simTrades.put(simTrade.simTradeId, simTrade);
    #ok(true);
  };

  public func closeSimulationTrade(simTradeId : Text, exitPrice : Float, pnl : Float) : async Result.Result<Bool, Text> {
    switch (simTrades.get(simTradeId)) {
      case null { #err("Simulation trade not found") };
      case (?existing) {
        let updated = {
          existing with
          exitPrice = ?exitPrice;
          simulatedPnL = ?pnl;
          isActive = false;
        };
        simTrades.put(simTradeId, updated);
        #ok(true);
      };
    };
  };

  // ========== QUERY METHODS ==========
  // User queries
  public query func getUser(principal : Principal) : async ?UserProfile {
    users.get(principal);
  };

  public query func getUserTrades(principal : Principal, limit : ?Nat) : async [TradeRecord] {
    switch (userTrades.get(principal)) {
      case (?tradeIds) {
        let allTrades = Array.mapFilter<Text, TradeRecord>(tradeIds, func(id) = trades.get(id));
        let sorted = Array.sort(
          allTrades,
          func(a : TradeRecord, b : TradeRecord) : { #less; #equal; #greater } {
            if (a.timestamp > b.timestamp) { #less } else if (a.timestamp < b.timestamp) {
              #greater;
            } else { #equal };
          },
        );
        switch (limit) {
          case (?l) {
            if (sorted.size() <= l) { sorted } else {
              Array.tabulate<TradeRecord>(l, func(i) = sorted[i]);
            };
          };
          case null { sorted };
        };
      };
      case null { [] };
    };
  };

  public query func getUserActiveTrades(principal : Principal) : async [TradeRecord] {
    let userTradesList = switch (userTrades.get(principal)) {
      case (?tradeIds) { tradeIds };
      case null { [] };
    };
    let allTrades = Array.mapFilter<Text, TradeRecord>(userTradesList, func(id) = trades.get(id));
    Array.filter(allTrades, func(trade : TradeRecord) : Bool = trade.isActive);
  };

  public query func getUserAnalyses(principal : Principal, limit : ?Nat) : async [BehavioralAnalysis] {
    switch (userAnalyses.get(principal)) {
      case (?analysisIds) {
        let allAnalyses = Array.mapFilter<Text, BehavioralAnalysis>(analysisIds, func(id) = analyses.get(id));
        let sorted = Array.sort(
          allAnalyses,
          func(a : BehavioralAnalysis, b : BehavioralAnalysis) : {
            #less;
            #equal;
            #greater;
          } {
            if (a.timestamp > b.timestamp) { #less } else if (a.timestamp < b.timestamp) {
              #greater;
            } else { #equal };
          },
        );
        switch (limit) {
          case (?l) {
            if (sorted.size() <= l) { sorted } else {
              Array.tabulate<BehavioralAnalysis>(l, func(i) = sorted[i]);
            };
          };
          case null { sorted };
        };
      };
      case null { [] };
    };
  };

  public query func getLatestAnalysis(principal : Principal) : async ?BehavioralAnalysis {
    let userAnalysesList = switch (userAnalyses.get(principal)) {
      case (?analysisIds) { analysisIds };
      case null { [] };
    };
    let analysesBuffer = Buffer.Buffer<BehavioralAnalysis>(0);
    for (id in userAnalysesList.vals()) {
      switch (analyses.get(id)) {
        case (?analysis) { analysesBuffer.add(analysis) };
        case null { };
      };
    };
    let sorted = Array.sort(
      Buffer.toArray(analysesBuffer),
      func(a : BehavioralAnalysis, b : BehavioralAnalysis) : { #less; #equal; #greater } {
        if (a.timestamp > b.timestamp) { #less } else if (a.timestamp < b.timestamp) {
          #greater;
        } else { #equal };
      },
    );
    if (sorted.size() > 0) { ?sorted[0] } else { null };
  };

  public query func getUserFeedback(principal : Principal, unreadOnly : Bool) : async [AIFeedback] {
    switch (userFeedback.get(principal)) {
      case (?feedbackIds) {
        let allFeedback = Array.mapFilter<Text, AIFeedback>(feedbackIds, func(id) = feedbacks.get(id));
        let sorted = Array.sort(
          allFeedback,
          func(a : AIFeedback, b : AIFeedback) : { #less; #equal; #greater } {
            if (a.timestamp > b.timestamp) { #less } else if (a.timestamp < b.timestamp) {
              #greater;
            } else { #equal };
          },
        );
        if (unreadOnly) {
          Array.filter(
            sorted,
            func(feedback : AIFeedback) : Bool {
              switch (feedback.userResponse) {
                case null { true };
                case (?_) { false };
              };
            },
          );
        } else { sorted };
      };
      case null { [] };
    };
  };

  public query func getUserMoodHistory(principal : Principal, days : Nat) : async [MoodCheckIn] {
    let cutoffTime = Time.now() - (days * 24 * 60 * 60 * 1000000000);
    switch (userMoods.get(principal)) {
      case (?moodIds) {
        let allMoods = Array.mapFilter<Text, MoodCheckIn>(moodIds, func(id) = moods.get(id));
        let recent = Array.filter(allMoods, func(mood : MoodCheckIn) : Bool = mood.timestamp >= cutoffTime);
        Array.sort(
          recent,
          func(a : MoodCheckIn, b : MoodCheckIn) : { #less; #equal; #greater } {
            if (a.timestamp > b.timestamp) { #less } else if (a.timestamp < b.timestamp) {
              #greater;
            } else { #equal };
          },
        );
      };
      case null { [] };
    };
  };

  // Analytics queries
  public query func getUserTradingStats(principal : Principal) : async {
    totalTrades : Nat;
    profitableTrades : Nat;
    totalPnL : Float;
    averageLeverage : Float;
    mostTradedPair : ?Text;
    dominantEmotion : ?EmotionType;
  } {
    let userTradesList = switch (userTrades.get(principal)) {
      case (?tradeIds) { tradeIds };
      case null { [] };
    };
    let tradesBuffer = Buffer.Buffer<TradeRecord>(0);
    for (id in userTradesList.vals()) {
      switch (trades.get(id)) {
        case (?trade) { tradesBuffer.add(trade) };
        case null { };
      };
    };
    let typedTrades = Buffer.toArray(tradesBuffer);
    let userAnalysesList = switch (userAnalyses.get(principal)) {
      case (?analysisIds) { analysisIds };
      case null { [] };
    };
    let analysesBuffer = Buffer.Buffer<BehavioralAnalysis>(0);
    for (id in userAnalysesList.vals()) {
      switch (analyses.get(id)) {
        case (?analysis) { analysesBuffer.add(analysis) };
        case null { };
      };
    };
    let typedAnalyses = Buffer.toArray(analysesBuffer);
    let profitableTrades = Array.filter(
      typedTrades,
      func(trade : TradeRecord) : Bool {
        switch (trade.profitLoss) {
          case (?pnl) { pnl > 0.0 };
          case null { false };
        };
      },
    ).size();
    let totalPnL = Array.foldLeft<TradeRecord, Float>(
      typedTrades,
      0.0,
      func(acc, trade) {
        switch (trade.profitLoss) {
          case (?pnl) { acc + pnl };
          case null { acc };
        };
      },
    );
    let leveragedTrades = Array.mapFilter<TradeRecord, Float>(
      typedTrades,
      func(trade) {
        switch (trade.leverage) {
          case (?lev) { ?Float.fromInt(Nat8.toNat(lev)) };
          case null { null };
        };
      },
    );
    let averageLeverage = if (leveragedTrades.size() > 0) {
      Array.foldLeft<Float, Float>(leveragedTrades, 0.0, func(acc, lev) { acc + lev }) / Float.fromInt(leveragedTrades.size());
    } else { 0.0 };
    // Find most dominant emotion from recent analyses
    let recentAnalyses = if (typedAnalyses.size() >= 5) {
      Array.tabulate<BehavioralAnalysis>(5, func(i) = typedAnalyses[i]);
    } else { typedAnalyses };
    let dominantEmotion = if (recentAnalyses.size() > 0) {
      ?recentAnalyses[0].dominantEmotion;
    } else { null };
    {
      totalTrades = typedTrades.size();
      profitableTrades = profitableTrades;
      totalPnL = totalPnL;
      averageLeverage = averageLeverage;
      mostTradedPair = null; // Could implement pair frequency analysis
      dominantEmotion = dominantEmotion;
    };
  };

  public query func getTradesByTimeframe(principal : Principal, startTime : Int, endTime : Int) : async [TradeRecord] {
    let userTradesList = switch (userTrades.get(principal)) {
      case (?tradeIds) { tradeIds };
      case null { [] };
    };
    let allTradesBuffer = Buffer.Buffer<TradeRecord>(0);
    for (id in userTradesList.vals()) {
      switch (trades.get(id)) {
        case (?trade) { allTradesBuffer.add(trade) };
        case null { };
      };
    };
    let typedTrades = Buffer.toArray(allTradesBuffer);
    Array.filter(
      typedTrades,
      func(trade : TradeRecord) : Bool {
        trade.timestamp >= startTime and trade.timestamp <= endTime
      },
    );
  };

  public query func getHighRiskTrades(principal : Principal, riskThreshold : Nat8) : async [TradeRecord] {
    let userTradesList = switch (userTrades.get(principal)) {
      case (?tradeIds) { tradeIds };
      case null { [] };
    };
    let allTradesBuffer = Buffer.Buffer<TradeRecord>(0);
    for (id in userTradesList.vals()) {
      switch (trades.get(id)) {
        case (?trade) { allTradesBuffer.add(trade) };
        case null { };
      };
    };
    let typedTrades = Buffer.toArray(allTradesBuffer);
    Array.filter(typedTrades, func(trade : TradeRecord) : Bool = trade.riskScore >= riskThreshold);
  };
};

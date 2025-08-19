import Time "mo:base/Time";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Result "mo:base/Result";
import Iter "mo:base/Iter";

// ========== TYPE DEFINITIONS ========== //
public type TradeDirection = { #Buy; #Sell };
public type Blockchain = { #Ethereum; #Base; #Polygon; #Solana };
public type EmotionType = {
  #FOMO;
  #Revenge;
  #Greed;
  #Fear;
  #Overtrading;
  #Neutral;
};
public type TradeStyle = { #Perpetual; #Degen; #Scalper; #Swing; #Unknown };
public type FeedbackType = { #Warning; #Suggestion; #Praise; #Alert };
public type UrgencyLevel = { #Low; #Medium; #High; #Critical };
public type RiskLevel = { #Low; #Medium; #High; #Extreme };
public type UserStatus = { #Active; #Suspended; #Inactive };
public type AnalysisStatus = { #Pending; #Completed; #Failed };

public type UserProfile = {
  principalId : Principal;
  walletAddresses : [(Blockchain, Text)];
  riskTolerance : Nat8;
  registrationTime : Int;
  lastActiveTime : Int;
  emotionalArchetype : ?TradeStyle;
  totalTrades : Nat;
  weeklyTradeLimit : ?Nat;
  status : UserStatus;
  preferences : UserPreferences;
};

public type UserPreferences = {
  enableRealTimeAlerts : Bool;
  maxLeverageWarning : Nat8;
  dailyTradingLimit : ?Float;
  moodReminderFrequency : Nat;
  aiPersonality : Text;
};

public type TradeRecord = {
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
  holdingDuration : ?Int;
  isActive : Bool;
  emotionalTags : [EmotionType];
  riskScore : Nat8;
};

public type BehavioralAnalysis = {
  analysisId : Text;
  userPrincipal : Principal;
  timestamp : Int;
  tradeIds : [Text];
  emotionScore : Nat8;
  detectedEmotions : [EmotionType];
  dominantEmotion : EmotionType;
  tradeStyle : TradeStyle;
  riskLevel : RiskLevel;
  recommendationLevel : UrgencyLevel;
  patternFlags : [Text];
  streakData : StreakData;
  status : AnalysisStatus;
};

public type StreakData = {
  currentWinStreak : Nat;
  currentLossStreak : Nat;
  longestWinStreak : Nat;
  longestLossStreak : Nat;
  totalProfitable : Nat;
  totalUnprofitable : Nat;
};

public type AIFeedback = {
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

public type MoodCheckIn = {
  checkInId : Text;
  userPrincipal : Principal;
  timestamp : Int;
  moodScore : Nat8;
  stressLevel : Nat8;
  confidenceLevel : Nat8;
  marketSentiment : Nat8;
  notes : ?Text;
  tradingIntention : ?Text;
};

public type SimulationTrade = {
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
  marketCondition : Text;
};

public type AlertRule = {
  ruleId : Text;
  userPrincipal : Principal;
  name : Text;
  condition : Text;
  isActive : Bool;
  triggerCount : Nat;
  lastTriggered : ?Int;
};

// ========== DATABASE ACTOR ========== //
actor Database {
  // ========== STORAGE MAPS ==========
  // ========== UPGRADE HOOKS ==========
  // ========== USER MUTATIONS ==========
  // ========== TRADE MUTATIONS ==========
  // ========== ANALYSIS MUTATIONS ==========
  // ========== SIMULATION MUTATIONS ==========
  // ========== QUERY METHODS ==========
};

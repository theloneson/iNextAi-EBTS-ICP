import Principal "mo:base/Principal";

public type UserStatus = { #Active; #Suspended; #Inactive };

public type UserPreferences = {
    enableRealTimeAlerts: Bool;
    maxLeverageWarning: Nat8;
    dailyTradingLimit: ?Float;
    moodReminderFrequency: Nat;
    aiPersonality: Text;
};

public type UserProfile = {
    principalId: Principal;
    walletAddresses: [(Text, Text)]; // Blockchain, Address
    riskTolerance: Nat8;
    registrationTime: Int;
    lastActiveTime: Int;
    emotionalArchetype: ?Text;
    totalTrades: Nat;
    weeklyTradeLimit: ?Nat;
    status: UserStatus;
    preferences: UserPreferences;
};
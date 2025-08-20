public type MoodCheckIn = {
    checkInId: Text;
    userPrincipal: Principal;
    timestamp: Int;
    moodScore: Nat8;
    stressLevel: Nat8;
    confidenceLevel: Nat8;
    marketSentiment: Nat8;
    notes: ?Text;
    tradingIntention: ?Text;
};

public type SimulationTrade = {
    simTradeId: Text;
    userPrincipal: Principal;
    timestamp: Int;
    tokenPair: Text;
    direction: { #Buy; #Sell };
    volume: Float;
    entryPrice: Float;
    exitPrice: ?Float;
    leverage: ?Nat8;
    simulatedPnL: ?Float;
    isActive: Bool;
    marketCondition: Text;
};

public type AlertRule = {
    ruleId: Text;
    userPrincipal: Principal;
    name: Text;
    condition: Text;
    isActive: Bool;
    triggerCount: Nat;
    lastTriggered: ?Int;
};

actor DashboardService {
    // Stub for dashboard aggregation and queries
}
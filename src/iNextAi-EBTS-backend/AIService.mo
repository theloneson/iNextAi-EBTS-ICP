

public type FeedbackType = { #Warning; #Suggestion; #Praise; #Alert };
public type UrgencyLevel = { #Low; #Medium; #High; #Critical };

public type AIFeedback = {
    feedbackId: Text;
    userPrincipal: Principal;
    analysisId: ?Text;
    timestamp: Int;
    feedbackType: FeedbackType;
    title: Text;
    message: Text;
    urgency: UrgencyLevel;
    actionableSteps: [Text];
    userResponse: ?Bool;
    responseTime: ?Int;
    relatedTradeIds: [Text];
};

actor AIService {
    // Stub for AI feedback and outcalls
}
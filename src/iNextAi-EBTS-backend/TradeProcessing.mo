// TradeProcessing.mo

public type TradeDirection = { #Buy; #Sell };
public type Blockchain = { #Ethereum; #Base; #Polygon; #Solana };

public type TradeRecord = {
    tradeId: Text;
    userPrincipal: Principal;
    timestamp: Int;
    blockchain: Blockchain;
    contractAddress: ?Text;
    tokenPair: Text;
    direction: TradeDirection;
    volume: Float;
    entryPrice: Float;
    exitPrice: ?Float;
    leverage: ?Nat8;
    profitLoss: ?Float;
    gasFeePaid: ?Float;
    liquidationPrice: ?Float;
    holdingDuration: ?Int;
    isActive: Bool;
    emotionalTags: [Text];
    riskScore: Nat8;
};

actor TradeProcessing {
    // Stub for trade processing actor
}
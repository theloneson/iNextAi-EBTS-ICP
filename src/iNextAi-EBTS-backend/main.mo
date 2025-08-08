
persistent actor {
  var owner = "Femi";

  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
  public func updateName(name : Text): async Text {
    owner := name;
    return name;
  };

  public func getName() : async Text {
    return owner;
  };
};

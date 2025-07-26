import { Brain, Heart, Shield, Zap, Target, Globe } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Trading Assistant",
    description: "Advanced machine learning algorithms analyze market patterns and emotional indicators to optimize your trading decisions.",
    color: "text-primary"
  },
  {
    icon: Heart,
    title: "Emotional Tracking",
    description: "Monitor and analyze your emotional state during trading to prevent FOMO, fear, and greed from affecting your decisions.",
    color: "text-destructive"
  },
  {
    icon: Shield,
    title: "Web3 + Internet Identity",
    description: "Secure authentication with Internet Computer's Identity and seamless integration with major crypto wallets.",
    color: "text-accent"
  },
  {
    icon: Zap,
    title: "Real-time Analysis",
    description: "Get instant market insights and emotional alerts powered by iNextAI's sophisticated neural networks.",
    color: "text-secondary"
  },
  {
    icon: Target,
    title: "Smart Risk Management",
    description: "Automated stop-losses and position sizing based on your emotional state and risk tolerance.",
    color: "text-primary"
  },
  {
    icon: Globe,
    title: "Cross-Chain Support",
    description: "Trade across multiple blockchains with unified portfolio management and emotion tracking.",
    color: "text-accent"
  }
];

const FeatureHighlights = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-card/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Powered by iNextAI Intelligence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionary emotion-aware trading platform that combines artificial intelligence with human psychology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="glass-card p-8 rounded-2xl group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${feature.color.split('-')[1]}/20 to-${feature.color.split('-')[1]}/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="glass-card p-8 rounded-3xl max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Trading?
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Join the future of emotion-aware cryptocurrency trading with iNextAI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/25"
                onClick={() => window.open('https://identity.ic0.app/#authorize', '_blank')}
              >
                Start Trading Now
              </button>
              <button className="border border-primary/50 text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/10 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
import { Button } from "@/components/LandingPageUI/button";
import { Brain, Wallet, TrendingUp, Loader2, AlertCircle } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Card } from "@/components/LandingPageUI/card";
import { Input } from "@/components/LandingPageUI/input";
import { Tooltip } from "@/components/LandingPageUI/tooltip";
import INextAiLogo from "@/assets/inextai-logo.png";
import ICPLogo from "@/assets/ICP.png";
import { useAuth } from "@/lib/api/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { 
    isAuthenticated, 
    principal, 
    isLoading, 
    error, 
    login, 
    logout, 
    initialize, 
    clearError 
  } = useAuth();
  const navigate = useNavigate();

  // Initialize auth on component mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleLogin = async () => {
    try {
      await login();
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Theme Toggle */}
      <div className="absolute top-8 right-8 z-20">
        <ThemeToggle />
      </div>
      
      {/* Error Toast */}
      {error && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30">
          <Card className="bg-destructive/90 text-destructive-foreground p-4 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearError}
              className="h-6 w-6 p-0 ml-2"
            >
              ×
            </Button>
          </Card>
        </div>
      )}
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8">
            <img
              src={INextAiLogo}
              alt="iNextAi Logo"
              className="h-12 w-auto rounded-full"
            />
            <span className="text-sm font-medium">Powered by ICP</span>
            <img
              src={ICPLogo}
              alt="ICP Logo"
              className="h-12 w-auto rounded-full"
            />
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Welcome to iNextAi
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Your Gateway to <span className="text-primary neon-text">Emotion-Driven</span> AI Crypto Trading
          </p>
          
          {/* Authentication Status */}
          {isAuthenticated && (
            <div className="mb-8">
              <Card className="glass-card p-4 max-w-md mx-auto">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Connected as</p>
                    <p className="font-mono text-xs text-primary truncate">
                      {principal}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleLogout}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Disconnect"
                    )}
                  </Button>
                </div>
              </Card>
            </div>
          )}
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            {!isAuthenticated ? (
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg shadow-primary/25"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Brain className="mr-2 h-5 w-5" />
                )}
                {isLoading ? "Connecting..." : "Login with Internet Identity"}
              </Button>
            ) : (
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg shadow-primary/25"
                onClick={() => navigate('/dashboard')}
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                Go to Dashboard
              </Button>
            )}
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-4 text-lg font-semibold"
            >
              <Wallet className="mr-2 h-5 w-5" />
              Connect Wallet
            </Button>
          </div>
          
          {/* Feature Preview */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="glass-card p-6 rounded-2xl text-center">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">AI Trading</h3>
              <p className="text-muted-foreground">Advanced algorithms analyze market emotions</p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl text-center">
              <Brain className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Emotion Tracking</h3>
              <p className="text-muted-foreground">Monitor psychological trading patterns</p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl text-center">
              <Wallet className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Web3 Integration</h3>
              <p className="text-muted-foreground">Seamless wallet and identity support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
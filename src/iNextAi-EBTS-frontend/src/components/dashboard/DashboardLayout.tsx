import { TrendingUp, BarChart3, PieChart, Settings, User, Activity, Menu, Bot, Sun, Moon, Zap, LogOut } from "lucide-react";
import copilotLogo from "@/assets/copilot-logo.png";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/api/hooks/useAuth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, principal, logout, isLoading } = useAuth();

  // Redirect to landing page if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card/80 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-primary bg-clip-text text-transparent">iNext AI</h1>
                <p className="text-xs text-muted-foreground">Trading Platform</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Connected</p>
                <p className="text-xs text-muted-foreground font-mono truncate">
                  {principal}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="h-8 w-8 p-0"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <Button
              variant={location.pathname === '/dashboard' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => navigate('/dashboard')}
            >
              <TrendingUp className="mr-3 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={location.pathname === '/trading' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => navigate('/trading')}
            >
              <BarChart3 className="mr-3 h-4 w-4" />
              Trading
            </Button>
            <Button
              variant={location.pathname === '/copilot' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => navigate('/copilot')}
            >
              <Bot className="mr-3 h-4 w-4" />
              AI Copilot
            </Button>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-white/10">
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Mobile Header */}
        <header className="md:hidden h-16 glass-card border-b border-white/10 flex items-center justify-between px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="text-lg font-bold gradient-primary bg-clip-text text-transparent">iNext AI</span>
          <ThemeToggle />
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex h-16 glass-card border-b border-white/10 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">iNext AI</span>
            <div className="hidden lg:block text-sm text-muted-foreground">
              Emotional Trading Intelligence Platform
            </div>
          </div>
          
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="glass-card px-3 py-1 rounded-lg">
              <span className="text-xs lg:text-sm text-muted-foreground">Portfolio Value</span>
              <div className="text-sm lg:text-lg font-bold text-success">$24,567.89</div>
            </div>
            <div className="glass-card px-3 py-1 rounded-lg">
              <span className="text-xs lg:text-sm text-muted-foreground">Today's P&L</span>
              <div className="text-sm lg:text-lg font-bold text-primary">+$343.50</div>
            </div>
            <Button
              onClick={() => navigate('/copilot')}
              variant="ghost"
              size="sm"
              className="glass-card px-3 py-1 rounded-lg hover:bg-white/10 transition-colors h-auto flex-col"
            >
              <img src={copilotLogo} alt="AI Copilot" className="h-4 w-4 mb-1" />
              <span className="text-xs text-muted-foreground">AI Copilot</span>
            </Button>
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-full glow-primary flex items-center justify-center">
                <span className="text-white text-sm font-bold">JD</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-xs"
              >
                <LogOut className="h-3 w-3 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-3 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
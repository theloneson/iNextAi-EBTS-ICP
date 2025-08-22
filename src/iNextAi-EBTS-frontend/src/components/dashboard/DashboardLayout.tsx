import { TrendingUp, BarChart3, PieChart, Settings, User, Activity, Menu, Bot, Sun, Moon, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import copilotLogo from "@/assets/copilot-logo.png";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false); // New state for hiding sidebar completely
  const navigate = useNavigate();
  const location = useLocation();
  
  const sidebarItems = [
    { icon: TrendingUp, label: "Dashboard", path: "/", active: location.pathname === "/" },
    { icon: BarChart3, label: "Trading Journal", path: "/journal", active: location.pathname === "/journal" },
    { icon: Zap, label: "Trading Simulator", path: "/TradingSimulator", active: location.pathname === "/TradingSimulator" },
    { icon: PieChart, label: "Portfolio", path: "/portfolio", active: location.pathname === "/portfolio" },
    { icon: Activity, label: "Market", path: "/market", active: location.pathname === "/market" },
    { icon: Bot, label: "Copilot", path: "/copilot", active: location.pathname === "/copilot", customIcon: copilotLogo },
    { icon: Settings, label: "Settings", path: "/settings", active: location.pathname === "/settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden h-16 glass-card border-b border-white/10 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-foreground hover:bg-white/10 rounded-lg"
          >
            <Menu size={20} />
          </button>
          <div className="w-6 h-6 gradient-primary rounded-md flex items-center justify-center glow-primary">
            <span className="text-white font-bold text-xs">iN</span>
          </div>
          <span className="text-lg font-bold gradient-primary bg-clip-text text-transparent">iNext AI</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="glass-card px-2 py-1 rounded-lg">
            <div className="text-xs font-bold text-success">$24.5K</div>
          </div>
          <div className="w-6 h-6 gradient-primary rounded-full glow-primary flex items-center justify-center">
            <span className="text-white text-xs font-bold">JD</span>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Show Sidebar Button when Hidden */}
      {sidebarHidden && (
        <button
          onClick={() => setSidebarHidden(false)}
          className="hidden md:block fixed left-4 top-20 z-50 w-10 h-10 glass-card border border-white/10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200"
          title="Show sidebar"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Left Sidebar */}
      <aside className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${
        sidebarHidden ? 'md:-translate-x-full' : 'md:translate-x-0'
      } fixed md:relative z-50 w-16 glass-card border-r border-white/10 flex flex-col py-6 transition-all duration-300 ease-in-out`}>
        
        {/* Logo and Hide Button */}
        <div className="flex items-center justify-between px-4 mb-6">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center glow-primary">
              <span className="text-white font-bold text-sm">iN</span>
            </div>
          </div>
          
          {/* Hide Button - Only visible on desktop */}
          <button
            onClick={() => setSidebarHidden(true)}
            className="hidden md:flex w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center transition-colors duration-200"
            title="Hide sidebar"
          >
            <ChevronLeft size={14} />
          </button>
        </div>
        
        {/* Navigation Items */}
        <nav className="flex-1 space-y-2 px-2">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={`w-full p-2 justify-center rounded-lg flex items-center transition-all duration-200 group relative ${
                item.active 
                  ? "gradient-primary text-white glow-primary" 
                  : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
              }`}
              title={item.label}
            >
              {item.customIcon ? (
                <img src={item.customIcon} alt={item.label} className="w-5 h-5 flex-shrink-0" />
              ) : (
                <item.icon size={20} className="flex-shrink-0" />
              )}
              
              {/* Tooltip */}
              <div className="absolute left-14 bg-card border border-border rounded-lg px-2 py-1 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 hidden md:block">
                {item.label}
              </div>
            </button>
          ))}
        </nav>
        
        {/* Theme Toggle */}
        <div className="px-2 flex justify-center">
          <ThemeToggle />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
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
              <img src={copilotLogo} alt="Copilot" className="h-4 w-4 mb-1" />
              <span className="text-xs text-muted-foreground">Copilot</span>
            </Button>
            <ThemeToggle />
            <div className="w-8 h-8 gradient-primary rounded-full glow-primary flex items-center justify-center">
              <span className="text-white text-sm font-bold">JD</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-3 md:p-6">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <TrendingUp className="text-primary" size={20} />
            <h1 className="text-lg md:text-xl font-semibold text-foreground">Trading Dashboard</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
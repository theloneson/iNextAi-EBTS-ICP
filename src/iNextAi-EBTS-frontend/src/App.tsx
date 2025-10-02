import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TradingSimulator from "./pages/TradingSimulator";
import TradingSimulatorNew from "./pages/TradingSimulatorNew";
import PortfolioPage from "./pages/PortfolioPage";
import TradingJournal from "./pages/TradingJournal";
import MarketPage from "./pages/MarketPage";
import SettingsPage from "./pages/SettingsPage";
import CopilotPage from "./pages/CopilotPage";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* 👇 NEW LANDING PAGE */}
          <Route path="/" element={<LandingPage />} />
          
          {/* 🔄 MOVED DASHBOARD TO ITS OWN ROUTE */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Your existing routes */}
          <Route path="/TradingSimulator" element={<TradingSimulator />} />
          <Route path="/trading-new" element={<TradingSimulatorNew />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/journal" element={<TradingJournal />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/copilot" element={<CopilotPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TradingSimulator from "./pages/TradingSimulator";
import CopilotPage from "./pages/CopilotPage";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";

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
          <Route path="/dashboard" element={<Index />} />

          {/* Your existing routes */}
          <Route path="/trading" element={<TradingSimulator />} />
          <Route path="/copilot" element={<CopilotPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;

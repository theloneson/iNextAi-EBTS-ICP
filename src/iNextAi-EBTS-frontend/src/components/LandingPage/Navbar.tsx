import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Bell, Wallet } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/LandingPageUI/avatar";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-border">
      {/* Left: Logo */}
      <Link to="/" className="text-2xl font-bold text-primary">
        iNextAi
      </Link>

      {/* Right: Nav items */}
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Dashboard
        </Link>

        {/* Connect Wallet Button */}
        <Button
          variant="outline"
          size="lg"
          className="border-primary/50 text-primary hover:bg-primary/10 px-6 py-3 text-sm font-semibold rounded-xl transition-colors"
        >
          <Wallet className="mr-2 h-5 w-5" />
          Connect Wallet
        </Button>

        <ThemeToggle />
        <Bell className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />

        <Avatar>
          <AvatarImage src="/avatar.jpg" alt="User" />
          <AvatarFallback>IA</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;

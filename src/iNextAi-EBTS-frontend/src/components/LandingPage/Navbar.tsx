import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/LandingPageUI/avatar";

const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-border">
      {/* Left: Logo */}
      <Link to="/" className="text-2xl font-bold text-primary">
        iNextAi
      </Link>

      {/* Right: Nav items */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          Dashboard
        </Link>
        <ThemeToggle />
        <Bell className="w-5 h-5 text-muted-foreground" />
        <Avatar>
          <AvatarImage src="/avatar.jpg" alt="User" />
          <AvatarFallback>IA</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;

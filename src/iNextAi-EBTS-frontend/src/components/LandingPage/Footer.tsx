import { Brain, Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
return (
    <footer className="bg-gradient-to-t from-card to-background border-t border-border/50">
    <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
        <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                iNextAi
            </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
            Revolutionizing cryptocurrency trading through emotion-aware AI technology. 
            Powered by iNextAI for smarter, more conscious trading decisions.
            </p>
            <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Twitter className="w-5 h-5 text-primary" />
            </a>
            <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Github className="w-5 h-5 text-primary" />
            </a>
            <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Linkedin className="w-5 h-5 text-primary" />
            </a>
            </div>
        </div>

          {/* Product Links */}
        <div>
            <h4 className="font-semibold mb-4 text-foreground">Product</h4>
            <ul className="space-y-3">
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">AI Trading</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Emotion Tracking</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Portfolio Analytics</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Risk Management</a></li>
            </ul>
        </div>

          {/* Company Links */}
        <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-3">
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
        </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-muted-foreground text-sm">
            © 2025 iNextAi. All rights reserved. Powered by iNextAI technology.
        </div>
        <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
            Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
            Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
            Cookie Policy
            </a>
        </div>
        </div>
    </div>
    </footer>
);
};

export default Footer;
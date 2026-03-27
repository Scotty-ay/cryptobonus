import { Bitcoin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Bitcoin className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold text-foreground">
              Crypto<span className="text-primary">Bonus</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#rewards" className="hover:text-foreground transition-colors">Rewards</a>
            <a href="#payment" className="hover:text-foreground transition-colors">Payment</a>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2026 CryptoBonus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

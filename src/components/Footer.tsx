import { Bitcoin, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Bitcoin className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold text-foreground">
              Crypto<span className="text-primary">Bonus</span>
            </span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#rewards" className="hover:text-foreground transition-colors">Rewards</a>
            <a href="#payment" className="hover:text-foreground transition-colors">Payment</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-2 text-sm">
            <a
              href="https://wa.me/19177354067"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-green-500" />
              +1 (917) 735-4067
            </a>
            <a
              href="mailto:info@cryptobonus.live"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4 text-primary" />
              info@cryptobonus.live
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-sm text-muted-foreground text-center">
            © 2026 CryptoBonus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

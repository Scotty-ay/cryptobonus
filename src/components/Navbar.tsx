import { Bitcoin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavbarProps {
  onApply: () => void;
}

const Navbar = ({ onApply }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="flex items-center gap-2">
          <Bitcoin className="h-8 w-8 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">
            Crypto<span className="text-primary">Bonus</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "How It Works", "Rewards", "Payment", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="hero" size="sm" onClick={onApply}>
            Apply Now
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          {["Features", "How It Works", "Rewards", "Payment", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="block text-sm text-muted-foreground py-2"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </a>
          ))}
          <Button variant="hero" size="sm" className="w-full" onClick={() => { setMobileOpen(false); onApply(); }}>
            Apply Now
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

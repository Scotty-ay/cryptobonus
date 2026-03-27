import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const USERNAMES = [
  "CryptoKing", "Barbershop", "Pati", "smwa", "Aron44", "Siema",
  "BlockMaster", "DigiTrader", "CoinHunter", "MoonWalker", "SatoshiFan",
  "TokenBull", "ChainLink99", "DeFiWhale", "AltSeason", "BitRunner",
  "HashPower", "LedgerPro", "NodeMaster", "StakeKing", "YieldFarm",
  "GasLow", "MetaMike", "WalletWiz", "SwapQueen", "MintFresh",
  "rj223397@gmail.com", "alex.trade@outlook.com", "cryptomax22",
];

const AMOUNTS = [100, 150, 200, 250, 500, 750, 1000, 1500, 2000, 2500, 5000];

function randomEntry() {
  const user = USERNAMES[Math.floor(Math.random() * USERNAMES.length)];
  const amount = AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)];
  return { id: Date.now() + Math.random(), user, amount };
}

const LiveRewardsFeed = () => {
  const [messages, setMessages] = useState(() =>
    Array.from({ length: 8 }, () => randomEntry())
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) => {
        const next = [randomEntry(), ...prev];
        return next.slice(0, 20);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-['Space_Grotesk']">
            Live Rewards
          </h2>
          <p className="text-muted-foreground">Real-time bonus disbursements to our users</p>
        </div>

        <div
          ref={containerRef}
          className="max-w-3xl mx-auto rounded-xl border border-border bg-card overflow-hidden"
        >
          {/* Header */}
          <div className="bg-secondary/80 px-4 py-3 flex items-center gap-2 border-b border-border">
            <span className="text-lg">💬</span>
            <span className="font-semibold text-foreground text-lg font-['Space_Grotesk']">Chat</span>
            <span className="ml-auto h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-hidden px-4 py-3 space-y-1">
            <AnimatePresence initial={false}>
              {messages.slice(0, 10).map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-sm md:text-base"
                >
                  <span className="text-muted-foreground">System: </span>
                  <span className="text-primary font-semibold">
                    CONGRATULATIONS @{msg.user} on your withdrawal of {msg.amount.toLocaleString()}.00 🤑🤑.
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveRewardsFeed;

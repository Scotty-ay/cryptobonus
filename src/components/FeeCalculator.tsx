import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowDownUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCoinPrices } from "@/hooks/useCoinPrices";

const CALCULATOR_SYMBOLS = ["BTC", "ETH", "BNB", "SOL", "XRP", "DOGE", "ADA", "AVAX"];
const TAX_RATE = 0.09;

interface FeeCalculatorProps {
  onApply: () => void;
}

const FeeCalculator = ({ onApply }: FeeCalculatorProps) => {
  const coins = useCoinPrices(CALCULATOR_SYMBOLS);
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [amount, setAmount] = useState("1");

  const coin = coins.find((c) => c.symbol === selectedCoin)!;
  const numAmount = parseFloat(amount) || 0;

  const calc = useMemo(() => {
    const usdValue = numAmount * coin.price;
    const fee = numAmount * TAX_RATE;
    const feeUsd = fee * coin.price;
    const netBonus = numAmount - fee;
    return { usdValue, fee, feeUsd, netBonus };
  }, [numAmount, coin.price]);

  return (
    <section className="py-6 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6"
        >
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <div className="flex items-center gap-2 glass-card rounded-lg px-3 py-2">
              <select
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
                className="bg-transparent text-foreground font-display font-semibold text-sm outline-none cursor-pointer"
              >
                {coins.map((c) => (
                  <option key={c.symbol} value={c.symbol} className="bg-card text-foreground">
                    {c.symbol} — ${c.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-32 glass-card rounded-lg px-3 py-2 text-foreground font-medium text-sm outline-none focus:ring-1 focus:ring-primary bg-transparent"
              placeholder="Amount"
            />

            <span className="text-muted-foreground text-xs">
              ≈ ${calc.usdValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>

          <ArrowDownUp className="h-4 w-4 text-primary hidden lg:block" />

          <div className="flex items-center gap-6 flex-wrap justify-center text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Tax (9%):</span>
              <span className="text-primary font-semibold">
                {calc.fee.toFixed(6)} {selectedCoin}
              </span>
              <span className="text-muted-foreground text-xs">
                (${calc.feeUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })})
              </span>
            </div>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">You Receive:</span>
              <span className="text-success font-bold">
                {calc.netBonus.toFixed(6)} {selectedCoin}
              </span>
            </div>
          </div>

          <Button variant="hero" size="sm" className="shrink-0" onClick={onApply}>
            Claim Now <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeeCalculator;

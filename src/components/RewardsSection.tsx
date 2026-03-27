import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import bitcoinCoin from "@/assets/bitcoin-coin.png";

const RewardsSection = () => {
  return (
    <section id="rewards" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Unlock <span className="gold-text">Substantial</span> Crypto Rewards
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Our platform proudly presents a gateway for individuals to claim
              cryptocurrency bonuses, designed as drivers of economic growth and
              personal welfare.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Minimum bonus starting at $1,500 USD",
                "Maximum rewards up to 200 BTC",
                "100% guaranteed disbursement",
                "Supports BTC, ETH, USDT and more",
                "Unique secure wallet per applicant",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg">
              Claim Your Bonus
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full gold-gradient opacity-10 blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <img
                src={bitcoinCoin}
                alt="Bitcoin coin"
                className="relative w-64 md:w-80 drop-shadow-2xl animate-[spin_20s_linear_infinite]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;

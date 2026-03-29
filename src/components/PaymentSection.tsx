import { motion } from "framer-motion";
import { Wallet, FileCheck, Clock, ShieldCheck } from "lucide-react";

const PaymentSection = () => {
  return (
    <section id="payment" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Payment <span className="gold-text">Details</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transparent and secure payment process for your tax fee
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: Wallet,
              title: "Accepted Cryptocurrencies",
              description: "Pay your tax fee using BTC, ETH, USDT, or other supported cryptocurrencies as outlined during your application.",
            },
            {
              icon: ShieldCheck,
              title: "Secure Wallet",
              description: "A unique, secure platform wallet address is provided to each applicant for their tax fee payment.",
            },
            {
              icon: FileCheck,
              title: "Proof of Payment",
              description: "Upload your transaction hash, screenshot, or other verifiable documentation confirming your transfer.",
            },
            {
              icon: Clock,
              title: "60-Minute Guarantee",
              description: "After successful verification of your payment proof, receive your full bonus within 60 minutes.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <item.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-display font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;

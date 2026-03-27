import { motion } from "framer-motion";
import { UserPlus, Calculator, Upload, Wallet } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Apply",
    description: "Submit your application through the platform. The bonus amount is determined by our distribution algorithms.",
  },
  {
    icon: Calculator,
    step: "02",
    title: "Calculate Fee",
    description: "A 9% government platforms tax fee is calculated on your allocated bonus amount.",
  },
  {
    icon: Upload,
    step: "03",
    title: "Pay & Upload Proof",
    description: "Pay the tax fee to the designated wallet and upload your transaction hash or screenshot as proof.",
  },
  {
    icon: Wallet,
    step: "04",
    title: "Receive Bonus",
    description: "After verification, receive your full bonus within 60 minutes directly to your wallet.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            How It <span className="gold-text">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Simple, transparent process to claim your crypto bonus
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative text-center"
            >
              <div className="text-5xl font-display font-bold text-primary/10 mb-4">
                {step.step}
              </div>
              <div className="w-14 h-14 rounded-full border-2 border-primary/30 flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tax calculation example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-xl mx-auto glass-card rounded-xl p-8"
        >
          <h3 className="font-display font-semibold text-lg text-foreground mb-4 text-center">
            Tax Fee Calculation Example
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Bonus Allocated</span>
              <span className="text-foreground font-medium">10 BTC</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Tax Rate</span>
              <span className="text-primary font-medium">9%</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Fee Payable</span>
              <span className="text-primary font-bold text-base">0.9 BTC</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

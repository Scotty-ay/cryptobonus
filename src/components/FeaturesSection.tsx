import { motion } from "framer-motion";
import { Coins, Home, Briefcase, Plane, Gift, Clock } from "lucide-react";

const features = [
  {
    icon: Coins,
    title: "Generous Bonuses",
    description: "Receive from $1,500 USD up to 30 BTC based on platform distribution algorithms.",
  },
  {
    icon: Home,
    title: "Mortgage Assistance",
    description: "Use your bonus to fund mortgage payments and achieve homeownership faster.",
  },
  {
    icon: Briefcase,
    title: "Business Capital",
    description: "Launch or expand your business with crypto-funded startup capital.",
  },
  {
    icon: Plane,
    title: "Travel & Leisure",
    description: "Fund your dream vacations and enriching travel experiences worldwide.",
  },
  {
    icon: Gift,
    title: "Retirement Planning",
    description: "Secure your future with bonus funds dedicated to retirement benefits.",
  },
  {
    icon: Clock,
    title: "Rapid Disbursement",
    description: "Receive your bonus within 60 minutes of verified tax fee payment.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Platform <span className="gold-text">Features</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Designed to support diverse personal and financial objectives
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

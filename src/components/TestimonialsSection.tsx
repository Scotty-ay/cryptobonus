import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
  {
    name: "James K.",
    avatar: "JK",
    role: "Crypto Trader",
    stars: 5,
    text: "Received my bonus within 30 minutes of paying the gas fee. Completely legit and seamless process. Will definitely use again!",
  },
  {
    name: "Amara O.",
    avatar: "AO",
    role: "DeFi Investor",
    stars: 5,
    text: "I was skeptical at first, but the $5,000 bonus landed in my wallet exactly as promised. The team was responsive and helpful throughout.",
  },
  {
    name: "Chen W.",
    avatar: "CW",
    role: "Blockchain Developer",
    stars: 4,
    text: "Clean platform, transparent fees. The 9% gas fee is clearly stated upfront with no hidden charges. Great experience overall.",
  },
  {
    name: "Sarah M.",
    avatar: "SM",
    role: "Day Trader",
    stars: 5,
    text: "Already claimed twice! The process gets faster each time. My go-to platform for crypto bonuses. Highly recommend to everyone.",
  },
  {
    name: "Dmitri V.",
    avatar: "DV",
    role: "HODLer",
    stars: 5,
    text: "Best crypto reward platform I've used. The live chat support answered all my questions instantly. Got my $10K bonus same day.",
  },
  {
    name: "Lisa T.",
    avatar: "LT",
    role: "Portfolio Manager",
    stars: 4,
    text: "Solid platform with real payouts. The fee calculator helped me understand exactly what I'd pay before committing. Very transparent.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-['Space_Grotesk']">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground">
            Trusted by thousands of crypto enthusiasts worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="bg-card border-border hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-secondary-foreground leading-relaxed">"{t.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

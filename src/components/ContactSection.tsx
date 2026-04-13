import { Mail, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "19177354067";
const WHATSAPP_DISPLAY = "+1 (917) 735-4067";
const CONTACT_EMAIL = "info@cryptobonus.live";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get in <span className="gold-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have questions about your bonus or need help with your application?
            Our support team is ready to assist you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-6 flex flex-col items-center gap-4 hover:border-green-500/50 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
              <MessageCircle className="h-7 w-7 text-green-500" />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">WhatsApp Support</p>
              <p className="text-foreground font-semibold">{WHATSAPP_DISPLAY}</p>
              <p className="text-xs text-green-500 mt-2 font-medium group-hover:underline">
                Chat with us →
              </p>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="glass-card rounded-2xl p-6 flex flex-col items-center gap-4 hover:border-primary/50 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Email Support</p>
              <p className="text-foreground font-semibold">{CONTACT_EMAIL}</p>
              <p className="text-xs text-primary mt-2 font-medium group-hover:underline">
                Send us an email →
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

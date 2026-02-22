import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, MapPin, Github, Globe, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

interface AboutData {
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  scholar?: string;
  location?: string;
}

const ContactSection = () => {
  const [about, setAbout] = useState<AboutData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAbout()
      .then((data) => setAbout(data as AboutData))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Build contacts list from DB data, falling back to hardcoded defaults
  const email = about.email || "aminul@todvob.com";
  const phone = about.phone || "01626-180555";
  const linkedin = about.linkedin || "https://linkedin.com/in/aminulroqib";
  const location = about.location || "Bandar Chattogram, Bangladesh";

  const contacts = [
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    { icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/[^+\d]/g, "")}` },
    { icon: Linkedin, label: "LinkedIn", value: linkedin.replace("https://linkedin.com", ""), href: linkedin },
    { icon: MapPin, label: "Location", value: location, href: null as string | null },
    ...(about.github ? [{ icon: Github, label: "GitHub", value: about.github.replace("https://github.com/", "@"), href: about.github }] : []),
    ...(about.scholar ? [{ icon: Globe, label: "Scholar", value: "Google Scholar", href: about.scholar }] : []),
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-primary/[0.02]" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-mono mb-2">// CONTACT</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Get in Touch</h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
            {contacts.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="glass-card-hover p-5 flex items-start gap-4 block"
                  >
                    <item.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{item.label}</h4>
                      <p className="text-xs text-muted-foreground mt-1 break-all">{item.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="glass-card-hover p-5 flex items-start gap-4">
                    <item.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{item.label}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;

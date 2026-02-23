import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, GraduationCap, Globe, Mail, Phone, Linkedin, Loader2, Building2 } from "lucide-react";
import { api } from "@/lib/api";

interface AboutData {
  name?: string;
  title?: string;
  bio?: string;
  location?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  scholar?: string;
  education?: string;
  languages?: string;
}

const AboutSection = () => {
  const [about, setAbout] = useState<AboutData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAbout()
      .then((data) => setAbout(data as AboutData))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Fallback values when DB is empty
  const bio1 = about.bio ||
    "Water Resources Engineering graduate with knowledge in hydraulics, hydrology, structures, geotechnical, and environmental engineering. Skilled in leadership, teamwork, and problem solving with strong computer-based and technical expertise.";
  const bio2 = about.title
    ? `${about.title}. Civil Engineer at Lika Limited and Co-founder & CEO of Todvob Ltd.`
    : "Civil Engineer at Lika Limited and Co-founder & CEO of Todvob Ltd, bridging engineering expertise with AI innovation.";

  const info = [
    {
      icon: Building2,
      label: "Engineer",
      value: "Civil Engineer at Lika Limited",
    },
    {
      icon: GraduationCap,
      label: "Education",
      value: about.education || "BSc(Eng.) Water Resources Engineering, CUET",
    },
    {
      icon: MapPin,
      label: "Location",
      value: about.location || "Bandar Chattogram, Bangladesh",
    },
    {
      icon: Globe,
      label: "Languages",
      value: about.languages || "Bangla (Native), English (Professional), Hindi/Urdu",
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-primary/[0.02]" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-mono mb-2">// ABOUT ME</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Who I Am</h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 space-y-4"
            >
              <p className="text-muted-foreground leading-relaxed">{bio1}</p>
              <p className="text-muted-foreground leading-relaxed">{bio2}</p>

              {/* Contact links from about */}
              {(about.email || about.phone || about.linkedin) && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {about.email && (
                    <a href={`mailto:${about.email}`} className="flex items-center gap-1.5 text-xs text-primary hover:underline">
                      <Mail className="w-3.5 h-3.5" />{about.email}
                    </a>
                  )}
                  {about.phone && (
                    <a href={`tel:${about.phone}`} className="flex items-center gap-1.5 text-xs text-primary hover:underline">
                      <Phone className="w-3.5 h-3.5" />{about.phone}
                    </a>
                  )}
                  {about.linkedin && (
                    <a href={about.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-primary hover:underline">
                      <Linkedin className="w-3.5 h-3.5" />LinkedIn
                    </a>
                  )}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {info.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card-hover p-4 flex items-start gap-4"
                >
                  <item.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{item.label}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;

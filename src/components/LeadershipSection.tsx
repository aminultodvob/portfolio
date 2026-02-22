import { motion } from "framer-motion";
import { Users, Heart, Mic } from "lucide-react";

const roles = [
  {
    icon: Heart,
    period: "03/2020 – Present",
    org: "Shebok Chattogram",
    role: "President",
    highlights: [
      "Established 700K BDT fund for free emergency oxygen during COVID-19",
      "Free food projects for 1000+ people during and after the pandemic",
      "Emergency flood relief at Feni, Cumilla, Fatikchari (Aug 2024)",
      "Organized Winter Help Projects 2021 & 2022",
    ],
  },
  {
    icon: Users,
    period: "08/2025 – Present",
    org: "Startup Association of Bangladesh (SAB)",
    role: "General Secretary",
    highlights: [
      "Startup ecosystem development & policy advocacy",
      "Stakeholder engagement with government, investors, and accelerators",
    ],
  },
  {
    icon: Users,
    period: "06/2024 – 06/2025",
    org: "Chittagong Student Forum, CUET",
    role: "Joint General Secretary",
    highlights: [
      "Built Membership Directory & Connectivity Platform (csfcuet.org)",
      "Organized cultural and educational events",
    ],
  },
  {
    icon: Users,
    period: "03/2022 – 03/2024",
    org: "ASCE Student Chapter, CUET",
    role: "Creative Secretary",
    highlights: [
      "Designed creative assets for digital and print materials",
      "Organized engineering field trips, seminars, and events",
    ],
  },
  {
    icon: Mic,
    period: "03/2022 – 03/2024",
    org: "CCPC Debating Society",
    role: "President",
    highlights: [
      "Founded the debate club of Chattogram Cantonment Public College",
      "Champion at BTV Debate, Inter-Cantonment Debate Competition",
      "Organized CCPC National Debate Fest 2017",
    ],
  },
];

const LeadershipSection = () => (
  <section id="leadership" className="py-24 relative">
    <div className="absolute inset-0 bg-primary/[0.02]" />
    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary text-sm font-mono mb-2">// LEADERSHIP</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Leadership & Volunteering</h2>
      </motion.div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {roles.map((item, i) => (
          <motion.div
            key={item.org}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`glass-card-hover p-6 ${i === 0 ? "md:col-span-2" : ""}`}
          >
            <div className="flex items-start gap-3 mb-3">
              <item.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-base font-bold text-foreground">{item.role}</h3>
                  <span className="text-[10px] text-muted-foreground font-mono">{item.period}</span>
                </div>
                <p className="text-sm text-primary font-medium">{item.org}</p>
              </div>
            </div>
            <ul className="space-y-1.5 ml-8">
              {item.highlights.map((h, j) => (
                <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default LeadershipSection;

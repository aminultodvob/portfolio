import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Leaf, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

interface Skill {
  _id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
}

const FALLBACK_EARTH: Skill[] = [
  { _id: "e1", name: "QGIS", category: "Earth", level: 85, icon: "🗺️" },
  { _id: "e2", name: "HEC-RAS", category: "Earth", level: 80, icon: "🌊" },
  { _id: "e3", name: "ArcGIS", category: "Earth", level: 75, icon: "📡" },
  { _id: "e4", name: "Remote Sensing", category: "Earth", level: 70, icon: "🛰️" },
  { _id: "e5", name: "AutoCAD", category: "Earth", level: 75, icon: "📐" },
];

const FALLBACK_WEB: Skill[] = [
  { _id: "w1", name: "Next.js", category: "Web", level: 85, icon: "⚡" },
  { _id: "w2", name: "React", category: "Web", level: 90, icon: "⚛️" },
  { _id: "w3", name: "Python", category: "Web", level: 80, icon: "🐍" },
  { _id: "w4", name: "JavaScript", category: "Web", level: 85, icon: "✨" },
  { _id: "w5", name: "MongoDB", category: "Web", level: 75, icon: "🍃" },
];

const SkillPill = ({ name, icon, delay }: { name: string; icon: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.3, type: "spring" }}
    whileHover={{ scale: 1.08 }}
    className="glass-card-hover px-5 py-3 flex items-center gap-2 cursor-default"
  >
    <span className="text-lg">{icon}</span>
    <span className="font-medium text-foreground text-sm">{name}</span>
  </motion.div>
);

const SkillsSection = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSkills()
      .then((data) => {
        const list = data as Skill[];
        setSkills(list.length > 0 ? list : [...FALLBACK_EARTH, ...FALLBACK_WEB]);
      })
      .catch(() => setSkills([...FALLBACK_EARTH, ...FALLBACK_WEB]))
      .finally(() => setLoading(false));
  }, []);

  // Group into Earth (engineering tools) and Web (dev tools) by category
  const earthSkills = skills.filter((s) =>
    s.category?.toLowerCase().includes("earth") ||
    s.category?.toLowerCase().includes("engineering") ||
    s.category?.toLowerCase().includes("gis") ||
    FALLBACK_EARTH.some((f) => f.name === s.name)
  );

  const webSkills = skills.filter((s) =>
    s.category?.toLowerCase().includes("web") ||
    s.category?.toLowerCase().includes("programming") ||
    s.category?.toLowerCase().includes("dev") ||
    FALLBACK_WEB.some((f) => f.name === s.name)
  );

  // If categories don't match neatly, split in half
  const displayEarth = earthSkills.length > 0 ? earthSkills : skills.slice(0, Math.ceil(skills.length / 2));
  const displayWeb = webSkills.length > 0 ? webSkills : skills.slice(Math.ceil(skills.length / 2));

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-mono mb-2">// SKILLS</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Tools I Use to Help Others</h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Earth / Engineering */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">For the Earth</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {displayEarth.map((tool, i) => (
                  <SkillPill key={tool._id} name={tool.name} icon={tool.icon || "🔧"} delay={i * 0.08} />
                ))}
              </div>
            </motion.div>

            {/* Web / Dev */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">For the Web</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {displayWeb.map((tool, i) => (
                  <SkillPill key={tool._id} name={tool.name} icon={tool.icon || "💻"} delay={i * 0.08} />
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;

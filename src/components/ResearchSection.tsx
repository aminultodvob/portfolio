import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FlaskConical, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

interface Research {
  _id: string;
  title: string;
  description: string;
  status: "ongoing" | "completed" | "planned";
  tags: string[];
}

const FALLBACK: Research[] = [
  {
    _id: "f1",
    title: "Drought Assessment",
    description: "Comprehensive analysis of 25 years of drought patterns using remote sensing and GIS to understand climate impact on Bangladesh's agriculture.",
    tags: ["Remote Sensing", "GIS", "Climate Analysis"],
    status: "ongoing",
  },
  {
    _id: "f2",
    title: "Brahmaputra Basin Delta Modeling",
    description: "Hydrological modeling of river basin dynamics using HEC-RAS and HEC-HMS for flood preparedness and water resource management.",
    tags: ["HEC-RAS", "HEC-HMS", "Hydrology"],
    status: "ongoing",
  },
  {
    _id: "f3",
    title: "Google Earth Engine Applications",
    description: "Leveraging satellite imagery and cloud computing for large-scale environmental monitoring and geospatial analysis.",
    tags: ["Google Earth Engine", "Python", "Geospatial"],
    status: "ongoing",
  },
];

const statusStyles: Record<string, string> = {
  ongoing: "bg-primary/10 text-primary",
  completed: "bg-green-500/10 text-green-400",
  planned: "bg-secondary text-muted-foreground",
};

const ResearchSection = () => {
  const [research, setResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getResearch()
      .then((data) => {
        const list = data as Research[];
        setResearch(list.length > 0 ? list : FALLBACK);
      })
      .catch(() => setResearch(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="research" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-mono mb-2">// RESEARCH</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Research Interests</h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {research.map((area, i) => (
              <motion.div
                key={area._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover p-6 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <FlaskConical className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusStyles[area.status] || statusStyles.planned}`}>
                    {area.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{area.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{area.description}</p>
                <div className="flex flex-wrap gap-2">
                  {(area.tags || []).map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-1 border border-border rounded-md text-muted-foreground font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ResearchSection;

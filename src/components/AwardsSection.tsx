import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { api, AwardItem } from "@/lib/api";

const FALLBACK: Partial<AwardItem>[] = [
  { _id: "f1", title: "Best Pitch Award – Accelerating Bangladesh (Cohort-4)" },
  { _id: "f2", title: "2nd Runner UP – Intra CUET Concrete Solutions Competition 2022" },
  { _id: "f3", title: "iDEA Project Innovation Grant 2023 – ICT Division" },
  { _id: "f4", title: "Tech Transformer Award – Tally MSME Honours' for Bangladesh 2023" },
  { _id: "f5", title: "Best Speaker – Prothom Alo Tarunno Utshob 2017" },
  { _id: "f6", title: "Champion – Prothom Alo Tarunno Utshob 2014" },
  { _id: "f7", title: "Extempore Speech Award – Marks All Rounder 2014" },
  { _id: "f8", title: "Award of Success 2014 – Drishty Chittagong School of Debate" },
];

const AwardsSection = () => {
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAwards()
      .then((data) => {
        const list = data as AwardItem[];
        setAwards(list.length > 0 ? list : FALLBACK as AwardItem[]);
      })
      .catch(() => setAwards(FALLBACK as AwardItem[]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="awards" className="py-24 relative">
      <div className="absolute inset-0 bg-primary/[0.02]" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-mono mb-2">// AWARDS</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Awards & Achievements</h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4 mb-12">
            {awards.slice(0, 8).map((award, i) => (
              <motion.div
                key={award._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card-hover p-4 flex items-start gap-3"
              >
                <Trophy className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-foreground font-medium">{award.title}</p>
                  {(award.organization || award.year) && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {[award.organization, award.year].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Link
            to="/awards"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            View Full Awards <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AwardsSection;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

interface Publication {
  _id: string;
  title: string;
  journal?: string;
  year?: string;
  authors?: string;
  doi?: string;
  abstract?: string;
}

const PublicationsSection = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getPublications()
      .then((data) => setPublications(data as Publication[]))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="publications" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-mono mb-2">// PUBLICATIONS</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Publications</h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : publications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto glass-card p-10 text-center"
          >
            <BookOpen className="w-10 h-10 text-primary mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              Research papers on drought assessment and hydrological modeling are currently in progress. Stay tuned for upcoming publications.
            </p>
          </motion.div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">
            {publications.map((pub, i) => (
              <motion.div
                key={pub._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card-hover p-6"
              >
                <h3 className="text-sm font-semibold text-foreground mb-1 leading-snug">{pub.title}</h3>
                <p className="text-xs text-primary font-medium mb-1">
                  {[pub.journal, pub.year].filter(Boolean).join(" · ")}
                </p>
                {pub.authors && (
                  <p className="text-xs text-muted-foreground mb-2">{pub.authors}</p>
                )}
                {pub.abstract && (
                  <p className="text-xs text-muted-foreground line-clamp-3 mb-3">{pub.abstract}</p>
                )}
                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-primary hover:underline w-fit"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> DOI: {pub.doi}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicationsSection;

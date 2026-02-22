import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import droughtImg from "@/assets/drought-assessment.jpg";
import shebokImg from "@/assets/shebok-community.jpg";

const FeaturedCard = ({
  title,
  category,
  image,
  index,
}: {
  title: string;
  category: string;
  image: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.15, duration: 0.5 }}
    className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer"
  >
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
    <div className="absolute bottom-0 left-0 p-6">
      <span className="text-xs font-mono font-medium text-primary uppercase tracking-wider">
        {category}
      </span>
      <h3 className="text-xl font-bold text-foreground mt-1">{title}</h3>
    </div>
  </motion.div>
);

const BentoGrid = () => {
  return (
    <section id="work" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-foreground"
          >
            Featured Insights
          </motion.h2>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="#"
            className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            All Projects <ExternalLink className="w-3.5 h-3.5" />
          </motion.a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FeaturedCard
            index={0}
            title="Brahmaputra Basin Delta Modeling"
            category="Civil Engineering"
            image={droughtImg}
          />
          <FeaturedCard
            index={1}
            title="Nexus: Water Analytics Platform"
            category="Development"
            image={shebokImg}
          />
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;

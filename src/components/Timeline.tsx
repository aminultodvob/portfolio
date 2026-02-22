import { motion } from "framer-motion";

const timelineData = [
  {
    year: "2017",
    title: "The Debater's Spark",
    description: "Won Best Speaker at CCPC Debating Society—discovering the power of voice and persuasion.",
    emoji: "🎤",
    color: "bg-primary",
  },
  {
    year: "2021",
    title: "Coding for a Cause",
    description: "Completed a Web Development program, learning to turn ideas into digital realities.",
    emoji: "💻",
    color: "bg-accent",
  },
  {
    year: "2024",
    title: "Learning from the Field",
    description: "Interned at the Bangladesh Water Development Board, bridging theory with real-world water engineering.",
    emoji: "🌊",
    color: "bg-secondary",
  },
  {
    year: "2025",
    title: "Leading & Graduating",
    description: "Graduating from CUET and leading the Chittagong Student Forum—ready for what's next.",
    emoji: "🎓",
    color: "bg-primary",
  },
];

const Timeline = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-blob-sage opacity-20" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-handwritten text-2xl text-primary mb-2">🌱 Growing every year</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Journey of a Leader
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />

          {timelineData.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative flex items-start mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-4 border-background z-10 md:-translate-x-1/2 -translate-x-1/2">
                <div className={`w-full h-full rounded-full ${item.color}`} />
              </div>

              {/* Card */}
              <div className={`ml-16 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <div className="clay-card-hover p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="font-handwritten text-xl text-primary">{item.year}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;

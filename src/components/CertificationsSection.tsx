import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

const certifications = [
  {
    title: "Startup and Scaleup Program (2025)",
    issuer: "DEIED Project, Bangladesh Hi-Tech Park Authority, ICT Division",
  },
  {
    title: "Complete Web Development (2021)",
    issuer: "Programming Hero",
  },
  {
    title: "Emergency Covid-19 Support Certification (2021)",
    issuer: "Office of the Director (Health)",
  },
];

const CertificationsSection = () => (
  <section id="certifications" className="py-24 relative">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary text-sm font-mono mb-2">// CERTIFICATIONS</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Certifications & Training</h2>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-4">
        {certifications.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover p-5 flex items-start gap-4"
          >
            <BadgeCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">{cert.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CertificationsSection;

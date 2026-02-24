import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ExternalLink, Youtube, Globe } from "lucide-react";
import { api } from "@/lib/api";

interface Experience {
  _id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  points?: string[];
  skills: string[];
  link?: string;
  current?: boolean;
}

const FALLBACK: Experience[] = [
  {
    _id: "f0",
    role: "Civil Engineer",
    company: "Lika Limited",
    period: "01/2026 – Present",
    description: "Currently working as a Civil Engineer, focusing on engineering design and project execution.",
    points: [
      "Specializing in civil engineering infrastructure and structural projects",
      "Ensuring quality control and adherence to engineering standards",
      "Coordinating with multidisciplinary teams for project success",
    ],
    skills: ["Civil Engineering", "AutoCAD", "Project Management"],
    current: true,
  },
  {
    _id: "f1",
    role: "Co-founder & CEO",
    company: "Todvob Ltd",
    period: "10/2023 – Present",
    description: "Building and scaling AI-driven SaaS products.",
    link: "https://todvob.com",
    points: [
      "Building and scaling AI-driven SaaS products",
      "300+ monthly active users, 64+ paying customers",
      "Microsoft for Startups grant recipient",
      "Best Pitch – Accelerating Bangladesh Cohort-4",
    ],
    skills: ["AI", "SaaS", "Leadership"],
    current: true,
  },
  {
    _id: "f2",
    role: "Co-founder & CTO",
    company: "Robotry Bangladesh",
    period: "12/2022 – 12/2024",
    description: "Robotics & AI STEM education for classes 6–10. Curriculum development with hands-on robotics projects. Scaled programs across multiple schools. Received iDEA Project Grant – ICT Division.",
    skills: ["Robotics", "Education", "Python"],
  },
];

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getExperiences()
      .then((data) => {
        const list = data as Experience[];
        setExperiences(list.length > 0 ? list : FALLBACK);
      })
      .catch(() => setExperiences(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-mono mb-2">// EXPERIENCE</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Work Experience</h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                      {exp.current && (
                        <span className="px-1.5 py-0.5 text-[10px] bg-primary/10 text-primary rounded font-medium">Current</span>
                      )}
                    </div>
                    <p className="text-sm text-primary font-medium">{exp.company}</p>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono mt-1 sm:mt-0">{exp.period}</span>
                </div>

                {exp.description && <p className="text-sm text-muted-foreground mb-3">{exp.description}</p>}

                {exp.points && exp.points.length > 0 && (
                  <ul className="space-y-1.5 mb-4">
                    {exp.points.map((point, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                {(exp.skills || []).length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="text-[10px] px-2 py-1 border border-border rounded-md text-muted-foreground font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary hover:underline"
                    >
                      <Globe className="w-3 h-3" /> Visit Company
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;

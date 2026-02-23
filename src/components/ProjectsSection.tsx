import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Rocket, Loader2, Youtube } from "lucide-react";
import { api } from "@/lib/api";

interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  appsumo?: string;
  youtube?: string;
}

// Hardcoded fallback data
const FALLBACK: Project[] = [
  {
    _id: "f1",
    title: "Todvob Ltd",
    description: "AI-driven SaaS product with 300+ monthly active users and 64+ paying customers. Recipient of Microsoft for Startups grant. Best Pitch in Cohort-4 Accelerating Bangladesh.",
    tags: ["SaaS", "AI", "Startup"],
    featured: true,
    appsumo: "https://appsumo.com/products/todvob/",
    youtube: "https://www.youtube.com/watch?v=ckrx1IXOtmE",
  },
  {
    _id: "f2",
    title: "Robotry Bangladesh",
    description: "Robotics and AI STEM education for school-level students (classes 6–10). Designed curriculum combining theory with hands-on robotics projects. Received iDEA Project Grant from ICT Division.",
    tags: ["Robotics", "Education", "STEM"],
  },
  {
    _id: "f3",
    title: "Chittagong Student Forum Platform",
    description: "Built the Membership Directory and Connectivity Platform (csfcuet.org) for CSF CUET chapter.",
    tags: ["Web Dev", "React", "Community"],
    link: "https://csfcuet.org",
  },
];

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProjects()
      .then((data) => {
        const list = data as Project[];
        setProjects(list.length > 0 ? list : FALLBACK);
      })
      .catch(() => setProjects(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 bg-primary/[0.02]" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-mono mb-2">// PROJECTS</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Things I've Built</h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card-hover p-6 relative group flex flex-col ${project.featured ? "border-primary/30" : ""}`}
              >
                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] px-2 py-1 bg-primary/10 text-primary rounded-full font-mono">Featured</span>
                  </div>
                )}
                <Rocket className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(project.tags || []).map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-1 border border-border rounded-md text-muted-foreground font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
                {(project.link || project.github || project.appsumo || project.youtube) && (
                  <div className="flex items-center gap-3 flex-wrap">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-primary hover:underline">
                        <ExternalLink className="w-3.5 h-3.5" /> Live
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                        <Github className="w-3.5 h-3.5" /> Code
                      </a>
                    )}
                    {project.appsumo && (
                      <a
                        href={project.appsumo}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Available on AppSumo"
                        className="flex items-center gap-1.5 text-xs font-semibold hover:opacity-80 transition-opacity"
                        style={{ color: "#ff6b00" }}
                      >
                        {/* AppSumo wordmark logo */}
                        <svg width="16" height="16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <rect width="100" height="100" rx="18" fill="#ff6b00" />
                          <text x="50" y="68" textAnchor="middle" fontSize="52" fontWeight="bold" fill="white" fontFamily="Arial,sans-serif">AS</text>
                        </svg>
                        AppSumo
                      </a>
                    )}
                    {project.youtube && (
                      <a
                        href={project.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Watch on YouTube"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Youtube className="w-3.5 h-3.5 text-red-500" /> Demo
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;

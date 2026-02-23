import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Code2, Mountain, MapPin, Layout } from "lucide-react";
import { api } from "@/lib/api";

interface AboutData {
  name?: string;
  title?: string;
  bio?: string;
}

const HeroSection = () => {
  const [about, setAbout] = useState<AboutData>({});

  useEffect(() => {
    api.getAbout().then((data) => setAbout(data as AboutData)).catch(console.error);
  }, []);

  const fullName = about.name || "Aminul Islam";
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ") || "";
  const title = about.title || "Professional Engineer & Innovator";
  const bio = about.bio || "Welcome to my portfolio. Please update this bio from the admin dashboard.";
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-3 gap-6 items-center min-h-[70vh]">

          {/* Left: The Engineer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium">
              <Building2 className="w-3.5 h-3.5" /> THE ENGINEER
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Civil & Water Resources Engineer
            </h2>

            <div className="space-y-3">
              <div className="glass-card-hover p-4">
                <div className="flex items-start gap-3">
                  <Mountain className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Flow Rate Analysis</h4>
                    <p className="text-xs text-muted-foreground mt-1">Real-time hydro-modeling of flood plains and river basins.</p>
                  </div>
                </div>
              </div>
              <div className="glass-card-hover p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Topographic Mapping</h4>
                    <p className="text-xs text-muted-foreground mt-1">3D terrain visualization for disaster preparedness.</p>
                  </div>
                </div>
              </div>
              <div className="glass-card-hover p-4">
                <div className="flex items-start gap-3">
                  <Layout className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">CAD & Structural Design</h4>
                    <p className="text-xs text-muted-foreground mt-1">Professional drafting and analysis using AutoCAD & ETABS.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center: Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <div className="glass-card p-10 glow-lg">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-none mb-1 tracking-tight">
                <span className="text-gradient-cyan drop-shadow-[0_0_25px_hsl(var(--primary)/0.4)]">{firstName}</span>{lastName && <>{" "}<span className="text-foreground">{lastName}</span></>}
              </h1>
              <div className="w-16 h-1 bg-primary rounded-full mx-auto my-4 shadow-[0_0_12px_hsl(var(--primary)/0.5)]" />
              <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-muted-foreground leading-tight mb-6 tracking-wide uppercase">
                {title}
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
                {bio}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.a
                  href="#nexus"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg"
                >
                  Explore the Nexus <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="#work"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary transition-colors"
                >
                  View Research
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right: The Developer */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex justify-end">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium">
                <Code2 className="w-3.5 h-3.5" /> THE DEVELOPER
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-right">
              Full-Stack Innovation
            </h2>

            {/* Code snippet card */}
            <div className="glass-card p-4 overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
                <span className="text-[10px] text-muted-foreground ml-2 font-mono">NEXUS_CONTROLLER.PY</span>
              </div>
              <pre className="text-xs font-mono text-muted-foreground leading-relaxed">
                <code>
                  {`import pd
from WaterModel

def flow(data):
  model = WaterModel(type="dynamic")
  return model.simulate(data)`}
                </code>
              </pre>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 justify-end">
              {["React", "Python", "PostgreSQL", "GIS"].map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs font-medium border border-border rounded-md text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import { useEffect, useState } from "react";
import { Droplets } from "lucide-react";
import { api } from "@/lib/api";

interface AboutData {
  name?: string;
  linkedin?: string;
  github?: string;
  scholar?: string;
}

const Footer = () => {
  const [about, setAbout] = useState<AboutData>({});

  useEffect(() => {
    api.getAbout()
      .then((data) => setAbout(data as AboutData))
      .catch(console.error);
  }, []);

  const name = about.name || "Aminul Islam";
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="py-8 border-t border-border">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Droplets className="w-4 h-4 text-primary" />
          © {year} {name}.
        </div>
        <div className="flex items-center gap-6">
          {about.linkedin && (
            <a href={about.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              LinkedIn
            </a>
          )}
          {about.github && (
            <a href={about.github} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              GitHub
            </a>
          )}
          {about.scholar && (
            <a href={about.scholar} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Scholar
            </a>
          )}
          {!about.linkedin && !about.github && !about.scholar && (
            <>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Scholar</a>
            </>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

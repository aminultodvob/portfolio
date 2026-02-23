import { motion, AnimatePresence } from "framer-motion";
import { Droplets, ArrowRight, Menu, X, Sun, Moon, ChevronDown, Users, HeartHandshake, Trophy } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Link } from "react-router-dom";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#education", label: "Education" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#research", label: "Research" },
  { href: "/awards", label: "Awards" },
  { href: "/#contact", label: "Contact" },
];

const leadershipLinks = [
  {
    href: "/#leadership",
    icon: Users,
    label: "Leadership & Volunteering",
    description: "Roles, organizations & impact",
  },
  {
    href: "/community-contribution",
    icon: HeartHandshake,
    label: "Community Contribution",
    description: "Humanitarian, Startup & University",
  },
  {
    href: "/awards",
    icon: Trophy,
    label: "Awards & Recognitions",
    description: "Innovation, Engineering & Leadership",
  },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileLeadershipOpen, setMobileLeadershipOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
    >
      <div className="max-w-7xl mx-auto glass-card px-5 py-2.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground text-sm">Aminul Islam</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Leadership Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Leadership
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full right-0 mt-3 w-64 glass-card py-2 shadow-xl shadow-black/20"
                >
                  {leadershipLinks.map((item) => (
                    item.href.startsWith("/") && !item.href.startsWith("/#") ? (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-primary/8 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-foreground">{item.label}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{item.description}</div>
                        </div>
                      </Link>
                    ) : (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-primary/8 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-foreground">{item.label}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{item.description}</div>
                        </div>
                      </a>
                    )
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={toggle}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <a
            href="/Aminul_Islam_CV.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Download CV <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile toggles */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggle}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden mt-2 mx-auto max-w-7xl glass-card p-4 space-y-3"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile Leadership Accordion */}
          <div>
            <button
              onClick={() => setMobileLeadershipOpen((v) => !v)}
              className="flex items-center justify-between w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Leadership
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${mobileLeadershipOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {mobileLeadershipOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 space-y-1 pl-3 border-l border-primary/20">
                    {leadershipLinks.map((item) =>
                      item.href.startsWith("/") && !item.href.startsWith("/#") ? (
                        <Link
                          key={item.label}
                          to={item.href}
                          onClick={() => { setMobileOpen(false); setMobileLeadershipOpen(false); }}
                          className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <item.icon className="w-4 h-4 text-primary shrink-0" />
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={() => { setMobileOpen(false); setMobileLeadershipOpen(false); }}
                          className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <item.icon className="w-4 h-4 text-primary shrink-0" />
                          {item.label}
                        </a>
                      )
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="/Aminul_Islam_CV.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg"
          >
            Download CV <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

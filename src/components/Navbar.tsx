import { motion } from "framer-motion";
import { Droplets, ArrowRight, Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#research", label: "Research" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#awards", label: "Awards" },
  { href: "#leadership", label: "Leadership" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
    >
      <div className="max-w-7xl mx-auto glass-card px-5 py-2.5 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground text-sm">Aminul Islam</span>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
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

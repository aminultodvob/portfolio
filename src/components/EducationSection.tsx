import { motion } from "framer-motion";
import { GraduationCap, BookOpen, School } from "lucide-react";

interface EducationEntry {
    id: string;
    degree: string;
    institution: string;
    year: string;
    icon: React.ElementType;
    badge?: string;
}

const educationData: EducationEntry[] = [
    {
        id: "edu1",
        degree: "BSc(Eng.) in Water Resources Engineering",
        institution: "Chittagong University of Engineering and Technology (CUET)",
        year: "Completion – 2025",
        icon: GraduationCap,
        badge: "University",
    },
    {
        id: "edu2",
        degree: "Higher Secondary Certificate (HSC) – 2019",
        institution: "Chattogram Cantonment Public College",
        year: "2019",
        icon: BookOpen,
        badge: "College",
    },
    {
        id: "edu3",
        degree: "Secondary School Certificate (SSC) – 2016",
        institution: "Kalokakoli High School",
        year: "2016",
        icon: School,
        badge: "School",
    },
];

const EducationSection = () => {
    return (
        <section id="education" className="py-24 relative">
            <div className="absolute inset-0 bg-primary/[0.02]" />
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-primary text-sm font-mono mb-2">// EDUCATION</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">Academic Background</h2>
                </motion.div>

                <div className="max-w-3xl mx-auto relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden sm:block" />

                    <div className="space-y-6">
                        {educationData.map((entry, i) => (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12 }}
                                className="sm:pl-16 relative"
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-0 top-0 hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-background border border-primary/30 shadow-md shadow-primary/10">
                                    <entry.icon className="w-5 h-5 text-primary" />
                                </div>

                                <div className="glass-card-hover p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                        <div className="flex items-center gap-2 sm:hidden mb-1">
                                            <entry.icon className="w-4 h-4 text-primary shrink-0" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="text-base font-bold text-foreground leading-snug">
                                                    {entry.degree}
                                                </h3>
                                                {entry.badge && (
                                                    <span className="px-1.5 py-0.5 text-[10px] bg-primary/10 text-primary rounded font-medium whitespace-nowrap">
                                                        {entry.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-primary font-medium mt-0.5">
                                                {entry.institution}
                                            </p>
                                        </div>
                                        <span className="text-xs text-muted-foreground font-mono whitespace-nowrap mt-0.5">
                                            {entry.year}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationSection;

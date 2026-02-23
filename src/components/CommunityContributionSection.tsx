import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Rocket, GraduationCap, ArrowRight, ImageOff } from "lucide-react";
import { Link } from "react-router-dom";
import { api, CommunityItem, CommunitySection } from "@/lib/api";

const PILLARS: {
    key: CommunitySection;
    icon: React.ElementType;
    label: string;
    tag: string;
    color: string;
    border: string;
    iconColor: string;
    emoji: string;
    fallbackDesc: string;
}[] = [
        {
            key: "startup",
            icon: Rocket,
            label: "Startup Ecosystem",
            tag: "Startup",
            color: "from-cyan-500/20 to-teal-600/5",
            border: "border-cyan-500/20",
            iconColor: "text-cyan-400",
            emoji: "🚀",
            fallbackDesc: "SAB, Todvob Appsumo Select, policy advocacy.",
        },
        {
            key: "humanitarian",
            icon: Heart,
            label: "Humanitarian Work",
            tag: "Humanitarian",
            color: "from-rose-500/20 to-red-600/5",
            border: "border-rose-500/20",
            iconColor: "text-rose-400",
            emoji: "❤️",
            fallbackDesc: "Community relief, COVID fund, flood response.",
        },
        {
            key: "university",
            icon: GraduationCap,
            label: "University & Club",
            tag: "University",
            color: "from-fuchsia-500/20 to-purple-600/5",
            border: "border-fuchsia-500/20",
            iconColor: "text-fuchsia-400",
            emoji: "🎓",
            fallbackDesc: "CSF platform, ASCE, CCPC Debating Society.",
        },
    ];

function MiniImageGrid({ items }: { items: CommunityItem[] }) {
    if (items.length === 0) return null;
    const preview = items.slice(0, 3);

    return (
        <div className="flex gap-1.5 mt-3">
            {preview.map((item) => (
                <div
                    key={item._id}
                    className="flex-1 aspect-square rounded-lg overflow-hidden bg-secondary/40 relative"
                >
                    {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <ImageOff className="w-4 h-4 text-muted-foreground/30" />
                        </div>
                    )}
                </div>
            ))}
            {items.length > 3 && (
                <div className="flex-1 aspect-square rounded-lg overflow-hidden bg-secondary/60 flex items-center justify-center">
                    <span className="text-xs font-medium text-muted-foreground">+{items.length - 3}</span>
                </div>
            )}
        </div>
    );
}

const CommunityContributionSection = () => {
    const [items, setItems] = useState<CommunityItem[]>([]);

    useEffect(() => {
        api.getCommunity().then(setItems).catch(() => setItems([]));
    }, []);

    const bySection = (key: CommunitySection) => items.filter((i) => i.section === key);

    return (
        <section id="community-contribution" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.025] to-transparent pointer-events-none" />
            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-primary text-sm font-mono mb-2">// COMMUNITY CONTRIBUTION</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Giving Back to Society
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
                        Beyond professional achievements — contributing to humanitarian causes, nurturing
                        Bangladesh's startup ecosystem, and building university communities.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
                    {PILLARS.map((p, i) => {
                        const sectionItems = bySection(p.key);
                        return (
                            <motion.div
                                key={p.key}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`glass-card-hover p-6 flex flex-col gap-3 bg-gradient-to-br ${p.color} border ${p.border}`}
                            >
                                {/* Icon + emoji */}
                                <div className="flex items-center justify-between">
                                    <div className="w-10 h-10 rounded-xl bg-background/40 flex items-center justify-center border border-border/50">
                                        <p.icon className={`w-5 h-5 ${p.iconColor}`} />
                                    </div>
                                    <span className="text-2xl">{p.emoji}</span>
                                </div>

                                {/* Tag + Title */}
                                <div>
                                    <span className="text-[10px] font-mono text-primary border border-primary/30 bg-primary/10 px-2 py-0.5 rounded-full">
                                        {p.tag}
                                    </span>
                                    <h3 className="text-base font-bold text-foreground mt-2">{p.label}</h3>
                                </div>

                                {/* Description or first item title */}
                                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                                    {sectionItems.length > 0
                                        ? sectionItems
                                            .slice(0, 2)
                                            .map((it) => it.title)
                                            .join(" · ")
                                        : p.fallbackDesc}
                                </p>

                                {/* Mini image preview */}
                                <MiniImageGrid items={sectionItems} />

                                {/* Count */}
                                <div className="text-[10px] text-muted-foreground font-mono pt-1">
                                    {sectionItems.length} item{sectionItems.length !== 1 ? "s" : ""}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 }}
                    className="text-center"
                >
                    <Link
                        to="/community-contribution"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        View Full Contributions <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};

export default CommunityContributionSection;

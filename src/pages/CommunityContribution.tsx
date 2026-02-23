import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Rocket, GraduationCap, ArrowLeft, ImageOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api, CommunityItem, CommunitySection } from "@/lib/api";

/* ─── Section Meta ───────────────────────────────────────────────────── */
const SECTIONS: {
    key: CommunitySection;
    icon: React.ElementType;
    tag: string;
    heading: string;
    subheading: string;
    accentClass: string;
    borderClass: string;
    gradientClass: string;
}[] = [
        {
            key: "humanitarian",
            icon: Heart,
            tag: "// HUMANITARIAN WORK",
            heading: "Humanitarian Contributions",
            subheading:
                "Crisis response, community care, and grassroots volunteerism — making a direct impact on people's lives when it matters most.",
            accentClass: "text-rose-400",
            borderClass: "border-rose-500/25",
            gradientClass: "from-rose-500/15 to-red-600/5",
        },
        {
            key: "startup",
            icon: Rocket,
            tag: "// STARTUP ECOSYSTEM",
            heading: "Startup Ecosystem",
            subheading:
                "Contributing to Bangladesh's startup growth through policy advocacy, stakeholder engagement, and co-founding impactful ventures.",
            accentClass: "text-cyan-400",
            borderClass: "border-cyan-500/25",
            gradientClass: "from-cyan-500/15 to-teal-600/5",
        },
        {
            key: "university",
            icon: GraduationCap,
            tag: "// UNIVERSITY & CLUB",
            heading: "University & Club Contributions",
            subheading:
                "Building communities, platforms, and events that empowered students and elevated campus culture at CUET and beyond.",
            accentClass: "text-fuchsia-400",
            borderClass: "border-fuchsia-500/25",
            gradientClass: "from-fuchsia-500/15 to-purple-600/5",
        },
    ];

/* ─── Image Card ─────────────────────────────────────────────────────── */
function ImageCard({ item, index }: { item: CommunityItem; index: number }) {
    const [imgError, setImgError] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
            className="glass-card-hover overflow-hidden group"
        >
            {/* Image */}
            <div className="relative aspect-[4/3] bg-secondary/40 overflow-hidden">
                {item.imageUrl && !imgError ? (
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground/40">
                        <ImageOff className="w-8 h-8" />
                        <span className="text-xs">No image</span>
                    </div>
                )}
                {/* Tag overlay */}
                {item.tag && (
                    <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30 text-primary">
                            {item.tag}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-sm font-bold text-foreground leading-snug mb-1.5">{item.title}</h3>
                {item.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{item.description}</p>
                )}
            </div>
        </motion.div>
    );
}

/* ─── Section Block ──────────────────────────────────────────────────── */
function SectionBlock({
    meta,
    items,
}: {
    meta: (typeof SECTIONS)[number];
    items: CommunityItem[];
}) {
    const Icon = meta.icon;

    return (
        <section id={meta.key} className="py-20 relative">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                            <Icon className={`w-5 h-5 ${meta.accentClass}`} />
                        </div>
                        <p className="text-primary text-sm font-mono">{meta.tag}</p>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{meta.heading}</h2>
                    <p className="text-muted-foreground text-sm max-w-2xl">{meta.subheading}</p>
                </motion.div>

                {/* Grid */}
                {items.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                        <ImageOff className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-muted-foreground text-sm">No entries yet for this section.</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {items
                            .slice()
                            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                            .map((item, i) => (
                                <ImageCard key={item._id} item={item} index={i} />
                            ))}
                    </div>
                )}
            </div>
        </section>
    );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function CommunityContribution() {
    const [items, setItems] = useState<CommunityItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .getCommunity()
            .then(setItems)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const bySection = (section: CommunitySection) =>
        items.filter((i) => i.section === section);

    // Stat counts
    const totalItems = items.length;

    return (
        <main className="min-h-screen bg-background overflow-x-hidden">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-primary text-sm font-mono mb-3">// COMMUNITY CONTRIBUTION</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                            Giving Back to{" "}
                            <span className="text-gradient-cyan">Society</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
                            From humanitarian crises to startup ecosystems and university communities — here's
                            how I've tried to make a meaningful difference beyond professional work.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        {[
                            { value: "700K+", label: "BDT Raised", emoji: "💰" },
                            { value: "1000+", label: "People Helped", emoji: "❤️" },
                            { value: "5+", label: "Years of Service", emoji: "📅" },
                            { value: `${totalItems}`, label: "Initiatives", emoji: "🚀" },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + i * 0.08 }}
                                className="glass-card p-5 text-center"
                            >
                                <div className="text-2xl mb-1">{stat.emoji}</div>
                                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                                <div className="text-xs text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Section jump links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 flex flex-wrap gap-3"
                    >
                        {SECTIONS.map((s) => (
                            <a
                                key={s.key}
                                href={`#${s.key}`}
                                className="inline-flex items-center gap-2 px-4 py-1.5 glass-card text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                            >
                                <s.icon className={`w-4 h-4 ${s.accentClass}`} />
                                {s.heading}
                            </a>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Loading state */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center py-20"
                    >
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </motion.div>
                )}
            </AnimatePresence>

            {!loading && (
                <>
                    {SECTIONS.map((meta, idx) => (
                        <div key={meta.key}>
                            {idx > 0 && <div className="border-t border-border/40 mx-6" />}
                            <SectionBlock meta={meta} items={bySection(meta.key)} />
                        </div>
                    ))}
                </>
            )}

            <Footer />
        </main>
    );
}

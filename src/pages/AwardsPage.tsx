import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Trophy,
    Lightbulb,
    Cpu,
    MessageSquare,
    ArrowLeft,
    ImageOff,
    Loader2,
    ExternalLink,
    Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api, AwardItem, AwardSection } from "@/lib/api";

/* ─── Section meta ───────────────────────────────────────────────────── */
const SECTIONS: {
    key: AwardSection;
    icon: React.ElementType;
    tag: string;
    heading: string;
    subheading: string;
    highlights: { emoji: string; text: string }[];
    iconBg: string;
    iconColor: string;
    accentBorder: string;
    badgeBg: string;
}[] = [
        {
            key: "innovation",
            icon: Lightbulb,
            tag: "// INNOVATION & STARTUP",
            heading: "Innovation & Startup",
            subheading:
                "Recognition for entrepreneurial spirit, creative problem-solving, and impactful contributions to the startup ecosystem.",
            highlights: [
                { emoji: "🚀", text: "iDEA Innovation Grant 2023" },
                { emoji: "📈", text: "Accelerating Bangladesh Pitch Winner" },
                { emoji: "💎", text: "Tech Transformer Award 2023" },
                { emoji: "💡", text: "Innovation project mentorship" },
            ],
            iconBg: "bg-amber-500/15",
            iconColor: "text-amber-400",
            accentBorder: "border-amber-500/20",
            badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
        },
        {
            key: "engineering",
            icon: Cpu,
            tag: "// ENGINEERING & TECH",
            heading: "Engineering Excellence",
            subheading:
                "Academic and professional awards in water resources, civil engineering, and digital transformation.",
            highlights: [
                { emoji: "🏗️", text: "Concrete Solutions Challenge Winner" },
                { emoji: "💧", text: "Hydraulic modeling excellence" },
                { emoji: "💻", text: "Digital Bangladesh innovation honors" },
                { emoji: "🎓", text: "Academic recognition at CUET" },
            ],
            iconBg: "bg-blue-500/15",
            iconColor: "text-blue-400",
            accentBorder: "border-blue-500/20",
            badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/30",
        },
        {
            key: "leadership",
            icon: MessageSquare,
            tag: "// LEADERSHIP & DEBATE",
            heading: "Leadership & Communication",
            subheading:
                "Honors in competitive debating, public speaking, and community leadership spanning over a decade.",
            highlights: [
                { emoji: "🗣️", text: "Prothom Alo Best Speaker Award" },
                { emoji: "🏆", text: "BTV National Debate Champion" },
                { emoji: "🎙️", text: "Inter-Cantonment debate honors" },
                { emoji: "🤝", text: "Drishty School of Debate recognition" },
            ],
            iconBg: "bg-emerald-500/15",
            iconColor: "text-emerald-400",
            accentBorder: "border-emerald-500/20",
            badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        },
    ];

/* ─── Award Card ─────────────────────────────────────────────────────── */
function AwardCard({ item, index }: { item: AwardItem; index: number }) {
    const [imgError, setImgError] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: index * 0.07, duration: 0.45, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-xl border border-border/50 bg-secondary/30 hover:border-primary/30 transition-all duration-300"
        >
            {/* Image */}
            <div className="aspect-[4/3] overflow-hidden bg-secondary/50">
                {item.imageUrl && !imgError ? (
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                        style={{ "--tw-scale-x": 1.08, "--tw-scale-y": 1.08 } as React.CSSProperties}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground/30">
                        <Trophy className="w-7 h-7" />
                        <span className="text-xs">Excellence</span>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-3">
                <div className="flex items-center justify-between mb-1.5">
                    {item.tag && (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-primary/25 text-primary bg-primary/8">
                            {item.tag}
                        </span>
                    )}
                    {item.year && (
                        <span className="text-[10px] text-muted-foreground font-mono">
                            {item.year}
                        </span>
                    )}
                </div>
                <p className="text-xs font-semibold text-foreground leading-snug line-clamp-2">
                    {item.title}
                </p>
                {item.organization && (
                    <p className="text-[11px] text-primary/80 mt-0.5 font-medium">
                        {item.organization}
                    </p>
                )}
                {item.description && (
                    <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed line-clamp-3">
                        {item.description}
                    </p>
                )}
                {item.link && (
                    <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2.5 text-[10px] text-primary hover:text-primary/80 transition-colors font-mono"
                    >
                        <ExternalLink className="w-3 h-3" />
                        View Reference
                    </a>
                )}
            </div>
        </motion.div>
    );
}

/* ─── Empty placeholder ─────────────────────────────────────────────── */
function EmptyGrid() {
    return (
        <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="aspect-[4/3] rounded-xl border border-dashed border-border/40 bg-secondary/20 flex items-center justify-center"
                >
                    <Star className="w-5 h-5 text-muted-foreground/20" />
                </div>
            ))}
        </div>
    );
}

/* ─── Section Block ──────────────────────────────────────────────────── */
function SectionBlock({
    meta,
    items,
}: {
    meta: (typeof SECTIONS)[number];
    items: AwardItem[];
}) {
    const Icon = meta.icon;
    const sorted = items.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return (
        <section id={meta.key} className="py-20 relative">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-[1fr_1.35fr] gap-12 xl:gap-20 items-start">
                    {/* LEFT: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        className="sticky top-28 space-y-6"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-11 h-11 rounded-xl ${meta.iconBg} flex items-center justify-center`}>
                                <Icon className={`w-5 h-5 ${meta.iconColor}`} />
                            </div>
                            <span className="text-primary text-sm font-mono">{meta.tag}</span>
                        </div>

                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
                                {meta.heading}
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {meta.subheading}
                            </p>
                        </div>

                        <div className={`h-px w-12 rounded-full ${meta.iconBg}`} />

                        <ul className="space-y-2.5">
                            {meta.highlights.map((h, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -12 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
                                    className="flex items-start gap-3"
                                >
                                    <span className="text-base leading-none mt-0.5">{h.emoji}</span>
                                    <span className="text-sm text-muted-foreground">{h.text}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <div className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border ${meta.badgeBg} font-mono`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                            {sorted.length} recognition{sorted.length !== 1 ? "s" : ""}
                        </div>
                    </motion.div>

                    {/* RIGHT: Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                    >
                        {sorted.length === 0 ? (
                            <EmptyGrid />
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {sorted.map((item, i) => (
                                    <AwardCard key={item._id} item={item} index={i} />
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default function AwardsPage() {
    const [items, setItems] = useState<AwardItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getAwards()
            .then((data) => setItems(data as AwardItem[]))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const bySection = (section: AwardSection) =>
        items.filter((i) => i.section === section);

    return (
        <main className="min-h-screen bg-background overflow-x-hidden">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>

                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-primary text-sm font-mono mb-3">// RECOGNITIONS</p>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                                Awards &{" "}
                                <span className="text-gradient-cyan">Achievements</span>
                            </h1>
                            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                                A journey of excellence across innovation, engineering, and leadership.
                                Each milestone represents a commitment to growth and impactful solutions.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="mt-10 flex flex-wrap gap-2.5"
                        >
                            {SECTIONS.map((s) => (
                                <a
                                    key={s.key}
                                    href={`#${s.key}`}
                                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium transition-all hover:scale-105 ${s.badgeBg}`}
                                >
                                    <s.icon className="w-3.5 h-3.5" />
                                    {s.heading}
                                </a>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {loading && (
                <div className="flex items-center justify-center py-24">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            )}

            {!loading &&
                SECTIONS.map((meta) => (
                    <div key={meta.key}>
                        <div className="border-t border-border/30 mx-6" />
                        <SectionBlock
                            meta={meta}
                            items={bySection(meta.key)}
                        />
                    </div>
                ))}

            <Footer />
        </main>
    );
}

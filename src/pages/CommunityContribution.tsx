import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Heart,
    Rocket,
    GraduationCap,
    ArrowLeft,
    ImageOff,
    Loader2,
    ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api, CommunityItem, CommunitySection } from "@/lib/api";

/* ─── Section meta ───────────────────────────────────────────────────── */
const SECTIONS: {
    key: CommunitySection;
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
            key: "startup",
            icon: Rocket,
            tag: "// STARTUP ECOSYSTEM",
            heading: "Startup Ecosystem",
            subheading:
                "Contributing to Bangladesh's startup growth through policy advocacy, stakeholder engagement, and co-founding impactful ventures.",
            highlights: [
                { emoji: "🏛️", text: "General Secretary, SAB" },
                { emoji: "🔗", text: "Stakeholder & investor engagement" },
                { emoji: "🚀", text: "Todvob — Appsumo Select product" },
                { emoji: "💡", text: "Founder mentorship & ecosystem building" },
            ],
            iconBg: "bg-cyan-500/15",
            iconColor: "text-cyan-400",
            accentBorder: "border-cyan-500/20",
            badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
        },
        {
            key: "humanitarian",
            icon: Heart,
            tag: "// HUMANITARIAN WORK",
            heading: "Humanitarian Contributions",
            subheading:
                "Crisis response, community care, and grassroots volunteerism — making a direct impact on lives when it matters most.",
            highlights: [
                { emoji: "💰", text: "700K BDT COVID oxygen fund" },
                { emoji: "🍱", text: "Free food for 1000+ people" },
                { emoji: "🌊", text: "Flood relief: Feni, Cumilla, Fatikchari" },
                { emoji: "🧥", text: "Winter Help Project 2021 & 2022" },
            ],
            iconBg: "bg-rose-500/15",
            iconColor: "text-rose-400",
            accentBorder: "border-rose-500/20",
            badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/30",
        },
        {
            key: "university",
            icon: GraduationCap,
            tag: "// UNIVERSITY & CLUB",
            heading: "University & Club",
            subheading:
                "Building communities, platforms, and events that empowered students and elevated campus culture at CUET and beyond.",
            highlights: [
                { emoji: "🌐", text: "Built csfcuet.org platform" },
                { emoji: "🏗️", text: "ASCE CUET Creative Secretary" },
                { emoji: "🎙️", text: "Founder, CCPC Debating Society" },
                { emoji: "🏆", text: "BTV Debate & Inter-Cantonment champion" },
            ],
            iconBg: "bg-fuchsia-500/15",
            iconColor: "text-fuchsia-400",
            accentBorder: "border-fuchsia-500/20",
            badgeBg: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30",
        },
    ];

/* ─── Image Card ─────────────────────────────────────────────────────── */
function ImageCard({
    item,
    index,
}: {
    item: CommunityItem;
    index: number;
}) {
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
                        <ImageOff className="w-7 h-7" />
                        <span className="text-xs">No image</span>
                    </div>
                )}
            </div>

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Info strip */}
            <div className="p-3">
                {item.tag && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-primary/25 text-primary bg-primary/8 mb-1.5 inline-block">
                        {item.tag}
                    </span>
                )}
                <p className="text-xs font-semibold text-foreground leading-snug line-clamp-2">
                    {item.title}
                </p>
                {item.description && (
                    <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                        {item.description}
                    </p>
                )}
                {item.link && (
                    <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-[10px] text-primary hover:text-primary/80 transition-colors font-mono"
                    >
                        <ExternalLink className="w-3 h-3" />
                        View Reference
                    </a>
                )}
            </div>
        </motion.div>
    );
}

/* ─── Empty placeholder grid ─────────────────────────────────────────── */
function EmptyGrid() {
    return (
        <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="aspect-[4/3] rounded-xl border border-dashed border-border/40 bg-secondary/20 flex items-center justify-center"
                >
                    <ImageOff className="w-5 h-5 text-muted-foreground/20" />
                </div>
            ))}
        </div>
    );
}

/* ─── Section Block (Info left, Grid right) ──────────────────────────── */
function SectionBlock({
    meta,
    items,
    sectionIndex,
}: {
    meta: (typeof SECTIONS)[number];
    items: CommunityItem[];
    sectionIndex: number;
}) {
    const Icon = meta.icon;
    const sorted = items.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return (
        <section id={meta.key} className="py-20 relative">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-[1fr_1.35fr] gap-12 xl:gap-20 items-start">

                    {/* ── LEFT: Info ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        className="sticky top-28 space-y-6"
                    >
                        {/* Tag + icon */}
                        <div className="flex items-center gap-3">
                            <div className={`w-11 h-11 rounded-xl ${meta.iconBg} flex items-center justify-center`}>
                                <Icon className={`w-5 h-5 ${meta.iconColor}`} />
                            </div>
                            <span className="text-primary text-sm font-mono">{meta.tag}</span>
                        </div>

                        {/* Heading */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
                                {meta.heading}
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {meta.subheading}
                            </p>
                        </div>

                        {/* Accent line */}
                        <div className={`h-px w-12 rounded-full ${meta.iconBg}`} />

                        {/* Highlights */}
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

                        {/* Item count badge */}
                        <div className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border ${meta.badgeBg} font-mono`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                            {sorted.length} item{sorted.length !== 1 ? "s" : ""} in this section
                        </div>
                    </motion.div>

                    {/* ── RIGHT: Image Grid ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                    >
                        {sorted.length === 0 ? (
                            <EmptyGrid />
                        ) : (
                            <div className={`grid gap-4 ${sorted.length === 1
                                ? "grid-cols-1 max-w-sm"
                                : sorted.length === 2
                                    ? "grid-cols-2"
                                    : "grid-cols-2 md:grid-cols-3"
                                }`}>
                                {sorted.map((item, i) => (
                                    <ImageCard key={item._id} item={item} index={i} />
                                ))}
                            </div>
                        )}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function CommunityContribution() {
    const [items, setItems] = useState<CommunityItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getCommunity()
            .then(setItems)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const bySection = (section: CommunitySection) =>
        items.filter((i) => i.section === section);

    return (
        <main className="min-h-screen bg-background overflow-x-hidden">
            <Navbar />

            {/* ── Hero ── */}
            <section className="pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

                {/* Subtle background glow */}
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
                            <p className="text-primary text-sm font-mono mb-3">// COMMUNITY CONTRIBUTION</p>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                                Giving Back to{" "}
                                <span className="text-gradient-cyan">Society</span>
                            </h1>
                            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                                From humanitarian crises to startup ecosystems and university communities —
                                here's how I've tried to make a meaningful difference beyond professional work.
                            </p>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="mt-10 grid grid-cols-4 gap-3"
                        >
                            {[
                                { value: "700K+", label: "BDT Raised", emoji: "💰" },
                                { value: "1000+", label: "Helped", emoji: "❤️" },
                                { value: "5+", label: "Years", emoji: "📅" },
                                { value: `${items.length || "—"}`, label: "Initiatives", emoji: "🚀" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 + i * 0.07 }}
                                    className="glass-card p-4 text-center"
                                >
                                    <div className="text-xl mb-0.5">{stat.emoji}</div>
                                    <div className="text-xl font-bold text-primary">{stat.value}</div>
                                    <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Jump links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55 }}
                            className="mt-7 flex flex-wrap gap-2.5"
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

            {/* ── Loading ── */}
            {loading && (
                <div className="flex items-center justify-center py-24">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            )}

            {/* ── Sections ── */}
            {!loading &&
                SECTIONS.map((meta, idx) => (
                    <div key={meta.key}>
                        <div className="border-t border-border/30 mx-6" />
                        <SectionBlock
                            meta={meta}
                            items={bySection(meta.key)}
                            sectionIndex={idx}
                        />
                    </div>
                ))}

            <Footer />
        </main>
    );
}

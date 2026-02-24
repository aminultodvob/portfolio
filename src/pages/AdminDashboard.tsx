import { useState, useEffect, ReactNode, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { api, CommunityItem } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, Briefcase, Code2, Award, BookOpen, FlaskConical,
    User, LogOut, Plus, Pencil, Trash2, X, Save, Loader2, ChevronRight,
    FolderOpen, Star, GraduationCap, CheckCircle, BarChart3, HeartHandshake, ImageOff
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────
type Item = Record<string, unknown> & { _id?: string };

// ─── Modal ─────────────────────────────────────────────────────────────────
function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
    if (!open) return null;
    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-foreground">{title}</h2>
                        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    {children}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

// ─── Field Builder ─────────────────────────────────────────────────────────
function FormField({ label, name, value, onChange, type = "text", required = false, placeholder = "" }: {
    label: string; name: string; value: string; onChange: (name: string, val: string) => void;
    type?: string; required?: boolean; placeholder?: string;
}) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</label>
            {type === "textarea" ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    required={required}
                    placeholder={placeholder}
                    rows={3}
                    className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    required={required}
                    placeholder={placeholder}
                    className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                />
            )}
        </div>
    );
}

// ─── Generic CRUD Section ──────────────────────────────────────────────────
function CrudSection({
    title, icon: Icon, items, loading, onAdd, onEdit, onDelete,
    renderItem, renderForm, emptyMsg
}: {
    title: string; icon: React.ElementType; items: Item[]; loading: boolean;
    onAdd: () => void; onEdit: (item: Item) => void; onDelete: (id: string) => void;
    renderItem: (item: Item) => ReactNode; renderForm: ReactNode;
    emptyMsg: string;
}) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-bold text-foreground">{title}</h2>
                    <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full font-medium">{items.length}</span>
                </div>
                <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={onAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg"
                >
                    <Plus className="w-4 h-4" /> Add New
                </motion.button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : items.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <p className="text-muted-foreground">{emptyMsg}</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {items.map((item) => (
                        <motion.div
                            key={item._id as string}
                            layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card-hover p-4 flex items-start gap-4"
                        >
                            <div className="flex-1 min-w-0">{renderItem(item)}</div>
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={() => onEdit(item)}
                                    className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => item._id && onDelete(item._id as string)}
                                    className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
            {renderForm}
        </div>
    );
}

// ─── Dashboard Overview Cards ──────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ElementType; color: string }) {
    return (
        <div className="glass-card-hover p-5">
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{label}</span>
                <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-primary" />
                </div>
            </div>
            <div className="text-3xl font-bold text-foreground">{value}</div>
        </div>
    );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────
export default function AdminDashboard() {
    const { email, logout, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    // Navigation
    const tabs = [
        { id: "overview", label: "Overview", icon: LayoutDashboard },
        { id: "about", label: "About", icon: User },
        { id: "projects", label: "Projects", icon: FolderOpen },
        { id: "experience", label: "Experience", icon: Briefcase },
        { id: "skills", label: "Skills", icon: Code2 },
        { id: "awards", label: "Awards", icon: Award },
        { id: "publications", label: "Publications", icon: BookOpen },
        { id: "research", label: "Research", icon: FlaskConical },
        { id: "community", label: "Community", icon: HeartHandshake },
    ];

    const [activeTab, setActiveTab] = useState("overview");

    // Guard
    useEffect(() => {
        if (!authLoading && !isAuthenticated) navigate("/admin");
    }, [authLoading, isAuthenticated, navigate]);

    // ── Data states ──────────────────────────────────────────────────────────
    const [projects, setProjects] = useState<Item[]>([]);
    const [experiences, setExperiences] = useState<Item[]>([]);
    const [skills, setSkills] = useState<Item[]>([]);
    const [awards, setAwards] = useState<Item[]>([]);
    const [publications, setPublications] = useState<Item[]>([]);
    const [research, setResearch] = useState<Item[]>([]);
    const [about, setAbout] = useState<Item>({});
    const [communityItems, setCommunityItems] = useState<CommunityItem[]>([]);
    const [dataLoading, setDataLoading] = useState(false);

    const fetchAll = async () => {
        setDataLoading(true);
        try {
            const [p, e, s, a, pub, r, ab, comm] = await Promise.all([
                api.getProjects(), api.getExperiences(), api.getSkills(),
                api.getAwards(), api.getPublications(), api.getResearch(), api.getAbout(),
                api.getCommunity()
            ]);
            setProjects(p as Item[]);
            setExperiences(e as Item[]);
            setSkills(s as Item[]);
            setAwards(a as Item[]);
            setPublications(pub as Item[]);
            setResearch(r as Item[]);
            setAbout(ab as Item);
            setCommunityItems(comm);
        } catch (e) {
            console.error(e);
        } finally {
            setDataLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) fetchAll();
    }, [isAuthenticated]);

    // ── Modal state ──────────────────────────────────────────────────────────
    const [modal, setModal] = useState<{ type: string; item?: Item } | null>(null);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<{ type: string; id: string } | null>(null);

    const openAdd = (type: string, defaults: Record<string, string> = {}) => {
        setFormData(defaults);
        setModal({ type });
    };
    const openEdit = (type: string, item: Item) => {
        const flat: Record<string, string> = {};
        Object.entries(item).forEach(([k, v]) => {
            if (k === "_id" || k === "__v") return;
            if (Array.isArray(v)) flat[k] = (v as string[]).join(k === "points" ? "\n" : ", ");
            else flat[k] = String(v ?? "");
        });
        setFormData(flat);
        setModal({ type, item });
    };

    const handleFieldChange = (name: string, val: string) => {
        setFormData((prev) => ({ ...prev, [name]: val }));
    };

    const withArrayFields = (fields: string[], separator = ", "): Record<string, unknown> => {
        const result: Record<string, unknown> = { ...formData };
        fields.forEach((f) => {
            if (formData[f]) result[f] = formData[f].split(separator === "\n" ? /\n/ : separator).map((s) => s.trim()).filter(Boolean);
            else result[f] = [];
        });
        return result;
    };

    // ── Save handler ─────────────────────────────────────────────────────────
    const handleSave = async (e: FormEvent, type: string, getBody: () => unknown) => {
        e.preventDefault();
        setSaving(true);
        try {
            const body = getBody();
            const isEdit = modal?.item?._id;

            if (type === "about") {
                const updated = await api.updateAbout(body);
                setAbout(updated as Item);
            } else if (type === "projects") {
                if (isEdit) {
                    const u = await api.updateProject(isEdit as string, body);
                    setProjects((p) => p.map((x) => (x._id === isEdit ? u as Item : x)));
                } else {
                    const n = await api.createProject(body);
                    setProjects((p) => [n as Item, ...p]);
                }
            } else if (type === "experience") {
                if (isEdit) {
                    const u = await api.updateExperience(isEdit as string, body);
                    setExperiences((p) => p.map((x) => (x._id === isEdit ? u as Item : x)));
                } else {
                    const n = await api.createExperience(body);
                    setExperiences((p) => [n as Item, ...p]);
                }
            } else if (type === "skills") {
                if (isEdit) {
                    const u = await api.updateSkill(isEdit as string, body);
                    setSkills((p) => p.map((x) => (x._id === isEdit ? u as Item : x)));
                } else {
                    const n = await api.createSkill(body);
                    setSkills((p) => [n as Item, ...p]);
                }
            } else if (type === "awards") {
                if (isEdit) {
                    const u = await api.updateAward(isEdit as string, body);
                    setAwards((p) => p.map((x) => (x._id === isEdit ? u as Item : x)));
                } else {
                    const n = await api.createAward(body);
                    setAwards((p) => [n as Item, ...p]);
                }
            } else if (type === "publications") {
                if (isEdit) {
                    const u = await api.updatePublication(isEdit as string, body);
                    setPublications((p) => p.map((x) => (x._id === isEdit ? u as Item : x)));
                } else {
                    const n = await api.createPublication(body);
                    setPublications((p) => [n as Item, ...p]);
                }
            } else if (type === "research") {
                if (isEdit) {
                    const u = await api.updateResearch(isEdit as string, body);
                    setResearch((p) => p.map((x) => (x._id === isEdit ? u as Item : x)));
                } else {
                    const n = await api.createResearch(body);
                    setResearch((p) => [n as Item, ...p]);
                }
            } else if (type === "community") {
                if (isEdit) {
                    const u = await api.updateCommunityItem(isEdit as string, body);
                    setCommunityItems((p) => p.map((x) => (x._id === isEdit ? u : x)));
                } else {
                    const n = await api.createCommunityItem(body);
                    setCommunityItems((p) => [n, ...p]);
                }
            }
            setModal(null);
        } catch (err) {
            alert(err instanceof Error ? err.message : "Save failed");
        } finally {
            setSaving(false);
        }
    };

    // ── Delete handler ───────────────────────────────────────────────────────
    const handleDelete = async (type: string, id: string) => {
        try {
            if (type === "projects") { await api.deleteProject(id); setProjects((p) => p.filter((x) => x._id !== id)); }
            else if (type === "experience") { await api.deleteExperience(id); setExperiences((p) => p.filter((x) => x._id !== id)); }
            else if (type === "skills") { await api.deleteSkill(id); setSkills((p) => p.filter((x) => x._id !== id)); }
            else if (type === "awards") { await api.deleteAward(id); setAwards((p) => p.filter((x) => x._id !== id)); }
            else if (type === "publications") { await api.deletePublication(id); setPublications((p) => p.filter((x) => x._id !== id)); }
            else if (type === "research") { await api.deleteResearch(id); setResearch((p) => p.filter((x) => x._id !== id)); }
            else if (type === "community") { await api.deleteCommunityItem(id); setCommunityItems((p) => p.filter((x) => x._id !== id)); }
        } catch (err) {
            alert(err instanceof Error ? err.message : "Delete failed");
        }
        setDeleteConfirm(null);
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 shrink-0 border-r border-border bg-card/30 backdrop-blur-xl flex flex-col sticky top-0 h-screen">
                <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-foreground">Portfolio CMS</div>
                            <div className="text-[11px] text-muted-foreground truncate max-w-[100px]">{email}</div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                                }`}
                        >
                            <tab.icon className="w-4 h-4 shrink-0" />
                            {tab.label}
                            {activeTab === tab.id && <ChevronRight className="w-3 h-3 ml-auto" />}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-border">
                    <button
                        onClick={() => { logout(); navigate("/admin"); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                    <a
                        href="/"
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all mt-1"
                    >
                        ← View Portfolio
                    </a>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 overflow-y-auto p-8">
                {/* ── Overview ── */}
                {activeTab === "overview" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                            <p className="text-muted-foreground mt-1">Manage all portfolio content from here.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                            <StatCard label="Projects" value={projects.length} icon={FolderOpen} color="bg-primary/10" />
                            <StatCard label="Experience" value={experiences.length} icon={Briefcase} color="bg-primary/10" />
                            <StatCard label="Skills" value={skills.length} icon={Code2} color="bg-primary/10" />
                            <StatCard label="Awards" value={awards.length} icon={Star} color="bg-primary/10" />
                            <StatCard label="Publications" value={publications.length} icon={GraduationCap} color="bg-primary/10" />
                            <StatCard label="Research" value={research.length} icon={FlaskConical} color="bg-primary/10" />
                            <StatCard label="Community" value={communityItems.length} icon={HeartHandshake} color="bg-primary/10" />
                        </div>

                        <div className="glass-card p-6">
                            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-primary" /> Quick Access
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {tabs.filter(t => t.id !== "overview").map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className="glass-card-hover p-4 flex items-center gap-3 text-left"
                                    >
                                        <tab.icon className="w-5 h-5 text-primary shrink-0" />
                                        <span className="text-sm font-medium text-foreground">{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ── About ── */}
                {activeTab === "about" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5 text-primary" />
                                <h1 className="text-2xl font-bold text-foreground">About</h1>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                onClick={() => openEdit("about", about)}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg"
                            >
                                <Pencil className="w-4 h-4" /> Edit About
                            </motion.button>
                        </div>

                        <div className="glass-card p-6 grid md:grid-cols-2 gap-4">
                            {Object.entries(about).filter(([k]) => !["_id", "__v"].includes(k)).map(([k, v]) => (
                                <div key={k}>
                                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">{k}</div>
                                    <div className="text-sm text-foreground">{String(v || "—")}</div>
                                </div>
                            ))}
                            {Object.keys(about).length === 0 && (
                                <p className="text-muted-foreground col-span-2">No about data yet. Click "Edit About" to add it.</p>
                            )}
                        </div>

                        {/* About form modal */}
                        <Modal open={modal?.type === "about"} onClose={() => setModal(null)} title="Edit About">
                            <form onSubmit={(e) => handleSave(e, "about", () => formData)} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormField label="Name" name="name" value={formData.name || ""} onChange={handleFieldChange} required placeholder="Aminul Islam" />
                                    <FormField label="Title" name="title" value={formData.title || ""} onChange={handleFieldChange} placeholder="Water Resources Engineer" />
                                    <FormField label="Email" name="email" value={formData.email || ""} onChange={handleFieldChange} type="email" placeholder="email@example.com" />
                                    <FormField label="Phone" name="phone" value={formData.phone || ""} onChange={handleFieldChange} placeholder="+1 234 567 8900" />
                                    <FormField label="Location" name="location" value={formData.location || ""} onChange={handleFieldChange} placeholder="City, Country" />
                                    <FormField label="LinkedIn URL" name="linkedin" value={formData.linkedin || ""} onChange={handleFieldChange} placeholder="https://linkedin.com/in/..." />
                                    <FormField label="GitHub URL" name="github" value={formData.github || ""} onChange={handleFieldChange} placeholder="https://github.com/..." />
                                    <FormField label="Scholar URL" name="scholar" value={formData.scholar || ""} onChange={handleFieldChange} placeholder="https://scholar.google.com/..." />
                                    <FormField label="Education" name="education" value={formData.education || ""} onChange={handleFieldChange} placeholder="BSc(Eng.) CUET" />
                                    <FormField label="Languages" name="languages" value={formData.languages || ""} onChange={handleFieldChange} placeholder="Bangla, English" />
                                </div>
                                <FormField label="Bio" name="bio" value={formData.bio || ""} onChange={handleFieldChange} type="textarea" placeholder="A brief bio..." />
                                <div className="flex justify-end gap-3 pt-2">
                                    <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:bg-secondary/60 transition-all">Cancel</button>
                                    <button type="submit" disabled={saving} className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground font-semibold flex items-center gap-2 disabled:opacity-60">
                                        {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save
                                    </button>
                                </div>
                            </form>
                        </Modal>
                    </motion.div>
                )}

                {/* ── Projects ── */}
                {activeTab === "projects" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <CrudSection
                            title="Projects" icon={FolderOpen} items={projects} loading={dataLoading}
                            onAdd={() => openAdd("projects")}
                            onEdit={(item) => openEdit("projects", item)}
                            onDelete={(id) => setDeleteConfirm({ type: "projects", id })}
                            emptyMsg="No projects yet. Add your first project!"
                            renderItem={(item) => (
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-foreground text-sm">{item.title as string}</span>
                                        {item.featured && <span className="px-1.5 py-0.5 text-[10px] bg-primary/10 text-primary rounded font-medium">Featured</span>}
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{item.description as string}</p>
                                </div>
                            )}
                            renderForm={
                                <Modal open={modal?.type === "projects"} onClose={() => setModal(null)} title={modal?.item ? "Edit Project" : "Add Project"}>
                                    <form onSubmit={(e) => handleSave(e, "projects", () => ({ ...withArrayFields(["tags"]), featured: formData.featured === "true" }))} className="space-y-4">
                                        <FormField label="Title" name="title" value={formData.title || ""} onChange={handleFieldChange} required placeholder="Project Title" />
                                        <FormField label="Description" name="description" value={formData.description || ""} onChange={handleFieldChange} type="textarea" placeholder="Brief description..." />
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <FormField label="Tags (comma separated)" name="tags" value={formData.tags || ""} onChange={handleFieldChange} placeholder="React, TypeScript, MongoDB" />
                                            <FormField label="Display Order" name="order" value={formData.order || "0"} onChange={handleFieldChange} type="number" />
                                            <FormField label="Live URL" name="link" value={formData.link || ""} onChange={handleFieldChange} placeholder="https://..." />
                                            <FormField label="GitHub URL" name="github" value={formData.github || ""} onChange={handleFieldChange} placeholder="https://github.com/..." />
                                            <FormField label="Appsumo Link" name="appsumo" value={formData.appsumo || ""} onChange={handleFieldChange} placeholder="https://appsumo.com/..." />
                                            <FormField label="YouTube Link" name="youtube" value={formData.youtube || ""} onChange={handleFieldChange} placeholder="https://youtube.com/..." />
                                            <FormField label="Image URL" name="image" value={formData.image || ""} onChange={handleFieldChange} placeholder="https://..." />
                                        </div>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" checked={formData.featured === "true"} onChange={(e) => handleFieldChange("featured", String(e.target.checked))} className="accent-primary" />
                                            <span className="text-sm text-foreground">Featured project</span>
                                        </label>
                                        <div className="flex justify-end gap-3 pt-2">
                                            <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:bg-secondary/60 transition-all">Cancel</button>
                                            <button type="submit" disabled={saving} className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground font-semibold flex items-center gap-2 disabled:opacity-60">
                                                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save
                                            </button>
                                        </div>
                                    </form>
                                </Modal>
                            }
                        />
                    </motion.div>
                )}

                {/* ── Experience ── */}
                {activeTab === "experience" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <CrudSection
                            title="Experience" icon={Briefcase} items={experiences} loading={dataLoading}
                            onAdd={() => openAdd("experience")}
                            onEdit={(item) => openEdit("experience", item)}
                            onDelete={(id) => setDeleteConfirm({ type: "experience", id })}
                            emptyMsg="No experience entries yet."
                            renderItem={(item) => (
                                <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="font-semibold text-foreground text-sm">{item.role as string}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground">{item.company as string} · {item.period as string}</div>
                                </div>
                            )}
                            renderForm={
                                <Modal open={modal?.type === "experience"} onClose={() => setModal(null)} title={modal?.item ? "Edit Experience" : "Add Experience"}>
                                    <form onSubmit={(e) => {
                                        const body = {
                                            ...withArrayFields(["skills"]),
                                            points: (formData.points || "").split("\n").map(s => s.trim()).filter(Boolean),
                                            current: formData.current === "true"
                                        };
                                        handleSave(e, "experience", () => body);
                                    }} className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <FormField label="Role / Title" name="role" value={formData.role || ""} onChange={handleFieldChange} required placeholder="Senior Engineer" />
                                            <FormField label="Company" name="company" value={formData.company || ""} onChange={handleFieldChange} required placeholder="Company Name" />
                                            <FormField label="Company Website" name="link" value={formData.link || ""} onChange={handleFieldChange} placeholder="https://..." />
                                            <FormField label="Period (Text)" name="period" value={formData.period || ""} onChange={handleFieldChange} placeholder="Jan 2022 – Present" />
                                            <FormField label="Start Date (for sorting)" name="startDate" value={formData.startDate ? formData.startDate.split('T')[0] : ""} onChange={handleFieldChange} type="date" />
                                            <FormField label="Skills (comma separated)" name="skills" value={formData.skills || ""} onChange={handleFieldChange} placeholder="Python, GIS, Hydrology" />
                                            <FormField label="Display Order" name="order" value={formData.order || "0"} onChange={handleFieldChange} type="number" />
                                        </div>
                                        <FormField label="Description (Optional)" name="description" value={formData.description || ""} onChange={handleFieldChange} type="textarea" placeholder="One-line overview..." />
                                        <FormField label="Points (One per line)" name="points" value={formData.points || ""} onChange={handleFieldChange} type="textarea" placeholder="Built a GIS engine\nManaged a team of 5" />
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" checked={formData.current === "true"} onChange={(e) => handleFieldChange("current", String(e.target.checked))} className="accent-primary" />
                                            <span className="text-sm text-foreground">Current position</span>
                                        </label>
                                        <div className="flex justify-end gap-3 pt-2">
                                            <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:bg-secondary/60 transition-all">Cancel</button>
                                            <button type="submit" disabled={saving} className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground font-semibold flex items-center gap-2 disabled:opacity-60">
                                                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save
                                            </button>
                                        </div>
                                    </form>
                                </Modal>
                            }
                        />
                    </motion.div>
                )}

                {/* ── Skills ── */}
                {activeTab === "skills" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <CrudSection
                            title="Skills" icon={Code2} items={skills} loading={dataLoading}
                            onAdd={() => openAdd("skills")}
                            onEdit={(item) => openEdit("skills", item)}
                            onDelete={(id) => setDeleteConfirm({ type: "skills", id })}
                            emptyMsg="No skills yet."
                            renderItem={(item) => (
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-foreground text-sm">{item.name as string}</span>
                                    <span className="text-xs text-muted-foreground">{item.category as string}</span>
                                </div>
                            )}
                            renderForm={
                                <Modal open={modal?.type === "skills"} onClose={() => setModal(null)} title={modal?.item ? "Edit Skill" : "Add Skill"}>
                                    <form onSubmit={(e) => handleSave(e, "skills", () => ({ ...formData, level: Number(formData.level || 0) }))} className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <FormField label="Skill Name" name="name" value={formData.name || ""} onChange={handleFieldChange} required placeholder="Python" />
                                            <FormField label="Category" name="category" value={formData.category || ""} onChange={handleFieldChange} placeholder="Programming" />
                                            <FormField label="Level (0-100)" name="level" value={formData.level || ""} onChange={handleFieldChange} type="number" placeholder="85" />
                                            <FormField label="Icon" name="icon" value={formData.icon || ""} onChange={handleFieldChange} placeholder="🗺️" />
                                        </div>
                                        <div className="flex justify-end gap-3 pt-2">
                                            <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:bg-secondary/60 transition-all">Cancel</button>
                                            <button type="submit" disabled={saving} className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground font-semibold flex items-center gap-2 disabled:opacity-60">
                                                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save
                                            </button>
                                        </div>
                                    </form>
                                </Modal>
                            }
                        />
                    </motion.div>
                )}

                {/* ── Awards ── */}
                {activeTab === "awards" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <CrudSection
                            title="Awards" icon={Award} items={awards} loading={dataLoading}
                            onAdd={() => openAdd("awards", { section: "innovation", order: "0" })}
                            onEdit={(item) => openEdit("awards", item)}
                            onDelete={(id) => setDeleteConfirm({ type: "awards", id })}
                            emptyMsg="No awards yet."
                            renderItem={(item) => (
                                <div className="flex items-start gap-3">
                                    {item.imageUrl ? (
                                        <img
                                            src={item.imageUrl as string}
                                            alt={item.title as string}
                                            className="w-14 h-14 rounded-lg object-cover shrink-0 border border-border"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center shrink-0 border border-border">
                                            <Award className="w-5 h-5 text-muted-foreground/40" />
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="font-semibold text-foreground text-sm">{item.title as string}</span>
                                            <span className="px-1.5 py-0.5 text-[10px] bg-primary/10 text-primary rounded font-mono uppercase">
                                                {item.section as string}
                                            </span>
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {[item.organization, item.year].filter(Boolean).join(" · ")}
                                        </div>
                                        {item.tag && <span className="text-[10px] text-muted-foreground border border-border/60 rounded-full px-2 py-0.5 mt-1 inline-block">{item.tag as string}</span>}
                                    </div>
                                </div>
                            )}
                            renderForm={
                                <Modal open={modal?.type === "awards"} onClose={() => setModal(null)} title={modal?.item ? "Edit Award" : "Add Award"}>
                                    <form onSubmit={(e) => handleSave(e, "awards", () => ({
                                        ...formData,
                                        order: Number(formData.order || 0),
                                    }))} className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Section</label>
                                            <select
                                                value={formData.section || "innovation"}
                                                onChange={(e) => handleFieldChange("section", e.target.value)}
                                                className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all"
                                            >
                                                <option value="innovation">💡 Innovation & Startup</option>
                                                <option value="engineering">🏗️ Engineering & Tech</option>
                                                <option value="leadership">🗣️ Leadership & Debate</option>
                                            </select>
                                        </div>

                                        <FormField label="Title" name="title" value={formData.title || ""} onChange={handleFieldChange} required placeholder="Best Thesis" />

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <FormField label="Organization" name="organization" value={formData.organization || ""} onChange={handleFieldChange} placeholder="CUET" />
                                            <FormField label="Year" name="year" value={formData.year || ""} onChange={handleFieldChange} placeholder="2023" />
                                        </div>
                                        <FormField label="Description" name="description" value={formData.description || ""} onChange={handleFieldChange} type="textarea" placeholder="Brief info..." />

                                        <div className="space-y-2">
                                            <FormField label="Image URL" name="imageUrl" value={formData.imageUrl || ""} onChange={handleFieldChange} placeholder="https://example.com/award.jpg" />
                                            {formData.imageUrl && (
                                                <div className="relative rounded-lg overflow-hidden border border-border h-40 bg-secondary/40">
                                                    <img
                                                        src={formData.imageUrl}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <FormField label="Tag" name="tag" value={formData.tag || ""} onChange={handleFieldChange} placeholder="First Place" />
                                            <FormField label="Display Order" name="order" value={formData.order || "0"} onChange={handleFieldChange} type="number" />
                                        </div>
                                        <FormField label="Reference Link" name="link" value={formData.link || ""} onChange={handleFieldChange} placeholder="https://..." />

                                        <div className="flex justify-end gap-3 pt-2">
                                            <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:bg-secondary/60 transition-all">Cancel</button>
                                            <button type="submit" disabled={saving} className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground font-semibold flex items-center gap-2 disabled:opacity-60">
                                                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save
                                            </button>
                                        </div>
                                    </form>
                                </Modal>
                            }
                        />
                    </motion.div>
                )}

                {/* ── Publications ── */}
                {activeTab === "publications" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <CrudSection
                            title="Publications" icon={BookOpen} items={publications} loading={dataLoading}
                            onAdd={() => openAdd("publications")}
                            onEdit={(item) => openEdit("publications", item)}
                            onDelete={(id) => setDeleteConfirm({ type: "publications", id })}
                            emptyMsg="No publications yet."
                            renderItem={(item) => (
                                <div className="font-semibold text-foreground text-sm">{item.title as string}</div>
                            )}
                            renderForm={
                                <Modal open={modal?.type === "publications"} onClose={() => setModal(null)} title={modal?.item ? "Edit Publication" : "Add Publication"}>
                                    <form onSubmit={(e) => handleSave(e, "publications", () => formData)} className="space-y-4">
                                        <FormField label="Title" name="title" value={formData.title || ""} onChange={handleFieldChange} required placeholder="Paper title" />
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <FormField label="Journal" name="journal" value={formData.journal || ""} onChange={handleFieldChange} placeholder="Nature Water" />
                                            <FormField label="Year" name="year" value={formData.year || ""} onChange={handleFieldChange} placeholder="2024" />
                                            <FormField label="Authors" name="authors" value={formData.authors || ""} onChange={handleFieldChange} placeholder="Islam A." />
                                            <FormField label="DOI" name="doi" value={formData.doi || ""} onChange={handleFieldChange} placeholder="10.1000/..." />
                                        </div>
                                        <FormField label="Abstract" name="abstract" value={formData.abstract || ""} onChange={handleFieldChange} type="textarea" />
                                        <div className="flex justify-end gap-3 pt-2">
                                            <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:bg-secondary/60 transition-all">Cancel</button>
                                            <button type="submit" disabled={saving} className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground font-semibold flex items-center gap-2 disabled:opacity-60">
                                                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save
                                            </button>
                                        </div>
                                    </form>
                                </Modal>
                            }
                        />
                    </motion.div>
                )}

                {/* ── Research ── */}
                {activeTab === "research" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <CrudSection
                            title="Research" icon={FlaskConical} items={research} loading={dataLoading}
                            onAdd={() => openAdd("research")}
                            onEdit={(item) => openEdit("research", item)}
                            onDelete={(id) => setDeleteConfirm({ type: "research", id })}
                            emptyMsg="No research entries yet."
                            renderItem={(item) => (
                                <div className="font-semibold text-foreground text-sm">{item.title as string}</div>
                            )}
                            renderForm={
                                <Modal open={modal?.type === "research"} onClose={() => setModal(null)} title={modal?.item ? "Edit Research" : "Add Research"}>
                                    <form onSubmit={(e) => handleSave(e, "research", () => ({
                                        ...withArrayFields(["tags"]),
                                        order: Number(formData.order || 0)
                                    }))} className="space-y-4">
                                        <FormField label="Title" name="title" value={formData.title || ""} onChange={handleFieldChange} required placeholder="Research title" />
                                        <FormField label="Description" name="description" value={formData.description || ""} onChange={handleFieldChange} type="textarea" />
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</label>
                                                <select
                                                    value={formData.status || "ongoing"}
                                                    onChange={(e) => handleFieldChange("status", e.target.value)}
                                                    className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all"
                                                >
                                                    <option value="ongoing">Ongoing</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="planned">Planned</option>
                                                </select>
                                            </div>
                                            <FormField label="Tags (comma separated)" name="tags" value={formData.tags || ""} onChange={handleFieldChange} placeholder="GIS, Hydrology" />
                                            <FormField label="Link" name="link" value={formData.link || ""} onChange={handleFieldChange} placeholder="https://..." />
                                            <FormField label="Display Order" name="order" value={formData.order || "0"} onChange={handleFieldChange} type="number" />
                                        </div>
                                        <div className="flex justify-end gap-3 pt-2">
                                            <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:bg-secondary/60 transition-all">Cancel</button>
                                            <button type="submit" disabled={saving} className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground font-semibold flex items-center gap-2 disabled:opacity-60">
                                                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save
                                            </button>
                                        </div>
                                    </form>
                                </Modal>
                            }
                        />
                    </motion.div>
                )}

                {/* ── Community ── */}
                {activeTab === "community" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <CrudSection
                            title="Community Contribution" icon={HeartHandshake}
                            items={communityItems as unknown as Item[]} loading={dataLoading}
                            onAdd={() => openAdd("community", { section: "humanitarian", order: "0" })}
                            onEdit={(item) => openEdit("community", item)}
                            onDelete={(id) => setDeleteConfirm({ type: "community", id })}
                            emptyMsg="No community items yet. Add your first entry!"
                            renderItem={(item) => (
                                <div className="flex items-start gap-3">
                                    {/* Thumbnail */}
                                    {item.imageUrl ? (
                                        <img
                                            src={item.imageUrl as string}
                                            alt={item.title as string}
                                            className="w-14 h-14 rounded-lg object-cover shrink-0 border border-border"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center shrink-0 border border-border">
                                            <ImageOff className="w-5 h-5 text-muted-foreground/40" />
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="font-semibold text-foreground text-sm">{item.title as string}</span>
                                            <span className="px-1.5 py-0.5 text-[10px] bg-primary/10 text-primary rounded font-mono">
                                                {item.section as string}
                                            </span>
                                        </div>
                                        {item.tag && <span className="text-[10px] text-muted-foreground border border-border/60 rounded-full px-2 py-0.5">{item.tag as string}</span>}
                                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{item.description as string}</p>
                                    </div>
                                </div>
                            )}
                            renderForm={
                                <Modal open={modal?.type === "community"} onClose={() => setModal(null)} title={modal?.item ? "Edit Community Item" : "Add Community Item"}>
                                    <form
                                        onSubmit={(e) => handleSave(e, "community", () => ({
                                            ...formData,
                                            order: Number(formData.order || 0),
                                        }))}
                                        className="space-y-4"
                                    >
                                        {/* Section selector */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Section</label>
                                            <select
                                                value={formData.section || "humanitarian"}
                                                onChange={(e) => handleFieldChange("section", e.target.value)}
                                                className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all"
                                            >
                                                <option value="humanitarian">❤️ Humanitarian Work</option>
                                                <option value="startup">🚀 Startup Ecosystem</option>
                                                <option value="university">🎓 University &amp; Club</option>
                                            </select>
                                        </div>

                                        <FormField label="Title" name="title" value={formData.title || ""} onChange={handleFieldChange} required placeholder="e.g. COVID-19 Oxygen Fund" />
                                        <FormField label="Description" name="description" value={formData.description || ""} onChange={handleFieldChange} type="textarea" placeholder="Brief description of the initiative..." />

                                        {/* Image URL with preview */}
                                        <div className="space-y-2">
                                            <FormField label="Image URL" name="imageUrl" value={formData.imageUrl || ""} onChange={handleFieldChange} placeholder="https://example.com/photo.jpg" />
                                            {formData.imageUrl && (
                                                <div className="relative rounded-lg overflow-hidden border border-border h-40 bg-secondary/40">
                                                    <img
                                                        src={formData.imageUrl}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground pointer-events-none">
                                                        Preview
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <FormField label="Tag / Category" name="tag" value={formData.tag || ""} onChange={handleFieldChange} placeholder="e.g. Healthcare" />
                                            <FormField label="Display Order" name="order" value={formData.order || "0"} onChange={handleFieldChange} type="number" placeholder="0" />
                                        </div>

                                        <FormField label="Link / Reference URL" name="link" value={formData.link || ""} onChange={handleFieldChange} placeholder="https://example.com/reference" />

                                        <div className="flex justify-end gap-3 pt-2">
                                            <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:bg-secondary/60 transition-all">Cancel</button>
                                            <button type="submit" disabled={saving} className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground font-semibold flex items-center gap-2 disabled:opacity-60">
                                                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save
                                            </button>
                                        </div>
                                    </form>
                                </Modal>
                            }
                        />
                    </motion.div>
                )}
            </main>

            {/* Delete Confirm Dialog */}
            {
                deleteConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative z-10 glass-card p-6 w-full max-w-sm"
                        >
                            <h3 className="font-bold text-foreground text-lg mb-2">Confirm Delete</h3>
                            <p className="text-muted-foreground text-sm mb-6">This action cannot be undone.</p>
                            <div className="flex gap-3 justify-end">
                                <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:bg-secondary/60 transition-all">Cancel</button>
                                <button
                                    onClick={() => handleDelete(deleteConfirm.type, deleteConfirm.id)}
                                    className="px-4 py-2 text-sm rounded-lg bg-destructive text-destructive-foreground font-semibold flex items-center gap-2"
                                >
                                    <Trash2 className="w-3.5 h-3.5" /> Delete
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )
            }
        </div >
    );
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "http://localhost:8080", credentials: true }));
app.use(express.json());

// ─── MongoDB Connection ────────────────────────────────────────────────────
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB error:", err));

// ─── Schemas ───────────────────────────────────────────────────────────────
const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    tags: [String],
    link: String,
    github: String,
    image: String,
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const ExperienceSchema = new mongoose.Schema({
    role: String,
    company: String,
    period: String,
    description: String,
    points: [String],
    skills: [String],
    current: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
});

const SkillSchema = new mongoose.Schema({
    name: String,
    category: String,
    level: { type: Number, min: 0, max: 100 },
    icon: String,
});

const AwardSchema = new mongoose.Schema({
    title: String,
    organization: String,
    year: String,
    description: String,
});

const PublicationSchema = new mongoose.Schema({
    title: String,
    journal: String,
    year: String,
    authors: String,
    doi: String,
    abstract: String,
});

const ResearchSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: { type: String, enum: ["ongoing", "completed", "planned"], default: "ongoing" },
    tags: [String],
    image: String,
});

const AboutSchema = new mongoose.Schema({
    name: String,
    title: String,
    bio: String,
    location: String,
    email: String,
    linkedin: String,
    github: String,
    scholar: String,
    phone: String,
    avatar: String,
});

// ─── Models ────────────────────────────────────────────────────────────────
const Admin = mongoose.model("Admin", AdminSchema);
const Project = mongoose.model("Project", ProjectSchema);
const Experience = mongoose.model("Experience", ExperienceSchema);
const Skill = mongoose.model("Skill", SkillSchema);
const Award = mongoose.model("Award", AwardSchema);
const Publication = mongoose.model("Publication", PublicationSchema);
const Research = mongoose.model("Research", ResearchSchema);
const About = mongoose.model("About", AboutSchema);

// ─── Auth Middleware ───────────────────────────────────────────────────────
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
    try {
        req.admin = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
};

// ─── Seed Admin ────────────────────────────────────────────────────────────
async function seedAdmin() {
    const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existing) {
        const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        await Admin.create({ email: process.env.ADMIN_EMAIL, password: hashed });
        console.log("✅ Admin account created");
    }
}

// ─── Auth Routes ───────────────────────────────────────────────────────────
app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: "24h" });
    res.json({ token, email: admin.email });
});

app.get("/api/auth/verify", auth, (req, res) => {
    res.json({ valid: true, email: req.admin.email });
});

// ─── CRUD Factory ──────────────────────────────────────────────────────────
function crudRoutes(router, Model, path) {
    // Public GET all
    router.get(`/api/${path}`, async (req, res) => {
        try {
            const items = await Model.find().sort({ createdAt: -1 });
            res.json(items);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    });

    // Public GET one
    router.get(`/api/${path}/:id`, async (req, res) => {
        try {
            const item = await Model.findById(req.params.id);
            if (!item) return res.status(404).json({ message: "Not found" });
            res.json(item);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    });

    // Admin CREATE
    router.post(`/api/${path}`, auth, async (req, res) => {
        try {
            const item = await Model.create(req.body);
            res.status(201).json(item);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    });

    // Admin UPDATE
    router.put(`/api/${path}/:id`, auth, async (req, res) => {
        try {
            const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!item) return res.status(404).json({ message: "Not found" });
            res.json(item);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    });

    // Admin DELETE
    router.delete(`/api/${path}/:id`, auth, async (req, res) => {
        try {
            await Model.findByIdAndDelete(req.params.id);
            res.json({ message: "Deleted successfully" });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    });
}

// ─── Register CRUD Routes ─────────────────────────────────────────────────
crudRoutes(app, Project, "projects");
crudRoutes(app, Experience, "experiences");
crudRoutes(app, Skill, "skills");
crudRoutes(app, Award, "awards");
crudRoutes(app, Publication, "publications");
crudRoutes(app, Research, "research");

// About – single document
app.get("/api/about", async (req, res) => {
    try {
        const about = await About.findOne();
        res.json(about || {});
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});
app.put("/api/about", auth, async (req, res) => {
    try {
        const about = await About.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(about);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

// ─── Health ────────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// ─── Start ────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await seedAdmin();
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

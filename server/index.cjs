const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
// Allow CORS for local dev and the production Vercel domain
app.use(cors());
app.use(express.json());

// Startup check for Env Vars
if (!process.env.MONGODB_URI) {
    console.error("CRITICAL: MONGODB_URI is not defined in environment variables!");
}
if (!process.env.JWT_SECRET) {
    console.error("CRITICAL: JWT_SECRET is not defined in environment variables!");
}

// ─── MongoDB Connection ────────────────────────────────────────────────────
let isConnected = false;
async function connectDB() {
    if (isConnected && mongoose.connection.readyState === 1) return;
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = db.connections[0].readyState === 1;
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ MongoDB error:", err);
        throw err;
    }
}

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
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const ExperienceSchema = new mongoose.Schema({
    role: String,
    company: String,
    period: String,
    startDate: { type: Date }, // Added for accurate sorting
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
    section: { type: String, enum: ["innovation", "engineering", "leadership"], default: "innovation" },
    title: { type: String, required: true },
    organization: String,
    year: String,
    description: String,
    imageUrl: String,
    tag: String,
    link: String,
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
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

const CommunityItemSchema = new mongoose.Schema({
    section: { type: String, enum: ["humanitarian", "startup", "university"], required: true },
    title: { type: String, required: true },
    description: String,
    imageUrl: String,
    tag: String,
    link: String,
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
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
const CommunityItem = mongoose.model("CommunityItem", CommunityItemSchema);

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
    await connectDB(); // Ensure DB is connected before seeding
    const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existing) {
        const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        await Admin.create({ email: process.env.ADMIN_EMAIL, password: hashed });
        console.log("✅ Admin account created");
    }
}

// ─── Auth Routes ───────────────────────────────────────────────────────────
app.post("/api/auth/login", async (req, res) => {
    try {
        await connectDB();
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: "Invalid credentials" });
        const match = await bcrypt.compare(password, admin.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.json({ token, email: admin.email });
    } catch (err) {
        res.status(500).json({ message: "Auth error: " + err.message });
    }
});

app.get("/api/auth/verify", auth, (req, res) => {
    res.json({ valid: true, email: req.admin.email });
});

// ─── CRUD Factory ──────────────────────────────────────────────────────────
function crudRoutes(router, Model, path, defaultSort = { createdAt: -1 }) {
    // Public GET all
    router.get(`/api/${path}`, async (req, res) => {
        try {
            await connectDB();
            const items = await Model.find().sort(defaultSort);
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
crudRoutes(app, Project, "projects", { createdAt: -1 });
crudRoutes(app, Experience, "experiences", { startDate: -1 });
crudRoutes(app, Skill, "skills", { category: 1, level: -1 });
crudRoutes(app, Award, "awards", { order: 1, createdAt: -1 });
crudRoutes(app, Publication, "publications", { year: -1 });
crudRoutes(app, Research, "research", { status: 1 });
crudRoutes(app, CommunityItem, "community", { order: 1, createdAt: -1 });

// About – single document
app.get("/api/about", async (req, res) => {
    try {
        await connectDB();
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

// Export the app for Vercel
module.exports = app;

if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, async () => {
        await seedAdmin();
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
} else {
    // In serverless environments, we still want to ensure admin exists
    mongoose.connection.once('open', async () => {
        await seedAdmin();
    });
}

import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const ProjectSchema = new mongoose.Schema({ title: String, description: String, tags: [String], link: String, github: String, featured: { type: Boolean, default: false } });
const ExperienceSchema = new mongoose.Schema({ role: String, company: String, period: String, description: String, points: [String], skills: [String], current: { type: Boolean, default: false } });
const SkillSchema = new mongoose.Schema({ name: String, category: String, level: Number, icon: String });
const AwardSchema = new mongoose.Schema({ title: String, organization: String, year: String, description: String });
const ResearchSchema = new mongoose.Schema({ title: String, description: String, status: String, tags: [String] });
const AboutSchema = new mongoose.Schema({ name: String, title: String, bio: String, location: String, email: String, linkedin: String, github: String, scholar: String, phone: String, education: String, languages: String });

const Project = mongoose.model("Project", ProjectSchema);
const Experience = mongoose.model("Experience", ExperienceSchema);
const Skill = mongoose.model("Skill", SkillSchema);
const Award = mongoose.model("Award", AwardSchema);
const Research = mongoose.model("Research", ResearchSchema);
const About = mongoose.model("About", AboutSchema);

async function seed() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Skill.deleteMany({});
    await Award.deleteMany({});
    await Research.deleteMany({});
    await About.deleteMany({});

    // 1. About
    await About.create({
        name: "Aminul Islam",
        title: "Bridging Engineering & Innovation",
        bio: "Water Resources Engineering graduate with knowledge in hydraulics, hydrology, structures, geotechnical, and environmental engineering. Skilled in leadership, teamwork, and problem solving with strong computer-based and technical expertise. Co-founder & CEO of Todvob Ltd, an AI-driven SaaS startup.",
        location: "Bandar Chattogram, Bangladesh",
        email: "aminul@todvob.com",
        phone: "01626-180555",
        linkedin: "https://linkedin.com/in/aminulroqib",
        github: "https://github.com/aminulislam",
        scholar: "https://scholar.google.com/citations?user=...",
        education: "BSc(Eng.) Water Resources Engineering, CUET",
        languages: "Bangla (Native), English (Professional), Hindi/Urdu"
    });

    // 2. Projects
    await Project.create([
        {
            title: "Todvob Ltd",
            description: "AI-driven SaaS product with 300+ monthly active users and 64+ paying customers. Recipient of Microsoft for Startups grant. Best Pitch in Cohort-4 Accelerating Bangladesh.",
            tags: ["SaaS", "AI", "Startup"],
            featured: true
        },
        {
            title: "Robotry Bangladesh",
            description: "Robotics and AI STEM education for school-level students (classes 6–10). Designed curriculum combining theory with hands-on robotics projects. Received iDEA Project Grant from ICT Division.",
            tags: ["Robotics", "Education", "STEM"],
            featured: false
        },
        {
            title: "Chittagong Student Forum Platform",
            description: "Built the Membership Directory and Connectivity Platform (csfcuet.org) for CSF CUET chapter.",
            tags: ["Web Dev", "React", "Community"],
            link: "https://csfcuet.org",
            featured: false
        }
    ]);

    // 3. Experience
    await Experience.create([
        {
            role: "Co-founder & CEO",
            company: "Todvob Ltd",
            period: "10/2023 – Present",
            description: "Building and scaling AI-driven SaaS products.",
            points: [
                "Building and scaling AI-driven SaaS products",
                "300+ monthly active users, 64+ paying customers",
                "Microsoft for Startups grant recipient",
                "Best Pitch – Accelerating Bangladesh Cohort-4"
            ],
            skills: ["AI", "SaaS", "Leadership"],
            current: true
        },
        {
            role: "Co-founder & CTO",
            company: "Robotry Bangladesh",
            period: "12/2022 – 12/2024",
            description: "Robotics & AI STEM education for school-level students.",
            points: [
                "Robotics & AI STEM education for classes 6–10",
                "Curriculum development with hands-on robotics projects",
                "Scaled programs across multiple schools",
                "Received iDEA Project Grant – ICT Division"
            ],
            skills: ["Robotics", "Education", "Python"],
            current: false
        },
        {
            role: "Web Developer",
            company: "Blendin",
            period: "03/2022 – 01/2023",
            description: "WordPress development, theme/plugin integration.",
            points: [
                "WordPress development, theme/plugin integration",
                "Built responsive, user-friendly websites",
                "UI/UX design for engaging digital experiences"
            ],
            skills: ["WordPress", "UI/UX", "JavaScript"],
            current: false
        }
    ]);

    // 4. Skills
    await Skill.create([
        { name: "QGIS", category: "Earth", level: 85, icon: "🗺️" },
        { name: "HEC-RAS", category: "Earth", level: 80, icon: "🌊" },
        { name: "ArcGIS", category: "Earth", level: 75, icon: "📡" },
        { name: "Remote Sensing", category: "Earth", level: 70, icon: "🛰️" },
        { name: "AutoCAD", category: "Earth", level: 75, icon: "📐" },
        { name: "Next.js", category: "Web", level: 85, icon: "⚡" },
        { name: "React", category: "Web", level: 90, icon: "⚛️" },
        { name: "Python", category: "Web", level: 80, icon: "🐍" },
        { name: "JavaScript", category: "Web", level: 85, icon: "✨" },
        { name: "MongoDB", category: "Web", level: 75, icon: "🍃" }
    ]);

    // 5. Awards
    await Award.create([
        { title: "Best Pitch Award – Accelerating Bangladesh (Cohort-4)" },
        { title: "2nd Runner UP – Intra CUET Concrete Solutions Competition 2022" },
        { title: "iDEA Project Innovation Grant 2023 – ICT Division" },
        { title: "Tech Transformer Award – Tally MSME Honours' for Bangladesh 2023" },
        { title: "Best Speaker – Prothom Alo Tarunno Utshob 2017" },
        { title: "Champion – Prothom Alo Tarunno Utshob 2014" },
        { title: "Extempore Speech Award – Marks All Rounder 2014" },
        { title: "Award of Success 2014 – Drishty Chittagong School of Debate" }
    ]);

    // 6. Research
    await Research.create([
        {
            title: "Drought Assessment",
            description: "Comprehensive analysis of 25 years of drought patterns using remote sensing and GIS to understand climate impact on Bangladesh's agriculture.",
            status: "ongoing",
            tags: ["Remote Sensing", "GIS", "Climate Analysis"]
        },
        {
            title: "Brahmaputra Basin Delta Modeling",
            description: "Hydrological modeling of river basin dynamics using HEC-RAS and HEC-HMS for flood preparedness and water resource management.",
            status: "ongoing",
            tags: ["HEC-RAS", "HEC-HMS", "Hydrology"]
        },
        {
            title: "Google Earth Engine Applications",
            description: "Leveraging satellite imagery and cloud computing for large-scale environmental monitoring and geospatial analysis.",
            status: "ongoing",
            tags: ["Google Earth Engine", "Python", "Geospatial"]
        }
    ]);

    console.log("✅ Seeding complete!");
    process.exit();
}

seed().catch(err => { console.error(err); process.exit(1); });

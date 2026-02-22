import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const ProjectSchema = new mongoose.Schema({ title: String, description: String, tags: [String], link: String, github: String, featured: { type: Boolean, default: false } });
const ExperienceSchema = new mongoose.Schema({ role: String, company: String, period: String, description: String, skills: [String], current: { type: Boolean, default: false } });
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

    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Skill.deleteMany({});
    await Award.deleteMany({});
    await Research.deleteMany({});
    await About.deleteMany({});

    await About.create({
        name: "Aminul Islam",
        title: "Bridging Engineering & Innovation",
        bio: "Water Resources Engineering graduate with knowledge in hydraulics, hydrology, structures, geotechnical, and environmental engineering.",
        location: "Bandar Chattogram, Bangladesh",
        email: "aminul@todvob.com",
        phone: "01626-180555",
        linkedin: "https://linkedin.com/in/aminulroqib",
        github: "https://github.com/aminulislam",
        scholar: "https://scholar.google.com/citations?user=...",
        education: "BSc(Eng.) Water Resources Engineering, CUET",
        languages: "Bangla (Native), English (Professional), Hindi/Urdu"
    });

    await Project.create([
        { title: "Todvob Ltd", description: "AI-driven SaaS product with 300+ monthly active users and 64+ paying customers.", tags: ["SaaS", "AI", "Startup"], featured: true },
        { title: "Robotry Bangladesh", description: "Robotics and AI STEM education for school-level students.", tags: ["Robotics", "Education", "STEM"] }
    ]);

    await Experience.create([
        { role: "Co-founder & CEO", company: "Todvob Ltd", period: "10/2023 – Present", description: "Building and scaling AI-driven SaaS products. Microsoft for Startups grant recipient.", skills: ["AI", "SaaS", "Leadership"], current: true }
    ]);

    console.log("✅ Seeding complete!");
    process.exit();
}

seed().catch(err => { console.error(err); process.exit(1); });

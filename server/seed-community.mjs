import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

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

const CommunityItem = mongoose.models.CommunityItem ||
    mongoose.model("CommunityItem", CommunityItemSchema);

/* ─── Seed data ────────────────────────────────────────────────────────── */
const items = [

    /* ── HUMANITARIAN ── */
    {
        section: "humanitarian",
        title: "COVID-19 Emergency Oxygen Fund",
        description:
            "Established a 700K BDT fund through Shebok Chattogram to provide free emergency oxygen cylinders to COVID-19 patients across Chattogram during the peak of the pandemic.",
        tag: "Healthcare",
        link: "",
        imageUrl: "",
        order: 1,
    },
    {
        section: "humanitarian",
        title: "Free Food for 1000+ People",
        description:
            "Coordinated large-scale free food distribution projects for over 1,000 people during and after COVID-19, ensuring vulnerable communities had access to daily meals.",
        tag: "Food Security",
        link: "",
        imageUrl: "",
        order: 2,
    },
    {
        section: "humanitarian",
        title: "Emergency Flood Relief – Aug 2024",
        description:
            "Led emergency flood relief operations in August 2024 across Feni, Cumilla, and Fatikchari, delivering essentials to thousands of displaced families in severely affected regions.",
        tag: "Disaster Relief",
        link: "",
        imageUrl: "",
        order: 3,
    },
    {
        section: "humanitarian",
        title: "Winter Help Project 2021",
        description:
            "Organised a large-scale winter clothing and blanket drive reaching vulnerable communities in Chattogram during the cold season of 2021.",
        tag: "Community Care",
        link: "",
        imageUrl: "",
        order: 4,
    },
    {
        section: "humanitarian",
        title: "Winter Help Project 2022",
        description:
            "Continued the winter help initiative in 2022, expanding outreach and distributing warm clothing, blankets, and essentials to underprivileged families across Chattogram.",
        tag: "Community Care",
        link: "",
        imageUrl: "",
        order: 5,
    },
    {
        section: "humanitarian",
        title: "Shebok Chattogram – Founded & Led",
        description:
            "Founded and led Shebok Chattogram as President since March 2020, building a rapid-response volunteer network dedicated to humanitarian crises across the Chattogram region.",
        tag: "Leadership",
        link: "",
        imageUrl: "",
        order: 6,
    },

    /* ── STARTUP ECOSYSTEM ── */
    {
        section: "startup",
        title: "Startup Association of Bangladesh (SAB)",
        description:
            "Serving as General Secretary of SAB since August 2025, driving national startup ecosystem development, policy reform, and advocacy to empower early-stage founders.",
        tag: "Policy Advocacy",
        link: "",
        imageUrl: "",
        order: 1,
    },
    {
        section: "startup",
        title: "Stakeholder & Investor Engagement",
        description:
            "Facilitating structured dialogue between government bodies, angel investors, VC funds, and startup accelerators to align Bangladesh's startup ecosystem goals.",
        tag: "Networking",
        link: "",
        imageUrl: "",
        order: 2,
    },
    {
        section: "startup",
        title: "Todvob – Appsumo Select Product",
        description:
            "Co-founded Todvob, a SaaS product that was selected as an Appsumo Select product — a milestone validating its market fit among 1M+ global buyers on the Appsumo marketplace.",
        tag: "Product",
        link: "https://appsumo.com/products/todvob/",
        imageUrl: "",
        order: 3,
    },
    {
        section: "startup",
        title: "Founder Mentorship & Ecosystem Building",
        description:
            "Mentoring early-stage founders, connecting them with funding opportunities, and contributing to a sustainable startup support infrastructure across Bangladesh.",
        tag: "Mentorship",
        link: "",
        imageUrl: "",
        order: 4,
    },

    /* ── UNIVERSITY & CLUB ── */
    {
        section: "university",
        title: "Chittagong Student Forum – Joint General Secretary",
        description:
            "Served as Joint General Secretary of CSF CUET from June 2024 to June 2025. Built the Membership Directory & Connectivity Platform (csfcuet.org) and organised cultural and educational events.",
        tag: "Platform Building",
        link: "https://csfcuet.org",
        imageUrl: "",
        order: 1,
    },
    {
        section: "university",
        title: "ASCE Student Chapter CUET – Creative Secretary",
        description:
            "Designed creative assets for all digital and print media of ASCE CUET, and organised engineering field trips, technical seminars, and workshops for student members.",
        tag: "Engineering",
        link: "",
        imageUrl: "",
        order: 2,
    },
    {
        section: "university",
        title: "CCPC Debating Society – Founder & President",
        description:
            "Founded the Debating Club of Chattogram Cantonment Public College and served as President. Led the team to win the BTV Debate Competition and the Inter-Cantonment Debate Championship.",
        tag: "Public Speaking",
        link: "",
        imageUrl: "",
        order: 3,
    },
    {
        section: "university",
        title: "CCPC National Debate Fest 2017",
        description:
            "Organised the CCPC National Debate Fest 2017, a prestigious inter-college debate tournament that brought together teams from across Bangladesh for competitive discourse.",
        tag: "Event Organising",
        link: "",
        imageUrl: "",
        order: 4,
    },
];

/* ─── Run ──────────────────────────────────────────────────────────────── */
async function seed() {
    console.log("⏳  Connecting to MongoDB Atlas…");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅  Connected!\n");

    // Clear existing community items to avoid duplicates
    const deleted = await CommunityItem.deleteMany({});
    console.log(`🗑️   Cleared ${deleted.deletedCount} existing community item(s).`);

    // Insert all
    const inserted = await CommunityItem.insertMany(items);
    console.log(`\n✅  Seeded ${inserted.length} community items:\n`);

    const bySection = (s) => inserted.filter((i) => i.section === s);
    console.log(`  ❤️  Humanitarian : ${bySection("humanitarian").length} items`);
    console.log(`  🚀  Startup      : ${bySection("startup").length} items`);
    console.log(`  🎓  University   : ${bySection("university").length} items`);

    await mongoose.disconnect();
    console.log("\n🎉  Done! MongoDB is up to date.");
}

seed().catch((err) => {
    console.error("❌  Seed failed:", err.message);
    process.exit(1);
});

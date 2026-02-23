import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import ResearchSection from "@/components/ResearchSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AwardsSection from "@/components/AwardsSection";
import CertificationsSection from "@/components/CertificationsSection";
import LeadershipSection from "@/components/LeadershipSection";
import CommunityContributionSection from "@/components/CommunityContributionSection";
import SkillsSection from "@/components/SkillsSection";
import PublicationsSection from "@/components/PublicationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden scroll-smooth">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <ProjectsSection />
      <ExperienceSection />
      <ResearchSection />
      <AwardsSection />
      <CertificationsSection />
      <LeadershipSection />
      <CommunityContributionSection />
      <SkillsSection />
      <PublicationsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;

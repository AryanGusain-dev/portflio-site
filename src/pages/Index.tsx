
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import AchievementsSection from '../components/AchievementsSection';
import GallerySection from '../components/GallerySection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smoother initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-portfolio-bg-dark flex items-center justify-center z-50">
        <div className="text-4xl font-bold text-portfolio-accent-cyan animate-pulse">
          <span>AryanGusain</span>
          <span className="text-portfolio-text">.dev</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      {/* <AchievementsSection/> */}
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Github, Linkedin, FileText } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

const HeroSection = () => {
  const [text, setText] = useState('');
  const fullText = "Building the Future with AI and Designing";
  const textIndex = useRef(0);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    setText('');
    const typingEffect = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingEffect);
      }
    }, 100);

    return () => clearInterval(typingEffect);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-portfolio-accent-cyan mb-4 font-mono animate-fade-in-up">
            Hi, my name is
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-2 text-portfolio-text animate-fade-in-up">
            Aryan Gusain
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-portfolio-muted animate-fade-in-up">
            {text}<span className="opacity-0">.</span>
          </h2>
          <p className="text-lg text-portfolio-muted mb-10 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            A second-year BTech CSE (AI) student passionate about solving real-world problems with AI, full-stack development, and creative design.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <a href="#projects" className="btn-primary">
              Explore Projects
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <FileText size={16} />
              View Resume
            </a>
          </div>
          
          <div className="flex gap-4 justify-center mt-12 animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
            <a
              href="https://github.com/AryanGusain-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-portfolio-muted hover:text-portfolio-accent-cyan transition-colors duration-300"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/aryan-gusain-086664295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-portfolio-muted hover:text-portfolio-accent-cyan transition-colors duration-300"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-portfolio-accent-cyan"
        aria-label="Scroll down"
      >
        <ArrowDown size={24} />
      </button>
    </section>
  );
};

export default HeroSection;

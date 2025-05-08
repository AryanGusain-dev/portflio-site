import { useEffect, useRef } from 'react';
import { Code, BookOpen, Briefcase, Award } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the section has scrolled into view
      const scrollProgress = Math.min(
        Math.max(
          (windowHeight - rect.top) / (windowHeight * 0.7),
          0
        ),
        1
      );

      // Image animation (from upper left)
      if (imageRef.current) {
        const image = imageRef.current;
        const translateX = -100 + (scrollProgress * 100); // Move from -100% to 0%
        const translateY = -50 + (scrollProgress * 50); // Move from -50% to 0%
        const scale = 0.8 + (scrollProgress * 0.2); // Scale from 0.8 to 1
        const rotate = -5 + (scrollProgress * 5); // Rotate from -5deg to 0deg
        image.style.transform = `translate(${translateX}%, ${translateY}%) scale(${scale}) rotate(${rotate}deg)`;
        image.style.opacity = Math.min(scrollProgress * 1.5, 1).toString();
      }

      // Text animation (from upper right)
      if (textRef.current) {
        const text = textRef.current;
        const translateX = 100 - (scrollProgress * 100); // Move from 100% to 0%
        const translateY = -50 + (scrollProgress * 50); // Move from -50% to 0%
        text.style.transform = `translate(${translateX}%, ${translateY}%)`;
        text.style.opacity = Math.min(scrollProgress * 1.5, 1).toString();
      }

      // Skills animation (from upper right)
      if (skillsRef.current) {
        const skills = skillsRef.current.children;
        Array.from(skills).forEach((skill, index) => {
          const skillElement = skill as HTMLElement;
          const delay = index * 0.05;
          const skillProgress = Math.max(0, scrollProgress - delay);
          const translateX = 50 - (skillProgress * 50);
          const translateY = -30 + (skillProgress * 30);
          skillElement.style.transform = `translate(${translateX}%, ${translateY}%)`;
          skillElement.style.opacity = Math.min(skillProgress * 1.5, 1).toString();
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /*
  const timeline = [
    {
      year: '2024-2025',
      title: 'Graphic Design Internship',
      description: 'Contributed to 15% engagement increase and 20% faster workflows.',
      icon: <Briefcase size={20} />
    },
    {
      year: '2025',
      title: 'Winner, Hackathon',
      description: '1st place for AI-driven solution.',
      icon: <Award size={20} />
    },
    {
      year: '2025',
      title: 'Top 5% LeetCode Ranking',
      description: 'Solved 500+ problems focusing on DSA.',
      icon: <Code size={20} />
    },
    {
      year: '2026',
      title: 'BTech CSE (AI) Graduation',
      description: 'Specializing in AI and Machine Learning.',
      icon: <BookOpen size={20} />
    } 
  ];

  */
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 min-h-screen flex items-center bg-portfolio-bg-dark"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-1 lg:order-1 flex justify-center">
            <img
              ref={imageRef}
              src="/AryanGusain.png"
              alt="Aryan Gusain"
              className="rounded-xl shadow-lg w-72 h-72 object-cover transition-all duration-300"
              style={{ 
                width: "34rem", 
                height: "42rem",
                transform: 'translate(-100%, -50%) scale(0.8) rotate(-5deg)',
                opacity: '0'
              }}
            />
          </div>
          <div className="order-2 lg:order-2">
            <div 
              ref={textRef} 
              className="transition-all duration-300"
              style={{
                transform: 'translate(100%, -50%)',
                opacity: '0'
              }}
            >
              <h2 className="section-title">About Me</h2>
              <p className="text-lg mb-6 text-portfolio-muted">
                I'm a second-year BTech CSE (AI) student passionate about creating innovative solutions at the intersection of AI, full-stack development, and graphic design.
              </p>
              <p className="text-lg mb-6 text-portfolio-muted">
                My journey in tech has been driven by curiosity and a desire to build products that make a meaningful impact. I focus on developing AI systems that are both powerful and ethical, with a keen eye for design and user experience.
              </p>
              <p className="text-lg mb-8 text-portfolio-muted">
                I have experience in both front-end and back-end development, with a special interest in machine learning algorithms, ethical AI, and creating visually compelling interfaces that enhance user engagement.
              </p>
            </div>
            
            <div ref={skillsRef} className="grid grid-cols-2 gap-4 mb-8">
              {[
                'Python', 'JavaScript', 'React', 'TensorFlow', 'Node.js', 'Figma'
              ].map((skill, index) => (
                <div 
                  key={skill}
                  className="flex items-center gap-2 text-portfolio-muted transition-all duration-300"
                  style={{
                    transform: 'translate(50%, -30%)',
                    opacity: '0'
                  }}
                >
                  <span className="text-portfolio-accent-cyan">▹</span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

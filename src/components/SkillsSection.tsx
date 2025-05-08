import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Code, Terminal, Database, Brain, PaintBucket, Laptop, Wrench } from 'lucide-react';

const SkillCard = ({ 
  icon, 
  title, 
  skills,
  delay = 0,
  cardRef,
  index,
  isActive
}: { 
  icon: React.ReactNode; 
  title: string;
  skills: Array<{ name: string; level: number; description?: string }>;
  delay?: number;
  cardRef: React.RefObject<HTMLDivElement>;
  index: number;
  isActive: boolean;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      ref={cardRef}
      className={`
        min-w-[300px] md:min-w-[350px] h-[400px] 
        perspective-1000 cursor-pointer 
        transition-all duration-300 ease-out
        ${isActive ? 'scale-110' : 'scale-90 opacity-50'}
      `}
      style={{ 
        transitionDelay: `${delay}ms`,
      }}
      onClick={() => setIsFlipped(!isFlipped)}
      data-index={index}
    >
      <div className={`
        relative w-full h-full 
        transition-all duration-500 transform-style-3d 
        ${isFlipped ? 'rotate-y-180' : ''}
      `}>
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden card flex flex-col items-center justify-center p-8 transform-style-3d backdrop-blur-sm bg-portfolio-bg-light/80">
          <div className="text-portfolio-accent-cyan mb-6">{icon}</div>
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <div className="w-full space-y-4">
            {skills.slice(0, 3).map((skill, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-portfolio-muted">{skill.name}</span>
                  <span className="text-sm text-portfolio-accent-cyan">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress animate-slide-right" 
                    style={{ width: `${skill.level}%`, transitionDelay: `${index * 100}ms` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-portfolio-accent-cyan mt-4 absolute bottom-4">Click to see more</p>
        </div>
        
        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden card p-6 rotate-y-180 transform-style-3d overflow-y-auto hide-scrollbar backdrop-blur-sm bg-portfolio-bg-light/80">
          <h3 className="text-xl font-bold mb-4 text-portfolio-accent-cyan">{title} Details</h3>
          <ul className="space-y-3">
            {skills.map((skill, index) => (
              <li key={index} className="text-portfolio-muted">
                <span className="text-portfolio-text font-medium">{skill.name}</span> - {skill.description || `Proficiency: ${skill.level}%`}
              </li>
            ))}
          </ul>
          <p className="text-sm text-portfolio-accent-cyan mt-4 absolute bottom-4 right-6">Click to flip back</p>
        </div>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  
  const filters = [
    { id: 'all', label: 'All Skills' },
    { id: 'programming', label: 'Programming' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'design', label: 'Design' }
  ];
  
  const skills = [
    {
      id: 'programming',
      icon: <Code size={36} />,
      title: 'Programming',
      skills: [
        { name: 'Python', level: 90, description: 'Primary language for AI/ML development and backend' },
        { name: 'JavaScript', level: 85, description: 'Frontend and Node.js backend development' },
        { name: 'Java', level: 80, description: 'Android development and enterprise applications' },
        { name: 'C++', level: 75, description: 'Systems programming and data structures implementation' },
        { name: 'DSA', level: 95, description: 'Solved 500+ problems, Top 5% LeetCode ranking' }
      ]
    },
    {
      id: 'fullstack',
      icon: <Laptop size={36} />,
      title: 'Full Stack',
      skills: [
        { name: 'React', level: 85, description: 'Frontend framework for web applications' },
        { name: 'Node.js', level: 80, description: 'Backend JavaScript runtime' },
        { name: 'Express', level: 82, description: 'Web application framework for Node.js' },
        { name: 'MongoDB', level: 78, description: 'NoSQL database for web applications' },
        { name: 'Django', level: 75, description: 'Python web framework for backend development' }
      ]
    },
    {
      id: 'ai',
      icon: <Brain size={36} />,
      title: 'AI & ML',
      skills: [
        { name: 'TensorFlow', level: 85, description: 'Primary framework for ML model development' },
        { name: 'PyTorch', level: 80, description: 'Dynamic neural network library' },
        { name: 'NLP', level: 75, description: 'Natural language processing for chatbots and text analysis' },
        { name: 'Computer Vision', level: 78, description: 'Image recognition and processing algorithms' },
        { name: 'RPA', level: 70, description: 'Robotic Process Automation with UiPath' }
      ]
    },
    {
      id: 'design',
      icon: <PaintBucket size={36} />,
      title: 'Design',
      skills: [
        { name: 'Figma', level: 85, description: 'UI/UX design and prototyping' },
        { name: 'Adobe PS', level: 82, description: 'Photo editing and manipulation' },
        { name: 'Adobe Illustrator', level: 78, description: 'Vector graphics and branding' },
        { name: 'UI/UX', level: 80, description: 'Design thinking and user-centered solutions' },
        { name: 'Animation', level: 75, description: 'Motion graphics and interface animations' }
      ]
    },
    {
      id: 'tools',
      icon: <Wrench size={36} />,
      title: 'Tools',
      skills: [
        { name: 'Git', level: 88, description: 'Version control and collaboration' },
        { name: 'Docker', level: 80, description: 'Containerization for applications' },
        { name: 'AWS', level: 75, description: 'Cloud hosting and services' },
        { name: 'Firebase', level: 82, description: 'Backend as a service for web/mobile apps' },
        { name: 'CI/CD', level: 78, description: 'Continuous integration and deployment pipelines' }
      ]
    },
    {
      id: 'backend',
      icon: <Database size={36} />,
      title: 'Backend',
      skills: [
        { name: 'APIs', level: 85, description: 'RESTful and GraphQL API design' },
        { name: 'SQL', level: 80, description: 'PostgreSQL and MySQL database management' },
        { name: 'NoSQL', level: 82, description: 'MongoDB and Firebase Firestore' },
        { name: 'Server Admin', level: 75, description: 'Linux server management and deployment' },
        { name: 'Security', level: 78, description: 'Authentication, authorization, and data protection' }
      ]
    }
  ];
  
  const calculateActiveCard = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    let nearestDistance = Infinity;
    let nearestIndex = 0;

    cardRefs.current.forEach((cardRef, index) => {
      if (!cardRef) return;
      
      const cardRect = cardRef.getBoundingClientRect();
      const cardCenter = cardRect.left + (cardRect.width / 2);
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    if (nearestIndex !== activeCardIndex) {
      setActiveCardIndex(nearestIndex);
    }
  }, [activeCardIndex]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      scrollLeft: scrollContainerRef.current.scrollLeft
    };
    
    document.body.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;

    const dx = e.clientX - dragStartRef.current.x;
    const speed = 1.5; // Adjust this value to change scroll sensitivity
    scrollContainerRef.current.scrollLeft = dragStartRef.current.scrollLeft - (dx * speed);
    setIsScrolling(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = '';
    
    if (isScrolling) {
      setTimeout(() => {
        calculateActiveCard();
        setIsScrolling(false);
      }, 100);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    
    setIsDragging(true);
    dragStartRef.current = {
      x: e.touches[0].clientX,
      scrollLeft: scrollContainerRef.current.scrollLeft
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();

    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const speed = 1.5; // Adjust this value to change scroll sensitivity
    scrollContainerRef.current.scrollLeft = dragStartRef.current.scrollLeft - (dx * speed);
    setIsScrolling(true);
  };

  // Center the first card when filter changes
  const centerFirstFilteredCard = useCallback(() => {
    if (!scrollContainerRef.current) return;

    requestAnimationFrame(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const firstCard = cardRefs.current[0];
      if (!firstCard) return;

      const containerRect = container.getBoundingClientRect();
      const cardRect = firstCard.getBoundingClientRect();
      
      const scrollOffset = (cardRect.left - containerRect.left) + 
                          container.scrollLeft - 
                          (containerRect.width - cardRect.width) / 2;

      container.scrollTo({
        left: scrollOffset,
        behavior: 'smooth'
      });

      setActiveCardIndex(0);
    });
  }, []);

  // Handle filter change
  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setTimeout(centerFirstFilteredCard, 100);
  };

  // Get filtered skills
  const filteredSkills = useMemo(() => {
    return activeFilter === 'all' 
    ? skills 
    : skills.filter(skill => skill.id === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    centerFirstFilteredCard();
  }, [filteredSkills, centerFirstFilteredCard]);

  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) {
        calculateActiveCard();
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [calculateActiveCard, isScrolling]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 min-h-screen bg-portfolio-bg-light transition-all duration-700 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mx-auto">My Skills</h2>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12 mt-8">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-portfolio-accent-cyan text-portfolio-bg-dark'
                  : 'bg-portfolio-bg-dark text-portfolio-muted hover:text-portfolio-accent-cyan'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="relative">
          {/* Gradient indicators */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-portfolio-bg-light to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-portfolio-bg-light to-transparent z-10 pointer-events-none" />
          
          <div 
            ref={scrollContainerRef}
            className={`
              flex gap-8 overflow-x-auto hide-scrollbar py-12
              ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
              select-none
              relative
              scroll-smooth
              touch-pan-x
            `}
            style={{
              padding: '3rem calc(50% - 175px)'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
          {filteredSkills.map((skill, index) => (
            <SkillCard
              key={skill.id}
              icon={skill.icon}
              title={skill.title}
              skills={skill.skills}
              delay={index * 100}
                cardRef={(el) => (cardRefs.current[index] = el)}
                index={index}
                isActive={index === activeCardIndex}
              />
            ))}
          </div>
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {filteredSkills.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeCardIndex 
                  ? 'bg-portfolio-accent-cyan w-4' 
                  : 'bg-portfolio-bg-dark/30'
              }`}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const card = cardRefs.current[index];
                  if (card) {
                    const container = scrollContainerRef.current;
                    const containerRect = container.getBoundingClientRect();
                    const cardRect = card.getBoundingClientRect();
                    const scrollOffset = (cardRect.left - containerRect.left) + 
                                      container.scrollLeft - 
                                      (containerRect.width - cardRect.width) / 2;
                    
                    container.scrollTo({
                      left: scrollOffset,
                      behavior: 'smooth'
                    });
                    setActiveCardIndex(index);
                  }
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

// Add CSS to support 3D transforms
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .transform-style-3d {
    transform-style: preserve-3d;
  }
  
  .backface-hidden {
    backface-visibility: hidden;
  }
  
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
`;
document.head.appendChild(styleSheet);

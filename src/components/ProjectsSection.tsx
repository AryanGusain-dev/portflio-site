import { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Code, GitBranch, GitFork } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  details: string;
}

const projects: Project[] = [
  {
    id: 'echoverse',
    title: 'EchoVerse',
    description: 'AI platform for ethical digital legacy preservation',
    image: '/EchoVerse.jpg',
    tags: ['Python', 'TensorFlow', 'React', 'Node.js', 'MongoDB', 'Figma'],
    githubUrl: 'https://github.com/',
    demoUrl: 'https://demo.com/echoverse',
    featured: true,
    details: 'EchoVerse is an AI-powered platform that helps preserve digital legacies ethically. It uses natural language processing and deep learning algorithms to understand, categorize, and preserve digital content according to user preferences. The platform ensures ethical handling of personal data while creating meaningful digital memories for future generations.'
  },
  {
    id: 'aethernav',
    title: 'AetherNav',
    description: 'AI-powered smart glasses for the visually impaired',
    image: '/AetherNav.webp',
    tags: ['Python', 'PyTorch', 'Django', 'PostgreSQL', 'Raspberry Pi', 'Figma'],
    githubUrl: 'https://github.com/',
    demoUrl: 'https://demo.com/aethernav',
    featured: true,
    details: 'AetherNav is an innovative assistive technology project featuring AI-powered smart glasses designed to help visually impaired individuals navigate their surroundings. The system uses computer vision to detect obstacles, recognize faces, read text, and provide audio guidance. The project combines hardware (Raspberry Pi-based glasses) with sophisticated software (object detection and path-finding algorithms).'
  },
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot',
    description: 'A smart chatbot that answers questions using natural language processing.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Node.js', 'NLP'],
    githubUrl: 'https://github.com/',
    featured: false,
    details: 'This project demonstrates a conversational AI chatbot built with React and Node.js, leveraging NLP libraries for understanding user queries.'
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'A dashboard to display real-time weather data for any city.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    tags: ['Vue', 'API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/',
    featured: false,
    details: 'A responsive web app that fetches and displays weather data using a public API. Built with Vue and styled with Tailwind CSS.'
  },
  {
    id: 'task-manager',
    title: 'Task Manager',
    description: 'A simple and effective task management tool.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tags: ['Angular', 'Firebase', 'Productivity'],
    githubUrl: 'https://github.com/',
    featured: false,
    details: 'A productivity app to manage daily tasks, built with Angular and Firebase for real-time updates and authentication.'
  }
];

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
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
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="card group overflow-hidden opacity-0 translate-y-10 transition-all duration-700 h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden rounded-t-lg mb-4">
        <div className="absolute inset-0 bg-portfolio-accent-cyan/20 group-hover:opacity-0 transition-opacity duration-300"></div>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="text-xl font-bold mb-2 text-portfolio-text">{project.title}</h3>
      <p className="text-portfolio-muted mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.slice(0, 4).map((tag) => (
          <span 
            key={tag} 
            className="text-xs px-2 py-1 rounded-full bg-portfolio-bg-dark text-portfolio-accent-cyan"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className="text-xs px-2 py-1 rounded-full bg-portfolio-bg-dark text-portfolio-muted">
            +{project.tags.length - 4}
          </span>
        )}
      </div>
      <div className="flex justify-between items-center mt-auto">
        <div className="flex gap-3">
          <a 
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-portfolio-muted hover:text-portfolio-accent-cyan transition-colors duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={20} />
          </a>
          {project.demoUrl && (
            <a 
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-portfolio-muted hover:text-portfolio-accent-cyan transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
        <span className="text-portfolio-accent-cyan text-sm">View Details</span>
      </div>
    </div>
  );
};

const ProjectModal = ({ 
  project, 
  isOpen, 
  onClose 
}: { 
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!project) return null;
  
  return (
    <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="bg-portfolio-bg-light border border-portfolio-accent-cyan/30 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
        <div className="relative">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-64 object-cover object-center"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-portfolio-bg-dark/80 text-portfolio-text hover:text-portfolio-accent-cyan p-2 rounded-full transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-3 text-portfolio-text">{project.title}</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs px-2 py-1 rounded-full bg-portfolio-bg-dark text-portfolio-accent-cyan"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-portfolio-muted mb-6">{project.details}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Code size={18} className="text-portfolio-accent-cyan" />
              <span className="text-portfolio-muted">Main Languages: {project.tags.slice(0, 2).join(', ')}</span>
            </div>
            <div className="flex items-center gap-3">
              <GitBranch size={18} className="text-portfolio-accent-cyan" />
              <span className="text-portfolio-muted">Code Architecture: MVC</span>
            </div>
            <div className="flex items-center gap-3">
              <GitFork size={18} className="text-portfolio-accent-cyan" />
              <span className="text-portfolio-muted">Active Development</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Github size={16} /> View Source
            </a>
            {project.demoUrl && (
              <a 
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
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
  
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = (containerCenter - cardCenter) / containerRect.width;
        // Clamp the tilt to [-20deg, 20deg]
        const rotateY = Math.max(-20, Math.min(20, distance * 40));
        const scale = 0.9 + 0.1 * (1 - Math.abs(distance));
        card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) scale(${scale})`;
        card.style.transition = 'transform 0.4s cubic-bezier(.25,.8,.25,1)';
      });
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      // Initial call
      handleScroll();
    }
    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeProjectModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 min-h-screen bg-portfolio-bg-dark transition-all duration-700 opacity-0 translate-y-10"
    >
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mx-auto">Featured Projects</h2>
        
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto hide-scrollbar py-8 px-2"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="flex-shrink-0 w-[350px] h-[420px] mx-2 project-tilt-card"
                ref={el => (cardRefs.current[index] = el)}
              >
                <ProjectCard 
                  project={project} 
                  onClick={() => openProjectModal(project)} 
                />
              </div>
            ))}
          </div>
        </div>
        
        <ProjectModal 
          project={selectedProject} 
          isOpen={modalOpen} 
          onClose={closeProjectModal}
        />
      </div>
    </section>
  );
};

export default ProjectsSection;


import { useRef, useEffect } from 'react';
import { Award, CheckCircle, Star, Code, FileText } from 'lucide-react';

interface Achievement {
  icon: React.ReactNode;
  title: string;
  description: string;
  year: string;
}

const achievements: Achievement[] = [
  {
    icon: <Award size={24} />,
    title: 'Hackathon Winner 2026',
    description: '1st place for an AI-driven solution that addressed accessibility challenges for visually impaired users.',
    year: '2026'
  },
  {
    icon: <Award size={24} />,
    title: 'Hackathon Runner-Up 2025',
    description: '2nd place for developing a full-stack application that improved remote education accessibility.',
    year: '2025'
  },
  {
    icon: <Code size={24} />,
    title: 'Top 5% LeetCode Ranking',
    description: 'Solved over 500 LeetCode problems, focusing on data structures and algorithms.',
    year: '2025'
  },
  {
    icon: <FileText size={24} />,
    title: 'Published Article',
    description: '"Ethical AI in Legacy Preservation" published on Medium with over 2,000 reads.',
    year: '2024'
  }
];

const CountUp = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const startTime = useRef<number | null>(null);
  const frameId = useRef<number | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );
    
    if (countRef.current) {
      observer.observe(countRef.current);
    }
    
    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
      if (frameId.current !== null) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [end]);
  
  const startAnimation = () => {
    startTime.current = Date.now();
    frameId.current = requestAnimationFrame(updateCount);
  };
  
  const updateCount = () => {
    if (startTime.current === null) return;
    
    const now = Date.now();
    const progress = Math.min((now - startTime.current) / duration, 1);
    const currentCount = Math.floor(progress * end);
    
    setCount(currentCount);
    
    if (progress < 1) {
      frameId.current = requestAnimationFrame(updateCount);
    }
  };
  
  return <span ref={countRef}>{count}</span>;
};

const AchievementsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          setIsVisible(true);
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
      id="achievements" 
      ref={sectionRef}
      className="py-20 min-h-screen bg-portfolio-bg-light transition-all duration-700 opacity-0 translate-y-10"
    >
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mx-auto">Achievements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 mt-16">
          <div className="card text-center flex flex-col items-center justify-center p-8">
            <div className="text-5xl font-bold text-portfolio-accent-cyan mb-3">
              {isVisible ? <CountUp end={500} /> : 0}+
            </div>
            <p className="text-lg text-portfolio-muted">LeetCode Problems</p>
          </div>
          
          <div className="card text-center flex flex-col items-center justify-center p-8">
            <div className="text-5xl font-bold text-portfolio-accent-cyan mb-3">
              {isVisible ? <CountUp end={2} /> : 0}
            </div>
            <p className="text-lg text-portfolio-muted">Hackathon Awards</p>
          </div>
          
          <div className="card text-center flex flex-col items-center justify-center p-8">
            <div className="text-5xl font-bold text-portfolio-accent-cyan mb-3">
              {isVisible ? <CountUp end={2000} /> : 0}+
            </div>
            <p className="text-lg text-portfolio-muted">Article Reads</p>
          </div>
          
          <div className="card text-center flex flex-col items-center justify-center p-8">
            <div className="text-5xl font-bold text-portfolio-accent-cyan mb-3">
              Top <span>{isVisible ? <CountUp end={5} /> : 0}%</span>
            </div>
            <p className="text-lg text-portfolio-muted">LeetCode Ranking</p>
          </div>
        </div>
        
        <div className="space-y-6">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="card p-6 hover:transform hover:scale-[1.01] transition-transform duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-portfolio-bg-dark p-3 rounded-full text-portfolio-accent-cyan mt-1">
                  {achievement.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold">{achievement.title}</h3>
                    <span className="text-sm text-portfolio-accent-cyan">{achievement.year}</span>
                  </div>
                  <p className="text-portfolio-muted">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// For CountUp component
import { useState } from 'react';

export default AchievementsSection;

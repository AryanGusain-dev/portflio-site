
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-portfolio-bg-dark py-10 border-t border-portfolio-text/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <button 
            onClick={scrollToTop}
            className="bg-portfolio-accent-cyan hover:bg-portfolio-accent-cyan/90 text-portfolio-bg-dark p-3 rounded-full mb-8 transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </button>
          
          <div className="flex gap-6 mb-8">
            <a
              href="https://github.com/AryanGusain-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-portfolio-muted hover:text-portfolio-accent-cyan transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/aryan-gusain-086664295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-portfolio-muted hover:text-portfolio-accent-cyan transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:mraryangusain529@gmail.com"
              className="text-portfolio-muted hover:text-portfolio-accent-cyan transition-colors duration-300"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
          
          <div className="text-center">
            <a href="#home" className="text-2xl font-bold text-portfolio-accent-cyan mb-4 inline-block">
              AryanGusain<span className="text-portfolio-text">.dev</span>
            </a>
            <p className="text-portfolio-muted">
              &copy; {new Date().getFullYear()} Aryan Gusain. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

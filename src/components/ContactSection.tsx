import { useRef, useState, useEffect } from 'react';
import { Mail, Github, Linkedin, MessageSquare } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const sectionRef = useRef<HTMLElement>(null);
  
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      console.log('Sending data:', formData);
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error details:', error);
      setStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again.' 
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 min-h-screen bg-portfolio-bg-light transition-all duration-700 opacity-0 translate-y-10"
    >
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mx-auto">Get In Touch</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          <div>
            <p className="text-lg text-portfolio-muted mb-8">
              I'm currently looking for new opportunities to apply my skills in AI, full-stack development, and design. Whether you have a question, a project idea, or just want to connect, feel free to reach out!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-portfolio-bg-dark p-3 rounded-full text-portfolio-accent-cyan">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Email</h3>
                  <a 
                    href="mailto:mraryangusain529@gmail.com" 
                    className="text-portfolio-muted hover:text-portfolio-accent-cyan transition-colors duration-300"
                  >
                    mraryangusain529@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-portfolio-bg-dark p-3 rounded-full text-portfolio-accent-cyan">
                  <Linkedin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium">LinkedIn</h3>
                  <a 
                    href="https://www.linkedin.com/in/aryan-gusain-086664295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-portfolio-muted hover:text-portfolio-accent-cyan transition-colors duration-300"
                  >
                    linkedin.com/aryan-gusain
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-portfolio-bg-dark p-3 rounded-full text-portfolio-accent-cyan">
                  <Github size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium">GitHub</h3>
                  <a 
                    href="https://github.com/AryanGusain-dev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-portfolio-muted hover:text-portfolio-accent-cyan transition-colors duration-300"
                  >
                    github.com/AryanGusain-dev
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare size={20} className="text-portfolio-accent-cyan" />
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-portfolio-muted mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-portfolio-bg-dark border border-portfolio-text/10 focus:border-portfolio-accent-cyan outline-none text-portfolio-text transition-colors duration-300"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-portfolio-muted mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-portfolio-bg-dark border border-portfolio-text/10 focus:border-portfolio-accent-cyan outline-none text-portfolio-text transition-colors duration-300"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-portfolio-muted mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded bg-portfolio-bg-dark border border-portfolio-text/10 focus:border-portfolio-accent-cyan outline-none text-portfolio-text transition-colors duration-300"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="btn-secondary w-full"
                disabled={status.type === 'loading'}
              >
                {status.type === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {status.message && (
                <div className={`mt-4 p-4 rounded-md ${
                  status.type === 'success' ? 'bg-green-50 text-green-700' :
                  status.type === 'error' ? 'bg-red-50 text-red-700' :
                  'bg-blue-50 text-blue-700'
                }`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

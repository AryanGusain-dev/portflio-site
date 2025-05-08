
import { useRef, useState, useEffect } from 'react';
import { Image, Download, X } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  tools: string[];
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 'design1',
    title: 'EchoVerse UI Design',
    category: 'UI/UX',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    tools: ['Figma', 'Adobe Photoshop'],
    description: 'User interface design for the EchoVerse AI platform, featuring a modern, minimalist approach with user-friendly navigation and intuitive controls.'
  },
  {
    id: 'design2',
    title: 'AetherNav Branding',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80',
    tools: ['Adobe Illustrator', 'Figma'],
    description: 'Complete branding package for AetherNav, including logo design, color palette, typography, and brand guidelines.'
  },
  {
    id: 'design3',
    title: 'Tech Conference Poster',
    category: 'Print',
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80',
    tools: ['Adobe Photoshop', 'Adobe Illustrator'],
    description: 'Eye-catching poster design for a technology conference, featuring vibrant colors and futuristic design elements.'
  },
  {
    id: 'design4',
    title: 'Mobile App Prototype',
    category: 'UI/UX',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80',
    tools: ['Figma', 'Protopie'],
    description: 'Interactive prototype for a mobile app with a focus on microinteractions and smooth transitions between screens.'
  },
  {
    id: 'design5',
    title: 'Social Media Campaign',
    category: 'Digital',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    tools: ['Adobe Photoshop', 'Canva'],
    description: 'Series of coordinated social media posts for a product launch, maintaining consistent branding while optimizing for different platforms.'
  },
  {
    id: 'design6',
    title: 'AI Infographic',
    category: 'Print',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80',
    tools: ['Adobe Illustrator', 'Adobe InDesign'],
    description: 'Educational infographic explaining AI concepts in an accessible and visually engaging format.'
  }
];

const GallerySection = () => {
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const categories = ['all', 'UI/UX', 'Branding', 'Print', 'Digital'];
  
  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);
  
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
  
  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="py-20 min-h-screen bg-portfolio-bg-dark transition-all duration-700 opacity-0 translate-y-10"
    >
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mx-auto">Design Gallery</h2>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12 mt-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                filter === category
                  ? 'bg-portfolio-accent-cyan text-portfolio-bg-dark'
                  : 'bg-portfolio-bg-light text-portfolio-muted hover:text-portfolio-accent-cyan'
              }`}
            >
              {category === 'all' ? 'All Work' : category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg h-64"
              onClick={() => openLightbox(item)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-portfolio-bg-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-portfolio-text font-bold text-xl mb-1">{item.title}</h3>
                <p className="text-portfolio-muted text-sm mb-2">{item.category}</p>
                <div className="flex flex-wrap gap-1">
                  {item.tools.map((tool) => (
                    <span 
                      key={tool} 
                      className="text-xs px-2 py-0.5 rounded-full bg-portfolio-accent-cyan/20 text-portfolio-accent-cyan"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Lightbox */}
        {selectedItem && (
          <div 
            className={`fixed inset-0 bg-black/90 z-50 flex items-center justify-center transition-opacity duration-300 ${
              lightboxOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={closeLightbox}
          >
            <div 
              className="max-w-4xl w-full p-4 animate-fade-in-up"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-portfolio-bg-light rounded-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title}
                    className="w-full h-auto"
                  />
                  <button 
                    onClick={closeLightbox}
                    className="absolute top-4 right-4 bg-portfolio-bg-dark/80 text-portfolio-text hover:text-portfolio-accent-cyan p-2 rounded-full transition-colors duration-300"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-portfolio-text">{selectedItem.title}</h3>
                      <p className="text-portfolio-accent-cyan">{selectedItem.category}</p>
                    </div>
                    <a 
                      href={selectedItem.image}
                      download={`${selectedItem.title}.jpg`}
                      className="btn-primary text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download size={16} /> Download
                    </a>
                  </div>
                  <p className="text-portfolio-muted mb-4">{selectedItem.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-portfolio-text">Tools:</span>
                    {selectedItem.tools.map((tool) => (
                      <span 
                        key={tool} 
                        className="text-sm px-2 py-0.5 rounded-full bg-portfolio-bg-dark text-portfolio-accent-cyan"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;

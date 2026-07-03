import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const categories = ['All', 'Studio', 'Podcast', 'Recording', 'Camera', 'Lighting', 'Microphone'];

const images = [
  { id: 101, category: 'Studio', src: '/custom-gallery-1.png', alt: 'Premium Studio Setup' },
  { id: 102, category: 'Microphone', src: '/custom-gallery-2.png', alt: 'Professional Microphone' },
  { id: 103, category: 'Recording', src: '/custom-gallery-3.png', alt: 'Recording Setup' },
  { id: 104, category: 'Podcast', src: '/custom-gallery-4.png', alt: 'Podcast Table' },
  { id: 105, category: 'Studio', src: '/custom-gallery-5.jpg', alt: 'Lounge Setup' },
  { id: 106, category: 'Microphone', src: '/custom-gallery-6.jpg', alt: 'Dual Microphones' },
  { id: 107, category: 'Lighting', src: '/custom-gallery-7.png', alt: 'Creative Lighting' },
  { id: 108, category: 'Camera', src: '/custom-gallery-8.png', alt: 'Cinema Camera Setup' },
  { id: 109, category: 'Camera', src: '/custom-gallery-9.png', alt: 'Studio Camera Setup' }
];

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);

  const filteredImages = activeTab === 'All' 
    ? images 
    : images.filter(img => img.category === activeTab);

  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-20 min-h-screen bg-gray-50 border-t border-gray-100">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Studio Gallery</h1>
          <p className="text-gray-600 text-lg">Take a look inside our premium recording space.</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === cat 
                  ? 'bg-accent text-white shadow-[0_4px_15px_rgba(255,106,0,0.3)]' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div 
              key={img.id}
              className="relative group rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-sm border border-gray-100"
              onClick={() => setLightboxImg(img.src)}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <ZoomIn className="text-accent" size={48} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-white/95 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
          <button 
            className="absolute top-8 right-8 text-gray-500 hover:text-accent transition-colors"
            onClick={() => setLightboxImg(null)}
          >
            <X size={40} />
          </button>
          <img 
            src={lightboxImg} 
            alt="Preview" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </PageTransition>
  );
};

export default Gallery;

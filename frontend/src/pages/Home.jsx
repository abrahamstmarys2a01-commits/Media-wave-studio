import { useEffect, useRef, useState } from 'react';
import { Play, Mic, Wifi, Armchair, ChevronRight, CheckCircle2, Video, MapPin, Calendar, Clock, CreditCard, Mic2 } from 'lucide-react';
import StudioCard from '../components/StudioCard';
import FeatureIcon from '../components/FeatureIcon';
import './Home.css';

const Home = ({ onBookNow }) => {
  const [currentBg, setCurrentBg] = useState(0);
  const bgImages = [
    "/my-studio-bg.png",
    "/custom-gallery-8.png",
    "/custom-gallery-9.png"
  ];

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(bgInterval);
  }, [bgImages.length]);

  const galleryImages = [
    "/custom-gallery-1.png",
    "/custom-gallery-2.png",
    "/custom-gallery-3.png",
    "/custom-gallery-4.png",
    "/custom-gallery-5.jpg",
    "/custom-gallery-6.jpg",
    "/custom-gallery-7.png",
    "/custom-gallery-8.png"
  ];

  const studios = [
    {
      id: 'studio-a',
      title: 'Studio A',
      capacity: '1-4 People',
      description: 'Perfect for solo episodes and interviews.',
      price: 40,
      image: '/custom-gallery-9.png',
      isPopular: true
    },
    {
      id: 'studio-b',
      title: 'Studio B',
      capacity: '1-6 People',
      description: 'Great for podcasts with guests and co-hosts.',
      price: 60,
      image: '/custom-gallery-6.jpg',
      isPopular: false
    }
  ];

  const features = [
    { icon: <Mic size={24} />, title: "Podcast Studio Rental", description: "Fully equipped, soundproof studios available." },
    { icon: <Video size={24} />, title: "Video Podcast Production", description: "Multi-camera setup for high-quality video recording." },
    { icon: <Play size={24} />, title: "YouTube Studio", description: "Perfect lighting and backdrops for your YouTube content." },
    { icon: <Mic2 size={24} />, title: "Interview & Talk Show Studio", description: "Professional setups tailored for interviews." },
    { icon: <Wifi size={24} />, title: "Live Streaming Studio", description: "High-speed internet for uninterrupted live broadcasting." },
    { icon: <CheckCircle2 size={24} />, title: "Content Creation Hub", description: "Your one-stop destination for all content creation needs." },
    { icon: <Armchair size={24} />, title: "Audio Recording Services", description: "Crisp and clear audio recording and editing." }
  ];

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section id="home" className="hero-section">
        <div className="hero-backgrounds">
          {bgImages.map((src, index) => (
            <div 
              key={index}
              className={`hero-bg-image ${index === currentBg ? 'active' : ''}`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
          <div className="hero-overlay"></div>
        </div>

        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-pill">
              PREMIUM PODCAST STUDIOS FOR RENT
            </div>
            
            <h1 className="hero-title">
              Record. Create.<br/>
              <span className="text-primary-gradient">Inspire.</span>
            </h1>
            
            <p className="hero-subtitle">
              Professional podcast studios designed for creators, businesses, and storytellers.
            </p>
            
            <div className="hero-features">
              <div className="hero-feature-pill">
                <div className="hero-icon"><Mic size={18} /></div>
                <div className="hero-feature-text">
                  <strong>Pro Equipment</strong>
                  <span>Top quality audio and video gear</span>
                </div>
              </div>
              <div className="hero-feature-pill">
                <div className="hero-icon"><Wifi size={18} /></div>
                <div className="hero-feature-text">
                  <strong>High-Speed Wi-Fi</strong>
                  <span>Reliable internet for smooth recording</span>
                </div>
              </div>
              <div className="hero-feature-pill">
                <div className="hero-icon"><Armchair size={18} /></div>
                <div className="hero-feature-text">
                  <strong>Comfort & Style</strong>
                  <span>Modern, cozy, and inspiring spaces</span>
                </div>
              </div>
            </div>
            
            <div className="hero-actions">
              <button onClick={() => {
                document.getElementById('studios').scrollIntoView({ behavior: 'smooth' });
              }} className="btn-primary">
                Explore Studios <ChevronRight size={18} style={{display: 'inline', verticalAlign: 'middle', marginLeft: '4px'}}/>
              </button>
              <button className="btn-glass">
                <Play size={18} /> Take a Tour
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BOOKING BAR */}
      <div className="booking-bar-container">
        <div className="container">
          <div className="booking-bar">
            <div className="booking-header">
              <Calendar className="text-primary" size={24} />
              <div>
                <strong>Check Availability</strong>
                <p>Select date and time to book your studio</p>
              </div>
            </div>
            
            <div className="booking-inputs">
              <div className="input-group">
                <label>Select Date</label>
                <input type="date" className="booking-input" defaultValue="2024-05-25" />
              </div>
              <div className="input-divider"></div>
              <div className="input-group">
                <label>Start Time</label>
                <input type="time" className="booking-input" defaultValue="10:00" />
              </div>
              <div className="input-divider"></div>
              <div className="input-group">
                <label>Duration</label>
                <select className="booking-input">
                  <option>2 Hours</option>
                  <option>3 Hours</option>
                  <option>4 Hours</option>
                </select>
              </div>
            </div>
            
            <button className="btn-primary booking-btn" onClick={onBookNow}>
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* 3. STUDIOS SECTION */}
      <section id="studios" className="section-studios section-padding">
        <div className="container">
          <div className="section-header-row">
            <div className="section-header-left">
              <span className="section-tag">OUR STUDIOS</span>
              <h2 className="section-title">Choose the perfect<br/>space for your podcast</h2>
              <p className="section-subtitle">From solo shows to group discussions, we have the right studio for you.</p>
              <button className="btn-outline mt-8">View All Studios <ChevronRight size={16} style={{display: 'inline', verticalAlign: 'middle'}}/></button>
            </div>
            <div className="section-header-right">
               <div className="studios-grid">
                 {studios.map(studio => (
                   <StudioCard key={studio.id} {...studio} onBookNow={onBookNow} />
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES SECTION (Services) */}
      <section id="features" className="section-features section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-tag text-primary">WHAT WE OFFER</span>
            <h2 className="section-title">Our Services</h2>
          </div>
          <div className="features-container">
            {features.map((feature, idx) => (
              <FeatureIcon key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>


      {/* GALLERY SECTION */}
      <section id="gallery" className="section-gallery section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-tag text-primary">OUR SPACES</span>
            <h2 className="section-title">Gallery</h2>
            <p className="section-subtitle">Take a look inside our premium studios.</p>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((src, index) => (
              <div key={index} className="gallery-item">
                <img src={src} alt={`Gallery image ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="section-cta container mb-12">
        <div className="cta-banner">
          <div className="cta-content">
            <span className="section-tag text-primary">READY TO GET STARTED?</span>
            <h2>Your podcast deserves the best space.</h2>
            <p>Book your studio today and create something amazing.</p>
          </div>
          <div className="cta-action">
            <button onClick={onBookNow} className="btn-primary">
              Book Now <ChevronRight size={18} style={{display: 'inline', verticalAlign: 'middle', marginLeft: '4px'}}/>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

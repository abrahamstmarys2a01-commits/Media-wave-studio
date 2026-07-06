import { useEffect, useRef, useState } from 'react';
import { Play, Mic, Wifi, Armchair, ChevronRight, CheckCircle2, Video, MapPin, Calendar, Clock, CreditCard, Mic2, X } from 'lucide-react';
import StudioCard from '../components/StudioCard';
import FeatureIcon from '../components/FeatureIcon';
import './Home.css';

const Home = ({ onBookNow }) => {
  const [availability, setAvailability] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('2 Hours');
  const [lastChecked, setLastChecked] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const [bookingDetails, setBookingDetails] = useState(null);

  const handleCheckAvailability = async () => {
    if (!date || !time) {
      alert("Please select a date and time.");
      return;
    }
    
    setAvailability('checking');
    
    // Calculate endTime
    let [hours, minutes] = time.split(':');
    let durHours = parseInt(duration.split(' ')[0]);
    let endHours = parseInt(hours) + durHours;
    let endTime = `${String(endHours).padStart(2, '0')}:${minutes}`;

    try {
      const res = await fetch(`http://localhost:5005/api/bookings/check?date=${date}&startTime=${time}&endTime=${endTime}`);
      const data = await res.json();
      
      if (data.available) {
        setAvailability('available');
        setBookingDetails(null);
      } else {
        setAvailability('booked');
        setBookingDetails(data.booking);
      }
    } catch (err) {
      console.error("Error checking availability:", err);
      setAvailability(null);
      alert("Failed to check availability. Is the server running?");
    }
  };
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
      image: '/my-studio-bg.png',
      isPopular: true
    }
  ];

  const features = [
    { icon: <Mic size={24} />, title: "Podcast Studio Rental", description: "Fully equipped, soundproof studios available." },
    { icon: <Video size={24} />, title: "Video Podcast Production", description: "Multi-camera setup for high-quality video recording." },
    { icon: <Play size={24} />, title: "YouTube Studio", description: "Perfect lighting and backdrops for your YouTube content." },
    { icon: <Mic2 size={24} />, title: "Interview & Talk Show Studio", description: "Professional setups tailored for interviews." },
    { icon: <CheckCircle2 size={24} />, title: "Content Creation Hub", description: "Your one-stop destination for all content creation needs." },
    { icon: <Armchair size={24} />, title: "Audio Recording Services", description: "Crisp and clear audio recording and editing." }
  ];

  const bannerFeatures = [
    { icon: <Mic size={24} />, title: "Professional Equipment", description: "Industry-standard microphones, mixers, cameras and more." },
    { icon: <Mic2 size={24} />, title: "Acoustic Treatment", description: "Soundproof rooms for crystal clear recordings." },
    { icon: <Video size={24} />, title: "Video & Live Streaming", description: "Record in high quality or go live with ease." },
    { icon: <MapPin size={24} />, title: "Convenient Location", description: "Easy access with parking and great amenities." }
  ];

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section id="home" className="hero-section">
        <div className="hero-backgrounds">
          <div className="hero-bg-image" style={{ backgroundImage: `url('/bg.png')` }}></div>
          <div className="hero-overlay"></div>
        </div>

        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-pill">
              PREMIUM PODCAST STUDIOS FOR RENT
            </div>

            <h1 className="hero-title">
              Record. Create.<br />
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
                Explore Studios <ChevronRight size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
              </button>
              <button className="btn-glass" onClick={() => {
                setCurrentImageIdx(0);
                setShowGallery(true);
              }}>
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
                <input
                  type="date"
                  className="booking-input"
                  value={date}
                  onChange={(e) => { setDate(e.target.value); setAvailability(null); }}
                />
              </div>
              <div className="input-divider"></div>
              <div className="input-group">
                <label>Start Time</label>
                <input
                  type="time"
                  className="booking-input"
                  value={time}
                  onChange={(e) => { setTime(e.target.value); setAvailability(null); }}
                />
              </div>
              <div className="input-divider"></div>
              <div className="input-group">
                <label>Duration</label>
                <select
                  className="booking-input"
                  value={duration}
                  onChange={(e) => { setDuration(e.target.value); setAvailability(null); }}
                >
                  <option>2 Hours</option>
                  <option>3 Hours</option>
                  <option>4 Hours</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <button
                className="btn-primary booking-btn"
                onClick={handleCheckAvailability}
                disabled={availability === 'checking'}
              >
                {availability === 'checking' ? 'Checking...' : 'Check Availability'}
              </button>
            </div>
          </div>

          {/* RESULT CARD */}
          {availability === 'booked' && bookingDetails && (
            <div className="booking-result-card fade-in">
              <div className="result-header">
                <span className="badge badge-red">❌ Not Available</span>
                <p>This time slot has already been booked.</p>
              </div>
              <div className="result-details">
                <div className="detail-item"><span>Name</span><strong>{bookingDetails.customer_name}</strong></div>
                <div className="detail-item"><span>Phone Number</span><strong>{bookingDetails.phone}</strong></div>
                <div className="detail-item"><span>Booking Date</span><strong>{bookingDetails.booking_date}</strong></div>
                <div className="detail-item"><span>Start Time</span><strong>{bookingDetails.start_time}</strong></div>
                <div className="detail-item"><span>End Time</span><strong>{bookingDetails.end_time}</strong></div>
                <div className="detail-item"><span>Duration</span><strong>{bookingDetails.duration}</strong></div>
              </div>
            </div>
          )}

          {availability === 'available' && (
            <div className="booking-result-card fade-in" style={{ textAlign: 'center' }}>
              <div className="result-header" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
                <span className="badge badge-green">✅ Available</span>
              </div>
              <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>This time slot is available for booking.</p>
              <button className="btn-primary" style={{ backgroundColor: '#8b5cf6', margin: '0 auto' }} onClick={onBookNow}>
                Book Now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. STUDIOS SECTION */}
      <section id="studios" className="section-studios section-padding">
        <div className="container">
          <div className="section-header-row">
            <div className="section-header-left">
              <span className="section-tag">OUR STUDIOS</span>
              <h2 className="section-title">Choose the perfect<br />space for your podcast</h2>

              <button className="btn-outline mt-8">View All Studios <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /></button>
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

      {/* BANNER SECTION */}
      <section className="section-banner section-padding">
        <div className="container">
          <div className="banner-features-card">
            {bannerFeatures.map((item, idx) => (
              <div key={idx} className="banner-feature-item">
                <div className="banner-feature-icon">{item.icon}</div>
                <div className="banner-feature-text">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="about" className="section-how-it-works section-padding">
        <div className="container">
          <div className="how-it-works-layout">
            <div className="hiw-text">
              <span className="section-tag text-primary">HOW IT WORKS</span>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>Book. Record. Publish.<br />It's that simple.</h2>
            </div>
            <div className="hiw-steps">
              <div className="hiw-step">
                <div className="hiw-icon-container">
                  <div className="hiw-icon"><Calendar size={32} className="text-primary" /></div>
                  <div className="hiw-number">1</div>
                </div>
                <h4>Choose Studio</h4>
                <p>Pick a studio that fits your needs.</p>
              </div>
              <div className="hiw-divider"></div>
              <div className="hiw-step">
                <div className="hiw-icon-container">
                  <div className="hiw-icon"><Clock size={32} className="text-primary" /></div>
                  <div className="hiw-number">2</div>
                </div>
                <h4>Select Time</h4>
                <p>Choose your date, time and duration.</p>
              </div>
              <div className="hiw-divider"></div>
              <div className="hiw-step">
                <div className="hiw-icon-container">
                  <div className="hiw-icon"><CreditCard size={32} className="text-primary" /></div>
                  <div className="hiw-number">3</div>
                </div>
                <h4>Book & Pay</h4>
                <p>Secure your booking in just a few clicks.</p>
              </div>
              <div className="hiw-divider"></div>
              <div className="hiw-step">
                <div className="hiw-icon-container">
                  <div className="hiw-icon"><Mic size={32} className="text-primary" /></div>
                  <div className="hiw-number">4</div>
                </div>
                <h4>Record & Create</h4>
                <p>Come in, record, and bring your ideas to life.</p>
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

          </div>
          <div className="features-container">
            {features.map((feature, idx) => (
              <FeatureIcon key={idx} {...feature} />
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
              Book Now <ChevronRight size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
            </button>
          </div>
        </div>
      </section>

    {/* GALLERY MODAL */}
      {showGallery && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>
          <button 
            onClick={() => setShowGallery(false)}
            style={{ position: 'absolute', top: '30px', right: '40px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem' }}
          >
            <X size={36} />
          </button>
          
          <div style={{ position: 'relative', maxWidth: '80%', maxHeight: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button 
              onClick={() => setCurrentImageIdx((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))}
              style={{ position: 'absolute', left: '-60px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '1rem' }}
            >
              <ChevronRight size={48} style={{ transform: 'rotate(180deg)' }} />
            </button>

            <img 
              src={galleryImages[currentImageIdx]} 
              alt="Studio Tour" 
              style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
            />
            
            <button 
              onClick={() => setCurrentImageIdx((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))}
              style={{ position: 'absolute', right: '-60px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '1rem' }}
            >
              <ChevronRight size={48} />
            </button>
          </div>
          <div style={{ color: 'white', marginTop: '1.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
            {currentImageIdx + 1} / {galleryImages.length}
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;

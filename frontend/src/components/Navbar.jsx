import { Mic2, Menu, X, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ onBookNow }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'studios', 'features', 'pricing', 'about', 'contact'];
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
          }
        }
      }
      if (current) {
        setActiveSection(current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Studio', id: 'studios' },
    { name: 'Services', id: 'features' }, // Mapping Features section as Services
    { name: 'Booking', id: 'booking' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Logo */}
        <button onClick={() => scrollToSection('home')} className="navbar-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-icon">
            <path d="M12 2v20M17 5v14M7 5v14M22 10v4M2 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="logo-text">
            <strong>Media Wave</strong>
            <span>STUDIO</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="navbar-menu desktop-only">
          <div className="navbar-links">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => {
                  if (link.id === 'booking') {
                    onBookNow();
                  } else {
                    scrollToSection(link.id);
                  }
                }}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              >
                {link.name}
              </button>
            ))}
          </div>
          
          <div className="navbar-actions">
            <a href="tel:+15551234567" className="navbar-phone">
              <Phone size={16} />
              +1 (555) 123-4567
            </a>
            <button onClick={onBookNow} className="btn-primary btn-sm">
              Book Now
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn mobile-only"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => {
                if (link.id === 'booking') {
                  setIsOpen(false);
                  onBookNow();
                } else {
                  scrollToSection(link.id);
                }
              }}
              className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
            >
              {link.name}
            </button>
          ))}
          <a href="tel:+15551234567" className="mobile-nav-link flex-center">
            <Phone size={16} className="mr-2" />
            +1 (555) 123-4567
          </a>
          <button 
            onClick={() => {
              setIsOpen(false);
              onBookNow();
            }}
            className="btn-primary w-full mt-4"
          >
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

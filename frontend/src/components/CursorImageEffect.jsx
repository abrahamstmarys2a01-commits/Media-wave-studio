import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const images = [
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop", // Main Studio
  "https://images.unsplash.com/photo-1581368135153-a506cf13b1e1?q=80&w=600&auto=format&fit=crop", // Podcast Setup
  "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop", // Shure Mic
  "https://images.unsplash.com/photo-1520524458535-64906f3db53d?q=80&w=600&auto=format&fit=crop", // Condenser Mic
  "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?q=80&w=600&auto=format&fit=crop", // Mixing Console
  "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=600&auto=format&fit=crop", // Live Podcast
];

const CursorImageEffect = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Track mouse distance
  const mouse = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const distance = useRef(0);
  
  useEffect(() => {
    // GSAP quickTo for highly performant smooth following
    const xTo = gsap.quickTo(containerRef.current, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(containerRef.current, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);

      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      // Center the 250px circular image on the cursor
      xTo(mouse.current.x - 125);
      yTo(mouse.current.y - 125);

      // Calculate distance moved to trigger image rotation
      const dx = mouse.current.x - lastMouse.current.x;
      const dy = mouse.current.y - lastMouse.current.y;
      distance.current += Math.sqrt(dx * dx + dy * dy);
      
      // Change image every 150px of mouse movement
      if (distance.current > 150) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        distance.current = 0;
      }
      
      lastMouse.current = { x: mouse.current.x, y: mouse.current.y };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);

  // Fade and scale in when mouse first moves
  useEffect(() => {
    if (isVisible) {
      gsap.to(containerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.5)"
      });
    }
  }, [isVisible]);

  return (
    <div 
      ref={containerRef} 
      className="pointer-events-none fixed top-0 left-0 w-[250px] h-[250px] rounded-full overflow-hidden z-40 shadow-[0_10px_40px_rgba(0,0,0,0.15)] border-4 border-white glass"
      style={{ opacity: 0, scale: 0, willChange: 'transform, opacity' }}
    >
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Studio ${index}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
};

export default CursorImageEffect;

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import BookingModal from './components/BookingModal';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  return (
    <Router>
      <div className="app-container">
        <Navbar onBookNow={() => setIsBookingModalOpen(true)} />
        <main className="main-content">
          <Home onBookNow={() => setIsBookingModalOpen(true)} />
        </main>
        <Footer />
        <BookingModal 
          isOpen={isBookingModalOpen} 
          onClose={() => setIsBookingModalOpen(false)} 
        />
      </div>
    </Router>
  );
}

export default App;

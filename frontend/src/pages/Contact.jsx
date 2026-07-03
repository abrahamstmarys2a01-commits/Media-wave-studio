import { MapPin, Phone, Mail, Send } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Contact = () => {
  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-20 min-h-[80vh] bg-white border-t border-gray-100">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Contact Us</h1>
          <p className="text-gray-600 text-lg">Get in touch with our team for inquiries and support.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Cards */}
          <div className="bg-white border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-8 rounded-3xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-6 text-accent">
              <Phone size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Phone</h3>
            <p className="text-gray-600">+91 63691 53235</p>
          </div>

          <div className="bg-white border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-8 rounded-3xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-6 text-accent">
              <Mail size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Email</h3>
            <p className="text-gray-600">info@mediawavetech.com</p>
          </div>

          <div className="bg-white border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-8 rounded-3xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-6 text-accent">
              <MapPin size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Address</h3>
            <p className="text-gray-600">Trichy Podcast Studio</p>
            <p className="text-gray-600">Near Central Bus Stand</p>
            <p className="text-gray-600">Tiruchirappalli, Tamil Nadu, India</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map */}
          <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-sm border border-gray-200 relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125406.10842817291!2d78.6189914!3d10.8158356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf50ff2aec58c%3A0x11211d4d03a11e51!2sTiruchirappalli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Trichy Location"
            ></iframe>
          </div>

          {/* Form */}
          <div className="bg-white border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.05)] p-8 md:p-12 rounded-3xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Send us a Message</h3>
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Name</label>
                <input 
                  type="text" 
                  required
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  placeholder="Your Name"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <input 
                  type="email" 
                  required
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Message</label>
                <textarea 
                  rows="5" 
                  required
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="bg-accent hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 mt-2 shadow-[0_4px_20px_rgba(255,106,0,0.3)]"
              >
                <span>Send Message</span>
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;

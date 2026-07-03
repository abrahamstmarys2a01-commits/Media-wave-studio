import { Video, MonitorPlay, Mic2, Radio, Clapperboard, Headphones } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const servicesList = [
  {
    id: 1,
    title: "Video Podcast Production",
    description: "Professional multi-camera setup with high-end lighting designed for stunning, broadcast-quality video podcasts.",
    icon: <Video size={32} />
  },
  {
    id: 2,
    title: "YouTube Studio",
    description: "Perfectly lit and acoustically treated sets optimized for YouTube creators, influencers, and vloggers.",
    icon: <MonitorPlay size={32} />
  },
  {
    id: 3,
    title: "Interview & Talk Show Studio",
    description: "Comfortable, premium spaces with broadcast-ready setups designed for engaging interviews and panel discussions.",
    icon: <Mic2 size={32} />
  },
  {
    id: 4,
    title: "Live Streaming Studio",
    description: "High-speed ethernet and professional switchers for seamless, high-quality, zero-latency live broadcasts.",
    icon: <Radio size={32} />
  },
  {
    id: 5,
    title: "Content Creation Hub",
    description: "Versatile and aesthetic setups perfect for short-form content, Instagram Reels, TikToks, and product shoots.",
    icon: <Clapperboard size={32} />
  },
  {
    id: 6,
    title: "Audio Recording Services",
    description: "Crystal clear audio recording with industry-standard microphones, preamps, and flawless soundproofing.",
    icon: <Headphones size={32} />
  }
];

const Services = () => {
  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-20 min-h-screen bg-gray-50 border-t border-gray-100">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Services</h1>
          <p className="text-gray-600 text-lg">Premium studio spaces and production services tailored for every creator.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div 
              key={service.id}
              className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 rounded-3xl flex flex-col hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 leading-tight">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Services;

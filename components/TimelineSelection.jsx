import React from 'react';
import { Compass, MapPin, Anchor } from 'lucide-react';

const TimelineSelection = ({ onSelectTimeline }) => {
  const timelines = [
    { 
      id: 'ancient', 
      name: 'Ancient World', 
      icon: '🏛️', 
      year: '3000 BCE - 500 CE',
      description: 'Walk among pharaohs and philosophers',
      color: 'from-amber-600 to-orange-700'
    },
    { 
      id: 'medieval', 
      name: 'Medieval & Renaissance', 
      icon: '⚔️', 
      year: '500 - 1500 CE',
      description: 'Knights, castles, and rebirth of art',
      color: 'from-red-700 to-rose-800'
    },
    { 
      id: 'exploration', 
      name: 'Age of Exploration', 
      icon: '🌍', 
      year: '1500 - 1800 CE',
      description: 'Discover new worlds and civilizations',
      color: 'from-blue-700 to-cyan-800'
    },
    { 
      id: 'revolution', 
      name: 'Revolutions & Industrial Age', 
      icon: '⚙️', 
      year: '1750 - 1900 CE',
      description: 'Witness the birth of modern society',
      color: 'from-slate-700 to-gray-800'
    },
    { 
      id: 'modern', 
      name: 'Modern History', 
      icon: '🚀', 
      year: '1900 - 2000 CE',
      description: 'The age of technology and change',
      color: 'from-purple-700 to-indigo-800'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-950 relative overflow-hidden">
      {/* Decorative corner compass */}
      <div className="absolute top-8 right-8 opacity-40">
        <div className="relative">
          <Compass className="w-20 h-20 text-amber-700 animate-spin" style={{ animationDuration: '40s' }} />
          <Anchor className="w-8 h-8 text-amber-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-4xl md:text-5xl font-bold text-amber-300 font-serif tracking-wider" 
             style={{ 
               fontFamily: 'Cinzel, Georgia, serif',
               fontWeight: '700'
             }}>
            Select your destination in history
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Timeline vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 hidden md:block">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-600 rounded-full shadow-lg shadow-amber-600/50"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-600 rounded-full shadow-lg shadow-amber-600/50"></div>
          </div>

          {/* Timeline items */}
          <div className="space-y-8">
            {timelines.map((timeline, index) => (
              <div
                key={timeline.id}
                className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col animate-slide-in`}
                style={{ 
                  animation: `${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'} 0.8s ease-out forwards`,
                  animationDelay: `${index * 0.15}s` 
                }}
              >
                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <button
                    onClick={() => onSelectTimeline(timeline.id)}
                    className="group w-full bg-gradient-to-br from-stone-900/80 to-amber-950/60 backdrop-blur-sm border-2 border-amber-800/60 rounded-lg p-6 hover:border-amber-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-700/20 text-left"
                  >
                    <div className={`flex items-start gap-4 ${index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                      <div className="text-5xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {timeline.icon}
                      </div>
                      <div className="flex-1">
                        <div className={`inline-block px-3 py-1 bg-gradient-to-r ${timeline.color} rounded-full text-xs font-semibold text-white mb-2 font-serif`}>
                          {timeline.year}
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-amber-400 mb-2 group-hover:text-amber-300 transition-colors" 
                            style={{ fontFamily: 'Cinzel, Georgia, serif' }}>
                          {timeline.name}
                        </h3>
                        <p className="text-sm text-amber-300/70 group-hover:text-amber-200/80 transition-colors font-serif italic" 
                           style={{ fontFamily: 'Crimson Text, Georgia, serif' }}>
                          {timeline.description}
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm font-semibold font-serif">Embark on Journey</span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Timeline node (center) */}
                <div className="hidden md:flex w-2/12 justify-center items-center">
                  <div className="relative">
                    <div className="w-6 h-6 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full border-4 border-stone-900 shadow-lg shadow-amber-600/50 z-10 relative"></div>
                    <div className="absolute inset-0 w-6 h-6 bg-amber-600 rounded-full animate-ping opacity-30"></div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-stone-900/50 backdrop-blur-sm border border-amber-800/40 rounded-full">
            <Compass className="w-5 h-5 text-amber-700" />
            <span className="text-amber-400 text-sm font-serif font-medium" style={{ fontFamily: 'Crimson Text, Georgia, serif' }}>
              Chart your course through history
            </span>
            <Compass className="w-5 h-5 text-amber-700" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          opacity: 0;
        }

        /* 3D Earth Animation Styles */
        .earth-container {
          perspective: 1000px;
          width: 600px;
          height: 600px;
        }

        .earth {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotate-earth 60s linear infinite;
        }

        @keyframes rotate-earth {
          from {
            transform: rotateY(0deg) rotateX(15deg);
          }
          to {
            transform: rotateY(360deg) rotateX(15deg);
          }
        }

        .earth-sphere {
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #1e3a5f, #0a1929);
          box-shadow: 
            inset -40px -40px 80px rgba(0, 0, 0, 0.6),
            inset 20px 20px 40px rgba(100, 150, 200, 0.1),
            0 0 100px rgba(139, 111, 71, 0.3);
          transform-style: preserve-3d;
          overflow: hidden;
        }

        /* Continents */
        .continent {
          position: absolute;
          background: rgba(139, 111, 71, 0.7);
          border-radius: 40% 60% 50% 50%;
          box-shadow: inset 2px 2px 10px rgba(0, 0, 0, 0.3);
        }

        .continent-1 {
          /* North America */
          width: 120px;
          height: 180px;
          top: 15%;
          left: 20%;
          transform: rotateZ(-15deg);
        }

        .continent-2 {
          /* South America */
          width: 80px;
          height: 150px;
          top: 45%;
          left: 25%;
          transform: rotateZ(10deg);
          border-radius: 50% 50% 40% 60%;
        }

        .continent-3 {
          /* Africa */
          width: 100px;
          height: 160px;
          top: 30%;
          left: 45%;
          border-radius: 45% 55% 50% 50%;
        }

        .continent-4 {
          /* Europe */
          width: 70px;
          height: 60px;
          top: 20%;
          left: 48%;
          border-radius: 60% 40% 50% 50%;
        }

        .continent-5 {
          /* Asia */
          width: 200px;
          height: 140px;
          top: 18%;
          left: 55%;
          transform: rotateZ(5deg);
          border-radius: 50% 50% 45% 55%;
        }

        .continent-6 {
          /* Australia */
          width: 90px;
          height: 70px;
          top: 60%;
          left: 70%;
          border-radius: 55% 45% 50% 50%;
        }

        /* Grid lines */
        .grid-line {
          position: absolute;
          background: rgba(139, 111, 71, 0.2);
        }

        .grid-horizontal {
          width: 100%;
          height: 1px;
          left: 0;
        }

        .grid-vertical {
          width: 1px;
          height: 100%;
          top: 0;
        }

        /* Glow effect */
        .earth-sphere::after {
          content: '';
          position: absolute;
          top: -10%;
          left: -10%;
          right: -10%;
          bottom: -10%;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, 
            rgba(139, 111, 71, 0.3) 0%, 
            transparent 70%);
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .earth-container {
            width: 400px;
            height: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default TimelineSelection;

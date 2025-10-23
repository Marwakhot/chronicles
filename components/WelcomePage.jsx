import React from 'react';
import { BookOpen, Map, Compass } from 'lucide-react';

const WelcomePage = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-900 to-black relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => {
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 3;
          const duration = 2 + Math.random() * 3;
          
          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`
              }}
            />
          );
        })}
      </div>

      {/* Decorative scroll background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <BookOpen className="w-96 h-96 text-amber-400" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl space-y-12 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 mb-4">
              <Compass className="w-12 h-12 text-amber-400 animate-spin-slow" />
              <h1 className="text-6xl md:text-7xl font-serif font-bold text-amber-400 tracking-wider" 
                  style={{ fontFamily: 'Cinzel, Georgia, serif' }}>
                Journey Through Time
              </h1>
              <Compass className="w-12 h-12 text-amber-400 animate-spin-slow" />
            </div>
            <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
          </div>

          {/* Welcome Text */}
          <div className="bg-stone-900/60 backdrop-blur-sm border-2 border-amber-800/60 rounded-xl p-10 space-y-6">
            <p className="text-2xl text-amber-200 leading-relaxed font-serif italic text-center" 
               style={{ fontFamily: 'Crimson Text, Georgia, serif' }}>
              Welcome, traveler. You stand at the threshold of an extraordinary journey through time itself.
            </p>
            
            <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-700 to-transparent"></div>

            <div className="space-y-4 text-amber-100 text-lg leading-relaxed font-serif" 
                 style={{ fontFamily: 'Crimson Text, Georgia, serif' }}>
              <p>
                In these chronicles, you will walk in the footsteps of emperors and peasants, warriors and healers, revolutionaries and peacemakers. Each story presents you with choices that matter—decisions that will shape not just one life, but the very course of history.
              </p>
              
              <p>
                Nothing here is black and white. The line between hero and villain is often razor-thin, and the best intentions can lead to tragedy. Every choice carries weight. Every path has consequences. Your decisions will define who you become.
              </p>

              <p>
                You'll face dilemmas of loyalty and betrayal, courage and survival, truth and compromise. Will you stand firm in your principles no matter the cost? Or will you adapt to preserve what matters most? These questions await your answer.
              </p>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-700 to-transparent"></div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-amber-900/20 border border-amber-800/40 rounded-lg p-4 text-center">
                <Map className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h3 className="text-amber-300 font-serif font-bold mb-2">Choose Wisely</h3>
                <p className="text-amber-200/80 text-sm font-serif">
                  Every decision matters. Multiple paths and endings await your discovery.
                </p>
              </div>

              <div className="bg-amber-900/20 border border-amber-800/40 rounded-lg p-4 text-center">
                <BookOpen className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h3 className="text-amber-300 font-serif font-bold mb-2">Experience History</h3>
                <p className="text-amber-200/80 text-sm font-serif">
                  Immerse yourself in pivotal moments that shaped our world.
                </p>
              </div>

              <div className="bg-amber-900/20 border border-amber-800/40 rounded-lg p-4 text-center">
                <Compass className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h3 className="text-amber-300 font-serif font-bold mb-2">Shape Destiny</h3>
                <p className="text-amber-200/80 text-sm font-serif">
                  Your choices will echo through the ages.
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-700 to-transparent"></div>

            <p className="text-xl text-amber-200 leading-relaxed font-serif italic text-center" 
               style={{ fontFamily: 'Crimson Text, Georgia, serif' }}>
              Prepare yourself. The past is waiting, and your story is about to begin.
            </p>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <button
              onClick={onContinue}
              className="px-12 py-5 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white text-xl font-serif font-semibold rounded-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-amber-500/50"
              style={{ fontFamily: 'Cinzel, Georgia, serif' }}
            >
              Proceed to Timeline Selection
            </button>
          </div>

          {/* Footer quote */}
          <div className="text-center">
            <p className="text-amber-400/60 text-sm font-serif italic" 
               style={{ fontFamily: 'Crimson Text, Georgia, serif' }}>
              "Those who cannot remember the past are condemned to repeat it."
            </p>
            <p className="text-amber-500/40 text-xs font-serif mt-1">
              - George Santayana
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1.2s ease-out forwards;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;

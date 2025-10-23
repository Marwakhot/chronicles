import React from 'react';

const LandingPage = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-stone-900 to-black flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => {
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

      {/* Large Ornate Clock Background */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <svg width="600" height="600" viewBox="0 0 600 600" className="opacity-20 animate-clock-reveal">
          {/* Outer decorative ring */}
          <circle cx="300" cy="300" r="280" fill="none" stroke="#d97706" strokeWidth="3" opacity="0.6"/>
          <circle cx="300" cy="300" r="270" fill="none" stroke="#b45309" strokeWidth="1" opacity="0.4"/>
          
          {/* Clock face */}
          <circle cx="300" cy="300" r="250" fill="#1c1917" fillOpacity="0.3" stroke="#d97706" strokeWidth="4"/>
          
          {/* Inner decorative ring */}
          <circle cx="300" cy="300" r="240" fill="none" stroke="#92400e" strokeWidth="2" opacity="0.5"/>
          
          {/* Roman numerals */}
          <text x="300" y="90" textAnchor="middle" fill="#d97706" fontSize="36" fontFamily="serif" fontWeight="bold">XII</text>
          <text x="490" y="315" textAnchor="middle" fill="#d97706" fontSize="36" fontFamily="serif" fontWeight="bold">III</text>
          <text x="300" y="530" textAnchor="middle" fill="#d97706" fontSize="36" fontFamily="serif" fontWeight="bold">VI</text>
          <text x="110" y="315" textAnchor="middle" fill="#d97706" fontSize="36" fontFamily="serif" fontWeight="bold">IX</text>
          
          {/* Additional hour markers */}
          <text x="385" y="135" textAnchor="middle" fill="#b45309" fontSize="28" fontFamily="serif">I</text>
          <text x="440" y="210" textAnchor="middle" fill="#b45309" fontSize="28" fontFamily="serif">II</text>
          <text x="440" y="400" textAnchor="middle" fill="#b45309" fontSize="28" fontFamily="serif">IV</text>
          <text x="385" y="480" textAnchor="middle" fill="#b45309" fontSize="28" fontFamily="serif">V</text>
          <text x="215" y="480" textAnchor="middle" fill="#b45309" fontSize="28" fontFamily="serif">VII</text>
          <text x="160" y="400" textAnchor="middle" fill="#b45309" fontSize="28" fontFamily="serif">VIII</text>
          <text x="160" y="210" textAnchor="middle" fill="#b45309" fontSize="28" fontFamily="serif">X</text>
          <text x="215" y="135" textAnchor="middle" fill="#b45309" fontSize="28" fontFamily="serif">XI</text>
          
          {/* Minute markers */}
          {[...Array(60)].map((_, i) => {
            const angle = (i * 6 - 90) * Math.PI / 180;
            const isHour = i % 5 === 0;
            const r1 = isHour ? 230 : 235;
            const r2 = 245;
            const x1 = 300 + r1 * Math.cos(angle);
            const y1 = 300 + r1 * Math.sin(angle);
            const x2 = 300 + r2 * Math.cos(angle);
            const y2 = 300 + r2 * Math.sin(angle);
            return (
              <line 
                key={i} 
                x1={x1} 
                y1={y1} 
                x2={x2} 
                y2={y2} 
                stroke="#d97706" 
                strokeWidth={isHour ? 3 : 1}
                opacity={isHour ? 0.8 : 0.4}
              />
            );
          })}
          
          {/* Clock hands */}
          <g className="animate-slow-spin" style={{ transformOrigin: '300px 300px' }}>
            {/* Hour hand */}
            <line x1="300" y1="300" x2="300" y2="180" stroke="#d97706" strokeWidth="8" strokeLinecap="round" opacity="0.9"/>
            <line x1="300" y1="300" x2="300" y2="180" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round"/>
          </g>
          
          <g className="animate-medium-spin" style={{ transformOrigin: '300px 300px' }}>
            {/* Minute hand */}
            <line x1="300" y1="300" x2="300" y2="140" stroke="#d97706" strokeWidth="6" strokeLinecap="round" opacity="0.9"/>
            <line x1="300" y1="300" x2="300" y2="140" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
          </g>
          
          {/* Center decoration */}
          <circle cx="300" cy="300" r="12" fill="#d97706"/>
          <circle cx="300" cy="300" r="8" fill="#fbbf24"/>
          <circle cx="300" cy="300" r="4" fill="#1c1917"/>
          
          {/* Ornamental corners */}
          <g opacity="0.4">
            <path d="M 280 60 Q 300 50 320 60" stroke="#d97706" strokeWidth="2" fill="none"/>
            <path d="M 540 280 Q 550 300 540 320" stroke="#d97706" strokeWidth="2" fill="none"/>
            <path d="M 320 540 Q 300 550 280 540" stroke="#d97706" strokeWidth="2" fill="none"/>
            <path d="M 60 320 Q 50 300 60 280" stroke="#d97706" strokeWidth="2" fill="none"/>
          </g>
        </svg>
      </div>

      <div className="text-center z-10 space-y-10">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-7xl md:text-8xl font-serif font-bold text-amber-400 tracking-wider animate-title-reveal leading-tight" 
              style={{ fontFamily: 'Cinzel, Georgia, serif', lineHeight: '1.2' }}>
            Chronicles: Rewritten
          </h1>
          <p className="text-2xl md:text-3xl text-amber-200 italic animate-subtitle-reveal font-serif leading-relaxed" 
             style={{ fontFamily: 'Crimson Text, Georgia, serif' }}>
            Walk the roads history forget.
          </p>
        </div>

        {/* Enter Button */}
        <button
          onClick={onEnter}
          className="mt-8 px-10 py-5 bg-amber-700 hover:bg-amber-600 text-white text-lg font-serif font-semibold rounded-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-amber-500/50 animate-button-reveal"
          style={{ fontFamily: 'Cinzel, Georgia, serif' }}
        >
          Begin Your Journey
        </button>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        
        @keyframes title-reveal {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.9);
            filter: blur(10px);
          }
          60% {
            opacity: 0.8;
            transform: translateY(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        
        @keyframes subtitle-reveal {
          0% {
            opacity: 0;
            transform: translateY(20px);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        
        @keyframes button-reveal {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes clock-reveal {
          0% {
            opacity: 0;
            transform: scale(0.8) rotate(-90deg);
          }
          100% {
            opacity: 0.2;
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes slow-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes medium-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-title-reveal {
          animation: title-reveal 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }
        
        .animate-subtitle-reveal {
          animation: subtitle-reveal 1.2s ease-out 0.6s forwards;
          opacity: 0;
        }
        
        .animate-button-reveal {
          animation: button-reveal 1s ease-out 1.2s forwards;
          opacity: 0;
        }
        
        .animate-clock-reveal {
          animation: clock-reveal 2s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slow-spin {
          animation: slow-spin 120s linear infinite;
        }
        
        .animate-medium-spin {
          animation: medium-spin 60s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;

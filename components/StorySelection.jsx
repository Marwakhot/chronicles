import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Lock } from 'lucide-react';
import AncientStory from './AncientStory';
import MedievalStory from './MedievalStory';
import IndustrialStory from './IndustrialStory';
import ExplorationStory from './ExplorationStory';
import ModernStory from './ModernStory';

const StorySelection = ({ timeline, onBack }) => {
  const [selectedStory, setSelectedStory] = useState(null);

  const stories = {
    ancient: [
      {
        id: 'caesar',
        title: "Julius Caesar's Assassination",
        description: "Navigate Roman politics on the Ides of March. Will you join the conspirators, defend Caesar, or try to stay neutral? Your choices will determine your fate in one of history's most pivotal moments.",
        difficulty: 'Medium',
        themes: ['Loyalty', 'Morality', 'Politics'],
        available: true,
        component: AncientStory
      }
    ],
    medieval: [
      {
        id: 'blackdeath',
        title: 'The Black Death',
        description: 'Experience the plague that changed Europe forever. Make choices about care, escape, and faith as death sweeps through your village. Will you serve, flee, or find another path?',
        difficulty: 'Hard',
        themes: ['Survival', 'Faith', 'Community'],
        available: true,
        component: MedievalStory
      }
    ],
    exploration: [
  {
    id: 'voyage',
    title: 'Voyage of the Unknown',
    description: 'Sail with Hernán Cortés to Mexico in 1519. Face profound ethical dilemmas about conquest, cultural destruction, and your role as a translator. Will you serve Spain loyally, protect indigenous peoples, or find a middle path?',
    difficulty: 'Very Hard',
    themes: ['Ethics', 'Humanity', 'Colonialism'],
    available: true, 
    component: ExplorationStory 
  }
],
    revolution: [
  {
    id: 'factory',
    title: 'Voices of the Factory',
    description: 'Work as a laborer in the Industrial Revolution. Navigate dangerous factories, early labor movements, and social inequality.',
    difficulty: 'Hard',
    themes: ['Justice', 'Survival', 'Change'],
    available: true,
    component: IndustrialStory
  }
],
    modern: [
      {
        id: 'chernobyl',
        title: 'Chernobyl Disaster',
        description: 'Respond to an environmental catastrophe. Face decisions about survival, ethical responsibility, and human cost as a nuclear engineer during the worst nuclear accident in history.',
        difficulty: 'Very Hard',
        themes: ['Responsibility', 'Survival', 'Truth'],
        available: true,
        component: ModernStory
      }
    ]
  };

  const timelineStories = stories[timeline] || [];

  const difficultyColors = {
    'Easy': 'bg-green-900/40 text-green-300 border-green-700/50',
    'Medium': 'bg-yellow-900/40 text-yellow-300 border-yellow-700/50',
    'Hard': 'bg-orange-900/40 text-orange-300 border-orange-700/50',
    'Very Hard': 'bg-red-900/40 text-red-300 border-red-700/50'
  };

  if (selectedStory) {
    const StoryComponent = selectedStory.component;
    return <StoryComponent onBack={() => setSelectedStory(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-900 to-black relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-700 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-amber-300 hover:text-amber-100 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Timeline Selection</span>
        </button>

        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-5xl font-bold text-amber-300 font-serif" style={{ fontFamily: 'Cinzel, Georgia, serif' }}>
            {timeline.charAt(0).toUpperCase() + timeline.slice(1)} Era
          </h2>
          <p className="text-xl text-amber-100 font-serif italic" style={{ fontFamily: 'Crimson Text, Georgia, serif' }}>
            Choose your story and shape history
          </p>
        </div>

        {/* Stories Grid */}
        <div className="max-w-4xl mx-auto space-y-6">
          {timelineStories.map((story) => (
            <div
              key={story.id}
              className={`bg-gradient-to-br from-stone-900/80 to-amber-950/60 backdrop-blur-sm border-2 rounded-xl overflow-hidden transition-all duration-300 ${
                story.available
                  ? 'border-amber-700/50 hover:border-amber-600 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-700/20 cursor-pointer'
                  : 'border-stone-700/50 opacity-60'
              }`}
              onClick={() => story.available && setSelectedStory(story)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-lg ${story.available ? 'bg-amber-900/40' : 'bg-stone-800/40'}`}>
                      {story.available ? (
                        <BookOpen className="w-8 h-8 text-amber-400" />
                      ) : (
                        <Lock className="w-8 h-8 text-stone-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-serif font-bold text-amber-300" style={{ fontFamily: 'Cinzel, Georgia, serif' }}>
                          {story.title}
                        </h3>
                        {!story.available && (
                          <span className="px-3 py-1 bg-stone-800/60 text-stone-400 text-xs font-bold rounded-full">
                            COMING SOON
                          </span>
                        )}
                      </div>
                      <p className="text-amber-200/80 leading-relaxed mb-4 font-serif" style={{ fontFamily: 'Crimson Text, Georgia, serif' }}>
                        {story.description}
                      </p>
                      
                      {/* Themes */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {story.themes.map((theme) => (
                          <span
                            key={theme}
                            className="px-3 py-1 bg-amber-900/30 border border-amber-700/40 text-amber-300 text-xs font-semibold rounded-full"
                          >
                            {theme}
                          </span>
                        ))}
                      </div>

                      {/* Difficulty */}
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 border text-xs font-bold rounded-full ${difficultyColors[story.difficulty]}`}>
                          {story.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {story.available && (
                  <div className="mt-4 pt-4 border-t border-amber-800/30">
                    <button className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-serif font-semibold rounded-lg transition-all duration-300">
                      <BookOpen className="w-5 h-5" />
                      <span>Begin This Story</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
      `}</style>
    </div>
  );
};

export default StorySelection;

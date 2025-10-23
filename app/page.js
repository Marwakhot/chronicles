'use client';

import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import WelcomePage from '@/components/WelcomePage';
import TimelineSelection from '@/components/TimelineSelection';
import StorySelection from '@/components/StorySelection';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedTimeline, setSelectedTimeline] = useState(null);

  const handleEnter = () => {
    setCurrentPage('welcome');
  };

  const handleContinue = () => {
    setCurrentPage('timeline');
  };

  const handleSelectTimeline = (timelineId) => {
    setSelectedTimeline(timelineId);
    setCurrentPage('stories');
  };

  const handleBack = () => {
    setCurrentPage('timeline');
    setSelectedTimeline(null);
  };

  return (
    <main className="w-full min-h-screen">
      {currentPage === 'landing' && <LandingPage onEnter={handleEnter} />}
      {currentPage === 'welcome' && <WelcomePage onContinue={handleContinue} />}
      {currentPage === 'timeline' && <TimelineSelection onSelectTimeline={handleSelectTimeline} />}
      {currentPage === 'stories' && <StorySelection timeline={selectedTimeline} onBack={handleBack} />}
    </main>
  );
}

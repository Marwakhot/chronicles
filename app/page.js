// app/page.js
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LandingPage from '@/components/LandingPage';
import WelcomePage from '@/components/WelcomePage';
import TimelineSelection from '@/components/TimelineSelection';
import StorySelection from '@/components/StorySelection';
import AuthModal from '@/components/AuthModal';
import ProfilePage from '@/components/ProfilePage';
import GossipNewsletter from '@/components/GossipNewsletter';
import { User, LogOut, Scroll } from 'lucide-react';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showGossip, setShowGossip] = useState(false);
  const { user, logout, isAuthenticated, loading } = useAuth();

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
    if (currentPage === 'stories') {
      setCurrentPage('timeline');
      setSelectedTimeline(null);
    } else if (currentPage === 'profile') {
      setCurrentPage('timeline');
    }
  };

  const handleBackToTimeline = () => {
    setCurrentPage('timeline');
    setSelectedTimeline(null);
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('landing');
  };

  const showProfile = () => {
    setCurrentPage('profile');
  };

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-900 to-black flex items-center justify-center">
        <div className="text-amber-300 text-2xl font-serif">Loading...</div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen relative">
      {currentPage !== 'landing' && (
        <div className="fixed top-4 left-4 z-50 flex flex-col gap-3">
          <button
            onClick={() => setShowGossip(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-700 to-red-700 hover:from-amber-600 hover:to-red-600 text-white rounded-lg transition-all duration-300 shadow-lg"
          >
            <Scroll className="w-5 h-5" />
            <span className="font-semibold">The Gazette</span>
          </button>
          
          {isAuthenticated ? (
            <>
              <button
                onClick={showProfile}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white rounded-lg transition-all duration-300 shadow-lg"
              >
                <User className="w-5 h-5" />
                <span className="font-semibold">{user?.username}</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-stone-700 hover:bg-stone-600 text-white rounded-lg transition-all duration-300 shadow-lg"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-semibold">Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => openAuthModal('login')}
                className="px-4 py-2 bg-stone-700 hover:bg-stone-600 text-white rounded-lg transition-all duration-300 shadow-lg font-semibold"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="px-4 py-2 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white rounded-lg transition-all duration-300 shadow-lg font-semibold"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      )}

      {currentPage === 'landing' && <LandingPage onEnter={handleEnter} />}
      {currentPage === 'welcome' && <WelcomePage onContinue={handleContinue} />}
      {currentPage === 'timeline' && <TimelineSelection onSelectTimeline={handleSelectTimeline} />}
      {currentPage === 'stories' && <StorySelection timeline={selectedTimeline} onBack={handleBack} onBackToTimeline={handleBackToTimeline} />}
      {currentPage === 'profile' && <ProfilePage onBack={handleBack} />}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
      
      <GossipNewsletter isOpen={showGossip} onClose={() => setShowGossip(false)} />
    </main>
  );
}

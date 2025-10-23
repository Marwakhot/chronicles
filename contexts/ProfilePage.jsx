// components/ProfilePage.jsx
'use client';

import React, { useState } from 'react';
import { ArrowLeft, User, Award, BookOpen, TrendingUp, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ProfilePage = ({ onBack }) => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user?.profile?.bio || '');
  const [saving, setSaving] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-900 to-black flex items-center justify-center">
        <div className="text-amber-300 text-center">
          <p className="text-2xl">Loading profile...</p>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    const result = await updateProfile(bio, user.profile?.avatar);
    setSaving(false);
    if (result.success) {
      setIsEditing(false);
    }
  };

  const stats = user.profile?.stats || {
    totalChoices: 0,
    storiesStarted: 0,
    storiesFinished: 0,
    endingsUnlocked: []
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-9xl">👤</div>
        <div className="absolute bottom-10 right-10 text-9xl">📜</div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-amber-300 hover:text-amber-100 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Profile Header */}
        <div className="bg-gradient-to-br from-stone-900/80 to-amber-950/60 backdrop-blur-sm border-2 border-amber-800/60 rounded-xl p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-amber-200" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-4xl font-serif font-bold text-amber-300">
                  {user.username}
                </h1>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-lg transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>

              <p className="text-amber-400/80 mb-4">{user.email}</p>

              {isEditing ? (
                <div className="space-y-3">
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell your story..."
                    className="w-full px-4 py-3 bg-stone-800/50 border border-amber-800/40 rounded-lg text-amber-100 placeholder-amber-600 focus:outline-none focus:border-amber-600 transition-colors resize-none"
                    rows="4"
                    maxLength={200}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg transition-all disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setBio(user.profile?.bio || '');
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-stone-700 hover:bg-stone-600 text-white rounded-lg transition-all"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-amber-200 text-lg">
                  {user.profile?.bio || 'No bio yet. Click "Edit Profile" to add one!'}
                </p>
              )}

              <div className="mt-4 text-amber-400/60 text-sm">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-stone-900/80 to-amber-950/60 backdrop-blur-sm border-2 border-amber-800/60 rounded-xl p-6 text-center">
            <BookOpen className="w-12 h-12 text-amber-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-amber-300 mb-2">
              {stats.storiesFinished}
            </div>
            <div className="text-amber-400/80 text-sm">Stories Completed</div>
          </div>

          <div className="bg-gradient-to-br from-stone-900/80 to-amber-950/60 backdrop-blur-sm border-2 border-amber-800/60 rounded-xl p-6 text-center">
            <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-amber-300 mb-2">
              {stats.totalChoices}
            </div>
            <div className="text-amber-400/80 text-sm">Choices Made</div>
          </div>

          <div className="bg-gradient-to-br from-stone-900/80 to-amber-950/60 backdrop-blur-sm border-2 border-amber-800/60 rounded-xl p-6 text-center">
            <Award className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-amber-300 mb-2">
              {stats.endingsUnlocked?.length || 0}
            </div>
            <div className="text-amber-400/80 text-sm">Endings Unlocked</div>
          </div>

          <div className="bg-gradient-to-br from-stone-900/80 to-amber-950/60 backdrop-blur-sm border-2 border-amber-800/60 rounded-xl p-6 text-center">
            <User className="w-12 h-12 text-blue-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-amber-300 mb-2">
              {stats.storiesStarted}
            </div>
            <div className="text-amber-400/80 text-sm">Stories Started</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gradient-to-br from-stone-900/80 to-amber-950/60 backdrop-blur-sm border-2 border-amber-800/60 rounded-xl p-8">
          <h2 className="text-2xl font-serif font-bold text-amber-300 mb-6">
            Achievements & Badges
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            {stats.endingsUnlocked?.length > 0 ? (
              stats.endingsUnlocked.map((ending, index) => (
                <div
                  key={index}
                  className="bg-amber-900/20 border border-amber-700/40 rounded-lg p-4 flex items-center gap-3"
                >
                  <Award className="w-8 h-8 text-amber-400" />
                  <div>
                    <div className="text-amber-300 font-semibold">
                      Ending Unlocked
                    </div>
                    <div className="text-amber-400/60 text-sm">
                      {ending}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-amber-400/60">
                Complete stories to unlock achievements!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

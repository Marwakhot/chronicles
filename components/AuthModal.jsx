'use client';

import React, { useState, useEffect } from 'react';
import { X, User, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AuthModal = ({ isOpen, onClose, mode: initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  // Update mode when initialMode changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError('');
      setEmail('');
      setPassword('');
      setUsername('');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (mode === 'login') {
        result = await login(email, password);
      } else {
        result = await signup(email, password, username);
      }

      if (result.success) {
        onClose();
        setEmail('');
        setPassword('');
        setUsername('');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-stone-900 to-amber-950 border-2 border-amber-800/60 rounded-xl p-8 max-w-md w-full mx-4 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-400 hover:text-amber-300 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-serif font-bold text-amber-300 mb-6 text-center">
          {mode === 'login' ? 'Welcome Back' : 'Join the Chronicles'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-700/50 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-amber-300 text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-stone-800/50 border border-amber-800/40 rounded-lg text-amber-100 placeholder-amber-600 focus:outline-none focus:border-amber-600 transition-colors"
                  placeholder="Choose a username"
                  required
                  minLength={3}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-amber-300 text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-stone-800/50 border border-amber-800/40 rounded-lg text-amber-100 placeholder-amber-600 focus:outline-none focus:border-amber-600 transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-amber-300 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-stone-800/50 border border-amber-800/40 rounded-lg text-amber-100 placeholder-amber-600 focus:outline-none focus:border-amber-600 transition-colors"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            {mode === 'signup' && (
              <p className="text-amber-600 text-xs mt-1">
                Minimum 6 characters
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-amber-400 text-sm">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={switchMode}
              className="ml-2 text-amber-300 font-semibold hover:text-amber-200 transition-colors"
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

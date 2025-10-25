// contexts/AuthContext.js - WORKING VERSION
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load token and fetch profile
  useEffect(() => {
    if (!isClient) return;

    const storedToken = localStorage.getItem('auth_token');
    console.log('Checking for stored token:', storedToken ? 'Found' : 'Not found');
    
    if (storedToken) {
      setToken(storedToken);
      fetchProfile(storedToken);
    } else {
      setLoading(false);
    }
  }, [isClient]);

  const fetchProfile = async (authToken) => {
    console.log('Fetching profile with token...');
    try {
      const response = await fetch('/api/profile', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      console.log('Profile response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Profile data received:', data.user);
        setUser(data.user);
        setLoading(false);
      } else {
        console.log('Profile fetch failed, clearing token');
        localStorage.removeItem('auth_token');
        setToken(null);
        setUser(null);
        setLoading(false);
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      localStorage.removeItem('auth_token');
      setToken(null);
      setUser(null);
      setLoading(false);
    }
  };

  const signup = async (email, password, username) => {
    console.log('Signing up...');
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, username })
      });

      const data = await response.json();
      console.log('Signup response:', data);

      if (response.ok) {
        localStorage.setItem('auth_token', data.token);
        setToken(data.token);
        setUser(data.user);
        console.log('User set after signup:', data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const login = async (email, password) => {
    console.log('Logging in...');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (response.ok) {
        localStorage.setItem('auth_token', data.token);
        setToken(data.token);
        setUser(data.user);
        console.log('User set after login:', data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    console.log('Logging out...');
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (bio, avatar) => {
    if (!token) {
      console.log('No token for update');
      return { success: false, error: 'Not authenticated' };
    }

    console.log('Updating profile...');
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bio, avatar })
      });

      if (response.ok) {
        console.log('Profile updated, refreshing...');
        await fetchProfile(token);
        return { success: true };
      } else {
        const data = await response.json();
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const saveProgress = async (storyId, endingId, choices, stats) => {
    if (!token) {
      console.log('No token, cannot save progress');
      return { success: false, error: 'Not authenticated' };
    }

    console.log('Saving progress:', { storyId, endingId, choicesCount: choices.length });
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ storyId, endingId, choices, stats })
      });

      const data = await response.json();
      console.log('Progress save response:', data);

      if (response.ok) {
        console.log('Progress saved, refreshing profile...');
        await fetchProfile(token);
        return { success: true };
      } else {
        console.error('Progress save failed:', data.error);
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Progress save error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  console.log('Auth State:', { 
    hasUser: !!user, 
    hasToken: !!token, 
    loading, 
    username: user?.username 
  });

  if (!isClient) {
    return null;
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signup,
      login,
      logout,
      updateProfile,
      saveProgress,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

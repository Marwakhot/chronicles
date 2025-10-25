// contexts/AuthContext.js - WITH DEBUG LOGS
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const storedToken = localStorage.getItem('auth_token');
    console.log('🔍 Stored token:', storedToken ? 'EXISTS' : 'NONE');
    
    if (storedToken) {
      setToken(storedToken);
      fetchProfile(storedToken);
    } else {
      setLoading(false);
    }
  }, [mounted]);

  const fetchProfile = async (authToken) => {
    console.log('📡 Fetching profile...');
    try {
      const response = await fetch('/api/profile', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      console.log('📡 Profile response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ User data received:', data.user);
        setUser(data.user);
      } else {
        console.log('❌ Profile fetch failed, clearing token');
        localStorage.removeItem('auth_token');
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('❌ Profile fetch error:', error);
      localStorage.removeItem('auth_token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, username) => {
    console.log('🔐 Signing up...');
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, username })
      });

      const data = await response.json();
      console.log('📡 Signup response:', data);

      if (response.ok) {
        console.log('✅ Signup successful, saving token');
        localStorage.setItem('auth_token', data.token);
        setToken(data.token);
        setUser(data.user);
        console.log('👤 User set:', data.user);
        return { success: true };
      } else {
        console.log('❌ Signup failed:', data.error);
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('❌ Signup error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const login = async (email, password) => {
    console.log('🔐 Logging in...');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log('📡 Login response:', data);

      if (response.ok) {
        console.log('✅ Login successful, saving token');
        localStorage.setItem('auth_token', data.token);
        setToken(data.token);
        setUser(data.user);
        console.log('👤 User set:', data.user);
        return { success: true };
      } else {
        console.log('❌ Login failed:', data.error);
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    console.log('🚪 Logging out...');
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
    console.log('✅ Logged out');
  };

  const updateProfile = async (bio, avatar) => {
    if (!token) return { success: false, error: 'Not authenticated' };

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
        await fetchProfile(token);
        return { success: true };
      } else {
        const data = await response.json();
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const saveProgress = async (storyId, endingId, choices, stats) => {
    if (!token) return { success: false, error: 'Not authenticated' };

    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ storyId, endingId, choices, stats })
      });

      if (response.ok) {
        await fetchProfile(token);
        return { success: true };
      } else {
        const data = await response.json();
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  console.log('🔄 Auth state:', { 
    user: user?.username, 
    isAuthenticated: !!user, 
    loading 
  });

  if (!mounted) {
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

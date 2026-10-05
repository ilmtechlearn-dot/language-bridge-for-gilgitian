import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, pass: string, city?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User> & { currentPassword?: string; newPassword?: string }) => Promise<{ success: boolean; error?: string }>;
  toggleFavourite: (phraseId: string) => Promise<boolean>;
  favourites: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Set default auth header for axios
export const api = axios.create({
  baseURL: '',
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('glb_token'));
  const [user, setUser] = useState<User | null>(() => {
    const cached = localStorage.getItem('glb_user');
    return cached ? JSON.parse(cached) : null;
  });
  const [favourites, setFavourites] = useState<string[]>(() => {
    const cached = localStorage.getItem('glb_favourites');
    return cached ? JSON.parse(cached) : [];
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Synchronize axios headers
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('glb_token', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('glb_token');
    }
  }, [token]);

  // Load user profile on startup
  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get('/api/auth/profile');
        if (res.data?.user) {
          setUser(res.data.user);
          localStorage.setItem('glb_user', JSON.stringify(res.data.user));
          if (res.data.user.favourites) {
            setFavourites(res.data.user.favourites);
            localStorage.setItem('glb_favourites', JSON.stringify(res.data.user.favourites));
          }
        }
      } catch (err) {
        console.warn('Profile session expired or invalid:', err);
        // Clear token on 401/403
        setToken(null);
        setUser(null);
        localStorage.removeItem('glb_token');
        localStorage.removeItem('glb_user');
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [token]);

  const login = async (email: string, pass: string) => {
    try {
      const res = await api.post('/api/auth/login', { email, password: pass });
      const { token: receivedToken, user: receivedUser } = res.data;
      setToken(receivedToken);
      setUser(receivedUser);
      localStorage.setItem('glb_user', JSON.stringify(receivedUser));
      if (receivedUser.favourites) {
        setFavourites(receivedUser.favourites);
        localStorage.setItem('glb_favourites', JSON.stringify(receivedUser.favourites));
      }
      return { success: true };
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Invalid credentials. Please verify your email and password.';
      return { success: false, error: msg };
    }
  };

  const register = async (name: string, email: string, pass: string, city?: string) => {
    try {
      const res = await api.post('/api/auth/register', { name, email, password: pass, city });
      const { token: receivedToken, user: receivedUser } = res.data;
      setToken(receivedToken);
      setUser(receivedUser);
      localStorage.setItem('glb_user', JSON.stringify(receivedUser));
      return { success: true };
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Registration failed. Please check your details.';
      return { success: false, error: msg };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('glb_token');
    localStorage.removeItem('glb_user');
  };

  const updateProfile = async (data: Partial<User> & { currentPassword?: string; newPassword?: string }) => {
    try {
      const res = await api.put('/api/auth/profile', data);
      const updatedUser = res.data.user;
      setUser(updatedUser);
      localStorage.setItem('glb_user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Failed to update profile.';
      return { success: false, error: msg };
    }
  };

  const toggleFavourite = async (phraseId: string): Promise<boolean> => {
    if (!phraseId) return false;

    // Offline / guest favourite fallback
    if (!token) {
      const exists = favourites.includes(phraseId);
      const updated = exists ? favourites.filter((id) => id !== phraseId) : [...favourites, phraseId];
      setFavourites(updated);
      localStorage.setItem('glb_favourites', JSON.stringify(updated));
      return !exists;
    }

    try {
      const res = await api.post(`/api/favourites/${phraseId}`);
      if (res.data?.favourites) {
        setFavourites(res.data.favourites);
        localStorage.setItem('glb_favourites', JSON.stringify(res.data.favourites));
      }
      return !!res.data?.isFavourite;
    } catch (err) {
      console.error('Failed to toggle favourite on server:', err);
      // fallback locally
      const exists = favourites.includes(phraseId);
      const updated = exists ? favourites.filter((id) => id !== phraseId) : [...favourites, phraseId];
      setFavourites(updated);
      return !exists;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        loading,
        login,
        register,
        logout,
        updateProfile,
        toggleFavourite,
        favourites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

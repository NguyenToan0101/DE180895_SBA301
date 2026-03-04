'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from './types';
import { getAuthToken, setAuthToken, clearAuthToken, logout as apiLogout } from './api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved token on mount
    const savedToken = getAuthToken();
    if (savedToken) {
      setToken(savedToken);
      // Note: In a real app, you'd verify the token here
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    setAuthToken(authToken);
  };

  const logout = async () => {
    // Call logout API
    await apiLogout();
    // Clear local state
    setUser(null);
    setToken(null);
    clearAuthToken();
    // Redirect to login
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
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

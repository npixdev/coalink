"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  isPro: boolean;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  upgradeToPro: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check local storage for persistent login
    const storedUser = localStorage.getItem('coalink_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    const newUser = {
      ...userData,
      name: userData.username, // Ensure name is populated
    };
    setUser(newUser);
    localStorage.setItem('coalink_user', JSON.stringify(newUser));
    router.push('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('coalink_user');
    router.push('/');
  };

  const upgradeToPro = () => {
    if (user) {
        const updatedUser = { ...user, isPro: true };
        setUser(updatedUser);
        localStorage.setItem('coalink_user', JSON.stringify(updatedUser));
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, upgradeToPro, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

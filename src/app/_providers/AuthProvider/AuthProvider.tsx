'use client';
import { IDENTITY_KEY } from '@/constants';
import {
  AuthUserInfo,
  onUserChanged,
  loginWithGoogle,
  logout,
} from '@/lib/service/firebaseService';
import { User } from 'firebase/auth';
import React, { useState, useEffect } from 'react';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authUser, setAuthUser] = useState<AuthUserInfo | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(IDENTITY_KEY);
    if (stored) {
      try {
        const parsed: AuthUserInfo = JSON.parse(stored);
        setAuthUser(parsed);
        setUser(parsed.user);
      } catch (err) {
        console.warn('Failed to parse stored auth user:', err);
      }
    }

    const unsubscribe = onUserChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    const info = await loginWithGoogle();
    setUser(info.user);
    setAuthUser(info);
    localStorage.setItem(IDENTITY_KEY, JSON.stringify(info));
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
    setAuthUser(null);
    localStorage.removeItem(IDENTITY_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, authUser, login, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

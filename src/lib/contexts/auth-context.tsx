'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  loginWithGoogle,
  logout,
  onUserChanged,
} from '../service/firebaseService';

interface AuthContextType {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onUserChanged(setUser);
    return () => unsubscribe();
  }, []);

  const login = async () => {
    const u = await loginWithGoogle();
    setUser(u);
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

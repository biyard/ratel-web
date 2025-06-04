'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, User } from 'firebase/auth';
import {
  AuthUserInfo,
  loginWithGoogle,
  logout,
  onUserChanged,
} from '../service/firebaseService';
import { listFiles } from '../api/drive';

interface AuthContextType {
  user: User | null;
  authUser: AuthUserInfo | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authUser: null,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authUser, setAuthUser] = useState<AuthUserInfo | null>(null);

  useEffect(() => {
    const unsubscribe = onUserChanged(setUser);
    return () => unsubscribe();
  }, []);

  const login = async () => {
    const info = await loginWithGoogle();

    setUser(info.user);
    setAuthUser(info);
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authUser, login, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

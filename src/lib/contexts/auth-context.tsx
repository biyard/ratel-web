'use client';

import { createContext, useContext } from 'react';
import { User } from 'firebase/auth';
import { AuthUserInfo } from '../service/firebaseService';
import { Ed25519KeyIdentity } from '@dfinity/identity';

interface AuthContextType {
  ed25519KeyPair: Ed25519KeyIdentity | null;
  user: User | null;
  authUser: AuthUserInfo | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  ed25519KeyPair: null,
  user: null,
  authUser: null,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function useEd25519KeyPair(): Ed25519KeyIdentity {
  const { ed25519KeyPair } = useAuth();

  if (!ed25519KeyPair) throw NoEd25519KeyPair;

  ed25519KeyPair!;
}

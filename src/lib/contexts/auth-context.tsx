'use client';

import { createContext, useContext } from 'react';
import { User } from 'firebase/auth';
import { AuthUserInfo } from '../service/firebase-service';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import { NoEd25519KeyPair } from '@/errors';

interface AuthContextType {
  ed25519KeyPair: Ed25519KeyIdentity | null;
  user: User | null;
  authUser: AuthUserInfo | null;
  login: (keyPair: Ed25519KeyIdentity) => Promise<void>;
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

  return ed25519KeyPair!;
}

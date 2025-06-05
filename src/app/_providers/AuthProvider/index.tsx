'use client';

import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  AuthUserInfo,
  loginWithGoogle,
  logout,
  onUserChanged,
} from '@/lib/service/firebaseService';
import { ANONYMOUS_IDENTITY_KEY, IDENTITY_KEY } from '@/constants';
import { AuthContext } from '@/lib/contexts/auth-context';
import { logger } from '@/lib/logger';
import {
  createEd25519KeyPair,
  encodeEd25519PrivateKeyToPkcs8Base64,
  restoreEd25519KeyPair,
} from '@/lib/wallet/ed25519';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authUser, setAuthUser] = useState<AuthUserInfo | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(IDENTITY_KEY);
    if (stored) {
      let identity = restoreEd25519KeyPair(stored);
      logger.debug('Restored principal:', identity.getPrincipal().toText());

      /* const parsed: AuthUserInfo = JSON.parse(stored);
       * setAuthUser(parsed);
       * setUser(parsed.user); */
    } else {
      const stored = localStorage.getItem(ANONYMOUS_IDENTITY_KEY);
      if (stored) {
        let identity = restoreEd25519KeyPair(stored);

        logger.debug(
          'Restored anonymous principal:',
          identity.getPrincipal().toText(),
        );
      } else {
        const identity = createEd25519KeyPair();
        logger.debug(
          'Created new principal:',
          identity.getPrincipal().toText(),
        );
        const encoded_identity = encodeEd25519PrivateKeyToPkcs8Base64(identity);

        localStorage.setItem(ANONYMOUS_IDENTITY_KEY, encoded_identity);
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

'use client';

import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  AuthUserInfo,
  loginWithGoogle as loginWithGoogle,
  logout,
  onUserChanged,
} from '@/lib/service/firebase-service';
import { SK_ANONYMOUS_IDENTITY_KEY, SK_IDENTITY_KEY } from '@/constants';
import { AuthContext } from '@/lib/contexts/auth-context';
import { logger } from '@/lib/logger';
import {
  createEd25519KeyPair,
  encodeEd25519PrivateKeyToPkcs8Base64,
  restoreEd25519KeyPair,
} from '@/lib/wallet/ed25519';
import { Ed25519KeyIdentity } from '@dfinity/identity';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [authUser, setAuthUser] = useState<AuthUserInfo | undefined>(undefined);
  const [ed25519KeyPair, setEd25519KeyPair] =
    useState<Ed25519KeyIdentity | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(SK_IDENTITY_KEY);

    try {
      if (stored) {
        // for our users
        const identity = restoreEd25519KeyPair(stored);
        logger.debug('Restored principal:', identity.getPrincipal().toText());

        setEd25519KeyPair(identity);
        localStorage.setItem(SK_ANONYMOUS_IDENTITY_KEY, stored);
      } else {
        // for guests
        const stored = localStorage.getItem(SK_ANONYMOUS_IDENTITY_KEY);

        if (stored) {
          // previousely visited
          const identity = restoreEd25519KeyPair(stored);
          setEd25519KeyPair(identity);

          logger.debug(
            'Restored anonymous principal:',
            identity.getPrincipal().toText(),
          );
        } else {
          // first visited
          const identity = createEd25519KeyPair();

          logger.debug(
            'Created new principal:',
            identity.getPrincipal().toText(),
          );

          setEd25519KeyPair(identity);
          const encoded_identity =
            encodeEd25519PrivateKeyToPkcs8Base64(identity);

          localStorage.setItem(SK_ANONYMOUS_IDENTITY_KEY, encoded_identity);
        }
      }
    } catch (error) {
      logger.error('Failed to restore identity:', error);
      localStorage.removeItem(SK_IDENTITY_KEY);
      localStorage.removeItem(SK_ANONYMOUS_IDENTITY_KEY);

      const identity = createEd25519KeyPair();

      logger.debug('Created new principal:', identity.getPrincipal().toText());

      setEd25519KeyPair(identity);
      const encoded_identity = encodeEd25519PrivateKeyToPkcs8Base64(identity);

      localStorage.setItem(SK_ANONYMOUS_IDENTITY_KEY, encoded_identity);
    }

    const unsubscribe = onUserChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const login = async (keyPair: Ed25519KeyIdentity) => {
    logger.debug('login');
    const info = await loginWithGoogle(keyPair);
    localStorage.setItem(SK_IDENTITY_KEY, info.contents);
    localStorage.setItem(SK_ANONYMOUS_IDENTITY_KEY, info.contents);

    setEd25519KeyPair(info.keyPair);
  };

  const logoutUser = async () => {
    await logout();
    setUser(undefined);
    setAuthUser(undefined);
    localStorage.removeItem(SK_IDENTITY_KEY);
    localStorage.removeItem(SK_ANONYMOUS_IDENTITY_KEY);

    const identity = createEd25519KeyPair();

    logger.debug('Created new principal:', identity.getPrincipal().toText());

    setEd25519KeyPair(identity);
    const encoded_identity = encodeEd25519PrivateKeyToPkcs8Base64(identity);

    localStorage.setItem(SK_ANONYMOUS_IDENTITY_KEY, encoded_identity);
  };

  return (
    <AuthContext.Provider
      value={{ ed25519KeyPair, user, authUser, login, logout: logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

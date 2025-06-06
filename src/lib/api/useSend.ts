'use client';

import { config } from '@/config';
import { useCookie } from '../contexts/cookie-context';
import { useAuth } from '../contexts/auth-context';
import { logger } from '../logger';
import { encode_base64 } from '../base64';
import { Ed25519KeyIdentity } from '@dfinity/identity';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SendFn = (path: string) => Promise<any>;

export function useSend(): SendFn {
  const auth = useAuth();
  const cookie = useCookie();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async function send(path: string): Promise<any> {
    const apiBaseUrl: string = config.api_url;
    let token = cookie?.token;
    let token_type = '';

    if (!token && auth.ed25519KeyPair) {
      const keyPair = auth.ed25519KeyPair;
      const pk = keyPair.getPublicKey().rawKey;
      const publicKey = encode_base64(new Uint8Array(pk));
      const timestamp = Math.floor(Date.now() / 1000);
      const msg = `${config.sign_domain}-${timestamp}`;
      logger.debug('Signing message:', msg, 'with public key:', publicKey);
      const encoder = new TextEncoder();
      const msg_bytes = encoder.encode(msg).buffer as ArrayBuffer;
      const sig = await keyPair.sign(msg_bytes);

      logger.debug('Signature:', sig, 'Public Key:', pk);

      logger.debug('verified: ', Ed25519KeyIdentity.verify(sig, msg_bytes, pk));
      const s = encode_base64(new Uint8Array(sig.slice()));

      token_type = 'UserSig';
      token = `${timestamp}:eddsa:${publicKey}:${s}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const headers: any = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `${token_type} ${token}`;

    const response = await fetch(`${apiBaseUrl}${path}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: 'Failed to fetch and parse error',
      }));
      throw new Error(errorData?.message || `HTTP ${response.status}`);
    }

    return response.json();
  };
}

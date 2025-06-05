'use client';

import { config } from '@/config';
import { useCookie } from '../contexts/cookie-context';
import { logger } from '../logger';
import { useAuth } from '../contexts/auth-context';
import { toHex } from '@dfinity/agent';

export async function send(path: string): Promise<any> {
  logger.debug('sending request', path);
  const apiBaseUrl = config.api_url;
  let token = undefined;
  let token_type = '';
  logger.debug('send', token, apiBaseUrl);

  try {
    token = useCookie()?.token;
  } catch (e) {
    logger.debug('no cookie');
  }

  try {
    if (!token) {
      // NOTE: it should be set before this.
      const keyPair = useAuth().ed25519KeyPair!;

      const publicKey = toHex(keyPair.getPublicKey().rawKey);

      logger.debug('Using public key for anonymous request:', publicKey);
      const timestamp = Math.floor(Date.now() / 1000);
      const msg = `${config.sign_domain}-${timestamp}`;

      logger.debug('sign message: ', msg);

      token_type = 'UserSig';
      const encoder = new TextEncoder();

      const sig = await keyPair?.sign(
        encoder.encode(msg).buffer as ArrayBuffer,
      );

      token = `${timestamp}:eddsa:${publicKey}:${toHex(sig.slice())}`;
    }
  } catch {
    logger.debug('no auth has been set');
  }

  logger.debug(
    'Sending request to:',
    `${apiBaseUrl}${path}`,
    'with token:',
    token_type,
    token,
  );

  var req: any = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    req.headers['Authorization'] = `${token_type} ${token}`;
  }

  logger.debug(`${apiBaseUrl}${path}`, req);

  const response = await fetch(`${apiBaseUrl}${path}`, req);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message:
        'Failed to fetch user profile and could not parse error response.',
    }));
    throw new Error(errorData || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

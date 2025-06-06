'use client';

import { config } from '@/config';
import { logger } from '../logger';
import { getCookieContext } from '@/app/_providers/CookieProvider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function send(path: string): Promise<any> {
  logger.debug('sending request', path);
  const apiBaseUrl = config.api_url;
  const c = await getCookieContext();
  const token = c.token || '';
  const token_type = 'Bearer';
  logger.debug('send', token, apiBaseUrl);

  logger.debug(
    'Sending request to:',
    `${apiBaseUrl}${path}`,
    'with token:',
    token_type,
    token,
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const req: any = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token !== '') {
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

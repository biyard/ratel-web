import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/config';
import { ratelApi } from '@/lib/api/ratel_api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const apiBaseUrl: string = config.api_url;
  const targetUrl = `${apiBaseUrl}${ratelApi.users.login()}`;

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      headers: req.headers as any,
      credentials: 'include',
    });

    const body = await response.text();
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.status(response.status).send(body);
  } catch (error) {
    console.error('Error fetching login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

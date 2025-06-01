import { config } from '@/config';
import { useCookie } from '../contexts/cookie-context';

export async function send(path: string): Promise<any> {
  const apiBaseUrl = config.api_url;
  const token = useCookie()?.token;

  var req: any = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    req.headers['Authorization'] = `Bearer ${token}`;
  }

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

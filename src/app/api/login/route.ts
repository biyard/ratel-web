import { config } from '@/config';
import { ratelApi } from '@/lib/api/ratel_api';
import { logger } from '@/lib/logger';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const apiBaseUrl: string = config.api_url;

  const targetUrl = `${apiBaseUrl}${ratelApi.users.login()}`;
  logger.debug('request headers', request.headers);
  const res = await fetch(targetUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: request.headers.get('authorization') || '',
    },
  });

  const proctocol = request.headers.get('x-forwarded-proto') || 'http';
  const host = request.headers.get('host') || 'localhost';
  const port = request.headers.get('x-forwarded-port') || '8080';
  let origin = `${proctocol}://${host}`;

  if (port && port !== '80' && port !== '443') {
    origin += `:${port}`;
  }

  logger.debug('response header', res.headers);
  const setCookie = res.headers.get('set-cookie') ?? '';
  const idCookie = setCookie
    .split(',')
    .find((cookie) => cookie.trim().startsWith('id='))
    ?.trim();
  let cookie = `${idCookie}; Path=/; HttpOnly; Domain=.${host};`;

  if (proctocol === 'https') {
    cookie += 'SameSite=None; Secure;';
  } else {
    cookie += 'SameSite=Lax;';
  }
  logger.debug('cookie', cookie);

  return new NextResponse(res.body, {
    status: res.status,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Set-Cookie': cookie,
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
  });
}

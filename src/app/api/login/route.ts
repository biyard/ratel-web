import { config } from '@/config';
import { ratelApi } from '@/lib/api/ratel_api';
import { logger } from '@/lib/logger';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  logger.debug('[GET /api/login] incoming');
  const password = request.nextUrl.searchParams.get('password');
  const email = request.nextUrl.searchParams.get('email');

  const apiBaseUrl: string = config.api_url;

  let targetUrl = `${apiBaseUrl}${ratelApi.users.login()}`;
  if (email && password && password !== '') {
    const path = ratelApi.users.loginWithPassword(email, password);
    targetUrl = `${apiBaseUrl}${path}`;
  }

  logger.debug('request headers', request.headers);
  logger.debug('targetUrl', targetUrl);
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
    .split(';')
    .find((cookie) => cookie.trim().startsWith('id='))
    ?.trim();

  let cookie = `${idCookie}; Path=/; Max-Age=2586226;`;

  if (proctocol === 'https') {
    cookie += ` HttpOnly; SameSite=None; Secure; Domain=.${host};`;
  } else {
    cookie += ` SameSite=Lax;`;
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

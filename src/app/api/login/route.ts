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

  console.log('header', res.headers);

  return new NextResponse(res.body, {
    status: res.status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      ...res.headers,
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

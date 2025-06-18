import { config } from '@/config';
import { ratelApi } from '@/lib/api/ratel_api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const apiBaseUrl: string = config.api_url;

  const targetUrl = `${apiBaseUrl}${ratelApi.users.login()}`;
  const headers = new Headers(request.headers);
  const res = await fetch(targetUrl, {
    method: 'GET',
    headers,
    credentials: 'include',
  });

  console.log('header', res.headers);

  return new NextResponse(res.body, {
    status: res.status,
    headers: res.headers,
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

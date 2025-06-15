import { headers as getHeaders, cookies as getCookies } from 'next/headers';
import { NextRequest } from 'next/server';

export type ServerFetchResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  ok: boolean;
};

export async function serverFetch<T = any>(
  url: string,
  options?: RequestInit & { nextRequest?: NextRequest; ignoreError?: boolean },
): Promise<ServerFetchResponse<T | null>> {
  const headersList = await getHeaders();
  const clientCookies = headersList.get('cookie');

  let method = options?.method || 'GET';
  let body = options?.body;
  let contentType = headersList.get('content-type') || 'application/json';

  if (options?.nextRequest) {
    method = options.nextRequest.method;
    contentType =
      options.nextRequest.headers.get('content-type') || contentType;
  }

  const requestHeaders = new Headers(options?.headers);
  if (clientCookies) {
    requestHeaders.set('Cookie', clientCookies);
  }
  if (!requestHeaders.has('Content-Type') && body && typeof body === 'string') {
    requestHeaders.set('Content-Type', contentType);
  }

  try {
    const response = await fetch(url, {
      ...options,
      method,
      headers: requestHeaders,
      body: body,
      cache: options?.cache || 'no-store',
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.log(
        `Error fetching ${url}: ${response.status} ${response.statusText}`,
      );
      if (options?.ignoreError) {
        return {
          data: null,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          ok: false,
        };
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data: T = await response.json();
    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      ok: true,
    };
  } catch (error) {
    console.error(`Error during server-side fetch to ${url}:`, error);
    if (options?.ignoreError) {
      return {
        data: null,
        status: 500,
        statusText:
          error instanceof Error ? error.message : 'Unknown server error',
        headers: new Headers(),
        ok: false,
      };
    }
    throw error;
  }
}

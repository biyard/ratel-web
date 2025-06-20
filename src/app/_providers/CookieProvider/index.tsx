import { cookies } from 'next/headers';
import CookieProviderClient from './client';
import { ReactNode } from 'react';

export default async function CookieProvider({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();

  const token = cookieStore.get('auth_token')?.value;
  const userId = cookieStore.get('user_id')?.value;
  const id = cookieStore.get('id')?.value;

  const isLoggedIn = !!token && !!userId;

  return (
    <CookieProviderClient value={{ isLoggedIn, userId, id }}>
      {children}
    </CookieProviderClient>
  );
}

export type CookieContext = {
  userId?: string;
  token?: string;
  id?: string;
};

export async function getCookieContext(): Promise<CookieContext> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const userId = cookieStore.get('user_id')?.value;
  const id = cookieStore.get('id')?.value;

  return { userId, token, id };
}

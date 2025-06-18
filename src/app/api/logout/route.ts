import { NextResponse } from 'next/server';

//FIXME: This logic needs to be implemented on the backend. And just call the logout endpoint like proxy.
export async function POST() {
  const response = NextResponse.json(
    { message: 'Logout successful' },
    { status: 200 },
  );

  response.cookies.set('id', '', {
    maxAge: 0,
    path: '/',
    sameSite: 'lax',
    secure: true,
    httpOnly: true,
  });

  return response;
}

import { NextRequest, NextResponse } from 'next/server';

//FIXME: This logic needs to be implemented on the backend. And just call the logout endpoint like proxy.
export async function POST(request: NextRequest) {
  const host = request.headers.get('host') || 'localhost';

  const response = NextResponse.json(
    { message: 'Logout successful' },
    { status: 200 },
  );

  response.cookies.set('id', '', {
    maxAge: 0,
    path: '/',
    sameSite: 'none',
    domain: `.${host}`,
    secure: true,
    httpOnly: true,
  });

  return response;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

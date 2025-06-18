import type { NextApiRequest, NextApiResponse } from 'next';

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Set the 'id' cookie to expire immediately
  res.setHeader('Set-Cookie', [
    `id=; Max-Age=0; Path=/; SameSite=Lax; HttpOnly; Secure`,
  ]);

  return res.status(200).json({ message: 'Logout successful' });
}

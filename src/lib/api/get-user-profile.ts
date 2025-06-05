'use client';

import { useSend } from './useSend';

export interface UserProfile {
  name: string;
  profile_url: string;
  // Add other profile properties as needed
}

export async function getUserProfile(): Promise<UserProfile> {
  const send = useSend();

  return await send('/v1/user/profile');
}

'use client';

import { send } from './send';

export interface UserProfile {
  name: string;
  profile_url: string;
  // Add other profile properties as needed
}

export async function getUserProfile(): Promise<UserProfile> {
  return await send('/v1/user/profile');
}

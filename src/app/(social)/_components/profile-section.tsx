import React from 'react';
import Image from 'next/image';
import { User } from '@/lib/api/models/user';
import TeamSelector from './team-selector';
import UserTier from './UserTier';
import UserBadges from './user-badges';

interface ProfileSectionProps {
  user: User;
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  return (
    <div className="flex flex-col gap-5 px-4 py-5 rounded-[10px] bg-component-bg">
      <TeamSelector user={user} />

      <div className="relative">
        <Image
          src={user.profile_url || '/default-profile.png'}
          alt={user.nickname}
          width={80}
          height={80}
          className="rounded-full border-2 border-primary object-cover object-top"
        />
      </div>

      <div className="font-medium">{user?.nickname}</div>

      <div
        id="user-profile-description"
        className="text-xs text-gray-400"
        dangerouslySetInnerHTML={{ __html: user.html_contents }}
      />

      <UserTier />
      <UserBadges />
    </div>
  );
}

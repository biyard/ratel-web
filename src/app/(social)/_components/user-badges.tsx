import { Badge } from '@/lib/api/models/user';
import React from 'react';

export interface UserBadgesProps {
  badges: Badge[];
}

export default function UserBadges({ badges }: { badges: Badge[] }) {
  return (
    <div className="grid grid-cols-5 gap-2.5 items-center justify-start">
      {badges.map((badge, index) => (
        <img
          key={`user-badge-${index}`}
          className="rounded-lg object-cover w-10 h-10 "
          src={badge.image_url}
        />
      ))}
    </div>
  );
}

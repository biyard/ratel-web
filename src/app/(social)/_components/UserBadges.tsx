import React from 'react';

export interface UserBadgesProps {
  images: string[];
}

export default function UserBadges() {
  let badges = [
    '/images/digitalact-sol2.gif',
    '/images/digitalact-dog2.gif',
    '/images/digitalact-kaia2.gif',
  ];

  return (
    <div className="grid grid-cols-5 gap-2.5 items-center justify-start">
      {badges.map((badge, index) => (
        <img
          key={`user-badge-${index}`}
          className="rounded-lg object-cover w-10 h-10 "
          src={badge}
        />
      ))}
    </div>
  );
}

'use client';
import React from 'react';
import Image from 'next/image';
import TeamSelector from './team-selector';
import UserTier from './UserTier';
import UserBadges from './user-badges';
import { useSuspenseUserInfo } from '@/lib/api/hooks/users';
import { Team } from '@/lib/api/models/team';

export default function ProfileSection() {
  const { data } = useSuspenseUserInfo();
  const user = data!;

  const teams: Team[] = [
    {
      ...user,
    },
    ...(user.teams ?? []),
  ];

  const [selectedTeam, setSelectedTeam] = React.useState(0);
  const team = teams[selectedTeam];

  const handleTeamSelect = (i: number) => {
    console.log('Selected team:', i);
    setSelectedTeam(i);
  };

  return (
    <div className="flex flex-col gap-5 px-4 py-5 rounded-[10px] bg-component-bg">
      <TeamSelector onSelect={handleTeamSelect} />

      <div className="relative">
        <Image
          src={team.profile_url || '/default-profile.png'}
          alt={team.nickname}
          width={80}
          height={80}
          className="rounded-full border-2 object-cover object-top"
        />
      </div>

      <div className="font-medium">{team.nickname}</div>

      <div
        id="user-profile-description"
        className="text-xs text-gray-400"
        dangerouslySetInnerHTML={{ __html: team.html_contents }}
      />

      <UserTier />
      <UserBadges badges={user.badges ? user.badges : []} />
    </div>
  );
}

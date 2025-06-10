'use client';
import React, { useContext, useMemo } from 'react';
import Image from 'next/image';
import TeamSelector from './team-selector';
import UserTier from './UserTier';
import UserBadges from './user-badges';
import { useSuspenseUserInfo } from '@/lib/api/hooks/users';
import { TeamContext } from '@/lib/contexts/team-context';

export default function ProfileSection() {
  const { data } = useSuspenseUserInfo();
  const user = data!;

  const { teams, selectedIndex, setSelectedTeam } = useContext(TeamContext);
  const team = useMemo(() => teams[selectedIndex], [teams, selectedIndex]);

  if (!team) {
    return <div />;
  }

  const handleTeamSelect = (i: number) => {
    setSelectedTeam(i);
  };

  return (
    <div className="flex flex-col gap-5 px-4 py-5 rounded-[10px] bg-component-bg">
      <TeamSelector onSelect={handleTeamSelect} team={team} />

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

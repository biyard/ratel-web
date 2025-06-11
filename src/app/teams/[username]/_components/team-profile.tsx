import React from 'react';
import Image from 'next/image';
import { Team } from '@/lib/api/models/team';
import TeamSelector from '@/app/(social)/_components/team-selector';

export interface TeamProfileProps {
  team?: Team;
}

export default function TeamProfile({ team }: TeamProfileProps) {
  if (!team) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col gap-5 px-4 py-5 rounded-[10px] bg-component-bg">
      <TeamSelector team={team} />
      <div className="relative">
        <Image
          src={team?.profile_url || '/default-profile.png'}
          alt={team?.nickname ?? 'team profile'}
          width={80}
          height={80}
          className="rounded-full border-2 object-cover object-top w-[80px] h-[80px]"
        />
      </div>

      <div className="font-medium">{team.nickname}</div>

      <div
        id="user-profile-description"
        className="text-xs text-gray-400"
        dangerouslySetInnerHTML={{ __html: team.html_contents }}
      />
    </div>
  );
}

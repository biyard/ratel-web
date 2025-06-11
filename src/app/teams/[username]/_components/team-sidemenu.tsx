import React from 'react';
// import { Users, MessageSquare } from 'lucide-react';
import { Team } from '@/lib/api/models/team';
import TeamProfile from './team-profile';
import Link from 'next/link';
import { route } from '@/route';
import { UserGroup } from '@/components/icons';

export interface TeamSidemenuProps {
  team: Team;
}

export default function TeamSidemenu({ team }: TeamSidemenuProps) {
  return (
    <div className="w-64 flex flex-col max-mobile:!hidden gap-2.5">
      <TeamProfile team={team} />

      <nav className="px-2 py-5 px-3 w-full rounded-[10px] bg-component-bg">
        <Link href={route.teams()} className="sidemenu-link">
          <UserGroup />
          <span>Teams</span>
        </Link>
        <Link href={route.groups()} className="sidemenu-link">
          <UserGroup />
          <span>Groups</span>
        </Link>
      </nav>

      {/* <nav className="mt-4 px-2">
        <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-800">
          <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center">
            <Users size={12} />
          </div>
          <span className="text-sm">Profile</span>
        </div>
        <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-800">
          <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center">
            <MessageSquare size={12} />
          </div>
          <span className="text-sm">Threads</span>
        </div>
        <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-800">
          <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center">
            <Users size={12} />
          </div>
          <span className="text-sm">Manage Group</span>
        </div>
        <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-800">
          <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center">
            <Users size={12} />
          </div>
          <span className="text-sm">Settings</span>
        </div>
      </nav> */}
    </div>
  );
}

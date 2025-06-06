import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from '@/lib/api/models/user';
import { usePopup } from '@/lib/contexts/popup-service';
import { logger } from '@/lib/logger';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import TeamCreationPopup from '../_popups/team-creation-popup';

export interface TeamSelectorProps {
  user: User;
}

export interface TeamItem {
  id: number;
  name: string;
  profile_url: string;
}

export default function TeamSelector({ user }: TeamSelectorProps) {
  const [teams] = React.useState<TeamItem[]>([
    {
      id: user.id,
      name: user.nickname,
      profile_url: user.profile_url || '',
    },
  ]);

  const [selectedTeam, setSelectedTeam] = useState(0);
  const popup = usePopup();

  /* const _teams_ids = Array.from(
   *   new Map(user.groups.map((group) => [group.user_id, group])).values(),
   * ); */

  logger.debug('TeamSelector groups:', teams);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full flex items-center justify-between px-2 py-2 focus:outline-none">
          <span>{teams[selectedTeam].name}</span>
          <ChevronDown size={16} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] bg-bg">
        <DropdownMenuLabel>Teams</DropdownMenuLabel>
        <DropdownMenuGroup>
          {teams.map((team, index) => (
            <DropdownMenuItem
              key={`team-select-menu-${team.id}`}
              onClick={() => {
                setSelectedTeam(index);
              }}
            >
              <img
                src={team.profile_url || '/default-profile.png'}
                alt={team.name}
                className="w-6 h-6 rounded-full object-cover object-top"
              />
              <span>{team.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              logger.debug('Create team clicked');
              popup.open(<TeamCreationPopup />).withTitle('Create a new team');
            }}
          >
            <span>Create a team</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              logger.debug('Create team clicked');
            }}
          >
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

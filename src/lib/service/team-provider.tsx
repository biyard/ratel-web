'use client';

import React, { useState, useMemo } from 'react';
import { Team } from '@/lib/api/models/team';
import { useSuspenseUserInfo } from '@/lib/api/hooks/users';
import { TeamContext } from '@/lib/contexts/team-context';

export const TeamProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useSuspenseUserInfo();
  const [selectedIndex, setSelectedTeam] = useState(0);

  const teams: Team[] = useMemo(() => {
    if (!user) return [];
    return [{ ...user }, ...(user.teams ?? [])];
  }, [user]);

  const selectedTeam: Team | undefined = useMemo(() => {
    return teams[selectedIndex];
  }, [teams, selectedIndex]);

  return (
    <TeamContext.Provider
      value={{
        teams,
        selectedTeam,
        selectedIndex,
        setSelectedTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

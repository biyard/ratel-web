'use client';

import React, { useState, useMemo } from 'react';
import { Team } from '@/lib/api/models/team';
import { useSuspenseUserInfo } from '@/lib/api/hooks/users';
import { TeamContext } from '@/lib/contexts/team-context';

export const TeamProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useSuspenseUserInfo();

  const teams: Team[] = useMemo(() => {
    return user ? [{ ...user }, ...(user.teams ?? [])] : [];
  }, [user]);

  const [selectedIndex, setSelectedTeam] = useState(0);

  const selectedTeam = useMemo(() => {
    return teams[selectedIndex] ?? null;
  }, [teams, selectedIndex]);

  if (!user || teams.length === 0 || selectedTeam === null) {
    return null;
  }

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

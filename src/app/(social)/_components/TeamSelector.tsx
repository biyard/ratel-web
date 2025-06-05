import { Group } from '@/lib/api/models/user';
import { logger } from '@/lib/logger';
import { ChevronDown } from 'lucide-react';
import React from 'react';

export interface TeamSelectorProps {
  groups: Group[];
}

export default function TeamSelector({ groups }: TeamSelectorProps) {
  const teams = Array.from(
    new Map(groups.map((group) => [group.user_id, group])).values(),
  );

  logger.debug('TeamSelector groups:', teams);

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span>[Group name]</span>
        <div className="w-2 h-2 rounded-full bg-[#fcb300]"></div>
      </div>
      <ChevronDown size={16} />
    </div>
  );
}

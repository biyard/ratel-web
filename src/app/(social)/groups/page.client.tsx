'use client';
import { Edit1 } from '@/components/icons';
import { usePopup } from '@/lib/contexts/popup-service';
import React, { useContext, useMemo } from 'react';
import CreateGroupPopup from './_components/create-group-popup';
import { createGroupRequest, GroupPermission } from '@/lib/api/models/group';
import { TeamContext } from '@/lib/contexts/team-context';
import { useApiCall } from '@/lib/api/use-send';
import { ratelApi } from '@/lib/api/ratel_api';
import { logger } from '@/lib/logger';

export default function Home() {
  const popup = usePopup();
  const { post } = useApiCall();

  const { teams, selectedIndex } = useContext(TeamContext);
  const team = useMemo(() => teams[selectedIndex], [teams, selectedIndex]);

  if (!team) {
    return <div />;
  }

  return (
    <div className="flex flex-col w-full gap-2.5">
      <div className="flex flex-row w-full justify-end items-end">
        <CreateGroupButton
          onClick={() => {
            popup
              .open(
                <CreateGroupPopup
                  onCreate={async (
                    profileUrl: string,
                    groupName: string,
                    groupDescription: string,
                    groupPermissions: GroupPermission[],
                  ) => {
                    try {
                      await post(
                        ratelApi.groups.create_group(team.id),
                        createGroupRequest(
                          groupName,
                          groupDescription,
                          profileUrl,
                          [],
                          groupPermissions,
                        ),
                      );

                      popup.close();
                    } catch (err) {
                      logger.error('request failed with error: ', err);
                    }
                  }}
                />,
              )
              .withTitle('Create Group');
          }}
        />
      </div>
    </div>
  );
}

function CreateGroupButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="cursor-pointer flex flex-row max-w-[280px] w-full justify-start items-center px-4 py-3 bg-white rounded-[100px] gap-1"
      onClick={onClick}
    >
      <Edit1 className="w-4 h-4" />
      <div className="font-bold text-base/[22px] text-neutral-900">
        Create Group
      </div>
    </div>
  );
}

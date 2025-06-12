'use client';
import { Edit1 } from '@/components/icons';
import { User } from '@/components/icons';
import { usePopup } from '@/lib/contexts/popup-service';
import React, { useContext, useMemo } from 'react';
import CreateGroupPopup from './_components/create-group-popup';
import {
  createGroupRequest,
  GroupPermission,
  inviteMemberRequest,
} from '@/lib/api/models/group';
import { TeamContext } from '@/lib/contexts/team-context';
import { useApiCall } from '@/lib/api/use-send';
import { ratelApi } from '@/lib/api/ratel_api';
import { logger } from '@/lib/logger';
import { useUserInfo } from '@/lib/api/hooks/users';
import { Group } from '@/lib/api/models/user';
import Image from 'next/image';
import InviteMemberPopup from './_components/invite-member-popup';

export default function Home() {
  const popup = usePopup();
  const { post } = useApiCall();
  const query = useUserInfo();

  const { teams, selectedIndex } = useContext(TeamContext);
  const team = useMemo(() => teams[selectedIndex], [teams, selectedIndex]);

  if (!team) {
    return <div />;
  }

  const groups: Group[] = (query.data?.groups ?? [])
    .flat()
    .filter((g): g is Group => g !== undefined);

  return (
    <div className="flex flex-col w-full gap-2.5">
      <div className="flex flex-row w-full justify-end items-end gap-[10px]">
        {groups && groups.length != 0 && (
          <InviteMemberButton
            onClick={() => {
              popup
                .open(
                  <InviteMemberPopup
                    groups={groups}
                    onclick={async (group_id, users) => {
                      console.log('group: ', team.id, group_id, users);
                      try {
                        await post(
                          ratelApi.groups.invite_member(team.id, group_id),
                          inviteMemberRequest(users),
                        );
                        query.refetch();
                        popup.close();
                      } catch (err) {
                        logger.error('request failed with error: ', err);
                      }
                    }}
                  />,
                )
                .withTitle('Invite Member');
            }}
          />
        )}
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

                      query.refetch();

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

      <ListGroups groups={groups ?? []} />
    </div>
  );
}

function ListGroups({ groups }: { groups: Group[] }) {
  return (
    <div className="flex flex-col w-full px-4 py-5 gap-[10px] bg-[#191919] rounded-lg">
      {groups.map((group) => (
        <div
          key={group.id}
          className="flex flex-row w-full h-fit gap-[15px] bg-transparent rounded-sm border border-neutral-800 p-5"
        >
          <Image
            src={group.image_url || '/default-profile.png'}
            alt={group.name}
            width={48}
            height={48}
            className="rounded-lg object-cover w-12 h-12"
          />

          <div className="flex flex-col justify-between items-start">
            <div className="font-bold text-white text-base/[20px]">
              {group.name}
            </div>
            <div className="font-semibold text-neutral-400 text-sm/[20px]">
              {group.members.length} member
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function InviteMemberButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="cursor-pointer flex flex-row max-w-[170px] w-full justify-start items-center px-4 py-3 bg-primary rounded-[100px] gap-1"
      onClick={onClick}
    >
      <User className="w-4 h-4 [&>path]:stroke-[#000203]" />
      <div className="font-bold text-base/[22px] text-[#000203]">
        Invite Member
      </div>
    </div>
  );
}

function CreateGroupButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="cursor-pointer flex flex-row max-w-[170px] w-full justify-start items-center px-4 py-3 bg-white rounded-[100px] gap-1"
      onClick={onClick}
    >
      <Edit1 className="w-4 h-4" />
      <div className="font-bold text-base/[22px] text-neutral-900">
        Create Group
      </div>
    </div>
  );
}

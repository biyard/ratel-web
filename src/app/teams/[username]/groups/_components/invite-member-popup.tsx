'use client';

import SelectBox from '@/components/selectbox/selectbox';
import { Group, TotalUser } from '@/lib/api/models/user';
import React, { useState } from 'react';
import CustomCheckbox from '@/components/checkbox/custom-checkbox';
import { Clear } from '@/components/icons';
import SearchInput from '@/components/input/search-input';
import { useApiCall } from '@/lib/api/use-send';
import { ratelApi } from '@/lib/api/ratel_api';
import { useUser } from '@/app/(social)/_hooks/use-user';

export default function InviteMemberPopup({
  groups,
  onclick,
}: {
  groups: Group[];
  onclick: (group_id: number, users: number[]) => void;
}) {
  const { get } = useApiCall();
  const users = useUser(1, 20);
  const [groupIndex, setGroupIndex] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);

  const [selectedUsers, setSelectedUsers] = useState<TotalUser[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const totalUsers = users.data.items;

  return (
    <div className="flex flex-col w-[900px] min-h-[400px] max-w-[900px] min-w-[400px] max-mobile:!w-full max-mobile:!max-w-full gap-5">
      <div className="flex flex-col w-full gap-[10px]">
        <div className="font-bold text-[15px]/[28px] text-neutral-400">
          Select the group
        </div>
        <SelectBox
          groups={groups}
          groupIndex={groupIndex}
          setGroupIndex={setGroupIndex}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
      </div>

      <div className="flex flex-col w-full gap-[10px]">
        <div className="font-bold text-[15px]/[28px] text-neutral-400">
          Selected Users
        </div>

        <div className="flex flex-wrap gap-1">
          {selectedUsers.map((user) => {
            return (
              <SelectedUserInfo
                key={user.id}
                username={user.nickname}
                onremove={() => {
                  setSelectedUsers((prev) =>
                    prev.filter((u) => u.id !== user.id),
                  );
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="flex flex-col w-full gap-[10px]">
        <div className="font-bold text-[15px]/[28px] text-neutral-400">
          Suggested
        </div>

        <div className="mt-[10px]">
          <SearchInput
            value={searchValue}
            setValue={setSearchValue}
            onenter={async () => {
              const data = await get(
                ratelApi.users.getUserByEmail(searchValue),
              );

              if (data) {
                setSelectedUsers((prev) => {
                  const exists = prev.some((u) => u.id === data.id);
                  if (exists) {
                    return prev.filter((u) => u.id !== data.id);
                  } else {
                    return [...prev, data];
                  }
                });
                setSearchValue('');
              }
            }}
          />
        </div>

        <div className="flex flex-col w-full gap-[14px] h-[250px] overflow-y-scroll">
          {totalUsers.slice(0, 20).map((user) => (
            <div key={user.id} className="flex flex-row gap-[11px] my-2.5">
              {user.profile_url && !user.profile_url.includes('test') ? (
                <img
                  src={user.profile_url || '/default-profile.png'}
                  alt={user.username}
                  width={48}
                  height={48}
                  className="rounded-full object-cover w-[48px] h-[48px]"
                />
              ) : (
                <div className="rounded-full w-[48px] h-[48px] bg-neutral-500" />
              )}

              <div className="flex flex-col gap-1 flex-1">
                <div className="font-bold text-white text-[15px]/[20px]">
                  {user.nickname}
                </div>

                <div className="font-semibold text-neutral-500 text-sm/[20px]">
                  {user.email}
                </div>
              </div>

              <div className="mr-[10px]">
                <CustomCheckbox
                  onChange={() => {
                    setSelectedUsers((prev) => {
                      const exists = prev.some((u) => u.id === user.id);
                      if (exists) {
                        return prev.filter((u) => u.id !== user.id);
                      } else {
                        return [...prev, user];
                      }
                    });
                  }}
                  checked={selectedUsers.some((u) => u.id === user.id)}
                  isRounded={true}
                />
              </div>
            </div>
          ))}
        </div>

        <InviteMemberButton
          onclick={() => {
            const selectedUserIds = selectedUsers.map((user) => user.id);
            onclick(selectedGroup.id, selectedUserIds);
          }}
        />
      </div>
    </div>
  );
}

function InviteMemberButton({ onclick }: { onclick: () => void }) {
  return (
    <div
      className="cursor-pointer flex flex-row w-full justify-center items-center my-[15px] py-[15px] rounded-lg bg-primary font-bold text-[#000203] text-base"
      onClick={() => {
        onclick();
      }}
    >
      Send
    </div>
  );
}

function SelectedUserInfo({
  username,
  onremove,
}: {
  username: string;
  onremove: () => void;
}) {
  return (
    <div className="flex flex-row w-fit gap-1 justify-start items-center bg-primary rounded-[100px] px-[12px] py-[2px]">
      <div className="font-medium text-neutral-900 text-[15px]/[24px]">
        {username}
      </div>
      <Clear
        width={24}
        height={24}
        className="w-6 h-6 cursor-pointer"
        onClick={() => {
          onremove();
        }}
      />
    </div>
  );
}

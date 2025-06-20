'use client';
import React, { useEffect, useState } from 'react';
import { useNetwork } from '../_hooks/use-network';
import { logger } from '@/lib/logger';
import { Industry } from '@/lib/api/models/industry';
import { Follower } from '@/lib/api/models/network';
import { UserType } from '@/lib/api/models/user';
import Image from 'next/image';
import { Add } from '@/components/icons';
import { useApiCall } from '@/lib/api/use-send';
import { ratelApi } from '@/lib/api/ratel_api';
import { followRequest } from '@/lib/api/models/networks/follow';
import { showErrorToast, showSuccessToast } from '@/lib/toast';
import { useSuspenseUserInfo } from '@/lib/api/hooks/users';

export default function MyNetwork() {
  const { post } = useApiCall();

  const data = useSuspenseUserInfo();

  const network = useNetwork();
  const networkData = network.data;

  useEffect(() => {
    const timer = setTimeout(() => {
      network.refetch();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleFollow = async (userId: number) => {
    await post(ratelApi.networks.follow(userId), followRequest());
  };

  logger.debug('query response of networks', networkData);
  return (
    <div className="flex flex-col w-full gap-3">
      <SelectedIndustry
        industries={networkData ? networkData.industries : []}
      />
      <FollowingContents
        label="Suggested teams"
        users={networkData ? networkData.suggested_teams : []}
        follow={async (userId: number) => {
          logger.debug('follow button clicked user id: ', userId);
          try {
            await handleFollow(userId);
            data.refetch();
            network.refetch();

            showSuccessToast('success to follow user');
          } catch (err) {
            showErrorToast('failed to follow user');
            logger.error('failed to follow user with error: ', err);
          }
        }}
      />
      <FollowingContents
        label="Suggested users"
        users={networkData ? networkData.suggested_users : []}
        follow={async (userId: number) => {
          logger.debug('follow button clicked user id: ', userId);
          try {
            await handleFollow(userId);
            data.refetch();
            network.refetch();

            showSuccessToast('success to follow user');
          } catch (err) {
            showErrorToast('failed to follow user');
            logger.error('failed to follow user with error: ', err);
          }
        }}
      />
    </div>
  );
}

function FollowButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="cursor-pointer flex flex-row w-fit h-fit px-[12px] py-[8px] bg-white hover:bg-gray-100 rounded-[50px]"
      onClick={() => {
        onClick();
      }}
    >
      <Add className="w-[15px] h-[15px]" />
      <div className="font-bold text-[#000203] text-xs">Follow</div>
    </div>
  );
}

function FollowingContents({
  label,
  users,
  follow,
}: {
  label: string;
  users: Follower[];
  follow: (userId: number) => void;
}) {
  return (
    <div className="flex flex-col w-full rounded-lg bg-[#191919] px-4 py-5 gap-2.5">
      <div className="font-semibold text-white text-base/[20px]">{label}</div>
      <div className="flex flex-col">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-col w-full gap-[5px] px-2.5 py-5 border-b border-b-neutral-800"
          >
            <div className="flex flex-row w-full justify-between items-start">
              <div className="flex flex-row w-fit gap-2">
                {user.user_type == UserType.Team ? (
                  user.profile_url ? (
                    <Image
                      width={32}
                      height={32}
                      src={user.profile_url || '/default-profile.png'}
                      alt="Profile"
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-neutral-500" />
                  )
                ) : user.profile_url ? (
                  <Image
                    width={32}
                    height={32}
                    src={user.profile_url || '/default-profile.png'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-neutral-500" />
                )}

                <div className="flex flex-col">
                  <div className="font-semibold text-white text-sm/[20px]">
                    {user.username}
                  </div>
                  <div className="font-medium text-neutral-500 text-[12px]">
                    {user.email}
                  </div>
                </div>
              </div>

              <FollowButton
                onClick={() => {
                  follow(user.id);
                }}
              />
            </div>

            <div
              id="user-profile-description"
              className="font-medium text-[12px] text-neutral-300"
              dangerouslySetInnerHTML={{ __html: user.html_contents }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function SelectedIndustry({ industries }: { industries: Industry[] }) {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  return (
    <div className="flex flex-row w-full justify-start items-center gap-2.5">
      <IndustryLabel
        name="All"
        selected={selectedIndustry == 'All'}
        setSelectedIndustry={(name: string) => {
          setSelectedIndustry(name);
        }}
      />

      {industries.map((industry) => (
        <IndustryLabel
          key={industry.name}
          name={industry.name.toUpperCase()}
          selected={selectedIndustry == industry.name.toUpperCase()}
          setSelectedIndustry={(name: string) => {
            setSelectedIndustry(name);
          }}
        />
      ))}
    </div>
  );
}

function IndustryLabel({
  name,
  selected,
  setSelectedIndustry,
}: {
  name: string;
  selected: boolean;
  setSelectedIndustry: (name: string) => void;
}) {
  return (
    <div
      className={`cursor-pointer flex flex-row w-fit h-fit px-2.5 py-2 rounded-lg font-semibold text-white text-sm/[20px] ${selected ? 'border-none bg-neutral-700' : 'border border-neutral-700 bg-transparent hover:bg-neutral-700'}`}
      onClick={() => {
        setSelectedIndustry(name);
      }}
    >
      {name}
    </div>
  );
}

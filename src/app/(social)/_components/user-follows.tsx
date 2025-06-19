import React from 'react';
import { ChevronRight } from '@/components/icons';
import Link from 'next/link';
import { route } from '@/route';

export interface UserFollowsProps {
  followers_count: number;
  followings_count: number;
}

export default function UserFollows({
  followers_count,
  followings_count,
}: UserFollowsProps) {
  return (
    <Link
      href={route.myFollower()}
      className="cursor-pointer flex flex-row w-full justify-between items-center"
    >
      <div className="flex flex-row w-full justify-start items-center gap-[20px] max-tablet:gap-[10px]">
        <div className="flex flex-col w-fit justify-start items-start gap-[2px]">
          <div className="font-bold text-white text-sm">
            {followers_count.toLocaleString()}
          </div>
          <div className="font-medium text-neutral-300 text-sm">Followers</div>
        </div>

        <div className="flex flex-col w-fit justify-start items-start gap-[2px]">
          <div className="font-bold text-white text-sm">
            {followings_count.toLocaleString()}
          </div>
          <div className="font-medium text-neutral-300 text-sm">Followings</div>
        </div>
      </div>

      <ChevronRight className="w-5 h-5" />
    </Link>
  );
}

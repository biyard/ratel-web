import React from 'react';
import ArrowLeft from '@/assets/icons/left.svg';
import Shared from '@/assets/icons/share.svg';
import Extra from '@/assets/icons/extra.svg';
import Bookmark from '@/assets/icons/bookmark.svg';
import Badge from '@/assets/icons/badge.svg';
import { getTimeAgo } from '@/lib/time-utils';

export interface SpaceHeaderProps {
  title: string;
  proposerImage: string;
  proposerName: string;
  createdAt: number;
}

export default function SpaceHeader({
  title,
  proposerImage,
  proposerName,
  createdAt,
}: SpaceHeaderProps) {
  return (
    <div className="flex flex-col w-full gap-2.5">
      <div className="flex flex-row w-full justify-between items-center">
        <ArrowLeft width={24} height={24} />

        <div className="flex flex-row w-fit h-fit items-center gap-5">
          <Shared width={24} height={24} />
          <Extra width={24} height={24} />
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <SpaceType />
        <div className="flex flex-row w-full justify-between items-center">
          <div className="font-bold text-white text-[20px]/[30px]">{title}</div>
          <Bookmark width={20} height={20} />
        </div>
      </div>

      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex flex-row w-fit gap-2">
          <img
            src={proposerImage}
            alt={proposerName}
            width={20}
            height={20}
            className="rounded-full object-cover object-top"
          />
          <div className="font-semibold text-white text-sm/[20px]">
            {proposerName}
          </div>
          <Badge />
        </div>

        <div className="font-light text-white text-sm/[14px]">
          {getTimeAgo(createdAt)}
        </div>
      </div>
    </div>
  );
}

function SpaceType() {
  return (
    <div className="flex flex-row w-fit h-fit px-2 bg-transparent rounded-sm border border-c-wg-70 font-semibold text-white text-xs/[25px]">
      Crypto
    </div>
  );
}

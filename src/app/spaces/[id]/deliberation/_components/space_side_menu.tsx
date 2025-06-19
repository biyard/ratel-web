'use client';

import BlackBox from '@/app/(social)/_components/black-box';
import { useSpaceBySpaceId } from '@/app/(social)/_hooks/use-spaces';
import { getTimeWithFormat } from '@/lib/time-utils';
import React from 'react';
import Clock from '@/assets/icons/clock.svg';
import { Discuss } from '@/components/icons';
import { File, Vote, CheckCircle } from 'lucide-react';
import { DeliberationTab, DeliberationTabType } from '../page.client';

export default function SpaceSideMenu({
  spaceId,
  selectedType,
  setSelectedType,
}: {
  spaceId: number;
  selectedType: DeliberationTabType;
  setSelectedType: (tab: DeliberationTabType) => void;
}) {
  const { data: space } = useSpaceBySpaceId(spaceId);

  return (
    <div className="flex flex-col max-w-[250px] max-tablet:!hidden w-full gap-[10px]">
      <BlackBox>
        <div className="flex flex-col gap-2.5 w-full">
          <div
            className={`cursor-pointer flex flex-row w-full gap-1 items-center px-1 py-2 rounded-sm ${selectedType == DeliberationTab.THREAD ? 'bg-neutral-800' : ''}`}
            onClick={() => {
              setSelectedType(DeliberationTab.THREAD);
            }}
          >
            <File className="[&>path]:stroke-neutral-80 w-5 h-5" />
            <div className="font-bold text-white text-sm">Thread</div>
          </div>

          <div
            className={`cursor-pointer flex flex-row gap-1 items-center px-1 py-2 rounded-sm ${selectedType == DeliberationTab.DELIBERATION ? 'bg-neutral-800' : ''}`}
            onClick={() => {
              setSelectedType(DeliberationTab.DELIBERATION);
            }}
          >
            <Discuss className="w-5 h-5" />
            <div className="font-bold text-white text-sm">Deliberation</div>
          </div>

          <div
            className={`cursor-pointer flex flex-row gap-1 items-center px-1 py-2 rounded-sm ${selectedType == DeliberationTab.POLL ? 'bg-neutral-800' : ''}`}
            onClick={() => {
              setSelectedType(DeliberationTab.POLL);
            }}
          >
            <Vote className="[&>path]:stroke-neutral-80 w-5 h-5" />
            <div className="font-bold text-white text-sm">Poll</div>
          </div>

          <div
            className={`cursor-pointer flex flex-row gap-1 items-center px-1 py-2 rounded-sm ${selectedType == DeliberationTab.FINAL ? 'bg-neutral-800' : ''}`}
            onClick={() => {
              setSelectedType(DeliberationTab.FINAL);
            }}
          >
            <CheckCircle className="[&>path]:stroke-neutral-80 w-5 h-5" />
            <div className="font-bold text-white text-sm">Final Consensus</div>
          </div>
        </div>
      </BlackBox>
      <BlackBox>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-1 items-center">
            <Clock width={20} height={20} />
            <div className="font-bold text-neutral-500 text-sm/[14px]">
              Proposed
            </div>
          </div>

          <div className="font-medium text-white text-[15px]/[12px]">
            {getTimeWithFormat(space.created_at)}
          </div>
        </div>
      </BlackBox>
    </div>
  );
}

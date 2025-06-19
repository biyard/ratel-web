'use client';

import React, { useState } from 'react';
import SpaceSideMenu from './_components/space_side_menu';
import { useParams } from 'next/navigation';
import { useSpaceBySpaceId } from '@/app/(social)/_hooks/use-spaces';
import ThreadPage from './_components/thread';
import DeliberationPage from './_components/deliberation';
import PollPage from './_components/poll';
import FinalConsensusPage from './_components/final_consensus';

export const DeliberationTab = {
  THREAD: 'Thread',
  DELIBERATION: 'Deliberation',
  POLL: 'Poll',
  FINAL: 'Final Consensus',
} as const;

export type DeliberationTabType =
  (typeof DeliberationTab)[keyof typeof DeliberationTab];

export default function SpaceByIdPage() {
  const params = useParams();
  const spaceId = Number(params.id);
  const { data: space } = useSpaceBySpaceId(spaceId);
  const [selectedType, setSelectedType] = useState<DeliberationTabType>(
    DeliberationTab.THREAD,
  );

  return (
    <div className="flex flex-row w-full gap-5">
      {selectedType == DeliberationTab.THREAD ? (
        <ThreadPage space={space} />
      ) : selectedType == DeliberationTab.DELIBERATION ? (
        <DeliberationPage />
      ) : selectedType == DeliberationTab.POLL ? (
        <PollPage />
      ) : (
        <FinalConsensusPage />
      )}
      <SpaceSideMenu
        spaceId={spaceId}
        selectedType={selectedType}
        setSelectedType={(tab: DeliberationTabType) => {
          setSelectedType(tab);
        }}
      />
    </div>
  );
}

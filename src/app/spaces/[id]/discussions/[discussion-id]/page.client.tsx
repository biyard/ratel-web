'use client';

import { useDiscussionById } from '@/app/(social)/_hooks/use-discussion';
import {
  Clear,
  Logo,
  ZoomChat,
  ZoomClose,
  ZoomMicOff,
  ZoomParticipants,
  ZoomRecord,
  ZoomShare,
  ZoomVideoOff,
} from '@/components/icons';
import { logger } from '@/lib/logger';
import { route } from '@/route';
import { useParams, useRouter } from 'next/navigation';
import React, { JSX } from 'react';

export default function DiscussionByIdPage() {
  const router = useRouter();
  const params = useParams();
  const spaceId = Number(params['id']);
  const discussionId = Number(params['discussion-id']);

  const data = useDiscussionById(spaceId, discussionId);
  const discussion = data.data;
  logger.debug('params: ', spaceId, discussionId);
  logger.debug('discussion: ', discussion);

  return (
    <div className="w-screen h-screen bg-black flex flex-col">
      <Header
        name={discussion.name}
        onclose={() => {
          router.replace(route.deliberationSpaceById(discussion.space_id));
        }}
      />

      <div className="flex-1 flex items-center justify-center relative">
        <div className="w-[120px] h-[120px] bg-pink-200 rounded-xl shadow-lg flex items-center justify-center">
          <img
            src="/avatar-cake.png"
            alt="User Avatar"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      <Bottom
        onclose={() => {
          router.replace(route.deliberationSpaceById(discussion.space_id));
        }}
      />
    </div>
  );
}

function Bottom({ onclose }: { onclose: () => void }) {
  return (
    <div className="flex flex-row w-full min-h-[70px] justify-between items-center bg-neutral-900 px-10 py-2.5 border-b border-neutral-800">
      <div className="flex flex-row gap-5 w-[80px]">
        <IconLabel
          icon={<ZoomMicOff className="w-6 h-6" />}
          label={'Audio'}
          onclick={() => {}}
        />
        <IconLabel
          icon={<ZoomVideoOff className="w-6 h-6" />}
          label={'Video'}
          onclick={() => {}}
        />
      </div>

      <div className="flex flex-row w-fit gap-5">
        <IconLabel
          icon={<ZoomParticipants className="w-6 h-6 stroke-white" />}
          label={'Participants'}
          onclick={() => {}}
        />
        <IconLabel
          icon={<ZoomChat className="w-6 h-6" />}
          label={'Chat'}
          onclick={() => {}}
        />
        <IconLabel
          icon={<ZoomShare className="w-6 h-6" />}
          label={'Share'}
          onclick={() => {}}
        />
        <IconLabel
          icon={<ZoomRecord className="w-6 h-6" />}
          label={'Record'}
          onclick={() => {}}
        />
      </div>

      <div className="flex flex-row w-[80px] gap-5">
        <IconLabel
          icon={<ZoomClose className="w-6 h-6" />}
          label={'End'}
          onclick={() => {
            onclose();
          }}
        />
      </div>
    </div>
  );
}

function Header({ name, onclose }: { name: string; onclose: () => void }) {
  return (
    <div className="flex justify-between items-center  bg-neutral-900 text-white px-6 py-3 text-sm font-semibold border-b border-neutral-800">
      <Logo width={32} height={32} />
      <span>{name}</span>
      <Clear
        className="cursor-pointer w-[24px] h-[24px] [&>path]:stroke-neutral-500"
        onClick={() => {
          onclose();
        }}
        fill="white"
      />
    </div>
  );
}

function IconLabel({
  icon,
  label,
  onclick,
}: {
  icon: JSX.Element;
  label: string;
  onclick: () => void;
}) {
  return (
    <div
      className="cursor-pointer flex flex-col gap-1 w-fit h-fit justify-center items-center px-[10px] py-[4px]"
      onClick={onclick}
    >
      {icon}
      <div className="font-semibold text-white text-sm">{label}</div>
    </div>
  );
}

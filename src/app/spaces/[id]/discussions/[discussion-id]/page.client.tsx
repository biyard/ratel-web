'use client';

import { useDiscussionById } from '@/app/(social)/_hooks/use-discussion';
import { Clear, Logo } from '@/components/icons';
import { logger } from '@/lib/logger';
import { route } from '@/route';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

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

      <div className="bg-neutral-900 border-t border-neutral-800 flex justify-center items-center gap-5 py-3">
        {['Audio', 'Video', 'Participants', 'Chat', 'Share', 'Record'].map(
          (label) => (
            <button
              key={label}
              className="text-white hover:text-yellow-400 text-sm font-semibold px-3 py-2"
            >
              {label}
            </button>
          ),
        )}
        <button className="text-red-500 hover:text-red-400 font-bold px-4 py-2">
          End
        </button>
      </div>
    </div>
  );
}

function Header({ name, onclose }: { name: string; onclose: () => void }) {
  return (
    <div className="flex justify-between items-center bg-neutral-900 text-white px-6 py-3 text-sm font-semibold border-b border-neutral-800">
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

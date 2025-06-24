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
import React, { JSX, useEffect, useState } from 'react';

export default function DiscussionByIdPage() {
  const [activePanel, setActivePanel] = useState<
    'participants' | 'chat' | null
  >();
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
        onParticipantsClick={() => {
          setActivePanel((prev) =>
            prev === 'participants' ? null : 'participants',
          );
        }}
        onChatClick={() => {
          setActivePanel((prev) => (prev === 'chat' ? null : 'chat'));
        }}
      />

      {activePanel === 'participants' && (
        <ParticipantsPanel onClose={() => setActivePanel(null)} />
      )}
      {activePanel === 'chat' && (
        <ChatPanel onClose={() => setActivePanel(null)} />
      )}
    </div>
  );
}

function Bottom({
  onclose,
  onParticipantsClick,
  onChatClick,
}: {
  onclose: () => void;
  onParticipantsClick: () => void;
  onChatClick: () => void;
}) {
  return (
    <>
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
            icon={<ZoomParticipants />}
            label={'Participants'}
            onclick={onParticipantsClick}
          />
          <IconLabel icon={<ZoomChat />} label={'Chat'} onclick={onChatClick} />
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
    </>
  );
}

function ChatPanel({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[320px] bg-[#2e2e2e] z-40 border-l border-neutral-700 transform transition-all duration-300 ${
        visible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b border-neutral-600 text-white">
        Chat
        <button
          onClick={handleClose}
          className="text-neutral-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 p-4 text-white text-sm overflow-y-auto">
        <div className="mb-2">[12:58 PM] 사용자1: 안녕하세요!</div>
        <div className="mb-2">[12:59 PM] 사용자2: 반가워요!</div>
      </div>
      <div className="border-t border-neutral-600 p-2">
        <input
          type="text"
          placeholder="Type message here"
          className="w-full rounded-md px-3 py-2 text-sm bg-neutral-800 text-white border border-neutral-700"
        />
      </div>
    </div>
  );
}

function ParticipantsPanel({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[280px] z-30 bg-[#2d2d2d] shadow-lg border-l border-neutral-800 transform transition-all duration-300 ${
        visible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b border-neutral-700 text-white font-semibold">
        Participants
        <button
          onClick={handleClose}
          className="text-neutral-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 text-white text-sm">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="py-2 border-b border-neutral-800">
            ID or nickname{i + 1} (Role)
          </div>
        ))}
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

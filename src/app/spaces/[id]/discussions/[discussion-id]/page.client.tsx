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
  ZoomVideoOn,
} from '@/components/icons';
import { logger } from '@/lib/logger';
import { route } from '@/route';
import { useParams, useRouter } from 'next/navigation';
import React, { JSX, useEffect, useRef, useState } from 'react';
import { useApiCall } from '@/lib/api/use-send';
import { ratelApi } from '@/lib/api/ratel_api';
import {
  participantMeetingRequest,
  startMeetingRequest,
} from '@/lib/api/models/discussion';

import {
  DefaultDeviceController,
  DefaultMeetingSession,
  ConsoleLogger,
  LogLevel,
  MeetingSessionConfiguration,
} from 'amazon-chime-sdk-js';

export default function DiscussionByIdPage() {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSharing, setIsSharing] = useState(false);

  const [meetingSession, setMeetingSession] =
    useState<DefaultMeetingSession | null>(null);
  const [activePanel, setActivePanel] = useState<
    'participants' | 'chat' | null
  >();
  const { post, get } = useApiCall();
  const router = useRouter();
  const params = useParams();
  const spaceId = Number(params['id']);
  const discussionId = Number(params['discussion-id']);

  const data = useDiscussionById(spaceId, discussionId);
  const discussion = data.data;
  logger.debug('params: ', spaceId, discussionId);
  logger.debug('discussion: ', discussion);

  useEffect(() => {
    async function startChime() {
      await post(
        ratelApi.discussions.actDiscussionById(spaceId, discussionId),
        startMeetingRequest(),
      );

      await post(
        ratelApi.discussions.actDiscussionById(spaceId, discussionId),
        participantMeetingRequest(),
      );

      const joinInfo = await get(
        ratelApi.meeting.getMeetingById(spaceId, discussionId),
      );

      const logger = new ConsoleLogger('ChimeLogs', LogLevel.INFO);
      const deviceController = new DefaultDeviceController(logger);

      const configuration = new MeetingSessionConfiguration(
        joinInfo.meeting,
        joinInfo.attendee,
      );

      const session = new DefaultMeetingSession(
        configuration,
        logger,
        deviceController,
      );

      setMeetingSession(session);
    }

    startChime();
  }, []);

  return (
    <div className="w-screen h-screen bg-black flex flex-col">
      <Header
        name={discussion.name}
        onclose={() => {
          router.replace(route.deliberationSpaceById(discussion.space_id));
        }}
      />

      <div className="flex-1 flex items-center justify-center relative">
        {meetingSession && isSharing && (
          <ContentShareVideo meetingSession={meetingSession} />
        )}

        {meetingSession && (
          <div
            className={
              isSharing
                ? 'absolute bottom-4 right-4 w-[180px] h-[130px] z-10'
                : 'w-full h-full'
            }
          >
            <LocalVideo meetingSession={meetingSession} isVideoOn={isVideoOn} />
          </div>
        )}
      </div>

      <Bottom
        isVideoOn={isVideoOn}
        isSharing={isSharing}
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
        onVideoToggle={() => {
          setIsVideoOn((prev) => !prev);
        }}
        onShareToggle={async () => {
          if (!meetingSession) return;

          const av = meetingSession.audioVideo;

          if (!isSharing) {
            try {
              await av.startContentShareFromScreenCapture();
              setIsSharing(true);
            } catch (err) {
              logger.error('Failed to share video with error: ', err);
            }
          } else {
            av.stopContentShare();
            setIsSharing(false);
          }
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

function ContentShareVideo({
  meetingSession,
}: {
  meetingSession: DefaultMeetingSession;
}) {
  const contentRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const av = meetingSession.audioVideo;

    const observer = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      videoTileDidUpdate: (tileState: any) => {
        if (tileState.isContent && tileState.tileId && contentRef.current) {
          av.bindVideoElement(tileState.tileId, contentRef.current);
        }
      },
    };

    av.addObserver(observer);

    return () => {
      av.removeObserver(observer);
    };
  }, [meetingSession]);

  return (
    <video
      ref={contentRef}
      className="absolute top-0 left-0 w-full h-full object-contain bg-black z-0"
      autoPlay
      muted
    />
  );
}

function LocalVideo({
  meetingSession,
  isVideoOn,
}: {
  meetingSession: DefaultMeetingSession;
  isVideoOn: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const av = meetingSession.audioVideo;

    const bind = () => {
      const tile = av.getLocalVideoTile();
      const element = videoRef.current;

      if (tile && element && tile.state().boundVideoElement === null) {
        av.bindVideoElement(tile.id(), element);
      }
    };

    const init = async () => {
      const videoDevices = await av.listVideoInputDevices();
      if (videoDevices.length > 0) {
        await av.startVideoInput(videoDevices[0].deviceId);
      }
      av.start();
      setStarted(true);

      if (isVideoOn) {
        av.startLocalVideoTile();
      }

      if (videoRef.current) {
        videoRef.current.id = 'local-video-element';
      }

      bind();
    };

    init();

    return () => {
      av.stopLocalVideoTile();
      av.stop();
    };
  }, [meetingSession]);

  useEffect(() => {
    const av = meetingSession.audioVideo;
    if (!started) return;

    if (isVideoOn) {
      av.startLocalVideoTile();
    } else {
      av.stopLocalVideoTile();
    }
  }, [isVideoOn]);

  return (
    <video
      ref={videoRef}
      id="local-video-element"
      className="w-full h-full rounded-lg bg-black"
      autoPlay
      muted
    />
  );
}

function Header({ name, onclose }: { name: string; onclose: () => void }) {
  return (
    <div className="flex justify-between items-center bg-neutral-900 text-white px-6 py-3 text-sm font-semibold border-b border-neutral-800">
      <Logo width={32} height={32} />
      <span>{name}</span>
      <Clear
        className="cursor-pointer w-[24px] h-[24px] [&>path]:stroke-neutral-500"
        onClick={onclose}
        fill="white"
      />
    </div>
  );
}

function Bottom({
  isVideoOn,

  onclose,
  onParticipantsClick,
  onChatClick,
  onVideoToggle,
  onShareToggle,
}: {
  isVideoOn: boolean;
  isSharing: boolean;
  onclose: () => void;
  onParticipantsClick: () => void;
  onChatClick: () => void;
  onVideoToggle: () => void;
  onShareToggle: () => void;
}) {
  return (
    <div className="flex flex-row w-full min-h-[70px] justify-between items-center bg-neutral-900 px-10 py-2.5 border-b border-neutral-800">
      <div className="flex flex-row gap-5 w-[80px]">
        <IconLabel
          icon={<ZoomMicOff className="w-6 h-6" />}
          label="Audio"
          onclick={() => {}}
        />
        <IconLabel
          icon={
            isVideoOn ? (
              <ZoomVideoOn className="w-6 h-6" />
            ) : (
              <ZoomVideoOff className="w-6 h-6" />
            )
          }
          label="Video"
          onclick={() => {
            onVideoToggle();
          }}
        />
      </div>

      <div className="flex flex-row w-fit gap-5">
        <IconLabel
          icon={<ZoomParticipants />}
          label="Participants"
          onclick={onParticipantsClick}
        />
        <IconLabel icon={<ZoomChat />} label="Chat" onclick={onChatClick} />
        <IconLabel
          icon={<ZoomShare className="w-6 h-6" />}
          label="Share"
          onclick={() => {
            onShareToggle();
          }}
        />
        <IconLabel
          icon={<ZoomRecord className="w-6 h-6" />}
          label="Record"
          onclick={() => {}}
        />
      </div>

      <div className="flex flex-row w-[80px] gap-5">
        <IconLabel
          icon={<ZoomClose className="w-6 h-6" />}
          label="End"
          onclick={onclose}
        />
      </div>
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
        {/* <div className="mb-2">[12:58 PM] 사용자1: 안녕하세요!</div>
        <div className="mb-2">[12:59 PM] 사용자2: 반가워요!</div> */}
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

      {/* <div className="flex-1 overflow-y-auto px-4 py-2 text-white text-sm">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="py-2 border-b border-neutral-800">
            ID or nickname{i + 1} (Role)
          </div>
        ))}
      </div> */}
    </div>
  );
}

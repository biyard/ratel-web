'use client';

import React, { useEffect, useRef, useState } from 'react';

import { DefaultMeetingSession } from 'amazon-chime-sdk-js';

export default function LocalVideo({
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
      className="absolute top-0 left-0 w-full h-full bg-black object-cover"
      autoPlay
      muted
    />
  );
}

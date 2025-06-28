'use client';

import React from 'react';
import SpaceHeader from '../../_components/space_header';
import SpaceContents from '../../_components/space_contents';
import SpaceFiles from './space_files';
import { Thread } from '..';
import { FileInfo } from '@/lib/api/models/feeds';
import { SpaceStatus } from '@/lib/api/models/spaces';

export default function ThreadPage({
  title,
  status,
  thread,
  setTitle,
  setThread,

  userType,
  proposerImage,
  proposerName,
  createdAt,
  isEdit,

  onback,
}: {
  title: string;
  status: SpaceStatus;
  thread: Thread;
  setThread: (thread: Thread) => void;
  setTitle: (title: string) => void;
  userType: number;
  proposerImage: string;
  proposerName: string;
  createdAt: number;
  isEdit: boolean;

  onback: () => void;
}) {
  return (
    <div className="flex flex-row w-full gap-5">
      <div className="flex flex-col w-full">
        <SpaceHeader
          isEdit={isEdit}
          title={title}
          status={status}
          userType={userType}
          proposerImage={proposerImage}
          proposerName={proposerName}
          createdAt={createdAt}
          onback={onback}
          setTitle={(title: string) => {
            setTitle(title);
          }}
        />
        <div className="flex flex-col w-full mt-7.5 gap-2.5">
          <SpaceContents
            isEdit={isEdit}
            htmlContents={thread.html_contents}
            setContents={(html_contents: string) => {
              setThread({
                ...thread,
                html_contents,
              });
            }}
          />
          <SpaceFiles
            isEdit={isEdit}
            files={thread.files}
            onremove={(index: number) => {
              const newFiles = [...thread.files];
              newFiles.splice(index, 1);
              setThread({
                ...thread,
                files: newFiles,
              });
            }}
            onadd={(file: FileInfo) => {
              setThread({
                ...thread,
                files: [...thread.files, file],
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

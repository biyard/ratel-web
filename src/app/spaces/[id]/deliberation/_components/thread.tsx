'use client';

import React from 'react';
import SpaceHeader from '../../_components/space_header';
import SpaceContents from '../../_components/space_contents';
import SpaceFiles from './space_files';
import { Thread } from '../page.client';
import { FileInfo } from '@/lib/api/models/feeds';

export default function ThreadPage({
  thread,
  setThread,

  userType,
  proposerImage,
  proposerName,
  createdAt,
  isEdit,
}: {
  thread: Thread;
  setThread: (thread: Thread) => void;

  userType: number;
  proposerImage: string;
  proposerName: string;
  createdAt: number;
  isEdit: boolean;
}) {
  return (
    <div className="flex flex-row w-full gap-5">
      <div className="flex flex-col w-full">
        <SpaceHeader
          isEdit={isEdit}
          title={thread.title}
          userType={userType}
          proposerImage={proposerImage}
          proposerName={proposerName}
          createdAt={createdAt}
          setTitle={(title: string) => {
            setThread({
              ...thread,
              title,
            });
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

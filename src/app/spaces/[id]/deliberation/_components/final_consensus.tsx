'use client';

import React from 'react';
import { FinalConsensus } from '../page.client';
import SpaceHeader from '../../_components/space_header';
import SpaceContents from '../../_components/space_contents';
import SpaceFiles from './space_files';
import { FileInfo } from '@/lib/api/models/feeds';
import { SpaceStatus } from '@/lib/api/models/spaces';

export default function FinalConsensusPage({
  title,
  status,
  draft,
  setTitle,
  setDraft,
  userType,
  proposerImage,
  proposerName,
  createdAt,
  isEdit,

  onback,
}: {
  title: string;
  status: SpaceStatus;
  draft: FinalConsensus;
  setTitle: (title: string) => void;
  setDraft: (draft: FinalConsensus) => void;
  userType: number;
  proposerImage: string;
  proposerName: string;
  createdAt: number;
  isEdit: boolean;

  onback: () => void;
}) {
  const contents =
    draft.drafts && draft.drafts.length != 0
      ? draft.drafts[0]
      : {
          title: '',
          html_contents: '',
          files: [],
        };

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
            htmlContents={contents.html_contents}
            setContents={(html_contents: string) => {
              setDraft({
                ...draft,
                drafts: [
                  {
                    ...contents,
                    html_contents,
                  },
                ],
              });
            }}
          />
          <SpaceFiles
            isEdit={isEdit}
            files={contents.files}
            onremove={(index: number) => {
              const newFiles = [...contents.files];
              newFiles.splice(index, 1);
              setDraft({
                ...draft,
                drafts: [
                  {
                    ...contents,
                    files: newFiles,
                  },
                ],
              });
            }}
            onadd={(file: FileInfo) => {
              setDraft({
                ...draft,
                drafts: [
                  {
                    ...contents,
                    files: [...contents.files, file],
                  },
                ],
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

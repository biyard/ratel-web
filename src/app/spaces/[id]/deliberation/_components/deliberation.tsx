'use client';

// import CalendarPicker from '@/components/calendar-picker/calendar-picker';
// import TimeDropdown from '@/components/time-dropdown/time-dropdown';
import React from 'react';
import SpaceHeader from '../../_components/space_header';
import { Deliberation } from '../page.client';
import SpaceDiscussion from './space_discussion';
import SpaceElearning from './space_elearning';
import { FileInfo } from '@/lib/api/models/feeds';
import {
  Discussion,
  DiscussionCreateRequest,
} from '@/lib/api/models/discussion';
import { SpaceStatus } from '@/lib/api/models/spaces';

export default function DeliberationPage({
  title,
  status,
  deliberation,
  discussions,
  setTitle,
  setDeliberation,

  userType,
  proposerImage,
  proposerName,
  createdAt,
  isEdit,

  onback,
}: {
  title: string;
  status: SpaceStatus;
  deliberation: Deliberation;
  discussions: Discussion[];
  setTitle: (title: string) => void;
  setDeliberation: (deliberation: Deliberation) => void;
  userType: number;
  proposerImage: string;
  proposerName: string;
  createdAt: number;
  isEdit: boolean;
  onback: () => void;
}) {
  return (
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
      <div className="flex flex-col mt-[25px] gap-2.5">
        <SpaceDiscussion
          isEdit={isEdit}
          status={status}
          discussions={deliberation.discussions}
          discussionRaws={discussions}
          onadd={(discussion: DiscussionCreateRequest) => {
            setDeliberation({
              ...deliberation,
              discussions: [...deliberation.discussions, discussion],
            });
          }}
          onupdate={(index: number, discussion: DiscussionCreateRequest) => {
            const updated = [...deliberation.discussions];
            updated[index] = discussion;
            setDeliberation({
              ...deliberation,
              discussions: updated,
            });
          }}
          onremove={(index: number) => {
            const updated = deliberation.discussions.filter(
              (_, i) => i !== index,
            );
            setDeliberation({
              ...deliberation,
              discussions: updated,
            });
          }}
        />
        <SpaceElearning
          isEdit={isEdit}
          elearnings={deliberation.elearnings}
          onremove={(index: number) => {
            const updated = deliberation.elearnings.filter(
              (_, i) => i !== index,
            );
            setDeliberation({
              ...deliberation,
              elearnings: updated,
            });
          }}
          onadd={(file: FileInfo) => {
            setDeliberation({
              ...deliberation,
              elearnings: [...deliberation.elearnings, { files: [file] }],
            });
          }}
        />
      </div>
      {/* <CalendarPicker
        value={1750321970 * 1000}
        onChange={(newTimestamp) => {
          console.log(
            'Selected date:',
            new Date(newTimestamp).toLocaleString(),
          );
        }}
      /> */}
      {/* <TimeDropdown
        value={1750321970 * 1000}
        onChange={function (newTimestamp: number): void {
          throw new Error('Function not implemented.');
        }}
      /> */}
    </div>
  );
}

'use client';

import React from 'react';
import SpaceHeader from '../../_components/space_header';
// import { Poll } from '../page.client';

export default function PollPage({
  title,
  //   survey,
  setTitle,
  //   setSurvey,

  userType,
  proposerImage,
  proposerName,
  createdAt,
  isEdit,
}: {
  title: string;
  //   survey: Poll;
  setTitle: (title: string) => void;
  //   setSurvey: (survey: Poll) => void;
  userType: number;
  proposerImage: string;
  proposerName: string;
  createdAt: number;
  isEdit: boolean;
}) {
  return (
    <div className="flex flex-col w-full">
      <SpaceHeader
        isEdit={isEdit}
        title={title}
        userType={userType}
        proposerImage={proposerImage}
        proposerName={proposerName}
        createdAt={createdAt}
        setTitle={(title: string) => {
          setTitle(title);
        }}
      />

      <div className="flex flex-col mt-[25px] gap-2.5">survey item</div>
    </div>
  );
}

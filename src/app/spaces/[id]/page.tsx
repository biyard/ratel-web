'use client';
import React from 'react';
import SpaceHeader from './_components/space_header';
import SpaceContents from './_components/space_contents';
import SpaceFiles from './_components/space_files';

import { FileExtension, FileInfo } from '@/lib/api/models/feeds';
import { useSpaceBySpaceId } from '@/app/(social)/_hooks/use-spaces';
import { useParams } from 'next/navigation';

export default function SpaceByIdPage() {
  const params = useParams();
  const spaceId = Number(params.id);
  const { data } = useSpaceBySpaceId(spaceId);

  return (
    <div className="flex flex-col w-full justify-start items-start">
      <SpaceHeader
        title={data.title ?? ''}
        proposerImage={data.author[0].profile_url ?? ''}
        proposerName={data.author[0].nickname ?? ''}
        createdAt={data.created_at}
      />
      <div className="w-full mt-25 gap-2.5">
        <SpaceContents htmlContents={data.html_contents}></SpaceContents>
        <SpaceFiles files={data.files} />
      </div>
    </div>
  );
}

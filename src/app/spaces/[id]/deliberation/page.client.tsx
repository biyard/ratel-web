'use client';

import React from 'react';
import SpaceSideMenu from './_components/space_side_menu';
import { useParams } from 'next/navigation';
import { useSpaceBySpaceId } from '@/app/(social)/_hooks/use-spaces';
import SpaceHeader from '../_components/space_header';
import SpaceContents from '../_components/space_contents';
import SpaceFiles from './_components/space_files';

export default function SpaceByIdPage() {
  const params = useParams();
  const spaceId = Number(params.id);
  const { data: space } = useSpaceBySpaceId(spaceId);

  return (
    <div className="flex flex-row w-full gap-5">
      <div className="flex flex-col w-full">
        <SpaceHeader
          title={space?.title ?? ''}
          userType={space?.author[0].user_type ?? 0}
          proposerImage={space?.author[0].profile_url ?? ''}
          proposerName={space?.author[0].nickname ?? ''}
          createdAt={space?.created_at}
        />
        <div className="flex flex-col w-full mt-7.5 gap-2.5">
          <SpaceContents htmlContents={space?.html_contents}></SpaceContents>
          <SpaceFiles files={space?.files} />
        </div>
      </div>
      <SpaceSideMenu spaceId={spaceId} />
    </div>
  );
}

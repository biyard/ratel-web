'use client';
import React from 'react';
import SpaceHeader from './_components/space_header';
import SpaceContents from './_components/space_contents';
import SpaceFiles from './_components/space_files';
import { useSpaceBySpaceId } from '@/app/(social)/_hooks/use-spaces';
import { useParams } from 'next/navigation';
import { useRedeemCode } from '@/lib/api/hooks/redeem-codes';

export default function SpaceByIdPage() {
  const params = useParams();
  const spaceId = Number(params.id);
  const { data: space } = useSpaceBySpaceId(spaceId);
  const redeem = useRedeemCode(spaceId);
  console.log('redeem', redeem.data);
  return (
    <div className="flex flex-col w-full justify-start items-start">
      <SpaceHeader
        title={space?.title ?? ''}
        proposerImage={space?.author[0].profile_url ?? ''}
        proposerName={space?.author[0].nickname ?? ''}
        createdAt={space?.created_at}
      />
      <div className="w-full mt-[25px] gap-2.5">
        <SpaceContents htmlContents={space?.html_contents}></SpaceContents>
        <SpaceFiles files={space?.files} />
      </div>
    </div>
  );
}

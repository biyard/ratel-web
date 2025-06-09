'use client';
import React from 'react';
import SpaceHeader from './_components/space_header';
import SpaceContents from './_components/space_contents';
import SpaceCouponProgress from './_components/coupon-progress';

import SpaceFiles from './_components/space_files';
import { useSpaceBySpaceId } from '@/app/(social)/_hooks/use-spaces';
import { useParams } from 'next/navigation';
import { useRedeemCode } from '@/lib/api/hooks/redeem-codes';

export default function SpaceByIdPage() {
  const params = useParams();
  const spaceId = Number(params.id);
  const { data: space } = useSpaceBySpaceId(spaceId);
  const redeem = useRedeemCode(spaceId);

  return (
    <div className="flex flex-col w-full justify-start items-start">
      <SpaceHeader
        title={space?.title ?? ''}
        proposerImage={space?.author[0].profile_url ?? ''}
        proposerName={space?.author[0].nickname ?? ''}
        createdAt={space?.created_at}
      />
      <div className="flex flex-col w-full mt-7.5 gap-2.5">
        <SpaceCouponProgress progress={redeem.data.used.length || 0} />
        <SpaceContents htmlContents={space?.html_contents}></SpaceContents>
        <SpaceFiles files={space?.files} badges={space?.badges} />
      </div>
    </div>
  );
}

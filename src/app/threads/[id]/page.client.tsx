'use client';

import React from 'react';

import { useSpaceBySpaceId } from '@/app/(social)/_hooks/use-spaces';
import { useParams } from 'next/navigation';
import { useRedeemCode } from '@/lib/api/hooks/redeem-codes';
import ThreadCouponProgress from './_components/coupon-progress';
import ThreadContents from './_components/thread_contents';
import ThreadFiles from './_components/thread_files';
import ThreadHeader from './_components/thread_header';

export default function ThreadByIdPage() {
  const params = useParams();
  const spaceId = Number(params.id);
  const { data: space } = useSpaceBySpaceId(spaceId);
  const redeem = useRedeemCode(spaceId);

  return (
    <div className="flex flex-col w-full justify-start items-start">
      <ThreadHeader
        title={space?.title ?? ''}
        userType={space?.author[0].user_type ?? 0}
        proposerImage={space?.author[0].profile_url ?? ''}
        proposerName={space?.author[0].nickname ?? ''}
        createdAt={space?.created_at}
      />
      <div className="flex flex-col w-full mt-7.5 gap-2.5">
        <ThreadCouponProgress progress={redeem.data?.used?.length || 0} />
        <ThreadContents htmlContents={space?.html_contents}></ThreadContents>
        <ThreadFiles files={space?.files} badges={space?.badges} />
      </div>
    </div>
  );
}

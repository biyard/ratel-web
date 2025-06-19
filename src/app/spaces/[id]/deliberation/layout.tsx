'use client';
import Loading from '@/app/loading';
import React, { Suspense, useState } from 'react';
import SpaceSideMenu from './_components/space_side_menu';
import CreateCommentBox from '../_components/create_comment_box';
import SpaceComments from '../_components/space_comments';
import { useParams } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
}

export default function SpaceByIdLayout({ children }: LayoutProps) {
  const [expand, setExpand] = useState(false);
  const [close, setClose] = useState(true);
  const params = useParams();
  const spaceId = Number(params.id);

  return (
    <div className="flex flex-col w-full min-h-screen justify-between max-w-6xl mx-auto text-white pt-3 gap-5 max-tablet:px-5 mb-8">
      <div className="flex flex-row w-full gap-5">
        <div className="flex-1 flex w-full">
          <Suspense
            fallback={
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                <Loading />
              </div>
            }
          >
            {children}
          </Suspense>
        </div>
        <SpaceSideMenu spaceId={spaceId} />
      </div>
      <SpaceComments
        spaceId={spaceId}
        setClose={() => {
          const c = close;
          setClose(!c);
          if (c) {
            setExpand(true);
          }
        }}
      />
      <div
        className={
          close
            ? 'fixed bottom-0 w-[1152px] max-[1152px]:w-full max-[1152px]:px-[10px] max-tablet:pr-[40px] hidden'
            : 'fixed bottom-0 w-[1152px] max-[1152px]:w-full max-[1152px]:px-[10px] max-tablet:pr-[40px]'
        }
      >
        <CreateCommentBox
          spaceId={spaceId}
          expand={expand}
          setExpand={(description: string) => {
            if (description.length == 0) {
              setClose(true);
              setExpand(false);
            } else {
              setExpand(!expand);
            }
          }}
          setClose={() => {
            const c = close;
            setClose(!c);
            if (c) {
              setExpand(true);
            }
          }}
        />
      </div>
    </div>
  );
}

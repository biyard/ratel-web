import Loading from '@/app/loading';
import React, { Suspense } from 'react';
import SpaceSideMenu from './_components/space_side_menu';
import CreateCommentBox from './_components/create_comment_box';

export default function SpaceByIdLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="flex flex-col w-full min-h-screen justify-between max-w-6xl mx-auto text-white pt-3 gap-5">
      <div className="flex flex-row w-full gap-20">
        <div className="flex-1 flex w-full">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <Loading />
              </div>
            }
          >
            {children}
          </Suspense>
        </div>
        <SpaceSideMenu />
      </div>

      <CreateCommentBox />
    </div>
  );
}

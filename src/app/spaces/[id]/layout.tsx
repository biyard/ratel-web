import Loading from '@/app/loading';
import React, { Suspense } from 'react';

export default function SpaceByIdLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="flex w-full min-h-screen justify-between max-w-6xl mx-auto text-white pt-3 gap-20">
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
      <div className="flex flex-col w-[250px]">Side Menu</div>
    </div>
  );
}

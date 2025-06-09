import React from 'react';
import SpaceHeader from './_components/space_header';

export interface SpaceByIdPageProps {
  params: Promise<{ id: string }>;
}

export default async function SpaceByIdPage({ params }: SpaceByIdPageProps) {
  const { id } = await params;
  const idNumber = Number(id);
  return (
    <div className="flex flex-col w-full justify-start items-start">
      <SpaceHeader
        title={'Crypto/Temporary Increase of Staking Rewards to 8% for 90 Days'}
        proposerImage={
          '/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocLnjByXv4CjNxGe1LeInDY-GetDB5T7KUeGpYG4smYANKtP3g%3Ds96-c&w=48&q=75'
        }
        proposerName={'Chanhui Lee'}
        createdAt={1749446948}
      />
    </div>
  );
}

import BlackBox from '@/app/(social)/_components/black-box';
import React from 'react';

export interface SpaceContentsProps {
  htmlContents: string;
}

export default function SpaceContents({ htmlContents }: SpaceContentsProps) {
  return (
    <BlackBox>
      <div
        className="prose prose-invert"
        dangerouslySetInnerHTML={{ __html: htmlContents }}
      />
    </BlackBox>
  );
}

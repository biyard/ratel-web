'use client';

import BlackBox from '@/app/(social)/_components/black-box';
import React from 'react';

export interface SpaceContentsProps {
  htmlContents: string;
}

export default function SpaceContents({ htmlContents }: SpaceContentsProps) {
  return (
    <BlackBox>
      <div
        className="rich-content"
        dangerouslySetInnerHTML={{ __html: htmlContents }}
      />
      <style jsx global>{`
        .rich-content h1 {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #d4d4d4;
        }
        .rich-content h2 {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #d4d4d4;
        }
        .rich-content h3 {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #d4d4d4;
        }
        .rich-content h4 {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #d4d4d4;
        }
        .rich-content h5 {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #d4d4d4;
        }
        .rich-content h6 {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #d4d4d4;
        }
        .rich-content p {
          font-size: 15px;
          font-weight: 400;
          line-height: 24px;
          margin-bottom: 20px;
          color: #d4d4d4;
        }
      `}</style>
    </BlackBox>
  );
}

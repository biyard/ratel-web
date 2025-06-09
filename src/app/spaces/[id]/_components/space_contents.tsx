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
          font-size: 1.875rem; /* text-3xl */
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .rich-content h2 {
          font-size: 1.5rem; /* text-2xl */
          font-weight: 600;
          margin-bottom: 0.75rem;
        }
        .rich-content h3 {
          font-size: 1.25rem; /* text-xl */
          font-weight: 600;
          margin-bottom: 0.625rem;
        }
        .rich-content h4 {
          font-size: 1.125rem; /* text-lg */
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        .rich-content h5 {
          font-size: 1rem; /* text-base */
          font-weight: 500;
          margin-bottom: 0.375rem;
        }
        .rich-content h6 {
          font-size: 0.875rem; /* text-sm */
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        .rich-content p {
          font-size: 1rem;
          color: #ffffff;
          margin-bottom: 0.75rem;
        }
      `}</style>
    </BlackBox>
  );
}

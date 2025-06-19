'use client';

import BlackBox from '@/app/(social)/_components/black-box';
import { FileInfo } from '@/lib/api/models/feeds';
import React from 'react';

import { downloadPdfFromUrl } from '@/lib/pdf-utils';
import { checkString } from '@/lib/string-filter-utils';
import SpaceFile from '../../_components/space_file';

export interface SpaceFilesProps {
  files: FileInfo[];
}

export default function SpaceFiles({ files }: SpaceFilesProps) {
  const handlePdfDownload = async (file: FileInfo) => {
    await downloadPdfFromUrl({
      url: file.url ?? '',
      fileName: file.name,
    });
  };
  return (
    <BlackBox>
      <div className="flex flex-col w-full gap-5">
        <div className="font-bold text-white text-[15px]/[20px]">
          Attached Files
        </div>

        <div className="grid grid-cols-2 max-tablet:grid-cols-1 gap-2.5">
          {files
            ?.filter((file) => !checkString(file.name))
            .map((file, index) => (
              <SpaceFile
                file={file}
                key={'file ' + index}
                onClick={() => handlePdfDownload(file)}
              />
            ))}
        </div>
      </div>
    </BlackBox>
  );
}

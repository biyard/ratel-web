import BlackBox from '@/app/(social)/_components/black-box';
import { FileExtension, FileInfo } from '@/lib/api/models/feeds';
import React from 'react';

import Jpg from '@/assets/icons/files/jpg.svg';
import Png from '@/assets/icons/files/png.svg';
import Pdf from '@/assets/icons/files/pdf.svg';
import Zip from '@/assets/icons/files/zip.svg';
import Word from '@/assets/icons/files/docx.svg';
import Pptx from '@/assets/icons/files/pptx.svg';
import Excel from '@/assets/icons/files/xlsx.svg';
import Upload from '@/assets/icons/upload.svg';

export interface SpaceFilesProps {
  files: FileInfo[];
}

export default function SpaceFiles({ files }: SpaceFilesProps) {
  return (
    <BlackBox>
      <div className="flex flex-col w-full gap-5">
        <div className="font-bold text-white text-[15px]/[20px]">
          Attached Files
        </div>

        <div className="grid grid-cols-2 max-tablet:grid-cols-1 gap-2.5">
          {files.map((file) => (
            <File file={file} />
          ))}
        </div>
      </div>
    </BlackBox>
  );
}

function File({ file }: { file: FileInfo }) {
  console.log('File: ', file.ext);
  return (
    <div className="cursor-pointer flex flex-row justify-start items-center w-full gap-2 p-4 bg-neutral-800 rounded-2">
      {file.ext === 'JPG' ? (
        <Jpg width={36} height={36} />
      ) : file.ext === 'PNG' ? (
        <Png width={36} height={36} />
      ) : file.ext === 'PDF' ? (
        <Pdf width={36} height={36} />
      ) : file.ext === 'ZIP' ? (
        <Zip width={36} height={36} />
      ) : file.ext === 'WORD' ? (
        <Word width={36} height={36} />
      ) : file.ext === 'PPTX' ? (
        <Pptx width={36} height={36} />
      ) : (
        <Excel width={36} height={36} />
      )}

      <div className="flex flex-col w-full justify-start items-start gap-2">
        <div className="font-semibold text-xs/[18px] text-neutral-400">
          {file.name}
        </div>
        <div className="font-normal text-base/[16px] text-[#6d6d6d]">
          {file.size}
        </div>
      </div>

      <Upload width={16} height={16} />
    </div>
  );
}

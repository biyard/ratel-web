'use client';

import BlackBox from '@/app/(social)/_components/black-box';
import { FileInfo } from '@/lib/api/models/feeds';
import React from 'react';

import Jpg from '@/assets/icons/files/jpg.svg';
import Png from '@/assets/icons/files/png.svg';
import Pdf from '@/assets/icons/files/pdf.svg';
import Zip from '@/assets/icons/files/zip.svg';
import Word from '@/assets/icons/files/docx.svg';
import Pptx from '@/assets/icons/files/pptx.svg';
import Excel from '@/assets/icons/files/xlsx.svg';
import Upload from '@/assets/icons/upload.svg';
import { replacePdfLinks, UrlReplacement } from '@/lib/pdf-utils';
import { useRedeemCode } from '@/lib/api/hooks/redeem-codes';
import { useParams } from 'next/navigation';
import { usePopup } from '@/lib/contexts/popup-service';
import { NftSelectModal } from './nft-select-modal';
import { Badge } from '@/lib/api/models/badge';
import { useApiCall } from '@/lib/api/use-send';
import { ratelApi } from '@/lib/api/ratel_api';

export interface SpaceFilesProps {
  files: FileInfo[];
  badges: Badge[];
}

export default function SpaceFiles({ files, badges }: SpaceFilesProps) {
  const popup = usePopup();
  const params = useParams();
  const spaceId = Number(params.id);

  const redeem = useRedeemCode(spaceId);
  const { post } = useApiCall();

  const handlePdfDownload = async (file: FileInfo) => {
    const redeemId = redeem.data.id;
    const currentUrl = window.location.origin;
    const urlReplacements = redeem.data.codes.map((code, index) => {
      return {
        original: `https://redeem-codes/${index}`,
        replace: `${currentUrl}/redeems/${redeemId}?code=${code}`,
      } as UrlReplacement;
    });
    await replacePdfLinks({
      url: file.url ?? '',
      urlReplacements,
      fileName: file.name,
    });
  };
  const handleFileDownload = (file: FileInfo) => {
    popup
      .open(
        <NftSelectModal
          badges={badges}
          handleMintNfts={async (ids: number[], contract: string) => {
            const res = await post(ratelApi.spaces.claimBadge(spaceId), {
              claim: {
                ids: ids,
                evm_address: contract,
              },
            });
            if (res) {
              await handlePdfDownload(file);
              return true;
            } else {
              return false;
            }
          }}
        />,
      )
      .withTitle('Select Nft');
  };
  return (
    <BlackBox>
      <div className="flex flex-col w-full gap-5">
        <div className="font-bold text-white text-[15px]/[20px]">
          Attached Files
        </div>

        <div className="grid grid-cols-2 max-tablet:grid-cols-1 gap-2.5">
          {files?.map((file, index) => (
            <File
              file={file}
              key={'file ' + index}
              onClick={() => handleFileDownload(file)}
            />
          ))}
        </div>
      </div>
    </BlackBox>
  );
}

function File({ file, onClick }: { file: FileInfo; onClick: () => void }) {
  return (
    <div
      className="cursor-pointer flex flex-row justify-start items-center w-full gap-2 p-4 bg-neutral-800 rounded-2"
      onClick={onClick}
    >
      <div className="min-w-[36px] shrink-0">
        {file.ext === 'JPG' ? (
          <Jpg width={36} height={36} className="[&>path]:stroke-neutral-500" />
        ) : file.ext === 'PNG' ? (
          <Png width={36} height={36} className="[&>path]:stroke-neutral-500" />
        ) : file.ext === 'PDF' ? (
          <Pdf
            width={36}
            height={36}
            className="[&>path]:stroke-neutral-500 block"
          />
        ) : file.ext === 'ZIP' ? (
          <Zip width={36} height={36} className="[&>path]:stroke-neutral-500" />
        ) : file.ext === 'WORD' ? (
          <Word
            width={36}
            height={36}
            className="[&>path]:stroke-neutral-500"
          />
        ) : file.ext === 'PPTX' ? (
          <Pptx
            width={36}
            height={36}
            className="[&>path]:stroke-neutral-500"
          />
        ) : (
          <Excel
            width={36}
            height={36}
            className="[&>path]:stroke-neutral-500"
          />
        )}
      </div>
      <div className="flex flex-col w-full justify-start items-start gap-2">
        <div className="font-semibold text-xs/[18px] text-neutral-400">
          {file.name}
        </div>
        <div className="font-normal text-[10px]/[16px] text-[#6d6d6d]">
          {file.size}
        </div>
      </div>
      <Upload width={16} height={16} />
    </div>
  );
}

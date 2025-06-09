'use client';
import React, { Fragment, useState } from 'react';
import { usePopup } from '@/lib/contexts/popup-service';
import { Button } from '@/components/ui/button';
import { Badge } from '@/lib/api/models/badge';
import Loading from '@/app/loading';

interface NftSelectModalProps {
  id?: string;
  badges: Badge[];
  handleMintNfts: (ids: number[], contract: string) => Promise<boolean>;
}
export function NftSelectModal({
  id = 'nft_select_modal',
  badges,
  handleMintNfts,
}: NftSelectModalProps) {
  const popup = usePopup();
  const [loading, setLoading] = React.useState(false);

  const [selectNft, setSelectNft] = useState<number[]>([]);
  const [contract, setContract] = useState<string | null>(null);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div id={id} className="relative grid grid-cols-3 gap-10">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <Loading />
          </div>
        )}
        {badges.map(({ id, image_url, name, contract }) => (
          <div
            key={id}
            onClick={() => {
              setContract(contract);
              setSelectNft((prev) => {
                return prev.includes(id)
                  ? prev.filter((i) => i !== id)
                  : [...prev, id];
              });
            }}
            className="cursor-pointer"
          >
            <div
              className={`border-4 ${selectNft.includes(id) ? 'border-primary' : 'border-transparent'} p-2 rounded-lg`}
            >
              <img src={image_url} alt={name} />
            </div>
          </div>
        ))}
      </div>
      <Button
        className="w-full bg-primary text-white text-xl disabled:bg-neutral-600 disabled:text-neutral-400"
        disabled={selectNft.length === 0 || loading}
        onClick={async () => {
          if (selectNft.length > 0) {
            !loading && setLoading(true);
            const success = await handleMintNfts(selectNft, contract!);
            if (success) {
              setLoading(false);
              popup.close();
            }
          }
        }}
      >
        Mint NFT & Download PDF
      </Button>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Col } from '@/components/ui/col';
import { Row } from '@/components/ui/row';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/lib/api/hooks/wallet';
import { ClipboardCopy } from 'lucide-react';
import Image from 'next/image';

export default function WalletSummary() {
  const { address, connectWallet } = useWallet();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="bg-zinc-900 text-white p-4 rounded-lg">
      <Col>
        <h3 className="mb-2 text-lg font-semibold">Wallet Summary</h3>
      </Col>

      <Col>
        <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
          <div className="flex items-center space-x-3">
            <Image
              src="/logos/meta-mask-icon.png"
              width={40}
              height={40}
              className="w-10 h-10 bg-[#D9D9D9] rounded-full p-2"
              alt="MetaMask"
            />
            <div className="font-semibold">
              <div>MetaMask</div>
              <div className="mt-1 flex items-center space-x-2 text-sm text-gray-400">
                {address ? (
                  <>
                    <span>
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </span>
                    <ClipboardCopy
                      className="w-4 h-4 cursor-pointer hover:text-gray-300"
                      onClick={handleCopy}
                    />
                    {copied && (
                      <span className="text-green-400 text-xs">Copied!</span>
                    )}
                  </>
                ) : (
                  <span>Connect Wallet to Get Started</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <Row className="justify-end mt-4">
          <Button variant={'default'} onClick={connectWallet}>
            {address ? 'Change Wallet' : 'Connect Wallet'}
          </Button>
        </Row>
      </Col>
    </div>
  );
}

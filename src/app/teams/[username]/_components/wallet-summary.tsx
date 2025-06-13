// components/WalletSummary.tsx
'use client';


import { Col } from '@/components/ui/col';
import { Row } from '@/components/ui/row';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/lib/api/hooks/wallet';


export default function WalletSummary() {
    const { address, connectWallet } = useWallet();

  return (
    <div className="bg-zinc-900 text-white p-4 rounded-lg">
      <Col>
        <h3 className="mb-2 text-lg font-semibold">Wallet Summary</h3>
      </Col>

      <Col>
        <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
          <div className="flex items-center space-x-3">
            <img src="/logos/meta-mask-icon.png" className="w-10 h-10 bg-[#D9D9D9] rounded-full p-2" alt="MetaMask" />
            <span>
              MetaMask{' '}
              {address && (
              <span className="ml-2 text-gray-400">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
            )}
            </span>
          </div>
        </div>

        <Row className="justify-end">

          <Button variant={'default'} onClick={connectWallet}>
            {address ? 'Change Wallet' : 'Connect Wallet'}
            {/* Connect Wallet */}
          </Button>

       
        </Row>
      </Col>
    </div>
  );
}

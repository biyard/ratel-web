// components/WalletSummary.tsx
'use client';

// import { useWallet } from '@/hooks/useWallet';

export default function WalletSummary() {
  //   const { address, connectWallet } = useWallet();

  return (
    <div className="bg-zinc-900 text-white p-4 rounded-lg">
      <h3 className="mb-2 text-lg font-semibold">Wallet Summary</h3>

      <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
        <div className="flex items-center space-x-3">
          <img src="/metamask-icon.png" className="w-6 h-6" alt="MetaMask" />
          <span>
            MetaMask{' '}
            {/* {address && (
              <span className="ml-2 text-gray-400">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
            )} */}
          </span>
        </div>

        <button
        //   onClick={connectWallet}
          className="bg-white text-black text-sm px-3 py-1 rounded-md font-medium"
        >
          Connect Wallet
          {/* {address ? 'Change Wallet' : 'Connect Wallet'} */}
        </button>
      </div>
    </div>
  );
}

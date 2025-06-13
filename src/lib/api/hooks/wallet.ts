
import { useState } from 'react';
import { ethers } from 'ethers';

interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on?: (...args: any[]) => void;
  removeListener?: (...args: any[]) => void;
}

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    const ethereum = (window as unknown as { ethereum?: EthereumProvider }).ethereum;

    if (!ethereum) {
      alert("Please install MetaMask");
      return;
    }

    try {
    //   const accounts = await ethereum.request({
    //     method: 'eth_requestAccounts',
    //   });

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();

      setAddress(walletAddress);

    } catch (err) {
      console.error('Wallet connection failed:', err);
    }
  };

  return { address, connectWallet };
}

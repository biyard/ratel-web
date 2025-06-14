import { useState } from 'react';
import { ethers } from 'ethers';
import { useApiCall } from '../use-send';
import { ratelApi } from '../ratel_api';
import { useUserInfo } from './users';
import { logger } from '@/lib/logger';


interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on?: (...args: any[]) => void;
  removeListener?: (...args: any[]) => void;
}

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const { data: user } = useUserInfo();
  const { post } = useApiCall();

  

  const connectWallet = async () => {
    const ethereum = (window as unknown as { ethereum?: EthereumProvider })
      .ethereum;

    if (!ethereum) {
      alert('Please install MetaMask');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();

      setAddress(walletAddress);

      if (!user) {
        logger.warn('User info is not loaded yet');
        return;
      }

      await post(ratelApi.users.updateEvmAddress(), {
        update_evm_address: {
          evm_address: walletAddress,
        },
      });

      logger.info('Evm_address update successfully');
    } catch (err) {
      logger.error('Wallet connection failed:', err);
    }
  };

  return { address, connectWallet };
}

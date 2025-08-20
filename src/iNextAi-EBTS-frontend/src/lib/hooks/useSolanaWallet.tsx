import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import { useWalletStore } from '../store/wallet-store';

export const useSolanaWallet = () => {
  const { 
    wallet,
    publicKey, 
    connected, 
    connecting, 
    connect, 
    disconnect, 
    select,
    wallets 
  } = useWallet();
  
  const { setSolanaConnection, setLoading, setError } = useWalletStore();

  // Sync Solana wallet state with our store
  useEffect(() => {
    if (connected && publicKey && wallet) {
      setSolanaConnection(true, publicKey.toBase58(), wallet.adapter.name);
    } else {
      setSolanaConnection(false);
    }
  }, [connected, publicKey, wallet, setSolanaConnection]);

  useEffect(() => {
    setLoading(connecting);
  }, [connecting, setLoading]);

  const connectWallet = async (walletName?: string) => {
    try {
      if (walletName) {
        const targetWallet = wallets.find(w => w.adapter.name === walletName);
        if (targetWallet) {
          select(targetWallet.adapter.name);
        }
      }
      
      if (!connected) {
        await connect();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to connect Solana wallet');
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnect();
      setSolanaConnection(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to disconnect Solana wallet');
    }
  };

  return {
    wallet,
    publicKey,
    connected,
    connecting,
    wallets,
    connect: connectWallet,
    disconnect: disconnectWallet,
    select
  };
};

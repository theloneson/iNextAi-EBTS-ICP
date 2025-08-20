
// hooks/useWallet.ts - Combined hook for both EVM and Solana

import { useWalletStore } from "../store/wallet-store";
import { useEVMWallet } from "./useEVMWallet";
import { useSolanaWallet } from "./useSolanaWallet";


export const useWallet = () => {
  const evmWallet = useEVMWallet();
  const solanaWallet = useSolanaWallet();
  const store = useWalletStore();

  return {
    // EVM wallet
    evm: evmWallet,
    
    // Solana wallet  
    solana: solanaWallet,
    
    // Combined state
    isAnyWalletConnected: store.isAnyWalletConnected(),
    connectedWallets: store.getConnectedWallets(),
    
    // Utility functions
    formatAddress: store.formatAddress,
    
    // Global state
    isLoading: store.isLoading,
    error: store.error,
    clearError: store.clearError,
    reset: store.reset
  };
};

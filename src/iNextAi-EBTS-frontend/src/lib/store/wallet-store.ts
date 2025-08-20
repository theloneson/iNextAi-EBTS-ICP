// store/wallet-store.ts
import { WalletConnectionState } from '@/types/wallet';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletStore extends WalletConnectionState {
  // Actions
  setEVMConnection: (connected: boolean, address?: string, chainId?: number, connectorName?: string) => void;
  setSolanaConnection: (connected: boolean, address?: string, walletName?: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
  
  // Utility methods
  formatAddress: (address: string | null, length?: number) => string;
  isAnyWalletConnected: () => boolean;
  getConnectedWallets: () => string[];
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      // Initial state
      evmConnected: false,
      evmAddress: null,
      evmChainId: null,
      evmConnectorName: null,
      solanaConnected: false,
      solanaAddress: null,
      solanaNetwork: 'mainnet-beta',
      solanaWalletName: null,
      isLoading: false,
      error: null,

      // Actions
      setEVMConnection: (connected, address, chainId, connectorName) => {
        set({
          evmConnected: connected,
          evmAddress: address || null,
          evmChainId: chainId || null,
          evmConnectorName: connectorName || null,
          error: null
        });
      },

      setSolanaConnection: (connected, address, walletName) => {
        set({
          solanaConnected: connected,
          solanaAddress: address || null,
          solanaWalletName: walletName || null,
          error: null
        });
      },

      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error, isLoading: false }),
      clearError: () => set({ error: null }),

      reset: () => set({
        evmConnected: false,
        evmAddress: null,
        evmChainId: null,
        evmConnectorName: null,
        solanaConnected: false,
        solanaAddress: null,
        solanaWalletName: null,
        isLoading: false,
        error: null
      }),

      // Utility methods
      formatAddress: (address, length = 6) => {
        if (!address) return '';
        return `${address.slice(0, length)}...${address.slice(-4)}`;
      },

      isAnyWalletConnected: () => {
        const state = get();
        return state.evmConnected || state.solanaConnected;
      },

      getConnectedWallets: () => {
        const state = get();
        const connected = [];
        if (state.evmConnected && state.evmConnectorName) {
          connected.push(`${state.evmConnectorName} (EVM)`);
        }
        if (state.solanaConnected && state.solanaWalletName) {
          connected.push(`${state.solanaWalletName} (Solana)`);
        }
        return connected;
      }
    }),
    {
      name: 'wallet-storage',
      partialize: (state) => ({
        evmConnected: state.evmConnected,
        evmAddress: state.evmAddress,
        evmChainId: state.evmChainId,
        evmConnectorName: state.evmConnectorName,
        solanaConnected: state.solanaConnected,
        solanaAddress: state.solanaAddress,
        solanaNetwork: state.solanaNetwork,
        solanaWalletName: state.solanaWalletName
      })
    }
  )
);

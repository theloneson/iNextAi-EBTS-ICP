import { create } from 'zustand';

// Types for wallet connections
export interface WalletState {
  // EVM State
  evmConnected: boolean;
  evmAddress: string | null;
  evmChainId: number | null;
  evmProvider: any | null;
  
  // Solana State
  solanaConnected: boolean;
  solanaAddress: string | null;
  solanaNetwork: string | null;
  solanaProvider: any | null;
  
  // General State
  isLoading: boolean;
  error: string | null;
  
  // Actions
  connectEVM: (connector: 'metamask' | 'walletconnect' | 'coinbase') => Promise<void>;
  connectSolana: (wallet: string) => Promise<void>;
  disconnectEVM: () => void;
  disconnectSolana: () => void;
  clearError: () => void;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  // Initial state
  evmConnected: false,
  evmAddress: null,
  evmChainId: null,
  evmProvider: null,
  solanaConnected: false,
  solanaAddress: null,
  solanaNetwork: null,
  solanaProvider: null,
  isLoading: false,
  error: null,

  // Connect to EVM wallet
  connectEVM: async (connector: 'metamask' | 'walletconnect' | 'coinbase') => {
    try {
      set({ isLoading: true, error: null });
      
      // Simulate wallet connection for now
      // In production, this would integrate with actual wallet providers
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockAddress = '0x' + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);
      const mockChainId = 1; // Ethereum mainnet
      
      set({
        evmConnected: true,
        evmAddress: mockAddress,
        evmChainId: mockChainId,
        evmProvider: null, // Would be actual provider
        isLoading: false,
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'EVM connection failed', 
        isLoading: false 
      });
    }
  },

  // Connect to Solana wallet
  connectSolana: async (wallet: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // Simulate Solana wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockAddress = 'mock-solana-address-' + Math.random().toString(36).substr(2, 9);
      
      set({
        solanaConnected: true,
        solanaAddress: mockAddress,
        solanaNetwork: 'mainnet-beta',
        solanaProvider: null, // Would be actual wallet provider
        isLoading: false,
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Solana connection failed', 
        isLoading: false 
      });
    }
  },

  // Disconnect EVM
  disconnectEVM: () => {
    set({
      evmConnected: false,
      evmAddress: null,
      evmChainId: null,
      evmProvider: null,
    });
  },

  // Disconnect Solana
  disconnectSolana: () => {
    set({
      solanaConnected: false,
      solanaAddress: null,
      solanaNetwork: null,
      solanaProvider: null,
    });
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

// Hook for easy access to wallet state and actions
export const useWallet = () => {
  const store = useWalletStore();
  
  return {
    // State
    evmConnected: store.evmConnected,
    evmAddress: store.evmAddress,
    evmChainId: store.evmChainId,
    evmProvider: store.evmProvider,
    solanaConnected: store.solanaConnected,
    solanaAddress: store.solanaAddress,
    solanaNetwork: store.solanaNetwork,
    solanaProvider: store.solanaProvider,
    isLoading: store.isLoading,
    error: store.error,
    
    // Actions
    connectEVM: store.connectEVM,
    connectSolana: store.connectSolana,
    disconnectEVM: store.disconnectEVM,
    disconnectSolana: store.disconnectSolana,
    clearError: store.clearError,
  };
};
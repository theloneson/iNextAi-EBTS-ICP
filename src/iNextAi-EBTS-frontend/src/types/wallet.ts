export interface WalletConnectionState {
  // EVM State (Web3Modal)
  evmConnected: boolean;
  evmAddress: string | null;
  evmChainId: number | null;
  evmConnectorName: string | null;
  
  // Solana State
  solanaConnected: boolean;
  solanaAddress: string | null;
  solanaNetwork: string | null;
  solanaWalletName: string | null;
  
  // General State
  isLoading: boolean;
  error: string | null;
}
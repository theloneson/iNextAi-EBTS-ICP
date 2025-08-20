// hooks/useEVMWallet.ts
import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { useEffect } from 'react';
import { useWalletStore } from '../store/wallet-store';

export const useEVMWallet = () => {
  const { address, isConnected, connector } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  
  const { setEVMConnection, setError } = useWalletStore();

  // Sync Web3Modal state with our store
  useEffect(() => {
    if (isConnected && address && connector) {
      setEVMConnection(true, address, chainId, connector.name);
    } else {
      setEVMConnection(false);
    }
  }, [isConnected, address, chainId, connector, setEVMConnection]);

  const connectWallet = async (connectorId?: string) => {
    try {
      const targetConnector = connectorId 
        ? connectors.find(c => c.id === connectorId) || connectors[0]
        : connectors[0];
      
      connect({ connector: targetConnector });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to connect EVM wallet');
    }
  };

  const disconnectWallet = async () => {
    try {
      disconnect();
      setEVMConnection(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to disconnect EVM wallet');
    }
  };

  const switchNetwork = async (targetChainId: number) => {
    try {
      switchChain({ chainId: targetChainId });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to switch network');
    }
  };

  return {
    isConnected,
    address,
    chainId,
    connector,
    connectors,
    connect: connectWallet,
    disconnect: disconnectWallet,
    switchNetwork
  };
};

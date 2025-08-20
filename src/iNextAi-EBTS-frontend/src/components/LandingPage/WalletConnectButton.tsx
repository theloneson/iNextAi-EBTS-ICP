// components/WalletConnection.tsx - Example usage component
import React from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@/lib/hooks/useWallet";

export const WalletConnection: React.FC = () => {
  const {
    evm,
    solana,
    isAnyWalletConnected,
    connectedWallets,
    error,
    clearError,
  } = useWallet();
  const { setVisible } = useWalletModal();

  return (
    <div className="wallet-connection">
      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={clearError}>×</button>
        </div>
      )}

      {/* EVM Wallet Section */}
      <div className="wallet-section">
        <h3>EVM Wallets</h3>
        {evm.isConnected ? (
          <div className="connected-wallet">
            <span>Connected: {evm.connector?.name}</span>
            <span>
              {evm.address?.slice(0, 6)}...{evm.address?.slice(-4)}
            </span>
            <button onClick={evm.disconnect}>Disconnect</button>
          </div>
        ) : (
          <div className="wallet-options">
            <w3m-button />
          </div>
        )}
      </div>

      {/* Solana Wallet Section */}
      <div className="wallet-section">
        <h3>Solana Wallets</h3>
        {solana.connected ? (
          <div className="connected-wallet">
            <span>Connected: {solana.wallet?.adapter.name}</span>
            <span>
              {solana.publicKey?.toBase58().slice(0, 6)}...
              {solana.publicKey?.toBase58().slice(-4)}
            </span>
            <button onClick={solana.disconnect}>Disconnect</button>
          </div>
        ) : (
          <div className="wallet-options">
            <button onClick={() => setVisible(true)}>
              Connect Solana Wallet
            </button>
          </div>
        )}
      </div>

      {/* Connection Status */}
      {isAnyWalletConnected && (
        <div className="connection-status">
          <h4>Connected Wallets:</h4>
          <ul>
            {connectedWallets.map((wallet, index) => (
              <li key={index}>{wallet}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

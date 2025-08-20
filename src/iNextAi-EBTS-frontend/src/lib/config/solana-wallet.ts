// config/solana-wallets.ts
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  AlphaWalletAdapter,
  CoinbaseWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

export const SOLANA_NETWORKS = {
  "mainnet-beta": {
    name: "Solana Mainnet",
    rpcUrl: "https://api.mainnet-beta.solana.com",
    blockExplorer: "https://explorer.solana.com",
  },
  devnet: {
    name: "Solana Devnet",
    rpcUrl: "https://api.devnet.solana.com",
    blockExplorer: "https://explorer.solana.com?cluster=devnet",
  },
};

export const useSolanaWallets = (
  network: WalletAdapterNetwork = WalletAdapterNetwork.Mainnet
) => {
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new AlphaWalletAdapter(),
      new CoinbaseWalletAdapter(),
    ],
    []
  );

  return { endpoint, wallets };
};

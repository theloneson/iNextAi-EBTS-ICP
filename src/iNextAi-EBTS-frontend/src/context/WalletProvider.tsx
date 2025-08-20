import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ReactNode } from "react";

// Import Solana wallet adapter CSS
import "@solana/wallet-adapter-react-ui/styles.css";
import { useSolanaWallets } from "@/lib/config/solana-wallet";

const queryClient = new QueryClient();

interface WalletProvidersProps {
  children: ReactNode;
  solanaNetwork?: WalletAdapterNetwork;
}

export function WalletProviders({
  children,
  solanaNetwork = WalletAdapterNetwork.Mainnet,
}: WalletProvidersProps) {
  const { endpoint, wallets } = useSolanaWallets(solanaNetwork);

  return (
    <WagmiProvider config={WagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>{children}</WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

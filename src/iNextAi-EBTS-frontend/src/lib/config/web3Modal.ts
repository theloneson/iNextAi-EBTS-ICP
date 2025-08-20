import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { mainnet, polygon, base } from "viem/chains";

// 1. Get projectId from https://cloud.walletconnect.com
const projectId =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "your-project-id";

// 2. Create wagmiConfig
const metadata = {
  description: "AI-powered trading companion for emotional wellness",
  name: "iNext AI - Emotional Blockchain Trading System",
  url: "https://inext-ai.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, polygon, base] as const;

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  enableAnalytics: true,
  themeMode: "dark",
  themeVariables: {
    "--w3m-color-mix": "#00DCFF",
    "--w3m-color-mix-strength": 20,
  },
});

import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { mainnet, polygon, base } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'your-project-id'

const metadata = {
  name: 'iNext AI - EBTS',
  description: 'AI-powered trading companion',
  url: 'https://inext-ai.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const networks = [mainnet, polygon, base]

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId
})

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true
  }
})

export const wagmiConfig = wagmiAdapter.wagmiConfig
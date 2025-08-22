import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'
import { AppKitNetwork, arbitrum, mainnet } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://dashboard.reown.com
const projectId = import.meta.env.VITE_PROJECT_ID || "e60c031b5c0d0a68b87fdd5f81fe3c43"
console.log(projectId)

if (!projectId) throw new Error("No project id set");

// 2. Create a metadata object - optional
const metadata = {
    name: 'iNextAi EBTS',
    description: 'AppKit Example',
    url: 'https://inextai-web.netlify.app', // origin must match your domain & subdomain
    icons: ['https://inextai-web.netlify.app/assets/inextai-logo-DA--x6Zu.png']
}

// 3. Set the networks
const networks = [mainnet, arbitrum] as AppKitNetwork[]

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
    ssr: true
})

// 5. Create modal
createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    metadata,
    features: {
        analytics: true // Optional - defaults to your Cloud configuration
    }
})

export function AppKitProvider({ children }) {
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}
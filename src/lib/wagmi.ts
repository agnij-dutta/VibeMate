import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

// Use Sepolia for testing and mainnet for production
const activeChain = process.env.NODE_ENV === 'production' ? mainnet : sepolia;

// Replace with your WalletConnect project ID
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_WALLETCONNECT_PROJECT_ID';

// Vibemate contract address
export const CONTRACT_ADDRESS = '0xA68b3808DCf0Fd8630640018fCB96a28f497F504';

// Create Wagmi config
export const config = createConfig({
  chains: [activeChain],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
}); 
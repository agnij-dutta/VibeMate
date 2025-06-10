import { createConfig } from 'wagmi'
import { configureChains } from '@wagmi/core'
import { defineChain } from 'viem'
import { InjectedConnector } from '@wagmi/core/connectors/injected'
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'
import { CoinbaseWalletConnector } from '@wagmi/core/connectors/coinbaseWallet'
import { publicProvider } from '@wagmi/core/providers/public'

// Define Core testnet 2 chain
export const coreTestnet = defineChain({
  id: 1114,
  name: 'Core Testnet',
  network: 'core-testnet',
  nativeCurrency: {
    name: 'Core',
    symbol: 'tCORE',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.test2.btcs.network/']
    },
    public: {
      http: ['https://rpc.test2.btcs.network/']
    },
  },
  blockExplorers: {
    default: {
      name: 'Core Scan',
      url: 'https://scan.test2.btcs.network/'
    },
  },
  testnet: true,
})

// Replace with your WalletConnect project ID
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

// Vibemate contract address
export const CONTRACT_ADDRESS = '0xA68b3808DCf0Fd8630640018fCB96a28f497F504';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [coreTestnet],
  [publicProvider()]
)

const wallectConnectProjectId = projectId as string

export const config = createConfig({
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: false,
      },
    }),
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'VibeMate',
        appLogoUrl: '/hero-image.svg',
      },
    }),
    ...(wallectConnectProjectId && wallectConnectProjectId.length > 10 && !wallectConnectProjectId.includes('9f9310517adea17021a541eca3140522')
      ? [
          new WalletConnectConnector({
            chains,
            options: {
              projectId: wallectConnectProjectId,
              showQrModal: true,
              metadata: {
                name: 'VibeMate',
                description: 'Find Your Perfect Match on the Blockchain',
                url: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
                icons: ['/hero-image.svg'],
              },
            },
          }),
        ]
      : []),
  ],
  publicClient,
  webSocketPublicClient,
})
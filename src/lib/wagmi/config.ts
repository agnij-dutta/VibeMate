'use client';

import { createConfig, CreateConfigParameters } from 'wagmi'
import { configureChains } from '@wagmi/core'
import { InjectedConnector } from '@wagmi/core/connectors/injected'
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'
import { CoinbaseWalletConnector } from '@wagmi/core/connectors/coinbaseWallet'
import { publicProvider } from '@wagmi/core/providers/public'
import { coreTestnet } from './chains'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const wallectConnectProjectId = projectId as string;

// Initialize chains and providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [coreTestnet],
  [publicProvider()]
)

// Create wagmi config for client-side
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
    new WalletConnectConnector({
      chains,
      options: {
        projectId: wallectConnectProjectId,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'VibeMate',
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

export { chains }

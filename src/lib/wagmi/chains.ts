import { defineChain } from 'viem';

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

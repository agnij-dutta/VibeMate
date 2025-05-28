import { createPublicClient, http } from 'viem';
import { coreTestnet } from './chains';

// Server-side public client for API routes
export const publicClient = createPublicClient({
  chain: coreTestnet,
  transport: http()
});

// Contract address
export const CONTRACT_ADDRESS = '0xA68b3808DCf0Fd8630640018fCB96a28f497F504';

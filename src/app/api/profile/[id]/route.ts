import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';
import vibemateAbi from '@/abis/vibemate.json';
import { CONTRACT_ADDRESS } from '@/lib/wagmi';

// Create a public client
const client = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tokenId = parseInt(params.id);
    
    if (isNaN(tokenId) || tokenId <= 0) {
      return NextResponse.json({ error: 'Invalid token ID' }, { status: 400 });
    }

    // Get profile data from contract
    const profile = await client.readContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: vibemateAbi,
      functionName: 'getProfile',
      args: [BigInt(tokenId)],
    });

    // Get token owner
    const owner = await client.readContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: vibemateAbi,
      functionName: 'ownerOf',
      args: [BigInt(tokenId)],
    });

    return NextResponse.json({ profile, owner });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
} 
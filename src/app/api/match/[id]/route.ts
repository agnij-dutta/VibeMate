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
    const matchId = parseInt(params.id);
    
    if (isNaN(matchId) || matchId < 0) {
      return NextResponse.json({ error: 'Invalid match ID' }, { status: 400 });
    }

    // Get match data from contract
    const match = await client.readContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: vibemateAbi,
      functionName: 'getMatch',
      args: [BigInt(matchId)],
    });

    return NextResponse.json({ match });
  } catch (error) {
    console.error('Error fetching match:', error);
    return NextResponse.json({ error: 'Failed to fetch match' }, { status: 500 });
  }
} 
import { NextRequest, NextResponse } from 'next/server';
import vibemateAbi from '@/abis/vibemate.json';
import { publicClient, CONTRACT_ADDRESS } from '@/lib/wagmi/server';

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
    const match = await publicClient.readContract({
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
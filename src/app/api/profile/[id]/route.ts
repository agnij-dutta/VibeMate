import { NextRequest, NextResponse } from 'next/server';
import vibemateAbi from '@/abis/vibemate.json';
import { publicClient, CONTRACT_ADDRESS } from '@/lib/wagmi/server';

// Helper function to convert BigInt values to strings recursively
function serializeProfile(value: any): any {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  
  if (Array.isArray(value)) {
    return value.map(item => serializeProfile(item));
  }
  
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [
        key,
        serializeProfile(val)
      ])
    );
  }
  
  return value;
}

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
    const profile = await publicClient.readContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: vibemateAbi,
      functionName: 'getProfile',
      args: [BigInt(tokenId)],
    });

    // Get token owner
    const owner = await publicClient.readContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: vibemateAbi,
      functionName: 'ownerOf',
      args: [BigInt(tokenId)],
    });

    // Serialize all BigInt values recursively
    return NextResponse.json({
      profile: serializeProfile(profile),
      owner: serializeProfile(owner),
      tokenId: tokenId.toString()
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
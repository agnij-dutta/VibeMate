'use client';

import { useState, useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import Navbar from '@/components/Navbar';
import ProfileCard from '@/components/ProfileCard';
import { useVibemateContract } from '@/hooks/useVibemateContract';
import { CONTRACT_ADDRESS } from '@/lib/wagmi';
import vibemateAbi from '@/abis/vibemate.json';
import { SexyProfile } from '@/types';
import AuthCheck from '@/components/AuthCheck';
import Link from 'next/link';

export default function BrowsePage() {
  const { address, isConnected } = useAccount();
  const { totalSupply, useProfileData, findMatch } = useVibemateContract();
  const [profiles, setProfiles] = useState<Array<{ id: number; profile: SexyProfile; owner: string }>>([]);
  const [userProfileId, setUserProfileId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [matchLoading, setMatchLoading] = useState<number | null>(null);

  // Get user's tokens
  const { data: userTokens } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: vibemateAbi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    enabled: !!address,
  });

  // Get user's first token ID
  const { data: firstTokenId } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: vibemateAbi,
    functionName: 'userTokens',
    args: [address as `0x${string}`, BigInt(0)],
    enabled: !!address && !!userTokens && Number(userTokens) > 0,
  });

  useEffect(() => {
    if (firstTokenId) {
      setUserProfileId(Number(firstTokenId));
    }
  }, [firstTokenId]);

  // Load profiles from the contract
  useEffect(() => {
    const fetchProfiles = async () => {
      if (!totalSupply) return;
      
      setLoading(true);
      const fetchedProfiles = [];
      
      // Limit to last 20 profiles for performance
      const supply = Number(totalSupply);
      const startIdx = supply > 20 ? supply - 20 : 0;
      const endIdx = supply;
      
      for (let i = startIdx; i < endIdx; i++) {
        try {
          const tokenId = i + 1; // Token IDs start at 1
          
          // Get profile data
          const profileData = await fetch(`/api/profile/${tokenId}`).then(res => res.json());
          
          if (profileData && profileData.profile && profileData.owner) {
            fetchedProfiles.push({
              id: tokenId,
              profile: profileData.profile,
              owner: profileData.owner
            });
          }
        } catch (error) {
          console.error(`Error fetching profile ${i + 1}:`, error);
        }
      }
      
      setProfiles(fetchedProfiles);
      setLoading(false);
    };
    
    fetchProfiles();
  }, [totalSupply]);

  // Handle match button click
  const handleMatchClick = async (theirTokenId: number) => {
    if (!userProfileId || !isConnected) return;
    
    setMatchLoading(theirTokenId);
    try {
      await findMatch(theirTokenId);
      // Navigate to matches page after successful match
      window.location.href = '/matches';
    } catch (error) {
      console.error('Error finding match:', error);
    } finally {
      setMatchLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <AuthCheck hasProfile={!!userProfileId}>
        <div className="flex-1 bg-gray-50 py-10">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-3xl font-bold mb-6">Browse Profiles</h1>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
              </div>
            ) : profiles.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h2 className="text-xl font-bold mb-2">No Profiles Found</h2>
                <p className="text-gray-600 mb-4">Be the first to create a profile and start the community!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map((profile) => (
                  <div key={profile.id} className="relative">
                    {matchLoading === profile.id && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                      </div>
                    )}
                    <ProfileCard 
                      profile={profile.profile}
                      tokenId={profile.id}
                      owner={profile.owner}
                      onMatchClick={() => handleMatchClick(profile.id)}
                      showMatchButton={true}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </AuthCheck>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import Navbar from '@/components/Navbar';
import { useVibemateContract } from '@/hooks/useVibemateContract';
import { CONTRACT_ADDRESS } from '@/lib/wagmi';
import vibemateAbi from '@/abis/vibemate.json';
import { Match, SexyProfile } from '@/types';
import Link from 'next/link';
import ProfileCard from '@/components/ProfileCard';
import AuthCheck from '@/components/AuthCheck';
import { formatDistanceToNow } from 'date-fns';

interface MatchWithProfile extends Match {
  profile: SexyProfile;
  owner: string;
  tokenId: number;  // Add tokenId property
}

export default function MatchesPage() {
  const { address, isConnected } = useAccount();
  const { useProfileData } = useVibemateContract();
  const [userProfileId, setUserProfileId] = useState<number | null>(null);
  const [matches, setMatches] = useState<MatchWithProfile[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Get user's matches
  const { data: matchIds } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: vibemateAbi,
    functionName: 'getMyMatches',
    args: [firstTokenId ? BigInt(firstTokenId.toString()) : BigInt(0)],
    enabled: !!firstTokenId,
  });

  useEffect(() => {
    if (firstTokenId) {
      setUserProfileId(Number(firstTokenId));
    }
  }, [firstTokenId]);

  // Load match data
  useEffect(() => {
    const fetchMatches = async () => {
      if (!matchIds || !userProfileId) return;
      
      setLoading(true);
      const fetchedMatches = [];
      
      // Ensure matchIds is an array
      const matchIdsArray = Array.isArray(matchIds) ? matchIds : [];
      
      for (const matchId of matchIdsArray) {
        try {
          // Get match data
          const matchData = await fetch(`/api/match/${matchId}`).then(res => res.json());
          
          if (matchData && matchData.match) {
            const match = matchData.match as Match;
            
            // Get the other profile's token ID
            const otherTokenId = Number(match.token1) === userProfileId 
              ? Number(match.token2) 
              : Number(match.token1);
            
            // Get other profile data
            const profileData = await fetch(`/api/profile/${otherTokenId}`).then(res => res.json());
            
            if (profileData && profileData.profile) {
              fetchedMatches.push({
                ...match,
                profile: profileData.profile,
                owner: profileData.owner,
              });
            }
          }
        } catch (error) {
          console.error(`Error fetching match ${matchId}:`, error);
        }
      }
      
      setMatches(fetchedMatches.map(match => ({
        ...match,
        tokenId: match.token2, // use token2 as the other person's token ID
      })));
      setLoading(false);
    };
    
    fetchMatches();
  }, [matchIds, userProfileId]);

  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Connect Wallet to Continue</h1>
          <p className="text-gray-600 mb-8 max-w-md">
            Please connect your wallet to view your matches.
          </p>
        </div>
      </div>
    );
  }

  if (!userProfileId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Create a Profile First</h1>
          <p className="text-gray-600 mb-8 max-w-md">
            You need to create a profile before you can view matches.
          </p>
          <Link 
            href="/profile" 
            className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Create Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <AuthCheck hasProfile={!!userProfileId}>
        <div className="flex-1 bg-gray-50 py-10">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-3xl font-bold mb-6">My Matches</h1>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
              </div>
            ) : matches.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h2 className="text-xl font-bold mb-2">No Matches Found</h2>
                <p className="text-gray-600 mb-4">Start browsing profiles to find your perfect match!</p>
                <Link 
                  href="/browse" 
                  className="inline-block bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Browse Profiles
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map((match) => (
                  <div key={match.tokenId} className="relative">
                    <ProfileCard 
                      profile={match.profile}
                      tokenId={match.tokenId}
                      owner={match.owner}
                      showMatchButton={false}
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
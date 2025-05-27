'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import Navbar from '@/components/Navbar';
import { useVibemateContract } from '@/hooks/useVibemateContract';
import { CONTRACT_ADDRESS } from '@/lib/wagmi';
import vibemateAbi from '@/abis/vibemate.json';
import { Match, SexyProfile } from '@/types';
import Link from 'next/link';
import ProfileCard from '@/components/ProfileCard';
import { formatDistanceToNow } from 'date-fns';

interface MatchWithProfile extends Match {
  profile: SexyProfile;
  owner: string;
}

export default function MatchesPage() {
  const { address, isConnected } = useAccount();
  const { useProfileData } = useVibemateContract();
  const [userProfileId, setUserProfileId] = useState<number | null>(null);
  const [matches, setMatches] = useState<MatchWithProfile[]>([]);
  const [loading, setLoading] = useState(true);

  // Get user's tokens
  const { data: userTokens } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: vibemateAbi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address,
    },
  });

  // Get user's first token ID
  const { data: firstTokenId } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: vibemateAbi,
    functionName: 'userTokens',
    args: [address as `0x${string}`, BigInt(0)],
    query: {
      enabled: !!address && !!userTokens && Number(userTokens) > 0,
    },
  });

  // Get user's matches
  const { data: matchIds } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: vibemateAbi,
    functionName: 'getMyMatches',
    args: [userProfileId ? BigInt(userProfileId) : BigInt(0)],
    query: {
      enabled: !!userProfileId,
    },
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
      
      setMatches(fetchedMatches);
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
      <div className="flex-1 bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-2">My Matches</h1>
          <p className="text-gray-600 mb-8">View all your successful matches</p>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          ) : matches.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-bold mb-2">No Matches Found</h2>
              <p className="text-gray-600 mb-4">Browse profiles to find your perfect match!</p>
              <Link 
                href="/browse" 
                className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Browse Profiles
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {matches.map((match, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 bg-purple-600 text-white">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold">Match #{match.token1.toString()}-{match.token2.toString()}</h3>
                      <div className="flex items-center">
                        <span className="text-3xl mr-2">
                          {match.compatibilityScore >= 90 ? '❤️' : 
                           match.compatibilityScore >= 80 ? '💕' : 
                           match.compatibilityScore >= 70 ? '😍' : '🙂'}
                        </span>
                        <span className="text-xl font-bold">{match.compatibilityScore}% Compatible</span>
                      </div>
                    </div>
                    <p className="text-purple-100 text-sm">
                      Matched {formatDistanceToNow(new Date(Number(match.timestamp) * 1000), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="mb-6">
                      <h4 className="text-lg font-medium mb-2">Your Match</h4>
                      <ProfileCard 
                        profile={match.profile}
                        tokenId={Number(match.token1) === userProfileId ? Number(match.token2) : Number(match.token1)}
                        owner={match.owner}
                      />
                    </div>
                    
                    {match.rewardPool > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">💰</span>
                          <div>
                            <h4 className="font-bold text-green-800">Reward Earned</h4>
                            <p className="text-green-700">{(Number(match.rewardPool) / 2 / 1e18).toFixed(4)} ETH from this match</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
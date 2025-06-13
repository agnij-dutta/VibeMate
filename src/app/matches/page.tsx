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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles, Users, Search, Star, Trophy, ArrowRight, MessageCircle, Gift } from "lucide-react";

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
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <Card className="max-w-lg border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-primary-600" />
              </div>
              <CardTitle className="text-2xl mb-4 text-gray-900 dark:text-white">
                Connect Wallet to Continue
              </CardTitle>
              <CardDescription className="text-lg mb-8">
                Please connect your wallet to view your matches and start building connections.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  if (!userProfileId) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <Card className="max-w-lg border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-primary-600" />
              </div>
              <CardTitle className="text-2xl mb-4 text-gray-900 dark:text-white">
                Create a Profile First
              </CardTitle>
              <CardDescription className="text-lg mb-8">
                You need to create a personality profile before you can view matches and connect with others.
              </CardDescription>
              <Button asChild size="lg">
                <Link href="/profile">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Profile
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <Navbar />
      <AuthCheck hasProfile={!!userProfileId}>
        <div className="py-8 lg:py-12">
          <div className="container mx-auto px-4">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mr-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <Badge variant="secondary" className="text-sm">
                  <Star className="w-3 h-3 mr-2" />
                  {matches.length} {matches.length === 1 ? 'Match' : 'Matches'}
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Your{" "}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Matches
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {matches.length > 0 
                  ? "These profiles are compatible with yours. Time to make some meaningful connections!"
                  : "No matches yet? Start browsing profiles to find your perfect match."
                }
              </p>
            </div>

            {/* Stats Section */}
            {matches.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900">
                  <CardContent className="p-6">
                    <Heart className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {matches.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Matches
                    </div>
                  </CardContent>
                </Card>

                <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-950 dark:to-secondary-900">
                  <CardContent className="p-6">
                    <MessageCircle className="w-8 h-8 text-secondary-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {matches.filter(m => m.isActive).length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Active Connections
                    </div>
                  </CardContent>
                </Card>

                <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-950 dark:to-accent-900">
                  <CardContent className="p-6">
                    <Gift className="w-8 h-8 text-accent-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {matches.reduce((sum, m) => sum + (m.rewardPool || 0), 0).toFixed(3)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      ETH Earned
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <Link href="/browse">
                    <Search className="w-4 h-4" />
                    Browse More Profiles
                  </Link>
                </Button>
              </div>
              
              <Button asChild className="gap-2">
                <Link href="/profile">
                  <Sparkles className="w-4 h-4" />
                  View My Profile
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            
            {/* Matches Content */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Loading Your Matches
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Gathering your connections...
                </p>
              </div>
            ) : matches.length === 0 ? (
              <Card className="max-w-2xl mx-auto text-center border-0 shadow-lg">
                <CardContent className="p-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-primary-600" />
                  </div>
                  <CardTitle className="text-2xl mb-4 text-gray-900 dark:text-white">
                    No Matches Yet
                  </CardTitle>
                  <CardDescription className="text-lg mb-8 text-gray-600 dark:text-gray-300">
                    Don't worry! Start browsing profiles to find people who share your vibe and interests.
                  </CardDescription>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                      <Link href="/browse">
                        <Search className="w-4 h-4 mr-2" />
                        Browse Profiles
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/profile">
                        <Users className="w-4 h-4 mr-2" />
                        Edit My Profile
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {matches.map((match) => (
                    <div key={match.tokenId} className="group">
                      <div className="transform transition-all duration-300 group-hover:scale-105">
                        <ProfileCard 
                          profile={match.profile}
                          tokenId={match.tokenId}
                          owner={match.owner}
                          showMatchButton={false}
                        />
                        
                        {/* Match Info Overlay */}
                        <Card className="mt-4 border-0 shadow-sm bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${match.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                                <span className="text-gray-600 dark:text-gray-400">
                                  {match.isActive ? 'Active Match' : 'Pending'}
                                </span>
                              </div>
                                                             {match.rewardPool && match.rewardPool > 0 && (
                                 <Badge variant="outline" className="text-xs">
                                   <Trophy className="w-3 h-3 mr-1" />
                                   {match.rewardPool.toFixed(3)} ETH
                                 </Badge>
                               )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16">
                  <Card className="max-w-3xl mx-auto border-0 shadow-lg bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Keep Finding Amazing Connections!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        The more you browse and match, the more likely you are to find that special someone.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg">
                          <Link href="/browse">
                            <Search className="w-4 h-4 mr-2" />
                            Browse More Profiles
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                          <Link href="/">
                            <Heart className="w-4 h-4 mr-2" />
                            Share VibeMate
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </AuthCheck>
    </main>
  );
}
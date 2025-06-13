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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Search, Users, Sparkles, ArrowRight, Filter } from "lucide-react";

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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <Navbar />
      <AuthCheck hasProfile={!!userProfileId}>
        <div className="py-8 lg:py-12">
          <div className="container mx-auto px-4">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mr-4">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <Badge variant="secondary" className="text-sm">
                  <Users className="w-3 h-3 mr-2" />
                  {profiles.length} Active Profiles
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Discover Your{" "}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Perfect Match
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Browse authentic profiles and find meaningful connections with people who share your vibe
              </p>
            </div>

            {/* Filters Section */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter Profiles
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Sort by Compatibility
                </Button>
              </div>
              
              <Button asChild className="gap-2">
                <Link href="/matches">
                  <Heart className="w-4 h-4" />
                  View My Matches
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            
            {/* Content Section */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Finding Amazing Profiles
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Searching for your perfect matches...
                </p>
              </div>
            ) : profiles.length === 0 ? (
              <Card className="max-w-2xl mx-auto text-center border-0 shadow-lg">
                <CardContent className="p-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-primary-600" />
                  </div>
                  <CardTitle className="text-2xl mb-4 text-gray-900 dark:text-white">
                    No Profiles Found
                  </CardTitle>
                  <CardDescription className="text-lg mb-8 text-gray-600 dark:text-gray-300">
                    Be the first to create a profile and start building the VibeMate community!
                  </CardDescription>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                      <Link href="/profile">
                        <Heart className="w-4 h-4 mr-2" />
                        Create Your Profile
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/">
                        Learn More
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {profiles.map((profile) => (
                  <div key={profile.id} className="relative group">
                    {matchLoading === profile.id && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl z-10">
                        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
                        <p className="text-white font-medium">Finding Match...</p>
                      </div>
                    )}
                    <div className="transform transition-all duration-300 group-hover:scale-105">
                      <ProfileCard 
                        profile={profile.profile}
                        tokenId={profile.id}
                        owner={profile.owner}
                        onMatchClick={() => handleMatchClick(profile.id)}
                        showMatchButton={true}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Section */}
            {profiles.length > 0 && (
              <div className="text-center mt-16">
                <Card className="max-w-3xl mx-auto border-0 shadow-lg bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Ready to Find Your Person?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Create your profile to start matching with amazing people in the VibeMate community
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild size="lg">
                        <Link href="/profile">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Create Profile
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="lg">
                        <Link href="/matches">
                          <Heart className="w-4 h-4 mr-2" />
                          My Matches
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </AuthCheck>
    </main>
  );
}
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useAccount } from 'wagmi';
import Navbar from '@/components/Navbar';
import { useVibemateContract } from '@/hooks/useVibemateContract';
import { VibeType, vibeEmojis } from '@/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles, User, Wallet, Star, Trophy, ArrowRight, Clock, Coins } from "lucide-react";

// Loading component
function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Loading Your Profile</h3>
        <p className="text-gray-600 dark:text-gray-300">Please wait while we prepare everything...</p>
      </div>
    </div>
  );
}

// Profile content component
function ProfileContent() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { profiles, mintProfile, loading } = useVibemateContract();
  
  const [primaryVibe, setPrimaryVibe] = useState<VibeType>(VibeType.MYSTERIOUS);
  const [secondaryVibe, setSecondaryVibe] = useState<VibeType>(VibeType.PASSIONATE);
  const [customMessage, setCustomMessage] = useState('');
  const [hasProfile, setHasProfile] = useState(false);

  // Check if user has a profile
  useEffect(() => {
    if (profiles && Object.keys(profiles).length > 0) {
      setHasProfile(true);
    } else {
      setHasProfile(false);
    }
  }, [profiles]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) return;
    
    try {
      await mintProfile(primaryVibe, secondaryVibe, customMessage);
      router.push('/matches');
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  // Return early for not-connected state
  if (!isConnected) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <Card className="max-w-lg border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet className="w-10 h-10 text-primary-600" />
              </div>
              <CardTitle className="text-2xl mb-4 text-gray-900 dark:text-white">
                Connect Wallet to Continue
              </CardTitle>
              <CardDescription className="text-lg mb-8">
                Please connect your wallet to create a profile or view your existing profiles.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <Navbar />
      <div className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <Badge variant="secondary" className="text-sm">
                <Star className="w-3 h-3 mr-2" />
                Your Profile
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {hasProfile ? 'Your VibeMate' : 'Create Your'}{" "}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Profile
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {hasProfile 
                ? 'Your unique personality profile is ready! Explore matches and grow your connections.'
                : 'Create your unique personality profile NFT and start your journey to meaningful connections'
              }
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {hasProfile ? (
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <CardHeader className="text-center pb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-12 h-12 text-primary-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white">
                    Profile Successfully Created!
                  </CardTitle>
                  <CardDescription className="text-lg">
                    You're all set to discover amazing connections in the VibeMate community
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border border-primary-200 dark:border-primary-800">
                      <CardContent className="p-6 text-center">
                        <Heart className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                        <CardTitle className="text-lg mb-2 text-gray-900 dark:text-white">
                          Find Matches
                        </CardTitle>
                        <CardDescription className="mb-4">
                          Discover profiles and connect with compatible people
                        </CardDescription>
                        <Button asChild className="w-full">
                          <Link href="/matches">
                            <Heart className="w-4 h-4 mr-2" />
                            View My Matches
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border border-secondary-200 dark:border-secondary-800">
                      <CardContent className="p-6 text-center">
                        <Sparkles className="w-12 h-12 text-secondary-600 mx-auto mb-4" />
                        <CardTitle className="text-lg mb-2 text-gray-900 dark:text-white">
                          Browse Profiles
                        </CardTitle>
                        <CardDescription className="mb-4">
                          Explore the community and find your perfect match
                        </CardDescription>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/browse">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Browse Profiles
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Profile Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">1</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Profile Created</div>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">0</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Active Matches</div>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">0</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">ETH Earned</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white">
                    Create Your Personality Profile
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Choose your primary and secondary vibes to express your unique personality
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Primary Vibe Selection */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-primary-600" />
                        <label className="text-lg font-semibold text-gray-900 dark:text-white">
                          Primary Vibe
                        </label>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(vibeEmojis).map(([key, vibe]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setPrimaryVibe(Number(key))}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                              primaryVibe === Number(key)
                                ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900 shadow-lg'
                                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 bg-white dark:bg-gray-800'
                            } flex flex-col items-center text-center group`}
                          >
                            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                              {vibe.emoji}
                            </span>
                            <span className="font-semibold text-gray-900 dark:text-white mb-1">
                              {vibe.name}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {vibe.description}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Secondary Vibe Selection */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-secondary-600" />
                        <label className="text-lg font-semibold text-gray-900 dark:text-white">
                          Secondary Vibe
                        </label>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(vibeEmojis).map(([key, vibe]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setSecondaryVibe(Number(key))}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                              secondaryVibe === Number(key)
                                ? 'border-secondary-500 bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-950 dark:to-secondary-900 shadow-lg'
                                : 'border-gray-200 dark:border-gray-700 hover:border-secondary-300 dark:hover:border-secondary-700 bg-white dark:bg-gray-800'
                            } flex flex-col items-center text-center group`}
                          >
                            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                              {vibe.emoji}
                            </span>
                            <span className="font-semibold text-gray-900 dark:text-white mb-1">
                              {vibe.name}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {vibe.description}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Message */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-accent-600" />
                        <label htmlFor="customMessage" className="text-lg font-semibold text-gray-900 dark:text-white">
                          Your Message
                        </label>
                      </div>
                      <div className="relative">
                        <textarea
                          id="customMessage"
                          value={customMessage}
                          onChange={(e) => setCustomMessage(e.target.value)}
                          maxLength={100}
                          placeholder="Share something that captures your personality and attracts the right matches..."
                          className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none transition-all duration-200"
                          rows={4}
                          required
                        />
                        <div className="absolute bottom-3 right-3 text-sm text-gray-500 dark:text-gray-400">
                          {customMessage.length}/100
                        </div>
                      </div>
                    </div>

                    {/* Minting Cost Info */}
                    <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 border-primary-200 dark:border-primary-800">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Coins className="w-6 h-6 text-primary-600" />
                          <CardTitle className="text-lg text-gray-900 dark:text-white">
                            Profile Creation Cost
                          </CardTitle>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700 dark:text-gray-300">Creation Fee:</span>
                            <span className="font-bold text-gray-900 dark:text-white">0.01 ETH</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700 dark:text-gray-300">Reward Pool:</span>
                            <span className="font-bold text-green-600">50% of fee</span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Half of your creation fee goes to the reward pool for successful matches, creating value for the entire community.
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={loading}
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                          Creating Your Profile...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-3" />
                          Create Profile NFT
                          <Trophy className="w-5 h-5 ml-3" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// Main component with Suspense
export default function ProfilePage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ProfileContent />
    </Suspense>
  );
}
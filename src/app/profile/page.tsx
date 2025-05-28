'use client';

import { useState, useEffect, Suspense } from 'react';
import { useAccount } from 'wagmi';
import Navbar from '@/components/Navbar';
import { useVibemateContract } from '@/hooks/useVibemateContract';
import { VibeType, vibeEmojis } from '@/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Loading component
function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
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
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Connect Wallet to Continue</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          Please connect your wallet to create a profile or view your existing profiles.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-gray-600 mb-8">Create your unique personality profile NFT</p>

        {hasProfile ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">You already have a profile!</h2>
            <p className="mb-6">
              You can view your matches or browse other profiles to find your perfect match.
            </p>
            <div className="flex gap-4">
              <Link
                href="/matches"
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                View My Matches
              </Link>
              <Link
                href="/browse"
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Browse Profiles
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Primary Vibe</label>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(vibeEmojis).map(([key, vibe]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPrimaryVibe(Number(key))}
                    className={`p-4 rounded-lg border ${
                      primaryVibe === Number(key)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    } flex flex-col items-center transition-colors`}
                  >
                    <span className="text-3xl mb-2">{vibe.emoji}</span>
                    <span className="font-medium">{vibe.name}</span>
                    <span className="text-xs text-gray-500">{vibe.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Secondary Vibe</label>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(vibeEmojis).map(([key, vibe]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSecondaryVibe(Number(key))}
                    className={`p-4 rounded-lg border ${
                      secondaryVibe === Number(key)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    } flex flex-col items-center transition-colors`}
                  >
                    <span className="text-3xl mb-2">{vibe.emoji}</span>
                    <span className="font-medium">{vibe.name}</span>
                    <span className="text-xs text-gray-500">{vibe.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="customMessage" className="block text-gray-700 font-medium mb-2">
                Your Custom Message (up to 100 characters)
              </label>
              <textarea
                id="customMessage"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                maxLength={100}
                placeholder="Share a flirty message to attract matches..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
                required
              />
              <div className="text-right text-sm text-gray-500">
                {customMessage.length}/100 characters
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-md mb-6">
              <h3 className="font-bold text-gray-700 mb-2">Minting Cost</h3>
              <p className="text-gray-600 mb-2">
                Creating a profile costs <span className="font-bold">0.01 ETH</span>
              </p>
              <p className="text-sm text-gray-500">
                50% of this amount goes to the reward pool for successful matches.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-md font-bold text-white ${
                loading
                  ? 'bg-purple-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              } transition-colors`}
            >
              {loading ? 'Creating Profile...' : 'Create Profile NFT'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// Main component with Suspense
export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Suspense fallback={<LoadingState />}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}
'use client';

import { formatDistanceToNow } from 'date-fns';
import { useAccount } from 'wagmi';
import { SexyProfile } from '@/types';
import { rarityColors, rarityLabels, vibeEmojis } from '@/types';

interface ProfileCardProps {
  profile: SexyProfile;
  tokenId: number;
  owner?: string;
  onMatchClick?: () => void;
  showMatchButton?: boolean;
}

export default function ProfileCard({
  profile,
  tokenId,
  owner,
  onMatchClick,
  showMatchButton = false,
}: ProfileCardProps) {
  const { address } = useAccount();
  const isOwner = address && owner ? address.toLowerCase() === owner.toLowerCase() : false;
  const mintDate = new Date(Number(profile.mintTimestamp) * 1000);
  const formattedDate = formatDistanceToNow(mintDate, { addSuffix: true });

  // Get emoji and label
  const primaryVibe = vibeEmojis[profile.primaryVibe];
  const secondaryVibe = vibeEmojis[profile.secondaryVibe];
  const rarityLabel = rarityLabels[profile.rarity];
  const rarityColor = rarityColors[profile.rarity];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div
        className="h-3"
        style={{ backgroundColor: rarityColor }}
      />
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Profile #{tokenId}</h3>
            <p className="text-sm text-gray-500">Created {formattedDate}</p>
          </div>
          <span
            className="text-xs font-medium px-2.5 py-0.5 rounded-full"
            style={{ backgroundColor: `${rarityColor}20`, color: rarityColor }}
          >
            {rarityLabel}
          </span>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{primaryVibe.emoji}</span>
            <div>
              <p className="font-medium">{primaryVibe.name}</p>
              <p className="text-xs text-gray-500">{primaryVibe.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{secondaryVibe.emoji}</span>
            <div>
              <p className="font-medium">{secondaryVibe.name}</p>
              <p className="text-xs text-gray-500">{secondaryVibe.description}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Attraction Level</span>
            <span className="text-sm font-medium text-gray-700">{profile.attractionLevel}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="h-2.5 rounded-full" 
              style={{ 
                width: `${profile.attractionLevel}%`,
                backgroundColor: rarityColor
              }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-md mb-4">
          <p className="text-gray-700 italic">"{profile.customMessage}"</p>
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <span>{profile.totalMatches} matches</span>
          <span>{profile.rewardsClaimed} ETH earned</span>
        </div>

        {showMatchButton && !isOwner && (
          <button
            onClick={onMatchClick}
            className="mt-4 w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Find Match
          </button>
        )}

        {isOwner && (
          <div className="mt-4 text-center text-sm bg-purple-100 text-purple-800 py-1 px-2 rounded-md">
            You own this profile
          </div>
        )}
      </div>
    </div>
  );
} 
'use client';

import { formatDistanceToNow } from 'date-fns';
import { useAccount } from 'wagmi';
import { SexyProfile } from '@/types';
import { rarityColors, rarityLabels, vibeEmojis } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, TrendingUp, Trophy, Sparkles, Star } from "lucide-react";

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

  // Calculate compatibility score (mock for now)
  const compatibilityScore = Math.floor(Math.random() * 30) + 70; // 70-99%

  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      {/* Rarity Accent */}
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: rarityColor }}
      />
      
      {/* Compatibility Badge */}
      <div className="absolute top-4 right-4 z-10">
        <Badge 
          variant="secondary" 
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md text-xs font-semibold"
        >
          <Star className="w-3 h-3 mr-1 text-yellow-500" />
          {compatibilityScore}%
        </Badge>
      </div>

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
              Profile #{tokenId}
            </CardTitle>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3 mr-1" />
              {formattedDate}
            </div>
          </div>
          <Badge
            variant="outline"
            className="text-xs font-medium border-0 shadow-sm"
            style={{ 
              backgroundColor: `${rarityColor}15`, 
              color: rarityColor,
              borderColor: `${rarityColor}30`
            }}
          >
            <Trophy className="w-3 h-3 mr-1" />
            {rarityLabel}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Personality Vibes */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950">
            <div className="text-2xl">{primaryVibe.emoji}</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                {primaryVibe.name}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {primaryVibe.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-secondary-50 to-accent-50 dark:from-secondary-950 dark:to-accent-950">
            <div className="text-2xl">{secondaryVibe.emoji}</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                {secondaryVibe.name}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {secondaryVibe.description}
              </p>
            </div>
          </div>
        </div>

        {/* Attraction Level */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Attraction Level
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {profile.attractionLevel}/100
            </span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-500 bg-gradient-to-r from-primary-500 to-secondary-500" 
                style={{ width: `${profile.attractionLevel}%` }}
              />
            </div>
          </div>
        </div>

        {/* Custom Message */}
        <div className="relative">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
            <div className="flex items-start gap-2">
              <div className="text-lg">💭</div>
              <blockquote className="text-gray-700 dark:text-gray-300 italic text-sm leading-relaxed flex-1">
                "{profile.customMessage}"
              </blockquote>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {profile.totalMatches}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
              <Heart className="w-3 h-3" />
              Matches
            </div>
          </div>
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {profile.rewardsClaimed}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3" />
              ETH Earned
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {showMatchButton && !isOwner && (
          <Button
            onClick={onMatchClick}
            className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Heart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Find Match
            <Sparkles className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
          </Button>
        )}

        {isOwner && (
          <div className="text-center">
            <Badge className="bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 dark:from-primary-900 dark:to-secondary-900 dark:text-primary-200 border-0 px-4 py-2">
              <Trophy className="w-3 h-3 mr-1" />
              Your Profile
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 
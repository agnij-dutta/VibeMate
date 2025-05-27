export enum VibeType {
  MYSTERIOUS, // 🌙 Dark and alluring
  PASSIONATE, // 🔥 Fiery and intense  
  PLAYFUL,    // 💫 Fun and bubbly
  SOPHISTICATED, // 🍷 Classy and refined
  ADVENTUROUS,   // 🌊 Wild and free
  ROMANTIC       // 🌹 Sweet and loving
}

export enum Rarity {
  COMMON,        // 60% chance
  RARE,          // 25% chance  
  EPIC,          // 12% chance
  LEGENDARY,     // 2.5% chance
  MYTHICAL       // 0.5% chance
}

export interface SexyProfile {
  primaryVibe: VibeType;
  secondaryVibe: VibeType;
  rarity: Rarity;
  attractionLevel: number;
  mintTimestamp: number;
  totalMatches: number;
  rewardsClaimed: number;
  isActive: boolean;
  customMessage: string;
}

export interface Match {
  token1: number;
  token2: number;
  compatibilityScore: number;
  timestamp: number;
  rewardPool: number;
  isActive: boolean;
}

export interface VibeEmoji {
  emoji: string;
  name: string;
  description: string;
}

export const vibeEmojis: Record<VibeType, VibeEmoji> = {
  [VibeType.MYSTERIOUS]: {
    emoji: '🌙',
    name: 'Mysterious',
    description: 'Dark and alluring'
  },
  [VibeType.PASSIONATE]: {
    emoji: '🔥',
    name: 'Passionate',
    description: 'Fiery and intense'
  },
  [VibeType.PLAYFUL]: {
    emoji: '💫',
    name: 'Playful',
    description: 'Fun and bubbly'
  },
  [VibeType.SOPHISTICATED]: {
    emoji: '🍷',
    name: 'Sophisticated',
    description: 'Classy and refined'
  },
  [VibeType.ADVENTUROUS]: {
    emoji: '🌊',
    name: 'Adventurous',
    description: 'Wild and free'
  },
  [VibeType.ROMANTIC]: {
    emoji: '🌹',
    name: 'Romantic',
    description: 'Sweet and loving'
  }
};

export const rarityBonuses = {
  [Rarity.COMMON]: 0,
  [Rarity.RARE]: 4,
  [Rarity.EPIC]: 6,
  [Rarity.LEGENDARY]: 8,
  [Rarity.MYTHICAL]: 10
};

export const rarityLabels = {
  [Rarity.COMMON]: 'Common',
  [Rarity.RARE]: 'Rare',
  [Rarity.EPIC]: 'Epic',
  [Rarity.LEGENDARY]: 'Legendary',
  [Rarity.MYTHICAL]: 'Mythical'
};

export const rarityColors = {
  [Rarity.COMMON]: '#9E9E9E',
  [Rarity.RARE]: '#4CAF50',
  [Rarity.EPIC]: '#3F51B5',
  [Rarity.LEGENDARY]: '#FF9800',
  [Rarity.MYTHICAL]: '#E91E63'
}; 
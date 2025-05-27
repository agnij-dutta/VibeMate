'use client';

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_ADDRESS } from '@/lib/wagmi';
import vibemateAbi from '@/abis/vibemate.json';
import { SexyProfile, VibeType } from '@/types';

export function useVibemateContract() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const { writeContractAsync } = useWriteContract();

  // Get user's profile
  const { data: profiles, refetch: refetchProfiles } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: vibemateAbi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address,
    },
  });

  // Get total supply
  const { data: totalSupply } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: vibemateAbi,
    functionName: 'totalSupply',
  });
  
  // Get a specific profile data
  const useProfileData = (tokenId: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: vibemateAbi,
      functionName: 'getProfile',
      args: [BigInt(tokenId)],
      query: {
        enabled: tokenId > 0,
      },
    });
  };

  // Mint a new profile
  const mintProfile = async (
    primaryVibe: VibeType,
    secondaryVibe: VibeType,
    customMessage: string
  ) => {
    if (!address) return;
    setLoading(true);
    try {
      await writeContractAsync({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: vibemateAbi,
        functionName: 'mintSexyProfile',
        args: [primaryVibe, secondaryVibe, customMessage],
        value: parseEther('0.01'),
      });
      await refetchProfiles();
    } catch (error) {
      console.error('Error minting profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Find a match
  const findMatch = async (myTokenId: number, theirTokenId: number) => {
    if (!address) return;
    setLoading(true);
    try {
      await writeContractAsync({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: vibemateAbi,
        functionName: 'findMatch',
        args: [BigInt(myTokenId), BigInt(theirTokenId)],
      });
    } catch (error) {
      console.error('Error finding match:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update profile message
  const updateMessage = async (tokenId: number, newMessage: string) => {
    if (!address) return;
    setLoading(true);
    try {
      await writeContractAsync({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: vibemateAbi,
        functionName: 'updateVibeMessage',
        args: [BigInt(tokenId), newMessage],
      });
    } catch (error) {
      console.error('Error updating message:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    totalSupply,
    profiles,
    useProfileData,
    mintProfile,
    findMatch,
    updateMessage,
  };
} 
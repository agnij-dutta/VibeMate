'use client';

import { useState } from 'react';
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_ADDRESS } from '@/lib/wagmi';
import vibemateAbi from '@/abis/vibemate.json';
import { SexyProfile, VibeType } from '@/types';

export function useVibemateContract() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [pendingTx, setPendingTx] = useState<`0x${string}` | undefined>(undefined);
  
  const { writeAsync: mintAsync } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: vibemateAbi,
    functionName: 'mintSexyProfile',
  });

  const { writeAsync: findMatchAsync } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: vibemateAbi,
    functionName: 'findMatch',
  });

  const { writeAsync: updateMessageAsync } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: vibemateAbi,
    functionName: 'updateVibeMessage',
  });

  // Get user's profile
  const { data: profiles, refetch: refetchProfiles } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: vibemateAbi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    enabled: !!address,
  });

  // Get total supply
  const { data: totalSupply } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: vibemateAbi,
    functionName: 'totalSupply',
  });

  // Wait for transaction
  const { isLoading: isWaitingForTx } = useWaitForTransaction({
    hash: pendingTx,
    onSuccess: () => {
      setPendingTx(undefined);
      refetchProfiles();
    },
  });
  
  // Get a specific profile data
  const useProfileData = (tokenId: number) => {
    return useContractRead({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: vibemateAbi,
      functionName: 'getProfile',
      args: [BigInt(tokenId)],
      enabled: tokenId > 0,
    });
  };

  // Mint a new profile
  const mintProfile = async (
    primaryVibe: VibeType,
    secondaryVibe: VibeType,
    customMessage: string
  ) => {
    try {
      setLoading(true);
      const { hash } = await mintAsync({
        args: [primaryVibe, secondaryVibe, customMessage],
        value: parseEther('0.01'),  // 0.01 CORE fee
      });
      setPendingTx(hash);
      return hash;
    } catch (error) {
      console.error('Failed to mint profile:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Find a match for your profile
  const findMatch = async (tokenId: number) => {
    try {
      setLoading(true);
      const { hash } = await findMatchAsync({
        args: [BigInt(tokenId)],
      });
      setPendingTx(hash);
      return hash;
    } catch (error) {
      console.error('Failed to find match:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update your vibe message
  const updateVibeMessage = async (tokenId: number, newMessage: string) => {
    try {
      setLoading(true);
      const { hash } = await updateMessageAsync({
        args: [BigInt(tokenId), newMessage],
      });
      setPendingTx(hash);
      return hash;
    } catch (error) {
      console.error('Failed to update message:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading: loading || isWaitingForTx,
    profiles,
    totalSupply,
    useProfileData,
    mintProfile,
    findMatch,
    updateVibeMessage,
  };
}
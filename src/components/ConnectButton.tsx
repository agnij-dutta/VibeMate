'use client';

import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useChainId, useSwitchNetwork, useNetwork } from 'wagmi';
import { coreTestnet } from '@/lib/wagmi';

export default function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isLoading: isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isCorrectChain = chainId === coreTestnet.id;

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  // Don't render anything until mounted to prevent hydration errors
  if (!mounted) {
    return <button className="px-4 py-2 rounded-full text-white bg-purple-600">Loading...</button>;
  }

  if (isConnected) {
    return (
      <div className="relative">
        <button
          className={`px-4 py-2 rounded-full text-white transition-colors ${
            isCorrectChain
              ? 'bg-purple-600 hover:bg-purple-700'
              : 'bg-orange-500 hover:bg-orange-600'
          }`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {formatAddress(address as string)}
          {!isCorrectChain && ' ⚠️'}
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <div className="px-4 py-2 text-xs text-gray-500 border-b">
                Chain: {chain?.name || 'Unknown'} ({chainId})
              </div>
              {!isCorrectChain && (
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-orange-600 hover:bg-orange-50"
                  onClick={() => {
                    if (switchNetwork) {
                      switchNetwork(coreTestnet.id);
                      setIsDropdownOpen(false);
                    }
                  }}
                >
                  Switch to Core Testnet
                </button>
              )}
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  disconnect();
                  setIsDropdownOpen(false);
                }}
              >
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        disabled={isPending}
      >
        {isPending ? 'Connecting...' : 'Connect Wallet'}
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <div className="px-4 py-2 text-xs text-gray-500 border-b">
              Connect to Core Testnet (Chain ID: {coreTestnet.id})
            </div>
            {connectors.map((connector) => (
              <button
                key={connector.id}
                className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                  connector.ready
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
                onClick={() => {
                  if (connector.ready) {
                    connect({ connector, chainId: coreTestnet.id });
                    setIsDropdownOpen(false);
                  }
                }}
                disabled={!connector.ready}
              >
                <div className="flex items-center justify-between">
                  <span>{connector.name}</span>
                  {!connector.ready && (
                    <span className="text-xs text-red-500">Unavailable</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {error && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          <strong>Connection Error:</strong> {error.message}
        </div>
      )}
    </div>
  );
}
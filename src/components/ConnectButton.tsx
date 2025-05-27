'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState } from 'react';

export default function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  if (isConnected) {
    return (
      <div className="relative">
        <button
          className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {formatAddress(address as string)}
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1" role="menu" aria-orientation="vertical">
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
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  connect({ connector });
                  setIsDropdownOpen(false);
                }}
                disabled={!connector.ready}
              >
                {connector.name}
                {!connector.ready && ' (unsupported)'}
              </button>
            ))}
          </div>
        </div>
      )}
      {error && <div className="mt-2 text-red-500 text-sm">{error.message}</div>}
    </div>
  );
} 
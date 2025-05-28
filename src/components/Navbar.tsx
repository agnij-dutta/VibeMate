'use client';

import React from 'react';
import Link from 'next/link';
import ConnectButton from './ConnectButton';
import { useAccount } from 'wagmi';

export default function Navbar() {
  const { isConnected } = useAccount();
  // Mounted state to handle client-side rendering only
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-2xl font-bold text-purple-600">
            VibeMate
          </Link>
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Beta</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors">
            Home
          </Link>
          <Link href="/browse" className="text-gray-600 hover:text-purple-600 transition-colors">
            Browse
          </Link>
          {mounted && isConnected && (
            <>
              <Link href="/profile" className="text-gray-600 hover:text-purple-600 transition-colors">
                My Profile
              </Link>
              <Link href="/matches" className="text-gray-600 hover:text-purple-600 transition-colors">
                Matches
              </Link>
            </>
          )}
        </div>

        <ConnectButton />
      </div>
    </nav>
  );
}
'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useAccount } from 'wagmi';
import Link from 'next/link';

interface AuthCheckProps {
  children: ReactNode;
  hasProfile: boolean;
}

export default function AuthCheck({ children, hasProfile }: AuthCheckProps) {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't show anything until mounted to prevent hydration errors
  if (!mounted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Connect Wallet to Continue</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          Please connect your wallet to access this page.
        </p>
      </div>
    );
  }

  if (!hasProfile) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Create a Profile First</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          You need to create a profile before you can access this feature.
        </p>
        <Link 
          href="/profile" 
          className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          Create Profile
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
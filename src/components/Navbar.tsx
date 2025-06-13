'use client';

import React from 'react';
import Link from 'next/link';
import ConnectButton from './ConnectButton';
import { useAccount } from 'wagmi';
import { useTheme } from 'next-themes';
import { Moon, Sun, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { isConnected } = useAccount();
  const { theme, setTheme } = useTheme();
  // Mounted state to handle client-side rendering only
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-dark-700/30 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-200" />
                <div className="absolute inset-0 bg-primary-600/20 blur-lg group-hover:bg-primary-600/30 transition-all duration-200 rounded-full"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
                VibeMate
              </span>
            </Link>
            <span className="text-xs bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-300 px-3 py-1 rounded-full font-medium border border-primary-200 dark:border-primary-700">
              Beta
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 font-medium relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/browse" 
              className="text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 font-medium relative group"
            >
              Browse
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            {mounted && isConnected && (
              <>
                <Link 
                  href="/profile" 
                  className="text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 font-medium relative group"
                >
                  My Profile
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link 
                  href="/matches" 
                  className="text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 font-medium relative group"
                >
                  Matches
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 transition-all duration-200 border border-gray-200 dark:border-dark-700 group"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-200" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors duration-200" />
                )}
              </button>
            )}
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
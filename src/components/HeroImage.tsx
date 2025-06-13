"use client";

import React from 'react';

export default function HeroImage() {
  return (
    <div className="relative w-80 h-80 lg:w-96 lg:h-96">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-3xl blur-2xl"></div>
      
      {/* Main container */}
      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
        {/* Floating profile cards */}
        <div className="relative h-full flex items-center justify-center">
          {/* Central profile card */}
          <div className="relative z-10">
            <div className="w-32 h-40 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white/95 dark:bg-gray-900/95 rounded-xl h-full flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white text-lg">
                  💕
                </div>
                <div className="text-xs font-semibold text-center text-gray-700 dark:text-gray-300">
                  Perfect Match
                </div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">98% Match</div>
              </div>
            </div>
          </div>

          {/* Floating personality traits */}
          <div className="absolute top-4 left-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🌙</span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Mysterious</span>
            </div>
          </div>

          <div className="absolute top-16 right-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🔥</span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Passionate</span>
            </div>
          </div>

          <div className="absolute bottom-16 left-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🌹</span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Romantic</span>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center space-x-2">
              <span className="text-lg">💫</span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Playful</span>
            </div>
          </div>

          {/* Subtle connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 384 384">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#8b5cf6', stopOpacity: 0.4}} />
                <stop offset="100%" style={{stopColor: '#ec4899', stopOpacity: 0.4}} />
              </linearGradient>
            </defs>
            <path
              d="M 192 100 Q 250 150 300 180"
              stroke="url(#connectionGradient)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="5,5"
            />
            <path
              d="M 192 280 Q 140 230 80 200"
              stroke="url(#connectionGradient)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="5,5"
            />
            <path
              d="M 120 100 Q 156 140 192 160"
              stroke="url(#connectionGradient)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="5,5"
            />
          </svg>
        </div>
      </div>

      {/* Subtle floating elements */}
      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg">
        <div className="text-white text-xs font-bold">+1</div>
      </div>

      <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-2 shadow-lg">
        <div className="text-white text-sm">✨</div>
      </div>
    </div>
  );
}
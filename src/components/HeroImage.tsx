"use client";

export default function HeroImage() {
  return (
    <div className="relative w-80 h-80 animate-fadeIn">
      {/* SVG Hero Image */}
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 rounded-lg shadow-lg">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Heart shape */}
          <path
            d="M100 170c-5-5-50-50-50-90 0-25 20-45 45-45 15 0 25 10 30 20 5-10 15-20 30-20 25 0 45 20 45 45 0 40-45 85-50 90-5 5-45 5-50 0z"
            fill="white"
            opacity="0.9"
          />

          {/* Ethereum logo in center */}
          <g transform="translate(85, 85)">
            <path
              d="M15 0L0 15l15 10 15-10L15 0z"
              fill="#627EEA"
            />
            <path
              d="M15 0v10l15 5-15-15z"
              fill="#8A92B2"
            />
            <path
              d="M0 15l15 5V0L0 15z"
              fill="#8A92B2"
            />
            <path
              d="M15 20v10l15-15-15 5z"
              fill="#627EEA"
            />
            <path
              d="M0 15l15 5v10L0 15z"
              fill="#627EEA"
            />
          </g>
        </svg>
      </div>

      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-lg"></div>

      {/* Floating animation effects */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-pink-400 opacity-40 animate-ping"></div>
      <div className="absolute bottom-8 left-8 w-6 h-6 rounded-full bg-purple-500 opacity-30 animate-pulse"></div>

      {/* VibeMate text overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <h2 className="text-white text-2xl font-bold drop-shadow-lg">VibeMate</h2>
        <p className="text-white/80 text-sm text-center">Find Your Perfect Match</p>
      </div>
    </div>
  );
}
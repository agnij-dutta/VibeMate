"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroImage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Check if the actual image exists on component mount
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setIsLoading(false);
      setHasError(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
    img.src = "/hero-image.png";
  }, []);

  return (
    <div className="relative w-80 h-80 animate-fadeIn">
      {/* Placeholder shimmer while loading */}
      {isLoading && (
        <div className="absolute inset-0 bg-purple-100 rounded-lg animate-pulse"></div>
      )}
      
      {/* Main image or SVG fallback */}
      <Image 
        src={hasError ? "/hero-image.svg" : "/hero-image.png"}
        alt="VibeMate Hero" 
        fill
        className={`object-contain rounded-lg shadow-lg transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        priority
        onError={() => setHasError(true)}
      />
      
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-lg"></div>
      
      {/* Floating animation effects */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-pink-400 opacity-40 animate-ping"></div>
      <div className="absolute bottom-8 left-8 w-6 h-6 rounded-full bg-purple-500 opacity-30 animate-pulse"></div>
    </div>
  );
} 
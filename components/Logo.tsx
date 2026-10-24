'use client';

import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'white';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  brandName?: string;
  className?: string;
}

export default function Logo({
  variant = 'dark',
  size = 'md',
  showText = true,
  brandName = 'FURNI.TURE',
  className = '',
}: LogoProps) {
  const isWhite = variant === 'white';
  const strokeColor = isWhite ? '#FFFFFF' : '#432A1B';
  const fillColor = isWhite ? '#FFFFFF' : '#432A1B';
  const textColor = isWhite ? 'text-white' : 'text-[#432A1B]';

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-base tracking-wider',
    md: 'text-xl tracking-wider',
    lg: 'text-2xl tracking-wider',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Isometric Cube with Architectural Door and Windows */}
      <svg
        className={`${iconSizes[size]} shrink-0 transition-transform duration-300 hover:rotate-6`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Isometric Cube Outer Outline */}
        <path
          d="M50 10 L88 32 L88 74 L50 96 L12 74 L12 32 Z"
          stroke={strokeColor}
          strokeWidth="7"
          strokeLinejoin="round"
        />

        {/* Center Tri-fold Edges */}
        <path
          d="M50 53 L50 96"
          stroke={strokeColor}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M50 53 L88 32"
          stroke={strokeColor}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M50 53 L12 32"
          stroke={strokeColor}
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Top Face: Abstract Window Cutouts */}
        <polygon
          points="40,24 50,18 60,24 50,30"
          fill={fillColor}
          opacity="0.9"
        />

        {/* Left Face: Architectural Doorway */}
        <path
          d="M26 48 L38 41 L38 67 L26 73 Z"
          fill={fillColor}
          opacity="0.9"
        />

        {/* Right Face: Inset Window / Aperture */}
        <circle
          cx="69"
          cy="58"
          r="5"
          fill={fillColor}
          opacity="0.9"
        />
      </svg>

      {/* Wordmark and ® Symbol */}
      {showText && (
        <span
          className={`font-light font-sans uppercase flex items-start ${textSizes[size]} ${textColor} font-[300]`}
        >
          <span>{brandName}</span>
          <span className="text-[0.5em] ml-0.5 mt-0.5 opacity-90 font-mono">®</span>
        </span>
      )}
    </div>
  );
}

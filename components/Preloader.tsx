'use client';

import React, { useEffect, useState, useRef } from 'react';
import Logo from './Logo';

interface PreloaderProps {
  onComplete: () => void;
  brandName?: string;
}

export default function Preloader({ onComplete, brandName = 'FURNI.TURE' }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shouldWipe, setShouldWipe] = useState(false);
  const [skip] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('autostart') === '1';
    }
    return false;
  });
  const completedRef = useRef(false);

  useEffect(() => {
    // Check for ?autostart=1
    if (skip) {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
      return;
    }

    // Smooth counter animation from 0 to 100
    let startTimestamp: number | null = null;
    const duration = 2400; // 2.4 seconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const currentProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);

      setProgress(currentProgress);

      if (currentProgress < 100) {
        requestAnimationFrame(step);
      } else {
        // Reached 100!
        setTimeout(() => {
          setShouldWipe(true);
          setTimeout(() => {
            setIsDone(true);
            if (!completedRef.current) {
              completedRef.current = true;
              onComplete();
            }
          }, 900); // Wait for curved wipe animation
        }, 300);
      }
    };

    const frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [onComplete, skip]);

  if (skip || isDone) return null;

  // Format progress as 3 digits: e.g. "000", "045", "100"
  const formattedProgress = progress.toString().padStart(3, '0');
  const d1 = formattedProgress[0];
  const d2 = formattedProgress[1];
  const d3 = formattedProgress[2];

  // Digit column renderer for slot-machine rolling effect
  const renderDigitColumn = (digit: string, columnIndex: number) => {
    const val = parseInt(digit, 10) || 0;
    return (
      <div
        className="relative h-[68px] md:h-[84px] w-[34px] md:w-[46px] overflow-hidden inline-block"
        key={columnIndex}
      >
        <div
          className="transition-transform duration-200 ease-out flex flex-col items-center"
          style={{ transform: `translateY(-${val * 10}%)` }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <div
              key={num}
              className="h-[68px] md:h-[84px] flex items-center justify-center font-[300] text-4xl md:text-6xl text-[#000000] tabular-nums"
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white pointer-events-auto transition-all duration-900 ease-in-out ${
        shouldWipe ? '-translate-y-full rounded-b-[50vw]' : 'translate-y-0'
      }`}
      style={{
        boxShadow: shouldWipe ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : 'none',
      }}
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center justify-center px-4">
        {/* FURNI.TURE Centered Logo */}
        <div className="mb-12 md:mb-16 transform scale-110 md:scale-125">
          <Logo variant="dark" size="lg" brandName={brandName} />
        </div>

        {/* Thin Gold Progress Bar */}
        <div className="w-48 md:w-64 h-[2px] bg-[#EAE5DE] overflow-hidden mb-6 relative">
          <div
            className="h-full bg-[#D8BA72] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Slot-machine rolling 3-digit counter */}
        <div className="flex items-center justify-center tracking-tighter">
          {renderDigitColumn(d1, 0)}
          {renderDigitColumn(d2, 1)}
          {renderDigitColumn(d3, 2)}
        </div>
      </div>
    </div>
  );
}

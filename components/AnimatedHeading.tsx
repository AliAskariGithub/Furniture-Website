'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedHeadingProps {
  word1: string;
  word2: string;
  word2OffsetClass?: string;
  className?: string;
}

export default function AnimatedHeading({
  word1,
  word2,
  word2OffsetClass = 'ml-[12vw] sm:ml-[20vw] md:ml-[320px]',
  className = '',
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if already in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <h2
      ref={ref}
      className={`text-[14vw] sm:text-[12vw] md:text-[96px] lg:text-[110px] leading-[0.9] font-[300] uppercase tracking-[-0.03em] select-none ${className}`}
    >
      {/* Line 1: Word 1 sliding up from behind an overflow-hidden mask */}
      <span className="block overflow-hidden pb-1">
        <span
          className={`block text-[#000000] transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-[115%] opacity-0'
          }`}
        >
          {word1}
        </span>
      </span>

      {/* Line 2: Word 2 shifted right with dark chocolate brown color and staggered delay */}
      <span className="block overflow-hidden pt-1">
        <span
          className={`block text-[#4E3630] transition-all duration-800 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${word2OffsetClass} ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-[115%] opacity-0'
          }`}
        >
          {word2}
        </span>
      </span>
    </h2>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface DoubleFrameProps {
  src: string;
  alt: string;
  offsetPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  offsetDistance?: number;
  className?: string;
  imageClassName?: string;
  aspectRatio?: string;
  parallax?: boolean;
  children?: React.ReactNode;
}

export default function DoubleFrame({
  src,
  alt,
  offsetPosition = 'top-right',
  className = '',
  imageClassName = '',
  aspectRatio = 'aspect-[4/3]',
  parallax = true,
  children,
}: DoubleFrameProps) {
  const [imageError, setImageError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll hook linked to this frame
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax translation: image moves slightly slower than scroll speed
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-45, 45]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

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

  const getOffsetClasses = () => {
    switch (offsetPosition) {
      case 'top-right':
        return '-top-4 -right-4 md:-top-6 md:-right-6';
      case 'top-left':
        return '-top-4 -left-4 md:-top-6 md:-left-6';
      case 'bottom-right':
        return '-bottom-4 -right-4 md:-bottom-6 md:-right-6';
      case 'bottom-left':
        return '-bottom-4 -left-4 md:-bottom-6 md:-left-6';
      default:
        return '-top-6 -right-6';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative group transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {/* Offset 1px Hairline Outline Frame that animates into place */}
      <div
        className={`absolute inset-0 ${getOffsetClasses()} border border-[#C9C9C9] pointer-events-none transition-all duration-700 delay-100 ${
          isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        } group-hover:translate-x-1.5 group-hover:-translate-y-1.5`}
        aria-hidden="true"
      />

      {/* Primary Image Container with Parallax clipping window */}
      <div className={`relative z-10 w-full overflow-hidden bg-[#F4EFEA] ${aspectRatio}`}>
        {!imageError ? (
          <motion.div
            style={parallax ? { y: parallaxY } : undefined}
            className="w-full h-full scale-[1.18] will-change-transform"
          >
            <img
              src={src}
              alt={alt}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${imageClassName}`}
            />
          </motion.div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#F5F2EB] to-[#E9E4DC] text-[#4E3630]">
            <div className="w-10 h-10 border border-[#D8BA72] flex items-center justify-center mb-3">
              <span className="text-xs uppercase tracking-widest text-[#D8BA72]">ARCH</span>
            </div>
            <p className="text-xs tracking-wider text-center text-[#4E3630]/80 uppercase">{alt}</p>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}

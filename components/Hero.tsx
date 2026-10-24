'use client';

import React from 'react';
import GoldButton from './GoldButton';
import { SITE_DATA } from '@/lib/data';
import { motion, useTransform, type MotionValue } from 'motion/react';

interface HeroProps {
  onOpenConsultant?: () => void;
  brandName?: string;
  scrollProgress?: MotionValue<number>;
}

export default function Hero({ onOpenConsultant, brandName = 'FURNI.TURE', scrollProgress }: HeroProps) {
  // Multi-layer parallax scroll transforms when stacked
  const bgY = scrollProgress ? useTransform(scrollProgress, [0, 1], ['0%', '14%']) : undefined;
  const bgScale = scrollProgress ? useTransform(scrollProgress, [0, 1], [1, 1.08]) : undefined;
  const contentY = scrollProgress ? useTransform(scrollProgress, [0, 1], [0, -32]) : undefined;

  return (
    <section
      id="homepage"
      className="relative w-full h-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#2D2622]"
    >
      {/* Full-bleed Photo Background with scroll parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          style={bgY ? { y: bgY, scale: bgScale } : undefined}
          className="w-full h-full will-change-transform"
        >
          <img
            src={SITE_DATA.hero.bgImage}
            alt="Bright minimalist Scandinavian living room with light panel molding walls, sofa and walnut coffee table"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000 ease-out"
          />
        </motion.div>
        {/* Measured scrim overlay for typography contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Top spacer for header */}
      <div className="h-20 md:h-24 shrink-0 relative z-10" />

      {/* Center / Main Editorial Grid with subtle parallax float */}
      <motion.div
        style={contentY ? { y: contentY } : undefined}
        className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center will-change-transform"
      >
        {/* Top-Right Tag List & Script Accent Row */}
        <div className="flex justify-end mb-2 md:mb-4">
          <div className="flex flex-col items-end text-right">
            {/* Small uppercase list with Staggered Word Reveal */}
            <div className="text-white/90 text-[10px] md:text-xs font-[300] tracking-[0.25em] leading-relaxed uppercase overflow-hidden">
              {SITE_DATA.brand.heroCategories.map((cat, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.35 + i * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {cat}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Script Accent: "interior design" in Yellowtail font with rotate and float */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -14, y: 15 }}
              animate={{ opacity: 1, scale: 1, rotate: -6, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 md:mt-3 transform -rotate-6 translate-x-2"
            >
              <span className="font-script text-white text-2xl md:text-3xl lg:text-4xl tracking-normal font-normal select-none drop-shadow-md">
                {SITE_DATA.brand.scriptAccent}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Giant Hero Title with Overflow-Hidden Mask Reveal Animation */}
        <div className="overflow-hidden mb-4 md:mb-6">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="text-white font-[200] text-[13vw] sm:text-[14vw] md:text-[120px] lg:text-[150px] xl:text-[170px] leading-[0.85] tracking-[-0.04em] uppercase select-none font-sans drop-shadow-lg"
          >
            {brandName}
          </motion.h1>
        </div>

        {/* Bottom Lockup: Staggered Two-line Title & Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 md:gap-8 pb-6 md:pb-8 pt-1">
          <div className="flex flex-col items-start gap-4 md:gap-5 max-w-lg">
            {/* Two-Line Subtitle with Individual Mask Reveals */}
            <h2 className="text-white font-[300] text-lg sm:text-xl md:text-2xl lg:text-[28px] uppercase tracking-wide leading-snug drop-shadow-sm">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  {SITE_DATA.hero.subtitleLine1}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  {SITE_DATA.hero.subtitleLine2}
                </motion.span>
              </span>
            </h2>

            {/* Action Buttons: Gold Button + White Outline Button with Animated Fill on Hover */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <GoldButton
                text={SITE_DATA.hero.ctaText}
                onClick={onOpenConsultant}
                variant="gold"
                ariaLabel="Book a design consultant session"
              />

              {/* White Outline Button with animated white background fill on hover */}
              <GoldButton
                text="VIEW PORTFOLIO ↗"
                href="/portfolio"
                variant="outline-white"
                ariaLabel="View interior design portfolio projects"
              />
            </motion.div>
          </div>

          {/* Animated scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.95 }}
            className="hidden lg:flex flex-col items-center gap-2 text-white/70 text-[9px] uppercase tracking-[0.3em] pb-1"
          >
            <span>SCROLL</span>
            <div className="w-[1px] h-8 bg-white/40 animate-pulse" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

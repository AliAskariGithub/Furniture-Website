'use client';

import React, { useRef } from 'react';
import Hero from './Hero';
import ServicesSection from './ServicesSection';
import { motion, useScroll, useTransform } from 'motion/react';

interface HeroServicesStackProps {
  onOpenConsultant: (topic?: string) => void;
  brandName?: string;
}

export default function HeroServicesStack({
  onOpenConsultant,
  brandName = 'FURNI.TURE',
}: HeroServicesStackProps) {
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const heroTriggerRef = useRef<HTMLDivElement>(null);

  // useScroll linked precisely to the 100vh height of the Hero section
  const { scrollYProgress } = useScroll({
    target: heroTriggerRef,
    offset: ['start start', 'end start'],
  });

  // 1. 3D depth scale: Hero smoothly recedes from 1.0 to 0.92 as Services stacks over it
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // 2. Subtle upward drift to intensify multi-plane parallax depth
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '-3%']);

  // 3. Luxurious corner rounding: Hero gently takes on a curved card aesthetic as it recedes
  const heroRadius = useTransform(scrollYProgress, [0, 0.75], [0, 28]);

  // 4. Ambient darkening scrim: Focus glides naturally to the oncoming Services card
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [0, 0.45, 0.65]);

  // 5. Subtle opacity fade for the receding Hero card
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.9, 0.75]);

  return (
    <div
      ref={stackContainerRef}
      className="relative w-full bg-[#1b1613]"
    >
      {/* 100vh invisible anchor trigger for exact scroll-progress calculation */}
      <div
        ref={heroTriggerRef}
        className="absolute top-0 left-0 w-full h-screen pointer-events-none"
        aria-hidden="true"
      />

      {/* Pinned / Sticky Hero Container: Stays pinned while ServicesSection scrolls over it */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
        <motion.div
          style={{
            scale: heroScale,
            y: heroY,
            borderRadius: heroRadius,
            opacity: heroOpacity,
          }}
          className="w-full h-full origin-top overflow-hidden will-change-transform"
        >
          <Hero
            onOpenConsultant={() => onOpenConsultant()}
            brandName={brandName}
            scrollProgress={scrollYProgress}
          />

          {/* Deep dark cinematic luxury scrim overlay */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-[#0e0b0a] pointer-events-none z-20"
            aria-hidden="true"
          />
        </motion.div>
      </div>

      {/* Services Section: Physically slides up and stacks directly on top of Hero */}
      <div
        className="relative z-20 bg-white rounded-t-[32px] md:rounded-t-[48px] border-t border-[#C9C9C9]/50 overflow-hidden"
      >
        <ServicesSection
          onOpenConsultant={onOpenConsultant}
          brandName={brandName}
          isStacked={true}
        />
      </div>
    </div>
  );
}

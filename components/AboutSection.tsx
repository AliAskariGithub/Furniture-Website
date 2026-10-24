'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import DoubleFrame from './DoubleFrame';
import AnimatedCounter from './AnimatedCounter';
import { SITE_DATA, StatItem } from '@/lib/data';
import { motion, useScroll, useTransform } from 'motion/react';

interface AboutSectionProps {
  brandName?: string;
}

function StatRowItem({ stat, index }: { stat: StatItem; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const numericTarget = parseInt(stat.number.replace(/\D/g, ''), 10) || 50;

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start 0.92', 'start 0.35'],
  });

  // Photo comes from left
  const imageX = useTransform(scrollYProgress, [0.08, 0.45], [-55, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0.08, 0.4], [0, 1]);

  // Stat content comes from right
  const textX = useTransform(scrollYProgress, [0.08, 0.45], [55, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.08, 0.4], [0, 1]);

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
    >
      {/* Photo on the Left with directional entrance from left */}
      <motion.div
        style={{
          x: imageX,
          opacity: imageOpacity,
        }}
        className="md:col-span-5 relative will-change-[transform,opacity]"
      >
        <DoubleFrame
          src={stat.image}
          alt={stat.alt}
          offsetPosition={index % 2 === 0 ? 'top-left' : 'bottom-left'}
          aspectRatio="aspect-[4/3]"
          parallax={true}
          className="max-w-md mx-auto md:max-w-none"
        />
      </motion.div>

      {/* Stat Number & Text on the Right with directional entrance from right */}
      <motion.div
        style={{
          x: textX,
          opacity: textOpacity,
        }}
        className="md:col-span-7 flex flex-col justify-center pl-0 md:pl-6 will-change-[transform,opacity]"
      >
        {/* Big Stat Number with animated counting */}
        <div className="text-5xl md:text-6xl lg:text-[68px] font-[400] text-[#000000] tracking-tight leading-none mb-3 tabular-nums font-sans">
          <AnimatedCounter target={numericTarget} suffix="+" duration={1600} />
        </div>

        {/* Stat Title with dash */}
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-xl md:text-2xl lg:text-[26px] font-[300] tracking-wider uppercase text-[#000000]">
            {stat.title}
          </h3>
          <span className="text-[#000000] font-[300] text-xl" aria-hidden="true">
            —
          </span>
        </div>

        {/* Justified Editorial Paragraph */}
        <p className="text-[12.5px] md:text-[13px] leading-[1.6] text-[#000000] text-justify font-[300] tracking-normal max-w-lg">
          {stat.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function AboutSection({ brandName = 'FURNI.TURE' }: AboutSectionProps) {
  const { kicker, headingPart1, headingPart2, verticalWordmark, stats } = SITE_DATA.about;
  const sectionRef = useRef<HTMLElement>(null);

  // Section-level useScroll hook for directional reveals
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.95', 'start 0.2'],
  });

  const kickerX = useTransform(scrollYProgress, [0.03, 0.22], [-40, 0]);
  const kickerOpacity = useTransform(scrollYProgress, [0.03, 0.2], [0, 1]);

  const heading1X = useTransform(scrollYProgress, [0.08, 0.35], [-70, 0]);
  const heading1Opacity = useTransform(scrollYProgress, [0.08, 0.3], [0, 1]);

  const heading2X = useTransform(scrollYProgress, [0.15, 0.45], [70, 0]);
  const heading2Opacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);

  // Subtle parallax translation on the vertical outline wordmark
  const verticalY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-white py-24 md:py-36 px-6 md:px-12 border-t border-[#C9C9C9]/30 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Top Kicker on Left */}
        <motion.div
          style={{
            x: kickerX,
            opacity: kickerOpacity,
          }}
          className="mb-12 md:mb-16 will-change-[transform,opacity]"
        >
          <div className="text-[11px] md:text-xs font-[300] uppercase tracking-[0.2em] leading-relaxed text-[#000000] whitespace-pre-line">
            {kicker}
          </div>
        </motion.div>

        {/* Section Heading: Staggered Lines (Left & Right) */}
        <div className="mb-20 md:mb-32 overflow-hidden">
          <h2 className="text-[14vw] sm:text-[12vw] md:text-[96px] lg:text-[110px] leading-[0.9] font-[300] uppercase tracking-[-0.03em] select-none">
            <span className="block overflow-hidden pb-1">
              <motion.span
                style={{
                  x: heading1X,
                  opacity: heading1Opacity,
                }}
                className="block text-[#000000] will-change-[transform,opacity]"
              >
                {headingPart1}
              </motion.span>
            </span>

            <span className="block overflow-hidden pt-1">
              <motion.span
                style={{
                  x: heading2X,
                  opacity: heading2Opacity,
                }}
                className="block text-[#4E3630] ml-[12vw] sm:ml-[20vw] md:ml-[340px] will-change-[transform,opacity]"
              >
                {headingPart2}
              </motion.span>
            </span>
          </h2>
        </div>

        {/* Main Grid: Left Side with Vertical Outline Text + Parallax, Right Side with 3 Stat Rows */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Side: Vertical Outlined Wordmark */}
          <div className="hidden lg:flex lg:col-span-2 relative flex-col items-center justify-center self-stretch min-h-[900px] border-r border-[#C9C9C9]/60">
            <motion.div
              style={{ y: verticalY }}
              className="sticky top-40 transform -rotate-90 select-none whitespace-nowrap will-change-transform"
            >
              <span className="text-[72px] xl:text-[88px] font-[200] tracking-[0.3em] text-stroke-outline uppercase">
                {brandName || verticalWordmark}
              </span>
            </motion.div>
            <div className="absolute top-0 bottom-0 left-4 w-[1px] bg-[#C9C9C9]/30" />
          </div>

          {/* Right Side: 3 Stat Rows with Left/Right directional animation */}
          <div className="lg:col-span-10 flex flex-col gap-20 md:gap-32">
            {stats.map((stat, idx) => (
              <StatRowItem key={stat.id} stat={stat} index={idx} />
            ))}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="pt-8 border-t border-neutral-200 flex items-center justify-between"
            >
              <Link
                href="/about"
                className="text-xs font-[300] uppercase tracking-[0.25em] text-[#4E3630] hover:text-[#D8BA72] underline underline-offset-8 transition-colors"
              >
                DISCOVER OUR DESIGN TEAM & SCANDINAVIAN PHILOSOPHY ↗
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

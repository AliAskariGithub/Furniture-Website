'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import DoubleFrame from './DoubleFrame';
import GoldButton from './GoldButton';
import { SITE_DATA, ServiceItem } from '@/lib/data';
import { motion, useScroll, useTransform } from 'motion/react';
import { useApp } from '@/context/AppContext';

interface ServicesSectionProps {
  onOpenConsultant?: () => void;
  brandName?: string;
  isStacked?: boolean;
}

function ServiceRowItem({
  item,
  index,
}: {
  item: ServiceItem;
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isReversed = index % 2 === 1;
  const { openConsultantModal } = useApp();

  // Row-level useScroll hook for staggered entrance
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start 0.92', 'start 0.35'],
  });

  const textX = useTransform(scrollYProgress, [0.08, 0.45], [isReversed ? 60 : -60, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.08, 0.4], [0, 1]);

  const imageX = useTransform(scrollYProgress, [0.08, 0.45], [isReversed ? -60 : 60, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0.08, 0.4], [0, 1]);

  const numScale = useTransform(scrollYProgress, [0.1, 0.5], [0.8, 1]);
  const numOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <div
      ref={rowRef}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
        isReversed ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Text Block - Directional entrance (Left/Right) */}
      <motion.div
        style={{
          x: textX,
          opacity: textOpacity,
        }}
        className={`lg:col-span-5 flex flex-col justify-center will-change-[transform,opacity] ${
          isReversed ? 'lg:col-start-8 lg:order-2' : 'lg:col-start-1 lg:order-1'
        }`}
      >
        <div className="flex items-center gap-2 mb-6">
          <h3 className="text-2xl md:text-[28px] font-[300] tracking-wider uppercase text-[#000000]">
            {item.title}
          </h3>
          <span className="text-[#000000] font-[300] text-2xl" aria-hidden="true">
            —
          </span>
        </div>

        <p className="text-[12.5px] md:text-[13px] leading-[1.6] text-[#000000] text-justify font-[300] tracking-normal mb-8 max-w-lg">
          {item.description}
        </p>

        {/* Action row: Book Consultation & Discuss */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => openConsultantModal(item.title)}
            className="text-[11px] font-[300] uppercase tracking-[0.2em] text-[#4E3630] hover:text-[#D8BA72] underline underline-offset-4 transition-colors"
          >
            DISCUSS PROJECT ↗
          </button>
          <button
            type="button"
            onClick={() => openConsultantModal(`${item.title} Architectural Specification`)}
            className="text-[10px] font-[300] uppercase tracking-[0.18em] px-3.5 py-1.5 border border-[#C9C9C9] hover:border-[#D8BA72] hover:text-[#D8BA72] transition-colors"
          >
            REQUEST SPECIFICATION ↗
          </button>
        </div>
      </motion.div>

      {/* Image Block - Directional entrance (Right/Left opposite to text) */}
      <motion.div
        style={{
          x: imageX,
          opacity: imageOpacity,
        }}
        className={`lg:col-span-7 relative will-change-[transform,opacity] ${
          isReversed ? 'lg:col-start-1 lg:order-1' : 'lg:col-start-6 lg:order-2'
        }`}
      >
        {/* Outlined Grey Number (01, 02, 03) */}
        <motion.div
          style={{ opacity: numOpacity, scale: numScale }}
          className={`absolute z-20 top-[-24px] pointer-events-none select-none font-sans will-change-[transform,opacity] ${
            isReversed ? 'right-[-8px] sm:right-[-20px]' : 'left-[-8px] sm:left-[-20px]'
          }`}
        >
          <span className="text-[44px] md:text-[54px] font-[300] tracking-tight text-stroke-outline">
            {item.number}
          </span>
        </motion.div>

        {/* Double Frame with smooth transform parallax */}
        <DoubleFrame
          src={item.image}
          alt={item.alt}
          offsetPosition={isReversed ? 'top-left' : 'top-right'}
          aspectRatio="aspect-[16/10]"
          parallax={true}
        />
      </motion.div>
    </div>
  );
}

export default function ServicesSection({
  onOpenConsultant,
  brandName = 'FURNI.TURE',
  isStacked = false,
}: ServicesSectionProps) {
  const { kicker, headingPart1, headingPart2, items, ctaText } = SITE_DATA.services;
  const { openConsultantModal } = useApp();
  const sectionRef = useRef<HTMLElement>(null);

  const handleConsultantClick = () => {
    if (onOpenConsultant) onOpenConsultant();
    else openConsultantModal();
  };

  // Section-level useScroll hook for heading directional entrances
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.95', 'start 0.2'],
  });

  const kickerX = useTransform(scrollYProgress, [0.03, 0.22], [-40, 0]);
  const kickerOpacity = useTransform(scrollYProgress, [0.03, 0.2], [0, 1]);

  // "OUR" slides in from the left
  const heading1X = useTransform(scrollYProgress, [0.08, 0.35], [-70, 0]);
  const heading1Opacity = useTransform(scrollYProgress, [0.08, 0.3], [0, 1]);

  // "SERVICES" slides in from the right
  const heading2X = useTransform(scrollYProgress, [0.15, 0.45], [70, 0]);
  const heading2Opacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);

  const ctaX = useTransform(scrollYProgress, [0.55, 0.85], [-35, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`relative w-full bg-white px-6 md:px-12 overflow-hidden ${
        isStacked ? 'pt-16 md:pt-28 pb-24 md:pb-36 border-t-0' : 'py-24 md:py-36 border-t border-[#C9C9C9]/30'
      }`}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Top Bar: Kicker on Left, Small Dark Logo on Right */}
        <div className="flex items-start justify-between gap-6 mb-16 md:mb-20">
          <motion.div
            style={{
              x: kickerX,
              opacity: kickerOpacity,
            }}
            className="will-change-[transform,opacity]"
          >
            <div className="text-[11px] md:text-xs font-[300] uppercase tracking-[0.25em] leading-relaxed text-[#000000] whitespace-pre-line">
              {kicker}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden sm:block shrink-0"
          >
            <Logo variant="dark" size="sm" brandName={brandName} />
          </motion.div>
        </div>

        {/* Section Heading: "OUR" (from Left) / "SERVICES" (from Right) */}
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
                className="block text-[#4E3630] ml-[12vw] sm:ml-[20vw] md:ml-[300px] will-change-[transform,opacity]"
              >
                {headingPart2}
              </motion.span>
            </span>
          </h2>
        </div>

        {/* 3 Alternating (Zig-Zag) Rows with Left/Right directional reveal */}
        <div className="flex flex-col gap-24 md:gap-40">
          {items.map((item, index) => (
            <ServiceRowItem key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Post-Services Call to Action Buttons */}
        <motion.div
          style={{
            x: ctaX,
            opacity: ctaOpacity,
          }}
          className="mt-28 md:mt-36 flex flex-wrap items-center gap-6 will-change-[transform,opacity]"
        >
          <GoldButton
            text={ctaText}
            onClick={handleConsultantClick}
            ariaLabel="Book a consultant after reviewing our services"
          />

          <Link
            href="/services"
            className="text-xs font-[300] uppercase tracking-[0.25em] text-[#000000] hover:text-[#D8BA72] underline underline-offset-8 transition-colors"
          >
            VIEW ALL ARCHITECTURAL SERVICES & PACKAGES ↗
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import GoldButton from './GoldButton';
import { SITE_DATA } from '@/lib/data';
import { motion, useScroll, useTransform } from 'motion/react';

interface FooterSectionProps {
  onOpenContact: () => void;
  brandName?: string;
  isStacked?: boolean;
}

export default function FooterSection({
  onOpenContact,
  brandName = 'FURNI.TURE',
  isStacked = false,
}: FooterSectionProps) {
  const { kicker, headingLine1, headingLine2, headingLine3, phone, phoneRaw, ctaText, bgImage } =
    SITE_DATA.footer;

  const footerRef = useRef<HTMLElement>(null);

  // useScroll hook for footer directional entrance and background parallax
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start 0.95', 'start 0.2'],
  });

  const bgParallax = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  // Kicker coming from left
  const kickerX = useTransform(scrollYProgress, [0.05, 0.25], [-40, 0]);
  const kickerOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);

  // Line 1: CREATING (from right)
  const line1X = useTransform(scrollYProgress, [0.1, 0.38], [55, 0]);
  const lineOpacity1 = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  // Line 2: A COZY (from left)
  const line2X = useTransform(scrollYProgress, [0.18, 0.46], [-55, 0]);
  const lineOpacity2 = useTransform(scrollYProgress, [0.18, 0.42], [0, 1]);

  // Line 3: INTERIOR (from right)
  const line3X = useTransform(scrollYProgress, [0.26, 0.54], [55, 0]);
  const lineOpacity3 = useTransform(scrollYProgress, [0.26, 0.5], [0, 1]);

  // Phone and CTA reveal
  const phoneX = useTransform(scrollYProgress, [0.32, 0.6], [40, 0]);
  const phoneOpacity = useTransform(scrollYProgress, [0.32, 0.55], [0, 1]);

  const ctaX = useTransform(scrollYProgress, [0.4, 0.68], [-35, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.4, 0.65], [0, 1]);

  return (
    <footer
      ref={footerRef}
      id="contacts"
      className="relative w-full min-h-screen flex flex-col justify-between bg-[#382D26] overflow-hidden text-white"
    >
      {/* Full-bleed Photo Background with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          style={{ y: bgParallax }}
          className="w-full h-full scale-110 will-change-transform"
        >
          <img
            src={bgImage}
            alt="White ceramic vase with dried pampas grass with soft diagonal shadows on warm mocha taupe wall"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        {/* Measured dark scrim for typography legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/75 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Main Content Area */}
      <div className={`relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between ${
        isStacked ? 'pt-8 md:pt-12 pb-6 md:pb-8' : 'pt-24 md:pt-32 pb-12 md:pb-16'
      }`}>
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Top-Left Small Text - Coming from left */}
          <motion.div
            style={{
              x: kickerX,
              opacity: kickerOpacity,
            }}
            className="md:col-span-4 will-change-[transform,opacity]"
          >
            <div className="text-[11px] md:text-xs font-[300] uppercase tracking-[0.25em] leading-relaxed text-white/90 whitespace-pre-line">
              {kicker}
            </div>
          </motion.div>

          {/* Right-Aligned Large White Heading with Alternating Left/Right Entrances (8 cols) */}
          <div className="md:col-span-8 flex flex-col items-start md:items-end text-left md:text-right overflow-hidden">
            <h2 className={`${
              isStacked
                ? 'text-[8.5vw] sm:text-[7vw] md:text-[54px] lg:text-[66px]'
                : 'text-[11vw] sm:text-[9vw] md:text-[80px] lg:text-[92px]'
            } leading-[0.92] font-[300] uppercase tracking-[-0.03em] select-none text-white drop-shadow-md`}>
              {/* Line 1: CREATING (from right) */}
              <span className="block overflow-hidden pb-1">
                <motion.span
                  style={{
                    x: line1X,
                    opacity: lineOpacity1,
                  }}
                  className="block will-change-[transform,opacity]"
                >
                  {headingLine1}
                </motion.span>
              </span>

              {/* Line 2: A COZY (from left) */}
              <span className="block overflow-hidden py-1">
                <motion.span
                  style={{
                    x: line2X,
                    opacity: lineOpacity2,
                  }}
                  className="block will-change-[transform,opacity]"
                >
                  {headingLine2}
                </motion.span>
              </span>

              {/* Line 3: INTERIOR (from right) */}
              <span className="block overflow-hidden pt-1">
                <motion.span
                  style={{
                    x: line3X,
                    opacity: lineOpacity3,
                  }}
                  className="block will-change-[transform,opacity]"
                >
                  {headingLine3}
                </motion.span>
              </span>
            </h2>

            {/* Large White Phone Number with Directional Reveal */}
            <motion.div
              style={{
                x: phoneX,
                opacity: phoneOpacity,
              }}
              className={`${isStacked ? 'mt-3 md:mt-5' : 'mt-8 md:mt-12'} will-change-[transform,opacity]`}
            >
              <a
                href={`tel:${phoneRaw}`}
                className={`${
                  isStacked
                    ? 'text-xl sm:text-2xl md:text-3xl lg:text-[34px]'
                    : 'text-2xl sm:text-3xl md:text-4xl lg:text-[44px]'
                } font-[300] tracking-wider text-white hover:text-[#D8BA72] transition-colors inline-block font-sans`}
                aria-label={`Call us at ${phone}`}
              >
                {phone}
              </a>
            </motion.div>

            {/* Gold Button: "CONTACT US ↗" */}
            <motion.div
              style={{
                x: ctaX,
                opacity: ctaOpacity,
              }}
              className={`${isStacked ? 'mt-3 md:mt-4' : 'mt-6 md:mt-8'} will-change-[transform,opacity]`}
            >
              <GoldButton
                text={ctaText}
                onClick={onOpenContact}
                ariaLabel="Open contact inquiry modal"
              />
            </motion.div>
          </div>
        </div>

        {/* Middle/Bottom Guarantee Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`${isStacked ? 'pt-6 md:pt-8 pb-3 md:pb-4' : 'pt-20 md:pt-32 pb-12'} max-w-md`}
        >
          <p className="text-[12px] md:text-[13px] font-[300] leading-relaxed text-white/80 tracking-wide">
            {SITE_DATA.brand.footerGuarantee}
          </p>
        </motion.div>

        {/* Bottom Bar: Logo, Nav Links, Developer Credit */}
        <div className={`${isStacked ? 'pt-4 md:pt-5' : 'pt-8'} border-t border-white/20 flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6 text-white/80`}>
          <div className="shrink-0">
            <Logo variant="white" size="sm" brandName={brandName} />
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-[10px] md:text-[11px] font-[300] uppercase tracking-[0.2em]">
            {SITE_DATA.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-white hover:underline underline-offset-4 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="text-[10px] font-[300] uppercase tracking-[0.15em] text-white/60 text-center lg:text-right">
            <span>{SITE_DATA.brand.copyrightNotice}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

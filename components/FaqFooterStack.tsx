'use client';

import React, { useRef } from 'react';
import FaqAccordion from './FaqAccordion';
import FooterSection from './FooterSection';
import { motion, useScroll, useTransform } from 'motion/react';
import { FAQItem } from '@/lib/data';

interface FaqFooterStackProps {
  onOpenConsultant?: (topic?: string) => void;
  onOpenContact: () => void;
  brandName?: string;
  items?: FAQItem[];
}

export default function FaqFooterStack({
  onOpenConsultant,
  onOpenContact,
  brandName = 'FURNI.TURE',
  items,
}: FaqFooterStackProps) {
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const faqTriggerRef = useRef<HTMLDivElement>(null);

  // useScroll linked precisely to the 100vh height of the FAQs section
  const { scrollYProgress } = useScroll({
    target: faqTriggerRef,
    offset: ['start start', 'end start'],
  });

  // 1. 3D depth scale: FAQs smoothly recedes from 1.0 to 0.92 as Footer stacks over it
  const faqScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // 2. Subtle upward drift to intensify multi-plane parallax depth
  const faqY = useTransform(scrollYProgress, [0, 1], ['0%', '-3%']);

  // 3. Luxurious corner rounding: FAQs card curves as it recedes into the background
  const faqRadius = useTransform(scrollYProgress, [0, 0.75], [0, 28]);

  // 4. Ambient darkening scrim: Focus glides naturally to the oncoming dark Footer card
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [0, 0.45, 0.65]);

  // 5. Subtle opacity fade for the receding FAQs card
  const faqOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.9, 0.75]);

  return (
    <div
      ref={stackContainerRef}
      className="relative w-full bg-[#1b1613]"
    >
      {/* 100vh invisible anchor trigger for exact scroll-progress calculation */}
      <div
        ref={faqTriggerRef}
        className="absolute top-0 left-0 w-full h-screen pointer-events-none"
        aria-hidden="true"
      />

      {/* Pinned / Sticky FAQs Container: Stays pinned while FooterSection scrolls over it */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
        <motion.div
          style={{
            scale: faqScale,
            y: faqY,
            borderRadius: faqRadius,
            opacity: faqOpacity,
          }}
          className="w-full h-full origin-top overflow-hidden will-change-transform shadow-2xl bg-white"
        >
          <FaqAccordion
            onOpenConsultant={onOpenConsultant}
            items={items}
            isStacked={true}
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

      {/* Footer Section: Physically slides up and stacks directly on top of FAQs */}
      <div
        className="relative z-20 bg-[#382D26] rounded-t-[32px] md:rounded-t-[48px] shadow-[0_-30px_90px_rgba(0,0,0,0.6)] border-t border-white/20 overflow-hidden"
      >
        <FooterSection
          onOpenContact={onOpenContact}
          brandName={brandName}
          isStacked={true}
        />
      </div>
    </div>
  );
}

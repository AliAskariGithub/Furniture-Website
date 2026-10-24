'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { SITE_DATA, TestimonialItem } from '@/lib/data';

interface TestimonialCarouselProps {
  testimonials?: TestimonialItem[];
  onOpenConsultant?: () => void;
  brandName?: string;
}

export default function TestimonialCarousel({
  testimonials = SITE_DATA.testimonials,
  brandName = 'FURNI.TURE',
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const total = testimonials.length;
  const current = testimonials[currentIndex];

  // Scroll animations for signature 2-line heading
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.95', 'start 0.2'],
  });

  const heading1X = useTransform(scrollYProgress, [0.08, 0.35], [-70, 0]);
  const heading1Opacity = useTransform(scrollYProgress, [0.08, 0.3], [0, 1]);

  const heading2X = useTransform(scrollYProgress, [0.15, 0.45], [70, 0]);
  const heading2Opacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleSelect = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
  };

  // Auto-advance every 7 seconds when not paused
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, total, handleNext]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 30 },
        opacity: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full bg-white py-24 md:py-36 px-6 md:px-12 border-t border-[#C9C9C9]/30 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Client Testimonials Carousel"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Heading: "CLIENT" from Left, "REVIEWS" from Right */}
        <div className="mb-16 md:mb-24 overflow-hidden">
          <h2 className="text-[14vw] sm:text-[12vw] md:text-[96px] lg:text-[110px] leading-[0.9] font-[300] uppercase tracking-[-0.03em] select-none">
            <span className="block overflow-hidden pb-1">
              <motion.span
                style={{
                  x: heading1X,
                  opacity: heading1Opacity,
                }}
                className="block text-[#000000] will-change-[transform,opacity]"
              >
                CLIENT
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
                REVIEWS
              </motion.span>
            </span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative border-t border-b border-[#C9C9C9]/40 py-12 md:py-16">
          {/* Top Controls: Counter & Nav Buttons */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#C9C9C9]/20">
            <div className="flex items-center gap-3 font-mono text-xs tracking-wider">
              <span className="text-[#4E3630] font-medium text-sm">
                0{currentIndex + 1}
              </span>
              <span className="text-neutral-300">/</span>
              <span className="text-neutral-400">0{total}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-10 h-10 border border-[#C9C9C9] hover:border-[#4E3630] hover:bg-[#4E3630] hover:text-white text-neutral-700 flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-10 h-10 border border-[#C9C9C9] hover:border-[#4E3630] hover:bg-[#4E3630] hover:text-white text-neutral-700 flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Testimonial Active Slide */}
          <div className="min-h-[260px] md:min-h-[220px] flex items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#D8BA72] text-[#D8BA72]"
                    />
                  ))}
                </div>

                {/* Main Quote */}
                <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-[300] tracking-tight leading-relaxed text-[#000000] mb-8 max-w-5xl">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                {/* Author & Project Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#C9C9C9]/20">
                  <div>
                    <div className="text-sm font-medium uppercase tracking-wider text-[#000000]">
                      {current.author}
                    </div>
                    <div className="text-xs font-[300] text-neutral-500 mt-0.5">
                      {current.role} &bull; {current.project}
                    </div>
                  </div>

                  <div className="text-xs font-mono uppercase tracking-wider text-[#D8BA72]">
                    {current.location}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Dashes */}
          <div className="mt-8 pt-6 border-t border-[#C9C9C9]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {testimonials.map((t, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    aria-label={`Go to testimonial ${idx + 1} from ${t.author}`}
                    className={`h-1.5 transition-all duration-300 ${
                      isActive
                        ? 'w-10 bg-[#4E3630]'
                        : 'w-4 bg-neutral-300 hover:bg-neutral-400'
                    }`}
                  />
                );
              })}
            </div>

            <div className="text-[11px] font-mono text-neutral-400 tracking-wider">
              {brandName} VERIFIED COMMISSIONS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

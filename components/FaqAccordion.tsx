'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from 'motion/react';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { SITE_DATA, FAQItem } from '@/lib/data';

interface FaqAccordionProps {
  onOpenConsultant?: (topic?: string) => void;
  items?: FAQItem[];
  isStacked?: boolean;
  scrollProgress?: MotionValue<number>;
}

export default function FaqAccordion({
  onOpenConsultant,
  items,
  isStacked = false,
  scrollProgress,
}: FaqAccordionProps) {
  const faqList = items || SITE_DATA.about.faqs;
  const [openIds, setOpenIds] = useState<string[]>([faqList[0]?.id || 'faq-turnkey']);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax float for content when stacked (disabled to prevent top boundary clipping)
  const contentY = undefined;

  // Scroll animations for signature 2-line heading
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.95', 'start 0.2'],
  });

  const heading1X = useTransform(scrollYProgress, [0.08, 0.35], [-70, 0]);
  const heading1Opacity = useTransform(scrollYProgress, [0.08, 0.3], [0, 1]);

  const heading2X = useTransform(scrollYProgress, [0.15, 0.45], [70, 0]);
  const heading2Opacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? [] : [id]
    );
  };

  return (
    <section
      ref={sectionRef}
      id="faqs"
      className={`relative w-full h-full bg-white px-6 md:px-12 flex flex-col overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
        isStacked
          ? 'justify-start pb-8 border-t-0'
          : 'justify-center py-24 md:py-36 border-t border-[#C9C9C9]/30'
      }`}
    >
      {/* Top spacer to guarantee clear clearance below the fixed sticky header */}
      {isStacked && (
        <div className="h-20 md:h-24 shrink-0 pointer-events-none" aria-hidden="true" />
      )}

      <motion.div
        style={contentY ? { y: contentY } : undefined}
        className="max-w-[1440px] mx-auto w-full will-change-transform pt-2 md:pt-4"
      >
        {/* Section Heading: "FREQUENT" from Left, "QUESTIONS" from Right */}
        <div className={isStacked ? 'mb-4 md:mb-6' : 'mb-16 md:mb-24'}>
          <h2 className={`${
            isStacked
              ? 'text-[10vw] sm:text-[8vw] md:text-[56px] lg:text-[66px]'
              : 'text-[14vw] sm:text-[12vw] md:text-[96px] lg:text-[110px]'
          } leading-[1.05] font-[300] uppercase tracking-[-0.03em] select-none`}>
            <span className="block pt-1 pb-0.5">
              <motion.span
                style={{
                  x: heading1X,
                  opacity: heading1Opacity,
                }}
                className="block text-[#000000] will-change-[transform,opacity]"
              >
                FREQUENT
              </motion.span>
            </span>

            <span className="block pt-1 pb-0.5">
              <motion.span
                style={{
                  x: heading2X,
                  opacity: heading2Opacity,
                }}
                className={`block text-[#4E3630] ${
                  isStacked
                    ? 'ml-[10vw] sm:ml-[16vw] md:ml-[180px]'
                    : 'ml-[12vw] sm:ml-[20vw] md:ml-[340px]'
                } will-change-[transform,opacity]`}
              >
                QUESTIONS
              </motion.span>
            </span>
          </h2>
        </div>

        {/* Clean Accordion Items List without Search/Filter or Expand All */}
        <div className="divide-y divide-[#C9C9C9]/40 border-t border-b border-[#C9C9C9]/40">
          {faqList.map((faq, index) => {
            const isOpen = openIds.includes(faq.id);
            const contentId = `faq-content-${faq.id}`;
            const headerId = `faq-header-${faq.id}`;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group transition-colors duration-200 hover:bg-neutral-50/50"
              >
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleItem(faq.id)}
                  className={`w-full flex items-start sm:items-center justify-between text-left gap-6 cursor-pointer focus:outline-none focus-visible:bg-neutral-50 ${
                    isStacked ? 'py-3 sm:py-3.5' : 'py-7'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-8 flex-1">
                    <span className="font-mono text-xs sm:text-sm text-[#D8BA72] font-normal pt-0.5 sm:pt-0 shrink-0">
                      {faq.number}
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 flex-1">
                      <h3
                        className={`text-sm sm:text-base md:text-lg font-[300] uppercase tracking-wide transition-colors ${
                          isOpen ? 'text-[#4E3630] font-normal' : 'text-[#000000] group-hover:text-[#4E3630]'
                        }`}
                      >
                        {faq.question}
                      </h3>
                      {faq.category && (
                        <span className="inline-block self-start sm:self-center text-[9px] uppercase tracking-widest text-neutral-400 font-mono px-2 py-0.5 border border-neutral-200">
                          {faq.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? 'border-[#4E3630] bg-[#4E3630] text-white rotate-180'
                        : 'border-neutral-200 text-neutral-500 group-hover:border-[#4E3630] group-hover:text-[#4E3630]'
                    }`}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={headerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className={`${isStacked ? 'pb-4 pt-1' : 'pb-8 pt-1'} pl-8 sm:pl-16 pr-6 md:pr-24 max-w-4xl`}>
                        <p className="text-sm font-[300] leading-relaxed text-neutral-700 text-justify">
                          {faq.answer}
                        </p>
                        <div className={`${isStacked ? 'mt-2 pt-2' : 'mt-4 pt-3'} flex items-center gap-4`}>
                          <button
                            type="button"
                            onClick={() => onOpenConsultant?.(`Regarding FAQ: ${faq.question}`)}
                            className="text-[10px] uppercase tracking-widest text-[#4E3630] hover:text-[#D8BA72] font-medium flex items-center gap-1 transition-colors"
                          >
                            <span>ASK ARCHITECT ABOUT THIS</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

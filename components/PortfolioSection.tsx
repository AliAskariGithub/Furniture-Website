'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { SITE_DATA, PortfolioProject } from '@/lib/data';
import PortfolioLightboxModal from '@/components/PortfolioLightboxModal';
import { motion, useScroll, useTransform } from 'motion/react';

interface PortfolioSectionProps {
  onOpenProjectDetail?: (project: PortfolioProject) => void;
  onOpenConsultant?: (topic?: string) => void;
}

function PortfolioProjectItem({
  project,
  onSelectImage,
}: {
  project: PortfolioProject;
  onSelectImage: (project: PortfolioProject, index: number) => void;
}) {
  const projectRef = useRef<HTMLDivElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);
  const isReversed = project.layoutReversed ?? false;

  // useScroll hook for directional reveal of project info
  const { scrollYProgress: projectProgress } = useScroll({
    target: projectRef,
    offset: ['start 0.92', 'start 0.35'],
  });

  const leftColX = useTransform(projectProgress, [0.08, 0.45], [-50, 0]);
  const leftColOpacity = useTransform(projectProgress, [0.08, 0.4], [0, 1]);

  const rightColX = useTransform(projectProgress, [0.08, 0.45], [50, 0]);
  const rightColOpacity = useTransform(projectProgress, [0.08, 0.4], [0, 1]);

  const numOpacity = useTransform(projectProgress, [0.05, 0.4], [0, 1]);
  const numScale = useTransform(projectProgress, [0.05, 0.4], [0.85, 1]);

  // useScroll hook for smooth image parallax inside the mosaic collage
  const { scrollYProgress: mosaicProgress } = useScroll({
    target: mosaicRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY0 = useTransform(mosaicProgress, [0, 1], [-35, 35]);
  const parallaxY1 = useTransform(mosaicProgress, [0, 1], [-20, 20]);
  const parallaxY2 = useTransform(mosaicProgress, [0, 1], [-45, 45]);
  const parallaxY3 = useTransform(mosaicProgress, [0, 1], [-25, 25]);
  const parallaxY4 = useTransform(mosaicProgress, [0, 1], [-38, 38]);

  const parallaxArray = [parallaxY0, parallaxY1, parallaxY2, parallaxY3, parallaxY4];

  return (
    <div ref={projectRef} className="relative flex flex-col gap-12">
      {/* Outlined Number Floating in Background */}
      <motion.div
        style={{
          opacity: numOpacity,
          scale: numScale,
        }}
        className="absolute top-[-30px] md:top-[-48px] right-2 md:right-8 text-5xl md:text-7xl font-[300] text-stroke-outline select-none font-sans z-0 will-change-[transform,opacity]"
        aria-hidden="true"
      >
        {project.number}
      </motion.div>

      {/* Project Header Info Row with Left/Right Directional Entrance */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Title & Paragraph (coming from left) */}
        <motion.div
          style={{
            x: leftColX,
            opacity: leftColOpacity,
          }}
          className="lg:col-span-7 flex flex-col will-change-[transform,opacity]"
        >
          <div className="flex items-center gap-2 mb-5">
            <h3 className="text-2xl md:text-[28px] font-[300] tracking-wider uppercase text-[#000000]">
              {project.title}
            </h3>
            <span className="text-[#000000] font-[300] text-2xl" aria-hidden="true">
              —
            </span>
          </div>

          <p className="text-[12.5px] md:text-[13px] leading-[1.6] text-[#000000] text-justify font-[300] tracking-normal max-w-2xl">
            {project.description}
          </p>
        </motion.div>

        {/* Right Column: Location & Terms (coming from right) */}
        <motion.div
          style={{
            x: rightColX,
            opacity: rightColOpacity,
          }}
          className="lg:col-span-5 flex flex-col justify-end lg:items-end gap-3 text-left lg:text-right pt-2 lg:pt-0 will-change-[transform,opacity]"
        >
          {/* Location */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9C9C9] font-[300]">
              LOCATION:
            </span>
            <span className="text-sm font-[300] uppercase tracking-wider text-[#000000] mt-0.5">
              {project.location}
            </span>
          </div>

          {/* Terms / Timeline */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9C9C9] font-[300]">
              TERMS:
            </span>
            <span className="text-sm font-[300] uppercase tracking-wider text-[#000000] mt-0.5">
              {project.terms}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Asymmetric Image Collage with 1px Offset Hairline Frames and Scroll Parallax */}
      <div
        ref={mosaicRef}
        className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-7 items-start"
      >
        {project.images.map((img, idx) => {
          let spanClass = 'md:col-span-4 h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px] xl:h-[360px]';
          if (idx === 0) {
            spanClass = isReversed
              ? 'md:col-span-5 h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] xl:h-[500px]'
              : 'md:col-span-7 h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] xl:h-[500px]';
          } else if (idx === 1) {
            spanClass = isReversed
              ? 'md:col-span-7 h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] xl:h-[500px]'
              : 'md:col-span-5 h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] xl:h-[500px]';
          } else {
            // Row 2: All 3 images share identical height and equal 4-column span for aligned baseline
            spanClass = 'md:col-span-4 h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px] xl:h-[360px]';
          }

          const yTransform = parallaxArray[idx % parallaxArray.length];

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative group cursor-pointer ${spanClass}`}
              onClick={() => onSelectImage(project, idx)}
            >
              {/* Image Frame Offset (1px hairline behind) */}
              <div
                className="absolute inset-0 border border-[#C9C9C9] translate-x-2 translate-y-2 pointer-events-none transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3 z-0"
                aria-hidden="true"
              />

              {/* Main Photo Container with Parallax and Scale */}
              <div className="relative w-full h-full overflow-hidden border border-[#C9C9C9]/50 z-10 bg-neutral-100">
                <motion.div
                  style={{ y: yTransform }}
                  className="w-full h-full scale-[1.18] will-change-transform"
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </motion.div>

                {/* Hover overlay with button */}
                <div
                  className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-20 pointer-events-none"
                  aria-hidden="true"
                >
                  <span className="relative overflow-hidden px-4 py-2 border border-white text-white text-[10px] uppercase tracking-[0.2em] font-[300] bg-black/40 backdrop-blur-xs transition-colors duration-300">
                    VIEW IN HD
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function PortfolioSection({ onOpenProjectDetail, onOpenConsultant }: PortfolioSectionProps) {
  const { headingPart1, headingPart2, projects } = SITE_DATA.portfolio;
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Section-level useScroll hook for directional reveal of "OUR" / "PORTFOLIO"
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.95', 'start 0.2'],
  });

  const heading1X = useTransform(scrollYProgress, [0.08, 0.35], [-70, 0]);
  const heading1Opacity = useTransform(scrollYProgress, [0.08, 0.3], [0, 1]);

  const heading2X = useTransform(scrollYProgress, [0.15, 0.45], [70, 0]);
  const heading2Opacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative w-full bg-white py-24 md:py-36 px-6 md:px-12 border-t border-[#C9C9C9]/30 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Heading: "OUR" from Left, "PORTFOLIO" from Right */}
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

        {/* Projects List with Image Parallax and Item-Level useScroll */}
        <div className="flex flex-col gap-36 md:gap-48">
          {projects.map((project) => (
            <PortfolioProjectItem
              key={project.id}
              project={project}
              onSelectImage={(proj, idx) => {
                setActiveProject(proj);
                setActiveImageIndex(idx);
                setIsLightboxOpen(true);
              }}
            />
          ))}
        </div>

        {/* Link to Dedicated Portfolio Page */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-28 md:mt-36 pt-10 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <p className="text-xs text-neutral-600 font-[300] tracking-wide">
            EXPLORE RESIDENTIAL, WELLNESS, AND COMMERCIAL ARCHITECTURE
          </p>
          <Link
            href="/portfolio"
            className="text-xs font-[300] uppercase tracking-[0.25em] text-[#000000] hover:text-[#D8BA72] underline underline-offset-8 transition-colors"
          >
            VIEW ALL PORTFOLIO PROJECTS & CASE STUDIES ↗
          </Link>
        </motion.div>
      </div>

      {/* High-Resolution Gallery Lightbox Modal with Next/Previous Navigation */}
      <PortfolioLightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        project={activeProject}
        initialIndex={activeImageIndex}
        onOpenConsultant={onOpenConsultant}
      />
    </section>
  );
}

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { PortfolioProject } from '@/lib/data';
import { getNextIndex, getPrevIndex, getHighResImageUrl } from '@/lib/lightbox';

interface PortfolioLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: PortfolioProject | null;
  initialIndex?: number;
  onOpenConsultant?: (topic?: string) => void;
}

export default function PortfolioLightboxModal({
  isOpen,
  onClose,
  project,
  initialIndex = 0,
  onOpenConsultant,
}: PortfolioLightboxModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [prevInitialIndex, setPrevInitialIndex] = useState(initialIndex);

  // Sync index when initialIndex changes without cascading effect renders
  if (initialIndex !== prevInitialIndex) {
    setPrevInitialIndex(initialIndex);
    setCurrentIndex(initialIndex);
    setDirection(0);
    setIsZoomed(false);
    setImageLoaded(false);
  }

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const images = project?.images || [];
  const total = images.length;
  const currentImage = images[currentIndex];

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setDirection(1);
    setImageLoaded(false);
    setCurrentIndex((prev) => getNextIndex(prev, total));
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setDirection(-1);
    setImageLoaded(false);
    setCurrentIndex((prev) => getPrevIndex(prev, total));
  }, [total]);

  const handleSelectThumbnail = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setImageLoaded(false);
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !project || total === 0) return null;

  const highResUrl = getHighResImageUrl(currentImage?.url || '');

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : dir < 0 ? -60 : 0,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 32 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 32 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} High Resolution Gallery`}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0e0e0e]/95 backdrop-blur-md text-white select-none animate-in fade-in duration-200"
    >
      {/* Top Header Bar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 border-b border-white/10 bg-black/40">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-[#D8BA72]">
              {project.number}
            </span>
            <span className="w-px h-3.5 bg-white/20 hidden sm:block" />
            <h2 className="text-sm md:text-base font-[300] uppercase tracking-wider text-white">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-mono text-white/60 tracking-wider">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#D8BA72]" />
              {project.location}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#D8BA72]" />
              {project.terms}
            </span>
            {project.area && (
              <>
                <span>&bull;</span>
                <span className="px-1.5 py-0.5 border border-white/20 text-white/80">
                  {project.area}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right Tools: HD Tag, Counter & Close */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 border border-[#D8BA72]/40 bg-[#D8BA72]/10 text-[#D8BA72] text-[10px] font-mono uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            <span>HD RESOLUTION</span>
          </div>

          <div className="font-mono text-xs text-white/70 tracking-wider">
            <span className="text-white font-medium">
              0{currentIndex + 1}
            </span>
            <span className="mx-1.5 text-white/30">/</span>
            <span>0{total}</span>
          </div>

          <button
            type="button"
            onClick={() => setIsZoomed((prev) => !prev)}
            aria-label={isZoomed ? 'Fit to screen' : 'Zoom image'}
            className="hidden md:flex p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title={isZoomed ? 'Fit to screen' : 'Toggle zoom'}
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close high-resolution gallery"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-white/20 hover:border-white hover:bg-white hover:text-black text-xs uppercase tracking-widest font-[300] transition-all"
          >
            <span>CLOSE</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main High-Res Image Display Area */}
      <div className="relative flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden">
        {/* Previous Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-4 md:left-8 z-20 w-12 h-12 md:w-14 md:h-14 border border-white/20 bg-black/50 hover:bg-[#4E3630] hover:border-[#D8BA72] hover:text-[#D8BA72] text-white flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-xs group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Center Image Container */}
        <div
          className={`relative max-w-full max-h-full flex items-center justify-center ${
            isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed((prev) => !prev)}
        >
          {/* Subtle Loading Spinner while image renders in high resolution */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/20 border-t-[#D8BA72] animate-spin" />
            </div>
          )}

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentImage?.url}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex items-center justify-center"
            >
              <img
                src={highResUrl}
                alt={currentImage?.alt || project.title}
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
                className={`transition-all duration-300 border border-white/10 shadow-2xl ${
                  isZoomed
                    ? 'max-h-[90vh] max-w-[95vw] object-cover scale-110'
                    : 'max-h-[66vh] md:max-h-[72vh] w-auto max-w-[90vw] object-contain'
                }`}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-4 md:right-8 z-20 w-12 h-12 md:w-14 md:h-14 border border-white/20 bg-black/50 hover:bg-[#4E3630] hover:border-[#D8BA72] hover:text-[#D8BA72] text-white flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-xs group"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* Bottom Information & Thumbnail Strip */}
      <footer className="relative z-10 px-6 py-4 md:px-12 md:py-5 border-t border-white/10 bg-black/60 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Caption and Project Context */}
        <div className="max-w-xl text-center md:text-left">
          <p className="text-xs md:text-sm font-[300] text-white/90 tracking-wide line-clamp-1">
            {currentImage?.alt}
          </p>
          <div className="flex items-center justify-center md:justify-start gap-3 mt-1">
            <span className="text-[10px] font-mono text-[#D8BA72] uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-white/30 text-[10px]">&bull;</span>
            <span className="text-[10px] font-mono text-white/50 tracking-wider">
              IMAGE {currentIndex + 1} OF {total}
            </span>
          </div>
        </div>

        {/* Thumbnails Strip */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
          {images.map((img, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectThumbnail(idx);
                }}
                aria-label={`View image ${idx + 1}`}
                className={`relative w-12 h-9 md:w-16 md:h-11 shrink-0 overflow-hidden border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-[#D8BA72] ring-1 ring-[#D8BA72] scale-105'
                    : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/60'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>

        {/* Consultation Call to Action */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenConsultant?.(`${project.title} Architectural Style`);
            }}
            className="px-4 py-2 bg-[#D8BA72] text-black text-[11px] uppercase tracking-widest font-medium hover:bg-white transition-all flex items-center gap-1.5 btn-chamfer"
          >
            <span>DISCUSS THIS PROJECT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </div>
  );
}

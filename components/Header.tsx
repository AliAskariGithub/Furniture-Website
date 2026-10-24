'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { SITE_DATA } from '@/lib/data';
import { Phone, Menu, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { motion } from 'motion/react';

interface HeaderProps {
  onOpenConsultant?: () => void;
  brandName?: string;
  forceDarkNav?: boolean;
}

export default function Header({
  onOpenConsultant,
  brandName = 'FURNI.TURE',
  forceDarkNav = false,
}: HeaderProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { openConsultantModal } = useApp();

  const isForcedDark = forceDarkNav || !isHomePage;
  const [isScrolledOverWhite, setIsScrolledOverWhite] = useState(false);
  const [isOverFooter, setIsOverFooter] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isOverWhite = isForcedDark || isScrolledOverWhite;

  const handleOpenConsultant = () => {
    if (onOpenConsultant) {
      onOpenConsultant();
    } else {
      openConsultantModal();
    }
  };

  useEffect(() => {
    const footerEl = document.getElementById('contacts');

    let observer: IntersectionObserver | null = null;
    if (footerEl) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setIsOverFooter(entry.isIntersecting);
        },
        { threshold: 0.02, rootMargin: '0px 0px 0px 0px' }
      );
      observer.observe(footerEl);
    }

    const handleScroll = () => {
      if (forceDarkNav || !isHomePage) {
        return;
      }

      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      if (scrollY > heroHeight - 90) {
        setIsScrolledOverWhite(true);
      } else {
        setIsScrolledOverWhite(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observer) observer.disconnect();
    };
  }, [isHomePage, forceDarkNav]);

  const textColorClass = isOverWhite ? 'text-[#000000]' : 'text-white';
  const headerBgClass = isOverWhite
    ? 'bg-white/95 backdrop-blur-md border-b border-[#C9C9C9]/40 shadow-sm'
    : 'bg-transparent';
  const logoVariant = isOverWhite ? 'dark' : 'white';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
        isOverFooter
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100'
      } ${headerBgClass}`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 md:h-24 flex items-center justify-between gap-6">
        {/* Zone 1: Logo & Brand Name */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <Link
            href="/"
            className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8BA72] rounded-sm"
            aria-label="FURNI.TURE Homepage"
          >
            <Logo variant={logoVariant} size="md" brandName={brandName} />
          </Link>
        </motion.div>

        {/* Zone 2: Nav Links (Desktop) */}
        <nav
          className="hidden lg:flex items-center gap-8 xl:gap-11"
          aria-label="Main Navigation"
        >
          {SITE_DATA.navigation.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={item.href}
                  className={`group relative text-[11px] font-[300] uppercase tracking-[0.25em] transition-colors duration-300 ${textColorClass} hover:opacity-80 shrink-0 whitespace-nowrap`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-[-4px] left-0 h-[1px] ${
                      isActive ? 'w-full' : 'w-0'
                    } ${
                      isOverWhite ? 'bg-[#000000]' : 'bg-white'
                    } transition-all duration-300 ease-out group-hover:w-full`}
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Zone 3: Direct Phone Link, Book Button & Mobile Menu Toggle */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-5 xl:gap-7 shrink-0"
        >
          {/* Phone */}
          <a
            href={`tel:${SITE_DATA.brand.phoneRaw}`}
            className={`hidden sm:flex items-center gap-2 text-xs md:text-sm font-[300] tracking-wider transition-colors duration-300 ${textColorClass} hover:text-[#D8BA72] shrink-0 whitespace-nowrap`}
            aria-label={`Call ${SITE_DATA.brand.phone}`}
          >
            <Phone className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
            <span>{SITE_DATA.brand.phone}</span>
          </a>

          {/* Quick Book CTA in Header */}
          <button
            type="button"
            onClick={handleOpenConsultant}
            className="hidden md:inline-flex px-4 py-2.5 bg-[#D8BA72] text-white text-[10px] uppercase font-[300] tracking-[0.18em] btn-chamfer hover:bg-[#c4a45a] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            BOOK A CONSULTANT ↗
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors duration-300 ${textColorClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8BA72]`}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bg-white/98 backdrop-blur-xl border-b border-[#C9C9C9]/40 shadow-xl px-8 py-8 flex flex-col gap-6 text-black animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-4">
            {SITE_DATA.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xs font-[300] uppercase tracking-[0.25em] transition-colors py-2 border-b border-neutral-100 flex items-center justify-between ${
                    isActive ? 'text-[#D8BA72] font-normal' : 'text-[#000000] hover:text-[#D8BA72]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-[10px] text-[#D8BA72]">●</span>}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href={`tel:${SITE_DATA.brand.phoneRaw}`}
              className="flex items-center gap-3 text-xs font-light text-[#4E3630]"
            >
              <Phone className="w-4 h-4 text-[#D8BA72]" />
              <span>{SITE_DATA.brand.phone}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenConsultant();
              }}
              className="w-full bg-[#D8BA72] text-white text-xs uppercase tracking-wider py-3.5 text-center font-[300] btn-chamfer hover:bg-[#c4a45a] transition-colors"
            >
              BOOK A CONSULTANT ↗
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

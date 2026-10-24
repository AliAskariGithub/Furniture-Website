'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';
import ContactModal from '@/components/ContactModal';
import DoubleFrame from '@/components/DoubleFrame';
import GoldButton from '@/components/GoldButton';
import AnimatedCounter from '@/components/AnimatedCounter';
import FaqAccordion from '@/components/FaqAccordion';
import { SITE_DATA } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import { motion } from 'motion/react';

export default function AboutPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { openConsultantModal } = useApp();

  return (
    <main className="relative min-h-screen bg-white text-black font-sans selection:bg-[#D8BA72] selection:text-white">
      <Header forceDarkNav={true} onOpenConsultant={() => openConsultantModal()} />

      {/* Page Hero with Left/Right Entrance */}
      <section className="pt-36 md:pt-44 pb-16 md:pb-24 px-6 md:px-12 max-w-[1440px] mx-auto border-b border-[#C9C9C9]/30 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] font-[300] uppercase tracking-[0.25em] text-[#D8BA72] mb-3"
            >
              ABOUT THE STUDIO &amp; MANIFESTO
            </motion.div>
            <h1 className="text-[14vw] sm:text-[11vw] md:text-[96px] lg:text-[110px] leading-[0.9] font-[300] uppercase tracking-[-0.03em] select-none">
              <motion.span
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[#000000]"
              >
                ABOUT
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[#4E3630] ml-[8vw] sm:ml-[16vw] md:ml-[240px]"
              >
                COMPANY
              </motion.span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md pb-2"
          >
            <p className="text-xs md:text-sm font-[300] leading-relaxed text-neutral-700 text-justify">
              FURNI.TURE® was established with a singular devotion: creating minimalist, warm Scandinavian spaces where form quietly elevates everyday life. We believe architecture should be calm, grounded, and enduring.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy & Hero Narrative: Left Image, Right Text */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-[1440px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image coming from left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <DoubleFrame
              src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=85"
              alt="Scandinavian minimalist interior reading nook with natural light and linen cushions"
              aspectRatio="aspect-[4/5]"
              offsetPosition="top-left"
            />
          </motion.div>

          {/* Narrative coming from right */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center lg:pl-8"
          >
            <div className="text-[10px] uppercase tracking-[0.25em] font-medium text-[#D8BA72] mb-3">
              OUR CORE PHILOSOPHY
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[300] uppercase tracking-wider text-[#000000] mb-6 leading-snug">
              &ldquo;CREATING INTERIORS THAT INSPIRE BY HONEST PROPORTIONS &amp; NATURAL LIGHT&rdquo;
            </h2>
            <p className="text-sm font-[300] leading-relaxed text-neutral-700 text-justify mb-6">
              {SITE_DATA.about.philosophy}
            </p>
            <p className="text-sm font-[300] leading-relaxed text-neutral-700 text-justify mb-8">
              Every curve, recessed fixture, and surface transition is measured to eliminate visual fatigue. By pairing restrained Nordic aesthetics with artisanal craftsmanship, we transform cold urban rooms into sanctuary environments.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-200">
              {SITE_DATA.about.values.map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <h3 className="text-xs font-[300] uppercase tracking-wider text-[#4E3630] mb-2">
                    {val.title}
                  </h3>
                  <p className="text-[11px] font-[300] leading-relaxed text-neutral-600">
                    {val.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* The 3 Monumental Stats with Staggered Entrance */}
      <section className="bg-neutral-50 py-24 md:py-32 px-6 md:px-12 border-t border-b border-[#C9C9C9]/40 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-lg mx-auto mb-20"
          >
            <div className="text-[11px] font-[300] uppercase tracking-[0.25em] text-[#D8BA72] mb-2">
              PROVEN TRACK RECORD
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[300] uppercase tracking-tight text-[#000000]">
              OUR REPUTATION IN NUMBERS
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {SITE_DATA.about.stats.map((stat, idx) => {
              const numericTarget = parseInt(stat.number.replace(/\D/g, ''), 10) || 50;
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-white border border-[#C9C9C9] p-8 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                >
                  <div>
                    <div className="text-5xl sm:text-6xl font-[400] text-[#000000] mb-4 font-sans">
                      <AnimatedCounter target={numericTarget} suffix="+" duration={1800} />
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-base font-[300] uppercase tracking-wider text-[#4E3630]">
                        {stat.title}
                      </h3>
                      <span className="text-[#4E3630]">—</span>
                    </div>
                    <p className="text-xs font-[300] leading-relaxed text-neutral-600 text-justify mb-6">
                      {stat.description}
                    </p>
                  </div>
                  <div className="aspect-[16/10] overflow-hidden mt-4 bg-neutral-200">
                    <img
                      src={stat.image}
                      alt={stat.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Architectural Leadership Team with Directional Entrance */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-[1440px] mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[11px] font-[300] uppercase tracking-[0.25em] text-[#D8BA72] mb-2">
              PEOPLE &amp; MINDS
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[300] uppercase tracking-tight text-[#000000]">
              ARCHITECTURAL LEADERSHIP
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs font-[300] text-neutral-600 max-w-sm"
          >
            Meet the architects and master joiners driving FURNI.TURE&apos;s Scandinavian design philosophy across residential and wellness spaces.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SITE_DATA.about.team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border border-[#C9C9C9] p-6 bg-white flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                <div className="aspect-[4/5] overflow-hidden mb-6 bg-neutral-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-xl font-[300] uppercase tracking-wide text-[#000000] mb-1">
                  {member.name}
                </h3>
                <div className="text-xs font-[300] uppercase tracking-wider text-[#D8BA72] mb-4">
                  {member.role}
                </div>
                <p className="text-xs font-[300] leading-relaxed text-neutral-600 text-justify">
                  {member.bio}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400">PARTNER ARCHITECT</span>
                <button
                  type="button"
                  onClick={() => openConsultantModal(`Advisory with ${member.name}`)}
                  className="text-[10px] uppercase tracking-wider text-[#4E3630] hover:text-[#D8BA72] font-[300] underline"
                >
                  SCHEDULE ADVISORY ↗
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions Accordion Section */}
      <FaqAccordion onOpenConsultant={(topic) => openConsultantModal(topic)} />

      {/* Call to Action Banner: Text from Left, Buttons from Right */}
      <section className="bg-[#4E3630] text-white py-20 px-6 md:px-12 overflow-hidden">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[10px] font-[300] uppercase tracking-[0.25em] text-[#D8BA72] mb-2">
              START YOUR JOURNEY
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-[300] uppercase tracking-wide">
              HAVE A SPACE READY TO BE TRANSFORMED?
            </h2>
            <p className="text-xs font-[300] text-neutral-300 mt-2 max-w-xl">
              Connect directly with our architects for a comprehensive initial review of your property.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <GoldButton
              text="BOOK A CONSULTANT ↗"
              onClick={() => openConsultantModal()}
              ariaLabel="Book a consultant with FURNI.TURE"
            />
            <a
              href={`tel:${SITE_DATA.brand.phoneRaw}`}
              className="text-xs uppercase tracking-wider text-white border border-white/40 px-6 py-3.5 hover:bg-white hover:text-black transition-colors"
            >
              Direct: {SITE_DATA.brand.phone}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection
        onOpenContact={() => setIsContactOpen(true)}
        brandName="FURNI.TURE"
      />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}

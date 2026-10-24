'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';
import ContactModal from '@/components/ContactModal';
import DoubleFrame from '@/components/DoubleFrame';
import GoldButton from '@/components/GoldButton';
import { SITE_DATA } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import { Check, Compass, Layers, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function ServicesPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { openConsultantModal } = useApp();

  return (
    <main className="relative min-h-screen bg-white text-black font-sans selection:bg-[#D8BA72] selection:text-white">
      {/* Header with dark navigation forced */}
      <Header forceDarkNav={true} onOpenConsultant={() => openConsultantModal()} />

      {/* Page Hero Header with Left/Right Entrance */}
      <section className="pt-36 md:pt-44 pb-16 md:pb-24 px-6 md:px-12 max-w-[1440px] mx-auto border-b border-[#C9C9C9]/30 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] font-[300] uppercase tracking-[0.25em] text-[#D8BA72] mb-3"
            >
              ARCHITECTURAL &amp; INTERIOR DISCIPLINE
            </motion.div>

            <h1 className="text-[14vw] sm:text-[11vw] md:text-[96px] lg:text-[110px] leading-[0.9] font-[300] uppercase tracking-[-0.03em] select-none">
              <motion.span
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[#000000]"
              >
                OUR
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[#4E3630] ml-[8vw] sm:ml-[16vw] md:ml-[240px]"
              >
                SERVICES
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
              We execute architectural concepts for residential homes, penthouses, bespoke wellness saunas, and boutique hospitality. Every project balances Scandinavian warmth, daylight orchestration, and timeless tactile materials.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Services In-Depth List with Alternating Left/Right Entrances */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-[1440px] mx-auto space-y-28 md:space-y-40 overflow-hidden">
        {SITE_DATA.services.items.map((service, index) => {
          const isReversed = index % 2 === 1;
          return (
            <div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                isReversed ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Text Side - slides in from Left (or Right if reversed) */}
              <motion.div
                initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className={`lg:col-span-6 ${
                  isReversed ? 'lg:col-start-7 lg:order-2' : 'lg:col-start-1 lg:order-1'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono font-medium text-[#D8BA72]">[{service.number}]</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                    CORE DISCIPLINE
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[300] tracking-wider uppercase text-[#000000] mb-6">
                  {service.title} —
                </h2>

                <p className="text-sm font-[300] leading-relaxed text-neutral-800 text-justify mb-8">
                  {service.description}
                </p>

                {/* Deliverables List */}
                {service.deliverables && (
                  <div className="mb-8 p-6 bg-neutral-50 border border-neutral-200">
                    <div className="text-[10px] uppercase tracking-[0.25em] font-medium text-[#4E3630] mb-4">
                      PROJECT DELIVERABLES &amp; DOCUMENTATION
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-[300] text-neutral-700">
                      {service.deliverables.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#D8BA72] shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4">
                  <GoldButton
                    text="BOOK A CONSULTANT ↗"
                    onClick={() => openConsultantModal(service.title)}
                    ariaLabel={`Book a consultant for ${service.title}`}
                  />
                  <a
                    href={`tel:${SITE_DATA.brand.phoneRaw}`}
                    className="text-xs font-[300] uppercase tracking-[0.2em] text-[#4E3630] hover:text-[#D8BA72] transition-colors"
                  >
                    Direct Hotline: {SITE_DATA.brand.phone}
                  </a>
                </div>
              </motion.div>

              {/* Image Side - slides in from Right (or Left if reversed) */}
              <motion.div
                initial={{ opacity: 0, x: isReversed ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className={`lg:col-span-6 ${
                  isReversed ? 'lg:col-start-1 lg:order-1' : 'lg:col-start-7 lg:order-2'
                }`}
              >
                <DoubleFrame
                  src={service.image}
                  alt={service.alt}
                  offsetPosition={isReversed ? 'top-left' : 'top-right'}
                  aspectRatio="aspect-[16/11]"
                  parallax={false}
                />
              </motion.div>
            </div>
          );
        })}
      </section>

      {/* Curated Architectural Packages */}
      <section className="bg-neutral-50 py-24 md:py-36 px-6 md:px-12 border-t border-b border-[#C9C9C9]/40 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[11px] font-[300] uppercase tracking-[0.25em] text-[#D8BA72] mb-2">
                CURATED ARCHITECTURAL SCOPES
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-[300] uppercase tracking-tight text-[#000000]">
                DIRECT ADVISORY &amp; BLUEPRINTS
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-xs font-[300] text-neutral-600 max-w-sm"
            >
              Select an architectural service tier below to book a structured consultation or arrange an on-site evaluation with our Scandinavian team.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SITE_DATA.designPackages.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-white border border-[#C9C9C9] p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-neutral-200">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 text-[10px] font-mono uppercase px-2.5 py-1 tracking-wider text-black">
                      {pkg.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-[300] uppercase tracking-wide text-[#000000] mb-2">
                    {pkg.title}
                  </h3>

                  <div className="text-2xl font-[400] text-[#4E3630] font-sans mb-3">
                    ${pkg.price}
                    <span className="text-[11px] font-[300] text-neutral-500 uppercase tracking-wider ml-1">
                      USD
                    </span>
                  </div>

                  <p className="text-xs font-[300] leading-relaxed text-neutral-600 mb-6">
                    {pkg.description}
                  </p>

                  <div className="space-y-2 mb-8 pt-4 border-t border-neutral-100">
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] font-[300] text-neutral-700">
                        <Check className="w-3 h-3 text-[#D8BA72] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => openConsultantModal(pkg.title)}
                    className="w-full py-3.5 bg-[#D8BA72] text-white text-xs uppercase tracking-wider font-[300] btn-chamfer hover:bg-[#c4a45a] transition-all hover:scale-[1.01]"
                  >
                    BOOK ADVISORY SESSION ↗
                  </button>

                  <a
                    href={`tel:${SITE_DATA.brand.phoneRaw}`}
                    className="w-full block py-2.5 border border-[#C9C9C9] text-center text-black text-[11px] uppercase tracking-wider font-[300] hover:bg-neutral-100 transition-colors"
                  >
                    CALL ARCHITECT: {SITE_DATA.brand.phone}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architectural Workflow Milestones with Left/Right Stagger */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-[1440px] mx-auto overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-xl mx-auto mb-20"
        >
          <div className="text-[11px] font-[300] uppercase tracking-[0.25em] text-[#D8BA72] mb-2">
            METHODOLOGY &amp; RIGOR
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[300] uppercase tracking-tight text-[#000000]">
            THE SCANDINAVIAN WORKFLOW
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: '01',
              title: 'SPATIAL & DAYLIGHT AUDIT',
              desc: 'We map orientation, natural light angles, circadian flow, and architectural acoustic properties of your physical space.',
            },
            {
              step: '02',
              title: 'TACTILE CONCEPT DESIGN',
              desc: 'Moodboards, material swatches (solid oak, limestone, linen, patinated brass), and 3D spatial layout iterations.',
            },
            {
              step: '03',
              title: 'TECHNICAL BLUEPRINTS',
              desc: 'CAD construction plans, plumbing, electrical schematics, custom joinery drawings, and exact material specifications.',
            },
            {
              step: '04',
              title: 'TURNKEY SUPERVISION',
              desc: 'Site visits, contractor oversight, quality audits, furnishing staging, and final white-glove handover.',
            },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-t border-[#C9C9C9] pt-6"
            >
              <span className="text-3xl font-[200] font-sans text-neutral-400 mb-4 block">
                {item.step}
              </span>
              <h3 className="text-sm font-[300] uppercase tracking-wider text-black mb-3">
                {item.title}
              </h3>
              <p className="text-xs font-[300] leading-relaxed text-neutral-600 text-justify">
                {item.desc}
              </p>
            </motion.div>
          ))}
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

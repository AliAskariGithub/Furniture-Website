'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';
import ContactModal from '@/components/ContactModal';
import PortfolioLightboxModal from '@/components/PortfolioLightboxModal';
import { SITE_DATA, PortfolioProject } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import { Eye, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { openConsultantModal } = useApp();

  const categories = ['All', 'Apartments', 'Houses', 'Sauna'];

  const filteredProjects =
    selectedCategory === 'All'
      ? SITE_DATA.portfolio.projects
      : SITE_DATA.portfolio.projects.filter((p) => p.category === selectedCategory);

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
              SELECTED ARCHITECTURAL WORKS
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
                PORTFOLIO
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
              Explore our completed residential penthouses, Nordic timber villas, bespoke saunas, and contemporary open-concept kitchens designed with timeless Scandinavian integrity.
            </p>
          </motion.div>
        </div>

        {/* Category Filters with Staggered Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mr-2">
            FILTER:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-[300] transition-all ${
                selectedCategory === cat
                  ? 'bg-[#4E3630] text-white border border-[#4E3630]'
                  : 'bg-white text-neutral-700 border border-[#C9C9C9] hover:border-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Projects Showcase with Directional Entrances */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-[1440px] mx-auto space-y-36 md:space-y-48 overflow-hidden">
        <AnimatePresence mode="wait">
          <div key={selectedCategory} className="space-y-36 md:space-y-48">
            {filteredProjects.map((project, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="border-t border-[#C9C9C9] pt-12"
                >
                  {/* Project Header Info: Left title, Right meta */}
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                    <motion.div
                      initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-4xl font-[300] font-sans text-[#D8BA72]">
                          {project.number}
                        </span>
                        <span className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                          {project.category}
                        </span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[300] uppercase tracking-tight text-[#000000]">
                        {project.title}
                      </h2>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      className="flex flex-wrap items-center gap-6 text-xs font-[300] tracking-wider text-neutral-700"
                    >
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#D8BA72]" />
                        <span className="uppercase">{project.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#D8BA72]" />
                        <span className="uppercase">{project.terms}</span>
                      </div>
                      {project.area && (
                        <div className="px-3 py-1 bg-neutral-100 border border-neutral-200 font-mono text-[11px]">
                          {project.area}
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm font-[300] leading-relaxed text-neutral-700 text-justify max-w-3xl mb-12">
                    {project.description}
                  </p>

                  {/* Photo Mosaic Grid with Hover Scale */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {project.images.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        onClick={() => {
                          setActiveProject(project);
                          setActiveImageIndex(i);
                          setIsLightboxOpen(true);
                        }}
                        className={`relative overflow-hidden group cursor-pointer bg-neutral-200 border border-neutral-200 aspect-[4/3] ${
                          i === 0 ? 'sm:col-span-2 sm:row-span-2 aspect-square' : ''
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={img.alt}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="px-4 py-2 border border-white text-white text-[10px] uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-xs">
                            <Eye className="w-3.5 h-3.5" />
                            <span>VIEW IN HD</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Consultation trigger for this project */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-neutral-100">
                    <span className="text-xs font-[300] text-neutral-500 tracking-wide">
                      Desire a comparable interior aesthetic for your space?
                    </span>
                    <button
                      type="button"
                      onClick={() => openConsultantModal(`${project.title} Architectural Style`)}
                      className="px-6 py-3 bg-[#D8BA72] text-white text-xs uppercase tracking-wider font-[300] btn-chamfer hover:bg-[#c4a45a] transition-all hover:scale-[1.01]"
                    >
                      REQUEST PROJECT CONSULTATION ↗
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </section>

      {/* High-Resolution Gallery Lightbox Modal with Next/Previous Navigation */}
      <PortfolioLightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        project={activeProject}
        initialIndex={activeImageIndex}
        onOpenConsultant={(topic) => openConsultantModal(topic)}
      />

      {/* Footer */}
      <FooterSection
        onOpenContact={() => setIsContactOpen(true)}
        brandName="FURNI.TURE"
      />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}

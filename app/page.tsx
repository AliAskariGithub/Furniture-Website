'use client';

import React, { useState } from 'react';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import HeroServicesStack from '@/components/HeroServicesStack';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import FaqFooterStack from '@/components/FaqFooterStack';
import ContactModal from '@/components/ContactModal';
import { useApp } from '@/context/AppContext';

export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const brandName = 'FURNI.TURE';
  const { openConsultantModal } = useApp();

  return (
    <main className="relative min-h-screen bg-white text-black font-sans selection:bg-[#D8BA72] selection:text-white">
      {/* Fullscreen Preloader */}
      <Preloader
        onComplete={() => setPreloaderDone(true)}
        brandName={brandName}
      />

      {/* Fixed Sticky Header with auto-contrast */}
      <Header
        onOpenConsultant={() => openConsultantModal()}
        brandName={brandName}
      />

      {/* Parallax Stacked Effect: From Hero Section to Our Service Section ONLY */}
      <HeroServicesStack
        onOpenConsultant={(topic) => openConsultantModal(topic)}
        brandName={brandName}
      />

      {/* About Company Section */}
      <AboutSection
        brandName={brandName}
      />

      {/* Our Portfolio Section */}
      <PortfolioSection
        onOpenConsultant={() => openConsultantModal()}
      />

      {/* Client Testimonial Slider / Social Proof Carousel */}
      <TestimonialCarousel
        brandName={brandName}
        onOpenConsultant={() => openConsultantModal()}
      />

      {/* Parallax Stacked Effect: From FAQs Section to Footer Section ONLY */}
      <FaqFooterStack
        onOpenConsultant={(topic) => openConsultantModal(topic)}
        onOpenContact={() => setIsContactOpen(true)}
        brandName={brandName}
      />

      {/* Interactive Consultation / Inquiry Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}

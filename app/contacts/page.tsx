'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';
import ContactModal from '@/components/ContactModal';
import GoldButton from '@/components/GoldButton';
import { SITE_DATA } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import { Phone, Mail, Clock, Check } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactsPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { openConsultantModal } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Full Architectural Design');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

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
              DIRECT INQUIRIES &amp; STUDIO ACCESS
            </motion.div>

            <h1 className="text-[14vw] sm:text-[11vw] md:text-[96px] lg:text-[110px] leading-[0.9] font-[300] uppercase tracking-[-0.03em] select-none">
              <motion.span
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[#000000]"
              >
                CONTACT
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[#4E3630] ml-[8vw] sm:ml-[16vw] md:ml-[240px]"
              >
                STUDIO
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
              Whether you are acquiring a new apartment, planning a private countryside villa, or seeking an architectural sauna concept, our lead Scandinavian architects are available for direct advisory.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Contacts Layout: Left Details (from Left) / Right In-Depth Form (from Right) */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-[1440px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Info Cards (slides in from Left) */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Phone Card */}
            <div className="border border-[#C9C9C9] p-8 bg-neutral-50 hover:border-black transition-colors">
              <div className="w-10 h-10 bg-[#D8BA72]/20 border border-[#D8BA72] flex items-center justify-center mb-4">
                <Phone className="w-5 h-5 text-[#4E3630]" />
              </div>
              <div className="text-[10px] font-[300] uppercase tracking-[0.25em] text-neutral-500 mb-1">
                DIRECT STUDIO HOTLINE
              </div>
              <a
                href={`tel:${SITE_DATA.brand.phoneRaw}`}
                className="text-2xl font-[300] text-black hover:text-[#D8BA72] tracking-wider transition-colors block font-sans mb-2"
              >
                {SITE_DATA.brand.phone}
              </a>
              <p className="text-xs font-[300] text-neutral-600 leading-relaxed">
                Direct connection to our senior studio architects. Available on WhatsApp and Telegram.
              </p>
            </div>

            {/* Email Card */}
            <div className="border border-[#C9C9C9] p-8 bg-neutral-50 hover:border-black transition-colors">
              <div className="w-10 h-10 bg-[#D8BA72]/20 border border-[#D8BA72] flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-[#4E3630]" />
              </div>
              <div className="text-[10px] font-[300] uppercase tracking-[0.25em] text-neutral-500 mb-1">
                OFFICIAL CORRESPONDENCE
              </div>
              <a
                href={`mailto:${SITE_DATA.brand.email}`}
                className="text-xl font-[300] text-black hover:text-[#D8BA72] tracking-wide transition-colors block font-sans mb-2"
              >
                {SITE_DATA.brand.email}
              </a>
              <p className="text-xs font-[300] text-neutral-600 leading-relaxed">
                Send architectural floor plans, CAD drawings, and technical requests.
              </p>
            </div>

            {/* Studio Hours & Address */}
            <div className="border border-[#C9C9C9] p-8 bg-neutral-50 hover:border-black transition-colors">
              <div className="w-10 h-10 bg-[#D8BA72]/20 border border-[#D8BA72] flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-[#4E3630]" />
              </div>
              <div className="text-[10px] font-[300] uppercase tracking-[0.25em] text-neutral-500 mb-1">
                STUDIO HOURS &amp; APPOINTMENTS
              </div>
              <p className="text-sm font-[300] text-black tracking-wide mb-1">
                Monday – Friday: 09:00 – 19:00 CET
              </p>
              <p className="text-xs font-[300] text-neutral-500">
                Saturday: By advance appointment only
              </p>
            </div>

            {/* Quick Modal Trigger */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => openConsultantModal()}
                className="w-full py-4 bg-[#D8BA72] text-white text-xs uppercase tracking-wider font-[300] btn-chamfer hover:bg-[#c4a45a] transition-colors"
              >
                BOOK A CONSULTANT ONLINE ↗
              </button>
            </div>
          </motion.div>

          {/* Right Column: In-Depth Direct Studio Inquiry Form (slides in from Right) */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white border border-[#C9C9C9] p-8 md:p-12 shadow-sm"
          >
            {submitted ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-[#D8BA72]/20 border border-[#D8BA72] flex items-center justify-center">
                  <Check className="w-8 h-8 text-[#4E3630]" />
                </div>
                <div className="text-[11px] font-[300] uppercase tracking-[0.25em] text-[#D8BA72] mb-2">
                  INQUIRY TRANSMITTED
                </div>
                <h3 className="text-2xl sm:text-3xl font-[300] uppercase text-black mb-4">
                  THANK YOU, {name.toUpperCase()}
                </h3>
                <p className="text-xs font-[300] leading-relaxed text-neutral-600 max-w-md mx-auto mb-8">
                  Your project dossier has been assigned to our senior architectural team. We will call you directly at{' '}
                  <strong className="text-black font-normal">{phone}</strong> within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="px-8 py-3.5 border border-[#C9C9C9] text-black text-xs uppercase tracking-wider hover:bg-neutral-100 transition-colors font-[300]"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <span className="text-[11px] font-[300] uppercase tracking-[0.2em] text-[#D8BA72] block mb-1">
                    START A CONVERSATION
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-[300] uppercase text-[#000000] tracking-wide">
                    PROJECT INQUIRY FORM
                  </h2>
                  <p className="text-xs font-[300] text-neutral-600 mt-2">
                    Share your space parameters and desired scope with our architects.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-[300] uppercase tracking-[0.2em] text-neutral-600 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Henrik Larsson"
                        className="w-full px-4 py-3 border border-neutral-300 text-xs focus:border-[#D8BA72] focus:outline-none font-light"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-[300] uppercase tracking-[0.2em] text-neutral-600 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={SITE_DATA.brand.phone}
                        className="w-full px-4 py-3 border border-neutral-300 text-xs focus:border-[#D8BA72] focus:outline-none font-light"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-[300] uppercase tracking-[0.2em] text-neutral-600 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 border border-neutral-300 text-xs focus:border-[#D8BA72] focus:outline-none font-light"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-[300] uppercase tracking-[0.2em] text-neutral-600 mb-1.5">
                        Architectural Discipline
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-300 text-xs focus:border-[#D8BA72] focus:outline-none font-light bg-white"
                      >
                        <option value="Interior Design">01 — Interior Design &amp; Space Planning</option>
                        <option value="Turnkey Renovation">02 — Turnkey Renovation Supervision</option>
                        <option value="Materials Selection">03 — Selection of Tactile Materials</option>
                        <option value="Sauna Architecture">04 — Nordic Sauna &amp; Wellness Concept</option>
                        <option value="Commercial Space">05 — Commercial / Retail Environment</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-[300] uppercase tracking-[0.2em] text-neutral-600 mb-1.5">
                      Property Description &amp; Goals
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please mention city, property square footage, estimated start date, and any specific architectural aspirations..."
                      className="w-full px-4 py-3 border border-neutral-300 text-xs focus:border-[#D8BA72] focus:outline-none font-light resize-none"
                    />
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200">
                    <p className="text-[11px] font-[300] text-neutral-500">
                      Confidentiality guaranteed by FURNI.TURE®.
                    </p>
                    <GoldButton
                      text="SUBMIT INQUIRY ↗"
                      type="submit"
                      ariaLabel="Submit studio inquiry"
                    />
                  </div>
                </form>
              </div>
            )}
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

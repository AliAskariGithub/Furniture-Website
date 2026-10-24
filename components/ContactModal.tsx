'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, Phone, Mail, MapPin } from 'lucide-react';
import { SITE_DATA } from '@/lib/data';
import GoldButton from './GoldButton';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        className="relative w-full max-w-xl bg-white border border-[#C9C9C9] p-6 sm:p-8 md:p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-black/60 hover:text-black transition-colors p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8BA72]"
          aria-label="Close contact dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-8">
              <span className="text-[11px] font-[300] uppercase tracking-[0.2em] text-[#D8BA72] block mb-1">
                FURNI.TURE ARCHITECTURAL STUDIO
              </span>
              <h3 id="contact-modal-title" className="text-2xl md:text-3xl font-[300] uppercase text-[#000000] tracking-wide">
                Discuss Your Project
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="discuss-name" className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1">
                  Your Full Name *
                </label>
                <input
                  id="discuss-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Astrid Berg"
                  className="w-full px-3.5 py-2.5 border border-[#C9C9C9] text-sm focus:border-black focus:outline-none font-light"
                />
              </div>

              <div>
                <label htmlFor="discuss-phone" className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1">
                  Phone Number *
                </label>
                <input
                  id="discuss-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={SITE_DATA.brand.phone}
                  className="w-full px-3.5 py-2.5 border border-[#C9C9C9] text-sm focus:border-black focus:outline-none font-light"
                />
              </div>

              <div>
                <label htmlFor="discuss-message" className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1">
                  Project Notes (Optional)
                </label>
                <textarea
                  id="discuss-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Apartment renovation, 120m², wish to complete in 3 months..."
                  className="w-full px-3.5 py-2.5 border border-[#C9C9C9] text-sm focus:border-black focus:outline-none font-light resize-none"
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={`tel:${SITE_DATA.brand.phoneRaw}`}
                  className="flex items-center gap-2 text-xs text-[#4E3630] font-light hover:text-[#D8BA72] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D8BA72]" />
                  <span>{SITE_DATA.brand.phone}</span>
                </a>

                <GoldButton
                  text="SEND INQUIRY ↗"
                  type="submit"
                  ariaLabel="Submit project inquiry"
                />
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[#D8BA72]/20 border border-[#D8BA72] flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-[#4E3630]" />
            </div>

            <h3 className="text-2xl font-[300] uppercase text-[#000000] tracking-wide mb-2">
              Message Received
            </h3>

            <p className="text-xs text-neutral-600 leading-relaxed font-light max-w-sm mb-6">
              Thank you, <strong className="font-normal text-black">{name}</strong>. Our senior architect will review your inquiry and contact you at <strong className="font-normal text-black">{phone}</strong> within 24 hours.
            </p>

            <button
              onClick={handleReset}
              className="px-8 py-3 bg-[#D8BA72] text-white text-xs uppercase tracking-wider btn-chamfer font-[300]"
            >
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

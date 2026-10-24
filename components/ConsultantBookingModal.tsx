'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, Calendar, Clock, Phone, MapPin } from 'lucide-react';
import { SITE_DATA } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import GoldButton from './GoldButton';

interface BookingModalContentProps {
  initialService: string;
  onClose: () => void;
}

function BookingModalContent({
  initialService,
  onClose,
}: BookingModalContentProps) {
  const [service, setService] = useState(initialService || 'Interior Design');
  const [format, setFormat] = useState<'virtual' | 'studio' | 'site'>('virtual');
  const [date, setDate] = useState('2026-11-04');
  const [time, setTime] = useState('14:00');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const id = `CNS-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingId(id);
    setConfirmed(true);
  };

  const handleClose = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div
      className="relative w-full max-w-2xl bg-white text-black p-6 sm:p-10 md:p-12 shadow-2xl border border-[#C9C9C9] max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D8BA72]"
        aria-label="Close dialog"
      >
        <X className="w-5 h-5" />
      </button>

      {confirmed ? (
        /* Confirmation View */
        <div className="py-6 text-center animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 mx-auto mb-6 bg-[#D8BA72]/15 border border-[#D8BA72] flex items-center justify-center">
            <Check className="w-8 h-8 text-[#4E3630]" />
          </div>

          <div className="text-[11px] font-[300] uppercase tracking-[0.25em] text-[#D8BA72] mb-2">
            APPOINTMENT RESERVED
          </div>

          <h3 className="text-2xl sm:text-3xl font-[300] uppercase tracking-tight text-[#000000] mb-3">
            CONSULTATION CONFIRMED
          </h3>

          <p className="text-xs font-[300] leading-relaxed text-neutral-600 max-w-md mx-auto mb-6">
            Thank you, <strong className="font-normal text-black">{name}</strong>. Our Scandinavian architectural lead has reserved your slot for{' '}
            <strong className="font-normal text-black">{service}</strong> ({date} at {time}).
          </p>

          <div className="bg-neutral-50 border border-neutral-200 p-4 mb-6 max-w-sm mx-auto text-left text-xs space-y-1 font-[300]">
            <div className="flex justify-between">
              <span className="text-neutral-500 uppercase tracking-wider text-[10px]">Reference:</span>
              <span className="font-mono font-medium text-[#4E3630]">{bookingId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500 uppercase tracking-wider text-[10px]">Direct Studio Line:</span>
              <a href={`tel:${SITE_DATA.brand.phoneRaw}`} className="text-black hover:text-[#D8BA72]">
                {SITE_DATA.brand.phone}
              </a>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500 uppercase tracking-wider text-[10px]">Session Format:</span>
              <span className="uppercase text-black">{format}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#D8BA72] text-white text-xs uppercase tracking-wider btn-chamfer font-[300] hover:bg-[#c4a45a] transition-colors"
            >
              DONE
            </button>
            <a
              href={`tel:${SITE_DATA.brand.phoneRaw}`}
              className="w-full sm:w-auto px-8 py-3.5 border border-[#C9C9C9] text-black text-xs uppercase tracking-wider hover:bg-neutral-100 transition-colors font-[300] inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#D8BA72]" />
              <span>CALL STUDIO DIRECTLY</span>
            </a>
          </div>
        </div>
      ) : (
        /* Form View */
        <div>
          <div className="mb-8">
            <div className="text-[10px] font-[300] uppercase tracking-[0.25em] text-[#D8BA72] mb-1">
              FURNI.TURE® ARCHITECTURAL ADVISORY
            </div>
            <h2
              id="booking-modal-title"
              className="text-2xl sm:text-3xl md:text-4xl font-[300] uppercase tracking-tight text-[#000000]"
            >
              BOOK A CONSULTANT
            </h2>
            <p className="text-xs font-[300] text-neutral-600 mt-2 leading-relaxed">
              Schedule a focused 1-on-1 session with our Scandinavian architects. Direct inquiries call{' '}
              <a href={`tel:${SITE_DATA.brand.phoneRaw}`} className="text-[#4E3630] font-normal underline">
                {SITE_DATA.brand.phone}
              </a>
              .
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Selection */}
            <div>
              <label className="block text-[11px] font-[300] uppercase tracking-[0.2em] text-neutral-800 mb-2">
                Select Architectural Scope
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Interior Design & Space Planning',
                  'Turnkey Renovation Supervision',
                  'Scandinavian Material Selection',
                  'Sauna & Spa Architecture',
                ].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setService(s)}
                    className={`p-3 text-left text-xs font-[300] border transition-all ${
                      service === s
                        ? 'border-[#D8BA72] bg-[#D8BA72]/10 text-black font-normal'
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Consultation Format */}
            <div>
              <label className="block text-[11px] font-[300] uppercase tracking-[0.2em] text-neutral-800 mb-2">
                Consultation Format
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'virtual', label: 'Virtual (Online)', icon: Clock },
                  { id: 'studio', label: 'At Studio', icon: MapPin },
                  { id: 'site', label: 'On-Site Visit', icon: Calendar },
                ].map((f) => {
                  const Icon = f.icon;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFormat(f.id as any)}
                      className={`p-3 text-center border flex flex-col items-center gap-1.5 transition-all ${
                        format === f.id
                          ? 'border-[#D8BA72] bg-[#D8BA72]/10 text-black font-normal'
                          : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#4E3630]" />
                      <span className="text-[11px] font-[300] uppercase tracking-wider">{f.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-[300] uppercase tracking-[0.2em] text-neutral-600 mb-1.5">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 focus:outline-none focus:border-[#D8BA72] font-light bg-neutral-50/50"
                />
              </div>
              <div>
                <label className="block text-[10px] font-[300] uppercase tracking-[0.2em] text-neutral-600 mb-1.5">
                  Preferred Time Slot
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 focus:outline-none focus:border-[#D8BA72] font-light bg-white"
                >
                  <option value="10:00">10:00 AM (Morning Session)</option>
                  <option value="12:00">12:00 PM (Midday Session)</option>
                  <option value="14:00">02:00 PM (Afternoon Session)</option>
                  <option value="16:00">04:00 PM (Late Afternoon)</option>
                  <option value="18:00">06:00 PM (Evening Advisory)</option>
                </select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-[300] uppercase tracking-[0.2em] text-neutral-600 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Astrid Berg"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-[#D8BA72]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-[300] uppercase tracking-[0.2em] text-neutral-600 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+923399445465"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-[#D8BA72]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-[300] uppercase tracking-[0.2em] text-neutral-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-[#D8BA72]"
                />
              </div>
            </div>

            {/* Project Brief / Notes */}
            <div>
              <label className="block text-[10px] font-[300] uppercase tracking-[0.2em] text-neutral-600 mb-1">
                Project Notes / Space Details (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell us about the property type, square meters, desired aesthetic, or current status..."
                className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-[#D8BA72] resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200">
              <a
                href={`tel:${SITE_DATA.brand.phoneRaw}`}
                className="flex items-center gap-2 text-xs text-[#4E3630] font-light hover:text-[#D8BA72] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#D8BA72]" />
                <span>Direct Hotline: {SITE_DATA.brand.phone}</span>
              </a>

              <GoldButton
                text="CONFIRM CONSULTATION ↗"
                type="submit"
                ariaLabel="Confirm consultation appointment"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default function ConsultantBookingModal() {
  const {
    isConsultantModalOpen,
    closeConsultantModal,
    selectedConsultationService,
  } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeConsultantModal();
    };
    if (isConsultantModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isConsultantModalOpen, closeConsultantModal]);

  if (!isConsultantModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeConsultantModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <BookingModalContent
        key={selectedConsultationService || 'default'}
        initialService={selectedConsultationService}
        onClose={closeConsultantModal}
      />
    </div>
  );
}

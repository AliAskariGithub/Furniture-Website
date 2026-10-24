'use client';

import React from 'react';
import { AppProvider } from '@/context/AppContext';
import ConsultantBookingModal from './ConsultantBookingModal';
import SmoothScroll from './SmoothScroll';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <SmoothScroll />
      {children}
      <ConsultantBookingModal />
    </AppProvider>
  );
}

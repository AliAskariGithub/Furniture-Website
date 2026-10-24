'use client';

import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  isConsultantModalOpen: boolean;
  openConsultantModal: (serviceName?: string) => void;
  closeConsultantModal: () => void;
  selectedConsultationService: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isConsultantModalOpen, setIsConsultantModalOpen] = useState(false);
  const [selectedConsultationService, setSelectedConsultationService] = useState('Interior Design');

  const openConsultantModal = (serviceName?: string) => {
    if (serviceName) setSelectedConsultationService(serviceName);
    setIsConsultantModalOpen(true);
  };

  const closeConsultantModal = () => {
    setIsConsultantModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isConsultantModalOpen,
        openConsultantModal,
        closeConsultantModal,
        selectedConsultationService,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

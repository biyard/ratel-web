'use client';

import { LayoutType } from '@/types';
import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext<{
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
}>({
  layout: 'default',
  setLayout: () => {},
});

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [layout, setLayout] = useState<LayoutType>('default');

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
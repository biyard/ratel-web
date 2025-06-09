import React from 'react';

export interface BlackboxProps {
  children: React.ReactNode;
}

export default function BlackBox({ children }: BlackboxProps) {
  return (
    <div className="flex flex-col w-full justify-start items-start bg-component-bg rounded-2.5 px-4 py-5">
      {children}
    </div>
  );
}

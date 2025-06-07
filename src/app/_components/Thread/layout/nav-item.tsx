'use client';

import type { NavItemType } from '@/types';

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  onClick: () => void;
}

export function NavItem({ item, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 p-2 rounded w-full text-left transition-colors ${
        isActive ? 'bg-[#404040]' : 'hover:bg-[#404040]'
      }`}
    >
      {item.icon}
      <span>{item.label}</span>
    </button>
  );
}

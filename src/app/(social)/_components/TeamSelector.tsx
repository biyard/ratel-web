import { ChevronDown } from 'lucide-react';
import React from 'react';

export default function TeamSelector() {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span>[Group name]</span>
        <div className="w-2 h-2 rounded-full bg-[#fcb300]"></div>
      </div>
      <ChevronDown size={16} />
    </div>
  );
}

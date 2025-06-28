'use client';

import { usePopup } from '@/lib/contexts/popup-service';
import React from 'react';
import { X } from 'lucide-react';
import { usePostDraft } from '@/app/(social)/_components/post-draft-context';
import { route } from '@/route';
import { useRouter } from 'next/navigation';

export const DraftPopup = () => {
  const popup = usePopup();
  const { status, setStatus } = usePostDraft();
  const router = useRouter();

  if (status !== 'saved') return null;

  const handleClose = () => {
    setStatus('idle');
    popup.close();
  };

  const goToDrafts = () => {
    router.push(route.drafts());
    console.log('Navigating to Drafts...');
    popup.close();
  };

  return (
    <div
      className=" fixed
        z-50
        right-2
        top-4
        md:right-10
        md:top-8
        max-w-sm
        w-full
        pointer-events-auto"
    >
      <div className="bg-[#1c1c1c] text-white rounded-lg p-6 w-full max-w-sm shadow-xl relative">
        {/* Close icon in top right */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-2">Draft Saved</h2>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-6">
          Your post has been automatically saved as a draft. You can continue
          editing it anytime from the Drafts page.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleClose}
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Close
          </button>
          <button
            onClick={goToDrafts}
            className="bg-primary hover:bg-[#eab308] text-black font-medium text-sm px-4 py-2 rounded-md transition"
          >
            Go to Drafts
          </button>
        </div>
      </div>
    </div>
  );
};

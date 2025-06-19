'use client';
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { cn } from '@/lib/utils';

export default function Loading({ className }: { className?: string }) {
  return (
    <DotLottieReact
      className={cn('max-w-50 max-h-50', className)}
      src="/animations/loading.json"
      loop
      autoplay
    />
  );
}

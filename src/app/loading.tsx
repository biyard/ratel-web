'use client';
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Loading() {
  return (
    <DotLottieReact
      className="max-w-50 max-h-50"
      src="/animations/loading.json"
      loop
      autoplay
    />
  );
}

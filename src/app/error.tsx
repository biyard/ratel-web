'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Segment Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center p-4">
      <h2>❌ Error Occured</h2>
      <p>{error.message}</p>
      <p className="text-xs text-gray-500 mt-2">(Error: {error.digest})</p>
    </div>
  );
}

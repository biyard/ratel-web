'use client';

// import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
// import FeedLayout from "../app/feeds/layout";
import RootLayout from '../app/layout';

export default function LayoutSwitch({ children }: { children: ReactNode }) {
  // const pathname = usePathname();

  // Manually choose layout based on route
  // if (pathname.startsWith('/feeds')) {
  //   return <FeedLayout>{children}</FeedLayout>;
  // }

  return <RootLayout>{children}</RootLayout>;
}

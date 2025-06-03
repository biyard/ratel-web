import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import '@/assets/css/globals.css';
import Providers from '@/providers/providers';
import FeedHeader from '@/components/headers/feeds.header';

const raleway = Raleway({
  variable: '--font-raleway',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
        <Providers>
          <FeedHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}

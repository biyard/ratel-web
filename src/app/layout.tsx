// app/layout.tsx
import { Raleway } from 'next/font/google';
import '@/assets/css/globals.css';
import Providers from '@/providers/providers';
import CookieProvider from './_providers/CookieProvider';
import { PopupZone } from '@/components/popupzone';
import ClientLayout from './(social)/_components/client-layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const raleway = Raleway({
  variable: '--font-raleway',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logos/favicon.ico" />
      </head>
      <body className={`${raleway.variable} antialiased bg-bg`}>
        <CookieProvider>
          <Providers>
            <ClientLayout>{children}</ClientLayout>
            <PopupZone />
          </Providers>
        </CookieProvider>
        <ToastContainer />
      </body>
    </html>
  );
}

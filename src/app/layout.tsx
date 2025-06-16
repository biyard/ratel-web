// app/layout.tsx
import { Raleway } from 'next/font/google';
import '@/assets/css/globals.css';
import Providers from '@/providers/providers';
import CookieProvider from './_providers/CookieProvider';
import { PopupZone } from '@/components/popupzone';
import ClientLayout from './(social)/_components/client-layout';
import { prefetchQuery } from '@/lib/query-utils';
import { serverFetch } from '@/lib/api/serverFetch';
import { config } from '@/config';
import { ratelApi } from '@/lib/api/ratel_api';
import { QK_USERS_GET_INFO } from '@/constants';
import { getQueryClient } from '@/providers/getQueryClient';
import { dehydrate } from '@tanstack/react-query';

const raleway = Raleway({
  variable: '--font-raleway',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  try {
    await prefetchQuery(queryClient, [QK_USERS_GET_INFO], async () => {
      const res = await serverFetch(
        `${config.api_url}${ratelApi.users.getUserInfo()}`,
        {
          ignoreError: true,
        },
      );
      return res.data;
    });
  } catch (error) {
    console.warn('prefetchQuery failed:', error);
  }
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logos/favicon.ico" />
      </head>
      <body className={`${raleway.variable} antialiased bg-bg`}>
        <CookieProvider>
          <Providers dehydratedState={dehydratedState}>
            <ClientLayout>{children}</ClientLayout>
            <PopupZone />
          </Providers>
        </CookieProvider>
      </body>
    </html>
  );
}

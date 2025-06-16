'use client';

import { useState } from 'react';
import { AuthProvider } from '@/app/_providers/auth-provider';
import { client } from '@/lib/apollo';
import { PopupProvider } from '@/lib/contexts/popup-service';
import { TeamProvider } from '@/lib/service/team-provider';
import { ApolloProvider } from '@apollo/client';
import {
  QueryClient,
  QueryClientProvider,
  hydrate,
} from '@tanstack/react-query';

export default function Providers({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState: unknown;
}) {
  // 클라이언트에서 새 QueryClient 생성 후 Hydrate로 복원.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60000,
          },
        },
      }),
  );
  hydrate(queryClient, dehydratedState);
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PopupProvider>
            <TeamProvider>{children}</TeamProvider>
          </PopupProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

import { ReactNode } from 'react';
import ClientProviders from './providers.client';
import { getQueryClient, initData } from '@/providers/getQueryClient';
import { SSRHydration } from '@/lib/query-utils';
import { getSpaceById } from '@/lib/api/ratel_api';

export default async function Provider({
  children,
  spaceId,
}: {
  children: ReactNode;
  spaceId: number;
}) {
  const queryClient = getQueryClient();

  try {
    // Initialize the query client with the space data
    initData(queryClient, [await getSpaceById(spaceId)]);
  } catch (error) {
    console.error('Failed to fetch data', error);
    throw error;
  }

  return (
    <SSRHydration queryClient={queryClient}>
      <ClientProviders spaceId={spaceId}>{children}</ClientProviders>
    </SSRHydration>
  );
}

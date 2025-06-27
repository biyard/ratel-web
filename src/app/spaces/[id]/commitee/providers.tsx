import { ReactNode } from 'react';
import ClientProviders from './providers.client';
import { getRedeemCode, getSpaceById } from '@/lib/api/ratel_api';
import { getQueryClient, initData } from '@/providers/getQueryClient';
import { SSRHydration } from '@/lib/query-utils';

export default async function Provider({
  children,
  spaceId,
}: {
  children: ReactNode;
  spaceId: number;
}) {
  const queryClient = getQueryClient();

  const space = await getSpaceById(spaceId);
  const redeemCode = await getRedeemCode(spaceId);

  // Initialize the query client with the space data
  initData(queryClient, [space, redeemCode]);

  return (
    <SSRHydration queryClient={queryClient}>
      <ClientProviders spaceId={spaceId}>{children}</ClientProviders>
    </SSRHydration>
  );
}

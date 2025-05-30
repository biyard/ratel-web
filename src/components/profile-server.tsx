import { SSRHydration } from '@/lib/query-utils';
import { QueryClient } from '@tanstack/react-query';
import Profile from './profile';
import { getUserProfile } from '@/lib/api/get-user-profile';

export default async function ProfileServerComponent() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user_profile'],
    queryFn: getUserProfile,
  });

  return (
    <SSRHydration queryClient={queryClient}>
      <Profile />
    </SSRHydration>
  );
}

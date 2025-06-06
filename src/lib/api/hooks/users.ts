import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { User } from '../models/User';
import { useApiCall } from '../useSend';
import { QK_USERS_GET_INFO } from '@/constants';
import { ratelApi } from '../ratel_api';
import { useAuth } from '@/lib/contexts/auth-context';

export function useUserInfo(): UseQueryResult<User | undefined> {
  const { get } = useApiCall();
  const auth = useAuth();

  const query = useQuery({
    queryKey: [QK_USERS_GET_INFO, auth.ed25519KeyPair?.getPrincipal().toText()],
    queryFn: () => get(ratelApi.users.getUserInfo()),
    refetchOnWindowFocus: false,
  });

  return query;
}

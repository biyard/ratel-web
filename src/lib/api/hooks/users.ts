import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { User } from '../models/user';
import { useSend } from '../useSend';
import { QK_USERS_GET_INFO } from '@/constants';
import { ratelApi } from '../ratel_api';
import { useAuth } from '@/lib/contexts/auth-context';

export function useUserInfo(): UseQueryResult<User | undefined> {
  const send = useSend();
  const auth = useAuth();

  const query = useQuery({
    queryKey: [QK_USERS_GET_INFO, auth.ed25519KeyPair?.getPrincipal().toText()],
    queryFn: () => send(ratelApi.users.getUserInfo()),
    refetchOnWindowFocus: false,
  });

  return query;
}

import {
  useQuery,
  UseQueryResult,
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import { User } from '../models/user';
import { useApiCall } from '../use-send';
import { QK_USERS_GET_INFO } from '@/constants';
import { ratelApi } from '../ratel_api';
import { useAuth } from '@/lib/contexts/auth-context';
import { logger } from '@/lib/logger';

export function useUserInfo(): UseQueryResult<User | undefined> {
  const { get } = useApiCall();
  const auth = useAuth();
  const principalText = auth.ed25519KeyPair?.getPrincipal().toText();

  logger.debug('useUserInfo', [QK_USERS_GET_INFO, principalText]);

  const query = useQuery({
    queryKey: [QK_USERS_GET_INFO, principalText],
    queryFn: () => get(ratelApi.users.getUserInfo()),
    enabled: !!principalText,
    refetchOnWindowFocus: false,
  });

  return query;
}

export function useSuspenseUserInfo(): UseSuspenseQueryResult<
  User | undefined
> {
  const { get } = useApiCall();
  const auth = useAuth();
  const principalText = auth.ed25519KeyPair?.getPrincipal().toText();

  logger.debug('useUserInfo', [QK_USERS_GET_INFO, principalText]);

  const query = useSuspenseQuery({
    queryKey: [QK_USERS_GET_INFO, principalText],
    queryFn: () => get(ratelApi.users.getUserInfo()),
    refetchOnWindowFocus: false,
  });

  return query;
}

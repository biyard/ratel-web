import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { User } from '../models/user';
import { useSend } from '../useSend';
import { QK_USERS_GET_INFO } from '@/constants';
import { ratelApi } from '../ratel_api';

export function getUserInfo(): UseQueryResult<User | undefined> {
  const send = useSend();

  return useQuery({
    queryKey: [QK_USERS_GET_INFO],
    queryFn: () => send(ratelApi.users.getUserInfo()),
    refetchOnWindowFocus: false,
  });
}

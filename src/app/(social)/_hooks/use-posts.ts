import { ratelApi } from '@/lib/api/ratel_api';
import { QueryResponse } from '@/lib/api/models/common';
import { Feed } from '@/lib/api/models/feeds';
import { useApiCall } from '@/lib/api/use-send';
import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import { QK_USERS_GET_INFO } from '@/constants';

export function usePost(
  page: number,
  size: number,
): UseSuspenseQueryResult<QueryResponse<Feed>> {
  const { get } = useApiCall();

  const query = useSuspenseQuery({
    queryKey: [QK_USERS_GET_INFO],
    queryFn: () => get(ratelApi.feeds.getPosts(page, size)),
    refetchOnWindowFocus: false,
  });

  return query;
}

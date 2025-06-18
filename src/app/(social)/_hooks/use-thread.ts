import { QK_GET_THREAD_BY_THREAD_ID } from '@/constants';
import { Space } from '@/lib/api/models/spaces';
import { ratelApi } from '@/lib/api/ratel_api';
import { useApiCall } from '@/lib/api/use-send';
import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

export function useThreadByThreadId(
  thread_id: number,
): UseSuspenseQueryResult<Space> {
  const { get } = useApiCall();

  const query = useSuspenseQuery({
    queryKey: [QK_GET_THREAD_BY_THREAD_ID, thread_id],
    queryFn: () => get(ratelApi.thread.getThreadByThreadId(thread_id)),
    refetchOnWindowFocus: false,
  });

  return query;
}

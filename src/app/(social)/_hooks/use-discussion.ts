import { QK_GET_DISCUSSION_BY_DISCUSSION_ID } from '@/constants';
import { Discussion } from '@/lib/api/models/discussion';
import { ratelApi } from '@/lib/api/ratel_api';
import { useApiCall } from '@/lib/api/use-send';
import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

export function useDiscussionById(
  space_id: number,
  discussion_id: number,
): UseSuspenseQueryResult<Discussion> {
  const { get } = useApiCall();

  const query = useSuspenseQuery({
    queryKey: [QK_GET_DISCUSSION_BY_DISCUSSION_ID, discussion_id],
    queryFn: () =>
      get(ratelApi.discussions.getDiscussionById(space_id, discussion_id)),
    refetchOnWindowFocus: false,
  });

  return query;
}

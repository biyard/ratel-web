'use client';

import { useFeedByID } from '@/app/(social)/_hooks/feed';

export default function Comment({ post_id }: { post_id: number }) {
  const { data: post } = useFeedByID(post_id);

  return <div>{post?.comments}</div>;
}

'use client';

import { useFeedByID } from '@/app/(social)/_hooks/feed';
import { requestUserInfo } from '@/app/(social)/_hooks/user';

export default function Comment({ post_id }: { post_id: number }) {
  const { data: post } = useFeedByID(post_id);

  return (
    <div>
      <h2>{post?.title}</h2>
      <button
        onClick={async () => {
          await requestUserInfo();
        }}
      >
        Refresh Post
      </button>
    </div>
  );
}

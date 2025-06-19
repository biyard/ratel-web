'use client';

import { useFeedByID } from '@/app/(social)/_hooks/feed';
import Comment, { NewComment } from '@/components/comment';
import { CommentIcon } from '@/components/icons';
import {
  LexicalHtmlEditor,
  LexicalHtmlEditorRef,
} from '@/components/lexical/lexical-html-editor';
import { useSuspenseUserInfo } from '@/lib/api/hooks/users';
import { writeCommentRequest } from '@/lib/api/models/feeds/comment';
import { ratelApi } from '@/lib/api/ratel_api';
import { useApiCall } from '@/lib/api/use-send';
import { formatNumberWithCommas } from '@/lib/number-utils';
import { checkString } from '@/lib/string-filter-utils';
import { cn } from '@/lib/utils';
import { ChevronDoubleDownIcon } from '@heroicons/react/20/solid';
import { Loader2, UserCircleIcon } from 'lucide-react';
import { useRef, useState } from 'react';

export default function ThreadComment({ post_id }: { post_id: number }) {
  const { data: feed, refetch } = useFeedByID(post_id);
  const [expand, setExpand] = useState(false);
  const { post } = useApiCall();
  const { data: user } = useSuspenseUserInfo();

  const handleSubmit = async (post_id: number, content: string) => {
    await post(
      ratelApi.feeds.comment(),
      writeCommentRequest(content, user.id, post_id),
    );
    refetch();
  };

  const handleLike = async (post_id: number, value: boolean) => {
    const res = await post(ratelApi.feeds.likePost(post_id), {
      like: {
        value,
      },
    });
    if (res) {
      refetch();
    }
  };
  return (
    <>
      <div
        className="flex flex-row text-white gap-2 cursor-pointer"
        onClick={() => {
          setExpand(true);
        }}
      >
        <CommentIcon
          width={24}
          height={24}
          className="[&>path]:stroke-white [&>line]:stroke-white"
        />
        <span className="text-base/6 font-medium">
          {formatNumberWithCommas(feed?.comments ?? 0)} Reply
        </span>
      </div>
      {expand && (
        <NewComment
          onClose={() => setExpand(false)}
          onSubmit={async (content) => await handleSubmit(post_id, content)}
        />
      )}
      {(feed?.comment_list ?? []).map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onSubmit={handleSubmit}
          onLike={handleLike}
        />
      ))}
    </>
  );
}

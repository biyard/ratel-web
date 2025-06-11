'use client';
import { useSuspenseUserInfo } from '@/lib/api/hooks/users';
import React from 'react';
import { usePostByUserId } from '../_hooks/use-posts';
import { Col } from '@/components/ui/col';
import { logger } from '@/lib/logger';
import { Post } from '../page.client';
import { FeedStatus } from '@/lib/api/models/feeds';
import { usePostDraft } from '../_components/create-post';

export default function MyPostsPage() {
  const { data: user } = useSuspenseUserInfo();
  const user_id = user?.id || 0;
  const posts = usePostByUserId(user_id, 1, 20, FeedStatus.Draft);
  const data = posts.data;
  logger.debug('query response of posts', data);
  const { setExpand, loadDraft } = usePostDraft();
  const feeds: Post[] = data.items.map((item) => ({
    id: item.id,
    industry: item.industry[0].name,
    title: item.title!,
    contents: item.html_contents,
    url: item.url,
    author_id: Number(item.author[0].id),
    author_profile_url: item.author[0].profile_url!,
    author_name: item.author[0].nickname,
    author_type: item.author[0].user_type,

    likes: item.likes,
    is_liked: item.is_liked,
    comments: item.comments,
    rewards: item.rewards,
    shares: item.shares,
    created_at: item.created_at,
    onboard: item.onboard || false,
  }));

  return (
    <div className="flex-1 flex max-mobile:px-[10px]">
      {feeds.length != 0 ? (
        <Col className="flex-1 border-r border-gray-800">
          {feeds.map((props) => (
            <div
              key={`feed-${props.id}`}
              onClick={(evt) => {
                loadDraft(props.id);
                setExpand(true);
                evt.preventDefault();
                evt.stopPropagation();
              }}
            >
              {props.title}
              {/* <FeedCard
                key={`feed-${props.id}`}
                user_id={user_id ?? 0}
                refetch={() => posts.refetch()}
                {...props}
              /> */}
            </div>
          ))}
        </Col>
      ) : (
        <div className="flex flex-row w-full h-fit justify-start items-center px-[16px] py-[20px] border border-gray-500 rounded-[8px] font-medium text-base text-gray-500">
          Feeds data is empty
        </div>
      )}
    </div>
  );
}

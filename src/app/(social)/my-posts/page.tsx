'use client';
import { useSuspenseUserInfo } from '@/lib/api/hooks/users';
import React from 'react';
import { usePostByUserId } from '../_hooks/use-posts';
import { Col } from '@/components/ui/col';
import FeedCard from '@/components/feed-card';
import { Post } from '../page';
import { logger } from '@/lib/logger';

export default function MyPostsPage() {
  const { data: user } = useSuspenseUserInfo();
  const user_id = user.id || 0;
  const { data } = usePostByUserId(user_id, 1, 20);
  logger.debug('query response of posts', data);

  const feeds: Post[] = data.items.map((item) => ({
    id: item.id,
    industry: item.industry[0].name,
    title: item.title!,
    contents: item.html_contents,
    url: item.url,
    author_id: Number(item.author[0].id),
    author_profile_url: item.author[0].profile_url!,
    author_name: item.author[0].nickname,

    likes: item.likes,
    comments: item.comments,
    rewards: item.rewards,
    shares: item.shares,
    created_at: item.created_at,
  }));

  return (
    <div className="flex-1 flex max-mobile:px-[10px]">
      {feeds.length != 0 ? (
        <Col className="flex-1 border-r border-gray-800">
          {feeds.map((props) => (
            <FeedCard
              key={`feed-${props.id}`}
              user_id={user_id ?? 0}
              {...props}
            />
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

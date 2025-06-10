'use client';
import { usePostByUserId } from '@/app/(social)/_hooks/use-posts';
import { Post } from '@/app/(social)/page';
import FeedCard from '@/components/feed-card';
import { Col } from '@/components/ui/col';
import { Team } from '@/lib/api/models/team';
import { ratelApi } from '@/lib/api/ratel_api';
import { client } from '@/lib/apollo';
import { logger } from '@/lib/logger';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function TeamsByUsernamePage() {
  const params = useParams();
  const username = params.username as string;

  const [, setTeam] = useState<Team | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchTeam() {
      const {
        data: { users },
      } = await client.query(ratelApi.graphql.getTeamByTeamname(username));
      logger.debug('users', users);

      const [t]: Team[] = users;
      setTeam(t);
      setUserId(t.id);
    }

    fetchTeam();
  }, [username]);

  const posts = usePostByUserId(userId ?? 0, 1, 20);
  const data = posts.data;

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
            <FeedCard
              key={`feed-${props.id}`}
              user_id={userId ?? 0}
              refetch={() => posts.refetch()}
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

import React from 'react';

import type { Metadata } from 'next';
import { ratelApi } from '@/lib/api/ratel_api';
import { Space } from '@/lib/api/models/spaces';
import { Feed } from '@/lib/api/models/feeds';
import SpaceByIdPage from './page.client';
import { logger } from '@/lib/logger';
import { config } from '@/config';

type Props = {
  params: Promise<{ id: number }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const space: Space = await fetch(
    `${config.api_url}${ratelApi.spaces.getSpaceBySpaceId(id)}`,
  ).then((res) => res.json());

  const feed: Feed = await fetch(
    `${config.api_url}${ratelApi.feeds.getFeedsByFeedId(space.feed_id)}`,
  ).then((res) => res.json());

  return {
    title: space.title ?? feed.title!,
    description: space.html_contents,
    openGraph: {
      title: space.title ?? feed.title!,
      description: space.html_contents,
      images: [
        {
          url: feed.url!,
        },
      ],
    },
  };
}

export default async function SpacePage({ params }: Props) {
  logger.debug('SpacePage params', await params);

  return <SpaceByIdPage />;
}

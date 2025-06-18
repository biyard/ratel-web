import { SSRHydration } from '@/lib/query-utils';
import { getQueryClient } from '@/providers/getQueryClient';
import Header from './_components/header';
import Thread from './_components/thread';
import Comment from './_components/comment';

import { requestFeedByID, setInitialFeedByID } from '../../_hooks/feed';
import { Metadata } from 'next';
import striptags from 'striptags';
import { cache, Suspense } from 'react';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: number };
}

export const getCachedFeedByID = cache(async (id: number) => {
  console.log(`🔄 Actually fetching feed ${id}`);
  return requestFeedByID(id);
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const feed_id = (await params).id;
  let title = 'Ratel Thread';
  let description = 'Ratel Thread';
  let image = '';
  try {
    const { data: feed } = await getCachedFeedByID(feed_id);
    if (feed) {
      title = feed.title || title;
      description = striptags(feed.html_contents);
      image = feed.url || '';
    }
  } catch (error) {
    console.error(`Failed to generate metadata for feed ${feed_id}:`, error);
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const feed_id = (await params).id;
  const queryClient = getQueryClient();
  const { data } = await getCachedFeedByID(feed_id);
  if (!data) {
    notFound();
  }

  setInitialFeedByID(queryClient, feed_id, data);

  return (
    <SSRHydration queryClient={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col gap-6 w-full">
          <Header post_id={feed_id} />
          <Thread post_id={feed_id} />
          <Comment post_id={feed_id} />
        </div>
      </Suspense>
    </SSRHydration>
  );
}

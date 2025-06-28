import { getFeedById, getSpaceById } from '@/lib/api/ratel_api';
import { Metadata } from 'next';
import React from 'react';
import Provider from './providers';
import striptags from 'striptags';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: number }>;
}): Promise<Metadata> {
  const { id } = await params;

  const { data } = await getSpaceById(id);

  const title = data?.title ?? undefined;
  const description = data ? striptags(data.html_contents) : undefined;
  let images = undefined;
  if (data) {
    const { data: feed } = await getFeedById(data?.feed_id);
    if (feed && feed.url) {
      images = [{ url: feed.url }];
    }
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
    },
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return <Provider spaceId={id}>{children}</Provider>;
}

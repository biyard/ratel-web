// import News from './_components/News';
// import { CreatePost } from './_components/create-post';
// import { useApiCall } from '@/lib/api/use-send';
// import { ratelApi } from '@/lib/api/ratel_api';
// import {
//   UrlType,
//   writePostRequest,
// } from '@/lib/api/models/feeds/write-post-request';
import { Metadata } from 'next';
import TeamSettings from './page.client';
import { logger } from '@/lib/logger';
import { client } from '@/lib/apollo';
import { ratelApi } from '@/lib/api/ratel_api';

export interface TeamLayoutProps {
  params: Promise<{ username: string }>;
}

export const metadata: Metadata = {
  title: 'Ratel',
  description:
    'The first platform connecting South Korea’s citizens with lawmakers to drive institutional reform for the crypto industry.Are you with us ?',
  icons: {
    icon: 'https://ratel.foundation/favicon.ico',
    apple: 'https://ratel.foundation/favicon.ico',
  },
  openGraph: {
    title: 'Ratel',
    description:
      'The first platform connecting South Korea’s citizens with lawmakers to drive institutional reform for the crypto industry.Are you with us ?',
    url: 'https://ratel.foundation',
    siteName: 'Ratel',
    images: [
      {
        url: 'https://metadata.ratel.foundation/logos/logo-symbol.png',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ratel',
    description:
      'The first platform connecting South Korea’s citizens with lawmakers to drive institutional reform for the crypto industry.Are you with us ?',
    images: ['https://metadata.ratel.foundation/logos/logo-symbol.png'],
  },
};

export default async function Page({ params }: TeamLayoutProps) {
  const { username } = await params;
  logger.debug('TeamLayout: username', username);
  const {
    data: { users },
  } = await client.query(ratelApi.graphql.getTeamByTeamname(username));
  logger.debug('TeamLayout: users', users);

  const [team] = users;
  logger.debug('TeamLayout: team', team);

  return <TeamSettings team={team} />;
}

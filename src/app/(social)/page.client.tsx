'use client';
import FeedCard from '@/components/feed-card';
import { usePost } from './_hooks/use-posts';
import { Col } from '@/components/ui/col';
import { useSuspenseUserInfo } from '@/lib/api/hooks/users';
// import News from './_components/News';
// import { CreatePost } from './_components/create-post';
// import { useApiCall } from '@/lib/api/use-send';
// import { ratelApi } from '@/lib/api/ratel_api';
// import {
//   UrlType,
//   writePostRequest,
// } from '@/lib/api/models/feeds/write-post-request';


import { Metadata } from 'next';
import { useApiCall } from '@/lib/api/use-send';
import { useQuery } from '@tanstack/react-query';
import { ratelApi } from '@/lib/api/ratel_api';
import { useAuth } from '@/lib/contexts/auth-context';
import { logger } from '@/lib/logger';
import { UserType } from '@/lib/api/models/user';
import NewSideBar from './_components/news-right-sidebar';

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

export interface Post {
  id: number;
  industry: string;
  title: string;
  contents: string;
  url?: string;
  author_id: number;
  author_profile_url: string;
  author_name: string;
  author_type: UserType;
  space_id?: number;
  likes: number;
  is_liked: boolean;
  comments: number;
  rewards: number;
  shares: number;
  created_at: number;
  onboard: boolean;
}

export default function Home() {
  const { post } = useApiCall();

  const posts = usePost(1, 20);
  const { data: userInfo } = useSuspenseUserInfo();
  const auth = useAuth();
  logger.debug('user info: ', userInfo);
  const user_id = userInfo ? userInfo.id || 0 : 0;

  useQuery({
    queryKey: ['updateEvmAddress', auth.evmWallet?.address ?? ''],
    queryFn: () =>
      post(ratelApi.users.updateEvmAddress(), {
        update_evm_address: {
          evm_address: auth.evmWallet!.address,
        },
      }),
  });
  // const handleCreatePost = async (
  //   title: string,
  //   html_contents: string,
  //   image: string | null,
  // ) => {
  //   let url = '';
  //   let url_type = UrlType.None;
  //   if (image !== null && image !== '') {
  //     url = image;
  //     url_type = UrlType.Image;
  //   }
  //   await post(
  //     ratelApi.feeds.writePost(),
  //     writePostRequest(
  //       html_contents,
  //       user_id,
  //       1, // Default industry_id to 1 (Crpyto)
  //       title,
  //       0,
  //       [],
  //       url,
  //       url_type,
  //     ),
  //   );
  //   posts.refetch();
  // };

  const feeds: Post[] =
    posts.data != null
      ? posts.data.items.map((item) => ({
          id: item.id,
          industry: item.industry != null ? item.industry[0].name : '',
          title: item.title!,
          contents: item.html_contents,
          url: item.url,
          author_id: item.author != null ? Number(item.author[0].id) : 0,
          author_profile_url:
            item.author != null ? item.author[0].profile_url! : '',
          author_name: item.author != null ? item.author[0].nickname : '',
          author_type:
            item.author != null ? item.author[0].user_type : UserType.Anonymous,
          space_id: item.spaces?.length ? item.spaces[0].id : 0,
          likes: item.likes,
          is_liked: item.is_liked,
          comments: item.comments,
          rewards: item.rewards,
          shares: item.shares,
          created_at: item.created_at,
          onboard: item.onboard ?? false,
        }))
      : [];

  return (
    <div className="flex-1 flex relative">
      <Col className="flex-1 flex max-mobile:px-[10px]">
        {feeds.length != 0 ? (
          <Col className="flex-1">
            {feeds.map((props) => (
              <FeedCard
                key={`feed-${props.id}`}
                user_id={user_id ?? 0}
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
      </Col>
      {/* <div className="fixed bottom-0 left-0 right-0 z-10 flex flex-row items-center justify-center">
        <div className="max-w-desktop w-full">
          <CreatePost
            onSubmit={async ({ title, content, image }) => {
              await handleCreatePost(title, content, image);
            }}
          />
        </div>
      </div> */}
      {/* Right Sidebar */}
      <NewSideBar/>
    </div>
  );
}

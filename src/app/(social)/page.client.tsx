'use client';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
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
import News from './_components/News';
import BlackBox from './_components/black-box';
import { usePromotion } from './_hooks/use_promotion';
import { useFeedByID } from './_hooks/use-feed';
import Link from 'next/link';
import { route } from '@/route';
import { Metadata } from 'next';
import { useApiCall } from '@/lib/api/use-send';
import { useQuery } from '@tanstack/react-query';
import { ratelApi } from '@/lib/api/ratel_api';
import { useAuth } from '@/lib/contexts/auth-context';
import { logger } from '@/lib/logger';
import { UserType } from '@/lib/api/models/user';
import CreatePostButton from './_components/create-post-button';
import { checkString } from '@/lib/string-filter-utils';
import { useNetwork } from './_hooks/use-network';
import { followRequest } from '@/lib/api/models/networks/follow';
import { showErrorToast, showSuccessToast } from '@/lib/toast';

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
  const network = useNetwork();
  const { post } = useApiCall();
  const networkData = network.data;
  const { data: promotion } = usePromotion();
  const { data: feed } = useFeedByID(promotion.feed_id);
  const data = useSuspenseUserInfo();
  const userInfo = data.data;
  const auth = useAuth();
  const posts = usePost(1, 20);
  logger.debug('user info: ', userInfo);
  const user_id = userInfo ? userInfo.id || 0 : 0;

  const selected_teams = networkData
    ? networkData.suggested_teams.slice(0, 1)
    : [];
  const selected_users = networkData
    ? networkData.suggested_users.slice(0, 2)
    : [];

  const suggestions = [...selected_teams, ...selected_users];

  const handleFollow = async (userId: number) => {
    await post(ratelApi.networks.follow(userId), followRequest());
  };

  useQuery({
    queryKey: ['updateEvmAddress', auth.evmWallet?.address ?? ''],
    queryFn: () =>
      post(ratelApi.users.updateEvmAddress(), {
        update_evm_address: {
          evm_address: auth.evmWallet!.address,
        },
      }),
  });

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
            {feeds
              .filter(
                (d) =>
                  !(
                    checkString(d.title) ||
                    checkString(d.contents) ||
                    checkString(d.author_name)
                  ),
              )
              .map((props) => (
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

      {/* Right Sidebar */}
      <div className="w-80 pl-4 max-tablet:!hidden">
        {/* Hot Promotion */}

        <div>
          <CreatePostButton />
          <BlackBox>
            <div className="flex flex-col gap-2.5">
              <h3 className="font-bold text-white text-[15px]/[20px]">
                Hot Promotion
              </h3>
              <Link
                href={
                  feed?.spaces.length > 0
                    ? route.spaceById(feed.spaces[0].id)
                    : route.threadByFeedId(feed.id)
                }
                className="flex items-center gap-2.5 hover:bg-btn-hover rounded p-2 transition-colors"
              >
                {/* <img
                  src={promotion.image_url}
                  alt={promotion.name}
                  className="w-[60px] h-[60px] rounded object-cover cursor-pointer"
                  
                /> */}

                <Image
                  src={promotion.image_url}
                  alt={promotion.name}
                  width={60}
                  height={60}
                  className="rounded object-cover cursor-pointer"
                />
                <div>
                  <div className="font-medium text-white text-base/[25px]">
                    {promotion.name}
                  </div>
                </div>
              </Link>
            </div>
          </BlackBox>
        </div>

        <News />

        <div className="mt-[10px]">
          <BlackBox>
            <h3 className="font-medium mb-3">Suggested</h3>

            <div className="flex flex-col gap-[35px]">
              {suggestions.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col items-start justify-start gap-3"
                >
                  <div className="flex flex-row gap-[10px]">
                    {user.user_type == UserType.Team ? (
                      user.profile_url ? (
                        <Image
                          width={32}
                          height={32}
                          src={user.profile_url || '/default-profile.png'}
                          alt="Profile"
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-neutral-500" />
                      )
                    ) : user.profile_url ? (
                      <Image
                        width={32}
                        height={32}
                        src={user.profile_url || '/default-profile.png'}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-neutral-500" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-base/[25px] text-white">
                        {user.username}
                      </div>
                      <div className="font-light text-xs text-neutral-300">
                        {user.email}
                      </div>
                      <button
                        className="font-bold text-xs text-white rounded-full bg-neutral-700 px-[15px] py-[8px] mt-[10px]"
                        onClick={async () => {
                          logger.debug(
                            'follow button clicked user id: ',
                            user.id,
                          );
                          try {
                            await handleFollow(user.id);
                            data.refetch();
                            network.refetch();

                            showSuccessToast('success to follow user');
                          } catch (err) {
                            showErrorToast('failed to follow user');
                            logger.error(
                              'failed to follow user with error: ',
                              err,
                            );
                          }
                        }}
                      >
                        + Follow
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={route.myNetwork()}
              className="mt-5 text-xs text-gray-400 flex items-center"
            >
              <span>View all</span>
              <ChevronRight size={14} />
            </Link>
          </BlackBox>
        </div>
      </div>
    </div>
  );
}

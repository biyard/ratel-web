'use client';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import FeedCard from '@/components/feed-card';
import { usePost } from './_hooks/use-posts';
import { Col } from '@/components/ui/col';
import { useSuspenseUserInfo } from '@/lib/api/hooks/users';
import { config } from '@/config';
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

export interface Post {
  id: number;
  industry: string;
  title: string;
  contents: string;
  url?: string;
  author_id: number;
  author_profile_url: string;
  author_name: string;
  space_id?: number;
  likes: number;
  comments: number;
  rewards: number;
  shares: number;
  created_at: number;
}

export default function Home() {
  // const { post } = useApiCall();

  const posts = usePost(1, 20);
  const { data: promotion } = usePromotion();
  const { data: userInfo } = useSuspenseUserInfo();
  const user_id = userInfo != null ? userInfo.id || 0 : 0;
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
          space_id: item.spaces?.length ? item.spaces[0].id : 0,
          likes: item.likes,
          comments: item.comments,
          rewards: item.rewards,
          shares: item.shares,
          created_at: item.created_at,
        }))
      : [];

  return (
    <div className="flex-1 flex relative">
      <Col className="flex-1 flex max-mobile:px-[10px]">
        {feeds.length != 0 ? (
          <Col className="flex-1 border-r border-gray-800">
            {feeds.map((props) => (
              <FeedCard
                key={`feed-${props.id}`}
                user_id={userInfo.id ?? 0}
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
      <div className="w-80 pl-4 max-tablet:!hidden">
        {/* Hot Promotion */}

        <div>
          <BlackBox>
            <div className="flex flex-col gap-2.5">
              <h3 className="font-bold text-white text-[15px]/[20px]">
                Hot Promotion
              </h3>
              <div className="flex items-center gap-2.5">
                <img
                  src={promotion.image_url}
                  alt={promotion.name}
                  className="w-[60px] h-[60px] rounded object-cover cursor-pointer"
                />
                <div>
                  <div className="font-medium text-white text-base/[25px]">
                    {promotion.name}
                  </div>
                </div>
              </div>
            </div>
          </BlackBox>
        </div>

        <News />

        {/* Add to your feed */}
        <div
          className="mt-6 hidden aria-show:block"
          aria-show={config.experiment}
        >
          <h3 className="font-medium mb-3">Add to your feed</h3>

          <div className="mb-3 flex items-center gap-3">
            <Image
              src="/trump.jpg?height=40&width=40"
              alt="Donald Trump"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1">
              <div className="font-medium text-sm">Donald Trump</div>
              <div className="text-xs text-gray-400">President of the US</div>
            </div>
            <button className="text-xs bg-gray-700 rounded-full px-3 py-1">
              + Follow
            </button>
          </div>

          <div className="mb-3 flex items-center gap-3">
            <Image
              src="/elon.png?height=40&width=40"
              alt="Elon Musk"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1">
              <div className="font-medium text-sm">Elon Musk</div>
              <div className="text-xs text-gray-400">
                CEO of Tesla and SpaceX
              </div>
            </div>
            <button className="text-xs bg-gray-700 rounded-full px-3 py-1">
              + Follow
            </button>
          </div>

          <div className="mb-3 flex items-center gap-3">
            <Image
              src="/jongsook.png?height=40&width=40"
              alt="Jongsook Park"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1">
              <div className="font-medium text-sm">Jongsook Park</div>
              <div className="text-xs text-gray-400">National Assembly of</div>
            </div>
            <button className="text-xs bg-gray-700 rounded-full px-3 py-1">
              + Follow
            </button>
          </div>

          <div className="mt-2 text-xs text-gray-400 flex items-center">
            <span>View all</span>
            <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}

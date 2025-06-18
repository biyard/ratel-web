import Image from 'next/image';
import News from './News';
import BlackBox from './black-box';
import Link from 'next/link';
import { route } from '@/route';
import { config } from '@/config';
import { ChevronRight } from 'lucide-react';
import { usePromotion } from '../_hooks/use_promotion';
import { useFeedByID } from '../_hooks/use-feed';

export default function NewSideBar() {
  const { data: promotion } = usePromotion();
  const { data: feed } = useFeedByID(promotion.feed_id);

  return (
    <div className="w-80 pl-4 max-tablet:!hidden">
      {/* Hot Promotion */}

      <div>
        <BlackBox>
          <div className="flex flex-col gap-2.5">
            <h3 className="font-bold text-white text-[15px]/[20px]">
              Hot Promotion
            </h3>
            <Link
              href={
                feed.spaces.length > 0
                  ? route.spaceById(feed.spaces[0].id)
                  : route.threadByFeedId(feed.id)
              }
              className="flex items-center gap-2.5 hover:bg-btn-hover rounded p-2 transition-colors"
            >
              <Image
                src={promotion.image_url}
                alt={promotion.name}
                className="w-[60px] h-[60px] rounded object-cover cursor-pointer"
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

      {/* Add to your feed */}
      <div
        className="mt-6 block aria-hidden:hidden"
        aria-hidden={!config.experiment}
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
            <div className="text-xs text-gray-400">CEO of Tesla and SpaceX</div>
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
  );
}

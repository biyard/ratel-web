'use client';
import Image from 'next/image';
import { Award, ChevronRight } from 'lucide-react';
import FeedCard from '@/components/feed-card';
import { usePost } from './_hooks/use-posts';
import { logger } from '@/lib/logger';
import { Col } from '@/components/ui/col';

export interface Post {
  id: number;
  industry: string;
  title: string;
  contents: string;
  url?: string;
  author_profile_url: string;
  author_name: string;
  likes: number;
  comments: number;
  rewards: number;
  shares: number;
  created_at: number;
}

export default function Home() {
  const { data } = usePost(1, 20);
  logger.debug('query response of posts', data);

  const feeds: Post[] = data.items.map((item) => ({
    id: item.id,
    industry: item.industry[0].name, // FIXME:replace with actual industry
    title: item.title!,
    contents: item.html_contents,
    url: item.url,
    // FIXME: default image
    author_profile_url: item.author[0].profile_url!,
    author_name: item.author[0].nickname,

    likes: item.likes,
    comments: item.comments,
    rewards: item.rewards,
    shares: item.shares,
    created_at: item.created_at,
  }));

  return (
    <div className="flex-1 flex">
      <Col className="flex-1 border-r border-gray-800">
        {feeds.map((props) => (
          <FeedCard key={`feed-${props.id}`} {...props} />
        ))}
      </Col>

      {/* Right Sidebar */}
      <div className="w-80 p-4">
        {/* Hot Promotion */}
        <div>
          <h3 className="font-medium mb-3">Hot Promotion</h3>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded bg-blue-500 flex items-center justify-center">
                <Award size={16} />
              </div>
              <div>
                <div className="font-medium">Presidential Election</div>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400 flex items-center">
              <span>View all</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>

        {/* News */}
        <div className="mt-6">
          <h3 className="font-medium mb-3">News</h3>

          <div className="mb-4">
            <h4 className="font-medium text-sm">
              Ratel' Launches Digital Asset Policy Comparison Feature Ahead of
              2025 Election
            </h4>
            <p className="text-xs text-gray-400 mt-1">
              Ratel, a blockchain-based legislative social media platform, has
              introduced a new feature that allows voters to...
            </p>
            <div className="mt-1 text-xs text-gray-400 flex items-center">
              <span>View Detail</span>
              <ChevronRight size={14} />
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-medium text-sm">
              Legislative Platform 'Ratel' Records Public Opinion on Election
              Pledges via Blockchain
            </h4>
            <p className="text-xs text-gray-400 mt-1">
              Ratel, a blockchain-based social media platform, has launched a
              new feature ahead of South Korea's 2025...
            </p>
            <div className="mt-1 text-xs text-gray-400 flex items-center">
              <span>View Detail</span>
              <ChevronRight size={14} />
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-medium text-sm">
              Decentralized Legislative Platform 'RATEL' Leads Crypto Regulatory
              Reform in South Korea
            </h4>
            <p className="text-xs text-gray-400 mt-1">
              RATEL is the world's first decentralized legislative DAO platform
              empowering communities to propose and monitor...
            </p>
            <div className="mt-1 text-xs text-gray-400 flex items-center">
              <span>View Detail</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>

        {/* Add to your feed */}
        <div className="mt-6">
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

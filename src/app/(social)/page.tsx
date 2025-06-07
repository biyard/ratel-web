'use client';

import Image from 'next/image';
import {
  Award,
  MoreHorizontal,
  ChevronRight,
  Star,
  MessageSquare,
  Building,
  Eye,
  Repeat,
} from 'lucide-react';
import FeedCard from '@/components/feed-card';

export default function Home() {
  const feeds = [
    {
      id: 1,
      industry: 'Crypto',
      title: 'DAO Treasury Transparency Act & Crypto Investor Protection Act',
      contents:
        'Explore powerful artworks that amplify voices for equality, diversity, and justice. This collection brings...',
      url: '/post-placeholder.jpg?height=300&width=500',
      author_profile_url:
        'https://metadata.ratel.foundation/metadata/0faf45ec-35e1-40e9-bff2-c61bb52c7d19',
      author_name: 'Miner Choi',

      likes: 10,
      comments: 100,
      rewards: 221000,
      shares: 403,
      created_at: 0,
    },
  ];

  return (
    <div className="flex-1 flex">
      {/* Feed */}
      <div className="flex-1 border-r border-gray-800">
        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <div className="px-6 py-3 text-sm font-medium">For you</div>
          <div className="px-6 py-3 text-sm text-gray-400">Following</div>
        </div>

        {/* Post Input */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex gap-3">
            <Image
              src="/profile.png?height=40&width=40"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <input
              type="text"
              placeholder="Discuss legislation. Drive change."
              className="w-full bg-gray-800 rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#fcb300]"
            />
            {/* <div className="flex-1 bg-gray-800 rounded-full px-4 py-2 text-gray-400 text-sm">
                                    Discuss legislation. Drive change.
                                </div> */}
          </div>
        </div>

        {/* Posts */}
        {feeds.map((props) => (
          <FeedCard {...props}> </FeedCard>
        ))}
      </div>

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

import { Suspense } from 'react';
import Image from 'next/image';
import UsFlag from '@/assets/icons/flags/us.svg';
import {
  Users,
  ChevronDown,
  ChevronRight,
  Star,
  MessageSquare,
  Building,
} from 'lucide-react';

export default function SocialLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen justify-between max-w-6xl mx-auto text-white pt-3">
      {/* Left Sidebar */}
      <div className="w-64 border-r border-gray-800 flex flex-col">
        {/* Group Info */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>[Group name]</span>
              <div className="w-2 h-2 rounded-full bg-[#fcb300]"></div>
            </div>
            <ChevronDown size={16} />
          </div>

          <div className="mt-4 flex flex-col items-center">
            <div className="relative">
              <Image
                src="/profile.png?height=80&width=80"
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full border-2 border-[#fcb300]"
              />
            </div>
            <div className="mt-2 text-center">
              <div className="font-medium">Owner · Kim Heyoung</div>
              <div className="text-xs text-gray-400">Office of Rep</div>
              <div className="text-xs flex items-center justify-center gap-1">
                {/* <div className="w-3 h-2 bg-red-500"></div> */}
                <UsFlag />
                <span>Oregon Unite Side</span>
              </div>
            </div>
          </div>

          {/* Tier */}
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Tier</span>
              <div className="flex items-center gap-1">
                <span className="text-sm">Diamond</span>
                <div className="w-4 h-4 rounded-full bg-[#fcb300] flex items-center justify-center">
                  <Star size={10} className="text-black" />
                </div>
              </div>
            </div>
            <div className="mt-1 h-1 w-full bg-gray-700 rounded-full">
              <div className="h-full w-full bg-[#fcb300] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-2">
          <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-800">
            <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center">
              <Users size={12} />
            </div>
            <span className="text-sm">Profile</span>
          </div>
          <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-800">
            <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center">
              <MessageSquare size={12} />
            </div>
            <span className="text-sm">Threads</span>
          </div>
          <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-800">
            <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center">
              <Users size={12} />
            </div>
            <span className="text-sm">Manage Group</span>
          </div>
          <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-800">
            <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center">
              <Users size={12} />
            </div>
            <span className="text-sm">Settings</span>
          </div>
        </nav>

        {/* Members */}
        <div className="mt-6 px-4">
          <h3 className="text-sm font-medium mb-2">Members</h3>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-2 py-2">
              <Image
                src="/profile.png?height=32&width=32"
                alt="Member"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm">[Nickname]</span>
            </div>
          ))}
          <div className="mt-2 text-xs text-gray-400 flex items-center">
            <span>View all</span>
            <ChevronRight size={14} />
          </div>
        </div>

        {/* Recent */}
        <div className="mt-6 px-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Recent</h3>
            <ChevronDown size={14} />
          </div>
          <div className="mt-2 text-xs text-gray-400">
            <div className="py-1">Crypto/DAO Treasury Transpare...</div>
            <div className="py-1">Crypto/DAO Act Investor</div>
            <div className="py-1">Crypto/DAO Welcome to Protec...</div>
            <div className="mt-1 flex items-center">
              <span>View all</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>

        {/* Spaces */}
        <div className="mt-6 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Building size={14} />
              <h3 className="text-sm font-medium">Spaces</h3>
            </div>
            <ChevronDown size={14} />
          </div>
          <div className="mt-2 text-xs text-gray-400">
            <div className="py-1">Crypto/DAO Treasury Transpare...</div>
            <div className="py-1">Crypto/DAO Act Investor</div>
            <div className="py-1">Crypto/DAO Welcome to Protec...</div>
            <div className="mt-1 flex items-center">
              <span>View all</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>

        {/* Saved */}
        <div className="mt-6 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <MessageSquare size={14} />
              <h3 className="text-sm font-medium">Saved</h3>
            </div>
            <ChevronDown size={14} />
          </div>
          <div className="mt-2 text-xs text-gray-400">
            <div className="py-1">Crypto/DAO Treasury Transpare...</div>
            <div className="py-1">Crypto/DAO Act Investor</div>
            <div className="py-1">Crypto/DAO Welcome to Protec...</div>
            <div className="mt-1 flex items-center">
              <span>View all</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}

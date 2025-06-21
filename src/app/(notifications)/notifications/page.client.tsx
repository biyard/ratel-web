'use client';

import {
  MessageCircle,
  RotateCcw,
  MoreHorizontal,
  Warehouse,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';

export default function NotificationClientPage() {
  const [activeTab, setActiveTab] = useState<'notification' | 'message'>(
    'notification',
  );
  return (
    <div className="col-span-2 space-y-4">
      {/* Tab Headers */}
      <div className="bg-[#1e1e1e] px-6 py-4 rounded-t-lg">
        <div className="grid grid-cols-2 gap-0">
          <div className="flex justify-center">
            <button
              onClick={() => setActiveTab('notification')}
              className={`text-xl font-semibold transition-colors relative ${
                activeTab === 'notification'
                  ? 'text-white'
                  : 'text-[#737373] hover:text-white'
              }`}
            >
              Notification
              {activeTab === 'notification' && (
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-[#fcb300] rounded-full"></div>
              )}
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setActiveTab('message')}
              className={`text-xl font-semibold transition-colors relative ${
                activeTab === 'message'
                  ? 'text-white'
                  : 'text-[#737373] hover:text-white'
              }`}
            >
              Message
              {activeTab === 'message' && (
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-[#fcb300] rounded-full"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'notification' && (
        <div className="px-6 py-4 rounded-b-lg space-y-6 bg-component-bg">
          {/* Filter Tabs */}
          <div className="bg-[#262626] rounded-full p-1 flex justify-between items-center text-sm w-full">
            <button className="bg-white text-black px-6 py-2 rounded-full font-medium">
              All
            </button>
            <button className="text-[#737373] hover:text-white px-4 py-2 flex items-center gap-2 transition-colors">
              <RotateCcw className="w-4 h-4" />
              Replies
            </button>
            <button className="text-[#737373] hover:text-white px-4 py-2 flex items-center gap-2 transition-colors">
              <span className="text-base">@</span>
              Mention
            </button>
            <button className="text-[#737373] hover:text-white px-4 py-2 flex items-center gap-2 transition-colors">
              <Warehouse className="w-4 h-4" />
              Spaces
            </button>
          </div>

          {/* Notification Items */}
          <div className="space-y-4">
            {/* Keep all the existing notification items here */}
            <div className="flex items-start gap-3 p-3 hover:bg-[#1e1e1e] rounded-lg">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="bg-white text-[#737373]">C</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">[Community]</span>
                  <span className="text-[#737373] text-sm">
                    We've updated the Community.
                  </span>
                </div>
                <p className="text-[#737373] text-sm">
                  User name left a comment in the community.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#737373] text-xs">12hrs ago</span>
                <MoreHorizontal className="w-4 h-4 text-[#737373]" />
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 hover:bg-[#1e1e1e] rounded-lg">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-xs">S</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">[Space]</span>
                  <span className="text-[#737373] text-sm">
                    We've updated the space.
                  </span>
                </div>
                <p className="text-[#737373] text-sm">
                  User name left a comment in the space.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#737373] text-xs">12hrs ago</span>
                <MoreHorizontal className="w-4 h-4 text-[#737373]" />
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 hover:bg-[#1e1e1e] rounded-lg">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-white">U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">[User name]</span>
                  <span className="text-[#737373] text-sm">
                    We are planning to launch for our project next.
                  </span>
                </div>
                <p className="text-[#737373] text-sm">
                  Replies in [Community name]
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#737373] text-xs">12hrs ago</span>
                <MoreHorizontal className="w-4 h-4 text-[#737373]" />
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 hover:bg-[#1e1e1e] rounded-lg">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-white">U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">[User name]</span>
                  <span className="text-[#737373] text-sm">
                    We are planning to launch for our project next.
                  </span>
                </div>
                <p className="text-[#737373] text-sm">
                  Mention in [Space name]
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#737373] text-xs">12hrs ago</span>
                <MoreHorizontal className="w-4 h-4 text-[#737373]" />
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 hover:bg-[#1e1e1e] rounded-lg">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-xs">C</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">[Community]</span>
                  <span className="text-[#737373] text-sm">
                    We've updated the Community.
                  </span>
                </div>
                <p className="text-[#737373] text-sm">
                  User name left a comment in the community.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#737373] text-xs">12hrs ago</span>
                <MoreHorizontal className="w-4 h-4 text-[#737373]" />
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 hover:bg-[#1e1e1e] rounded-lg">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-xs">S</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">[Space]</span>
                  <span className="text-[#737373] text-sm">
                    We've updated the space.
                  </span>
                </div>
                <p className="text-[#737373] text-sm">
                  User name left a comment in the space.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#737373] text-xs">12hrs ago</span>
                <MoreHorizontal className="w-4 h-4 text-[#737373]" />
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 hover:bg-[#1e1e1e] rounded-lg">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-white text-[#737373]">
                  U
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">[User name]</span>
                  <span className="text-[#737373] text-sm">
                    We are planning to launch for our project next.
                  </span>
                </div>
                <p className="text-[#737373] text-sm">
                  Replies in [Community name]
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#737373] text-xs">12hrs ago</span>
                <MoreHorizontal className="w-4 h-4 text-[#737373]" />
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 hover:bg-[#1e1e1e] rounded-lg">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-white text-[#737373]">
                  U
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">[User name]</span>
                  <span className="text-[#737373] text-sm">
                    We are planning to launch for our project next.
                  </span>
                </div>
                <p className="text-[#737373] text-sm">
                  Replies in [Space name]
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#737373] text-xs">12hrs ago</span>
                <MoreHorizontal className="w-4 h-4 text-[#737373]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'message' && (
        <div className="space-y-4">
          <div className="h-96 flex items-center justify-center text-[#737373]">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-[#404040]" />
              <p>No messages yet</p>
              <p className="text-sm mt-2">Start a conversation with someone</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

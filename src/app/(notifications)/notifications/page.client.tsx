'use client';

import {
  MessageCircle,
  RotateCcw,
  MoreHorizontal,
  Warehouse,
  Phone,
  Video,
  MoreVertical
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';
import { notifications } from './data';

export default function NotificationClientPage() {
  const [activeTab, setActiveTab] = useState<'notification' | 'message'>(
    'notification',
  );
  return (
    <div className="col-span-2 space-y-4">
      {/* Tab Headers */}
      <div className="bg px-6 py-4 rounded-t-lg">
        <div className="grid grid-cols-2 gap-0">
          <div className="flex justify-center">
            <button
              onClick={() => setActiveTab('notification')}
              className={`text-xl font-semibold transition-colors relative ${activeTab === 'notification'
                  ? 'text-white'
                  : 'text-neutral-500 hover:text-white'
                }`}
            >
              Notification
              {activeTab === 'notification' && (
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></div>
              )}
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setActiveTab('message')}
              className={`text-xl font-semibold transition-colors relative ${activeTab === 'message'
                  ? 'text-white'
                  : 'text-neutral-500 hover:text-white'
                }`}
            >
              Message
              {activeTab === 'message' && (
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'notification' && (
        <div className="px-6 py-4 rounded-b-lg space-y-6 bg-component-bg">
          {/* Filter Tabs */}
          <div className="bg-neutral-800 rounded-full p-1 flex justify-between items-center text-sm w-full">
            <button className="bg-white text-black px-6 py-2 rounded-full font-medium">
              All
            </button>
            <button className="text-neutral-500 hover:text-white px-4 py-2 flex items-center gap-2 transition-colors">
              <RotateCcw className="w-4 h-4" />
              Replies
            </button>
            <button className="text-neutral-500 hover:text-white px-4 py-2 flex items-center gap-2 transition-colors">
              <span className="text-base">@</span>
              Mention
            </button>
            <button className="text-neutral-500 hover:text-white px-4 py-2 flex items-center gap-2 transition-colors">
              <Warehouse className="w-4 h-4" />
              Spaces
            </button>
          </div>

          {/* Notification Items */}
          {notifications.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3 hover:bg rounded-lg"
            >
              {item.type === 'User' ? (
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-white text-neutral-500">
                    {item.icon}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-xs text-neutral-500">{item.icon}</span>
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{item.title}</span>
                  <span className="text-neutral-500 text-sm">
                    {item.message}
                  </span>
                </div>
                <p className="text-neutral-500 text-sm">{item.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-neutral-500 text-xs">{item.timeAgo}</span>
                <MoreHorizontal className="w-4 h-4 text-neutral-500" />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'message' && (
        <div className="grid grid-cols-2 gap-6">
          {/* Notification Section */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#737373] w-4 h-4" />
              <Input
                placeholder="Search"
                className="pl-10 bg-[#262626] border-[#404040] text-white placeholder-[#737373] w-full"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 text-sm overflow-x-auto">
              <button className="bg-white text-black px-4 py-2 rounded-full font-medium whitespace-nowrap">
                All
              </button>
              <button className="text-[#737373] hover:text-white px-3 py-2 whitespace-nowrap">Unread</button>
              <button className="text-[#737373] hover:text-white px-3 py-2 whitespace-nowrap">
                My Connections
              </button>
              <button className="text-[#737373] hover:text-white px-3 py-2 whitespace-nowrap">Other</button>
              <button className="text-[#737373] hover:text-white px-3 py-2 whitespace-nowrap">Archived</button>
              <button className="text-[#737373] hover:text-white px-2 py-2">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Notification List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-2 hover:bg-[#262626] rounded-lg transition-colors cursor-pointer group"
                  onClick={() => console.log(`Clicked notification from User ${i + 1}`)}
                >
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarFallback className="bg-[#404040] text-white text-sm">U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-medium text-white text-sm group-hover:text-[#fcb300] transition-colors cursor-pointer">
                        [User name]
                      </p>
                      <span className="text-[#737373] text-xs whitespace-nowrap">12hrs ago</span>
                    </div>
                    <p className="text-[#737373] text-xs group-hover:text-[#a1a1a1] transition-colors">
                      Hey Where's your computer scienc...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Section */}
          <div className="flex flex-col">
            {/* Message Header */}
            <div className="flex items-center justify-end gap-4 mb-4">
              <Phone className="w-5 h-5 text-[#737373] cursor-pointer hover:text-white" />
              <Video className="w-5 h-5 text-[#737373] cursor-pointer hover:text-white" />
              <MessageCircle className="w-5 h-5 text-[#737373] cursor-pointer hover:text-white" />
              <MoreVertical className="w-5 h-5 text-[#737373] cursor-pointer hover:text-white" />
            </div>

            {/* Message Content */}
            <div className="flex flex-col items-center justify-center flex-1 min-h-96">
              <div className="w-20 h-20 bg-[#262626] rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="w-10 h-10 text-[#404040]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Your messages</h3>
              <p className="text-[#737373] text-center mb-6">Send a message to start a chat.</p>
              <Button className="bg-white text-black hover:bg-gray-200 px-8 py-2 rounded-full font-medium">
                Send Message
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

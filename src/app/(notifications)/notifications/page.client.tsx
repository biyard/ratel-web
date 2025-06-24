'use client';

import {
  MessageCircle,
  RotateCcw,
  MoreHorizontal,
  Warehouse,
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
                  <span className="text-neutral-500 text-sm">{item.message}</span>
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
        <div className="space-y-4">
          <div className="h-96 flex items-center justify-center text-neutral-500">
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

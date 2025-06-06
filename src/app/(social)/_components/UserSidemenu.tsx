'use client';
import React from 'react';
import ProfileSection from './profile-section';
import { Users, MessageSquare } from 'lucide-react';
import RecentActivities from './RecentActivities';
import Spaces from './Spaces';
import Saved from './Saved';
import { useUserInfo } from '@/lib/api/hooks/users';

export default function UserSidemenu() {
  const { data: user, isLoading } = useUserInfo();
  if (isLoading || !user) {
    return <div />;
  }

  return (
    <div className="w-64 border-r border-gray-800 flex flex-col">
      <ProfileSection user={user} />

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

      <RecentActivities />

      <Spaces />

      <Saved />
    </div>
  );
}

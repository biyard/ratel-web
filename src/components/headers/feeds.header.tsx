'use client';

import React, { useState } from 'react';

import Logo from '@/assets/icons/logo.svg';
// import HomeIcon from '@/assets/icons/home.svg';
import UserGroupIcon from '@/assets/icons/user-group.svg';
import InternetIcon from '@/assets/icons/internet.svg';
import RoundBubbleIcon from '@/assets/icons/round-bubble.svg';
import BellIcon from '@/assets/icons/bell.svg';
import SearchInput from './search-input';
import ProfileServerComponent from './profile-server';
import Image from "next/image"
import {
  Search,
  Award,
  Users,
  Bell,
  ChevronDown,
  MoreHorizontal,
  ChevronRight,
  Star,
  MessageSquare,
  Building,
  Eye,
  Repeat,
} from "lucide-react"
import { HomeIcon } from "lucide-react"

function FeedHeader() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const navItems = [
    { name: 'Home', icon: <HomeIcon />, route: '/home' },
    { name: 'Explore', icon: <InternetIcon />, route: '/explore' },
    { name: 'My Network', icon: <UserGroupIcon />, route: '/network' },
    { name: 'Message', icon: <RoundBubbleIcon />, route: '/messages' },
    { name: 'Notification', icon: <BellIcon />, route: '/notifications' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 h-14 justify-between max-w-6xl mx-auto border-b border-gray-800 flex items-center px-4 z-10">
        <div className="flex items-center gap-2 mr-6">
          <Logo className="size-14 shrink-0" />
        </div>

        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-800 rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#fcb300]"
          />
        </div>

        <div className="ml-auto flex items-center gap-8">
          <div className="flex flex-col items-center">
            <HomeIcon size={20} className="text-gray-400 hover:text-white" />
            <span className="text-xs text-gray-400 mt-1">Home</span>
          </div>
          <div className="flex flex-col items-center">
            <Award size={20} className="text-gray-400 hover:text-white" />
            <span className="text-xs text-gray-400 mt-1">Presidential Election</span>
          </div>
          <div className="flex flex-col items-center">
            <Users size={20} className="text-gray-400 hover:text-white" />
            <span className="text-xs text-gray-400 mt-1">Politician Stance</span>
          </div>
          <div className="flex flex-col items-center">
            <Bell size={20} className="text-gray-400 hover:text-white" />
            <span className="text-xs text-gray-400 mt-1">Notification</span>
          </div>
          <div className="flex flex-col items-center">
          <Image
                src="/profile.png?height=80&width=80"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full border-2 border-[#fcb300]"
            />
          </div>
        </div>
      </div>
  );
}

export default FeedHeader;

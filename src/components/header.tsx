'use client';

import React, { useState } from 'react';

import Logo from '@/assets/icons/logo.svg';
import HomeIcon from '@/assets/icons/home.svg';
import UserGroupIcon from '@/assets/icons/user-group.svg';
import InternetIcon from '@/assets/icons/internet.svg';
import RoundBubbleIcon from '@/assets/icons/round-bubble.svg';
import BellIcon from '@/assets/icons/bell.svg';
import SearchInput from './search-input';
import ProfileServerComponent from './profile-server';
import Link from 'next/link';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const navItems = [
    { name: 'Home', icon: <HomeIcon />, href: '/' },
    { name: 'Explore', icon: <InternetIcon />, href: '/explore' },
    { name: 'My Network', icon: <UserGroupIcon />, href: '/my-network' },
    { name: 'Message', icon: <RoundBubbleIcon />, href: '/messages' },
    { name: 'Notification', icon: <BellIcon />, href: '/notifications' },
  ];

  return (
    <header className="bg-neutral-900 border-b border-neutral-800 px-0 py-2.5">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        <Logo className="size-14 shrink-0" />
        <SearchInput
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search"
        />

        <div className="flex items-center gap-2.5">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex flex-col items-center justify-center px-2.5 py-2.5 hover:bg-neutral-800 rounded-lg transition-colors group"
            >
              <div className="relative">
                {React.cloneElement(item.icon, {
                  className:
                    'stroke-neutral-400 group-hover:stroke-white transition-colors',
                })}
                {item.name === 'Notification' && 0 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                )}
              </div>
              <span className="text-neutral-400 group-hover:text-white text-[15px] font-medium mt-1 transition-colors">
                {item.name}
              </span>
            </Link>
          ))}

          <ProfileServerComponent />
        </div>
      </nav>
    </header>
  );
}

export default Header;

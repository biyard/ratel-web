'use client';

/* import React, { useState } from 'react'; */

import Logo from '@/assets/icons/logo.svg';
import HomeIcon from '@/assets/icons/home.svg';
import UserGroupIcon from '@/assets/icons/user-group.svg';
import InternetIcon from '@/assets/icons/internet.svg';
import RoundBubbleIcon from '@/assets/icons/round-bubble.svg';
import BellIcon from '@/assets/icons/bell.svg';
/* import SearchInput from './search-input'; */
import ProfileServerComponent from './profile-server';
import Link from 'next/link';

function Header() {
  /* const [searchQuery, setSearchQuery] = useState('');

* const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
*   setSearchQuery(e.target.value);
* }; */

  const navItems = [
    {
      name: 'Home',
      icon: (
        <HomeIcon
          className="group-hover:[&>path]:stroke-white transition-all"
          width="24"
          height="24"
        />
      ),
      href: '/',
    },
    {
      name: 'Explore',
      icon: (
        <InternetIcon
          className="group-hover:[&>path]:stroke-white group-hover:[&>circle]:stroke-white transition-all"
          width="24"
          height="24"
        />
      ),
      href: '/explore',
    },
    {
      name: 'My Network',
      icon: (
        <UserGroupIcon
          className="group-hover:[&>path]:stroke-white transition-all"
          width="24"
          height="24"
        />
      ),
      href: '/my-network',
    },
    {
      name: 'Message',
      icon: (
        <RoundBubbleIcon
          className="group-hover:[&>path]:stroke-white transition-all"
          width="24"
          height="24"
        />
      ),
      href: '/messages',
    },
    {
      name: 'Notification',
      icon: (
        <BellIcon
          className="group-hover:[&>path]:stroke-white transition-all"
          width="24"
          height="24"
        />
      ),
      href: '/notifications',
    },
  ];

  return (
    <header className="border-b border-neutral-800 px-10 py-10 flex items-center justify-center">
      <nav className="flex items-center justify-between mx-10 gap-50 w-full max-w-desktop">
        <div className="flex items-center gap-20">
          <Logo width="54" height="54" />
          {/* <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search"
          /> */}
        </div>

        <div className="flex items-center gap-10">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex flex-col items-center justify-center group p-10"
            >
              {item.icon}
              <span className="whitespace-nowrap text-neutral-500 group-hover:text-white text-[15px] font-medium transition-all">
                {' '}
                {item.name}{' '}
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

'use client';
import React, { useState } from 'react';

import Logo from '@/assets/icons/logo.svg';
import HomeIcon from '@/assets/icons/home.svg';
import UserGroupIcon from '@/assets/icons/user-group.svg';
import InternetIcon from '@/assets/icons/internet.svg';
import RoundBubbleIcon from '@/assets/icons/round-bubble.svg';
import BellIcon from '@/assets/icons/bell.svg';
import Hamburger from '@/assets/icons/hamburger.svg';
import Link from 'next/link';
import Profile from './profile';
import { Modal } from './modal';
import { LoginModal } from './modal/login-modal';

function Header() {
  const [isModalOpen, setModalOpen] = useState(false);

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
    <header className="border-b border-neutral-800 px-10 py-10 flex items-center justify-center !bg-bg">
      <nav className="flex items-center justify-between mx-10 gap-50 w-full max-w-desktop">
        <div className="flex items-center gap-20">
          <Logo width="54" height="54" />
        </div>

        <div className="flex items-center gap-10 max-tablet:hidden">
          {navItems.map((item, index) => (
            <Link
              key={`nav-item-${index}`}
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

          <button
            className="cursor-pointer font-bold text-neutral-500 text-[15px]"
            onClick={() => setModalOpen(true)}
          >
            Sign In
          </button>
          <LoginModal
            isOpen={isModalOpen}
            setModalOpen={setModalOpen}
          ></LoginModal>
          {/* <Profile /> */}
        </div>

        <div className="hidden max-tablet:block">
          <Hamburger />
        </div>
      </nav>
    </header>
  );
}

export default Header;

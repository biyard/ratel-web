'use client';
import React from 'react';

import Logo from '@/assets/icons/logo.svg';
import HomeIcon from '@/assets/icons/home.svg';
import UserGroupIcon from '@/assets/icons/user-group.svg';
import InternetIcon from '@/assets/icons/internet.svg';
import RoundBubbleIcon from '@/assets/icons/round-bubble.svg';
import BellIcon from '@/assets/icons/bell.svg';
import Hamburger from '@/assets/icons/hamburger.svg';
import Link from 'next/link';
import Profile from './profile';
import { LoginModal } from './popup/login-popup';
import { usePopup } from '@/lib/contexts/popup-service';
import { logger } from '@/lib/logger';
import { route } from '@/route';
import { config } from '@/config';
import { useUserInfo } from '@/lib/api/hooks/users';
import { UserType } from '@/lib/api/models/user';

export interface HeaderProps {
  mobileExtends: boolean;
  setMobileExtends: (extend: boolean) => void;
}

function Header(props: HeaderProps) {
  const popup = usePopup();

  const { data, isLoading } = useUserInfo();

  logger.debug('Header data:', data);

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
      visible: true,
      href: route.home(),
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
      visible: config.experiment,
      href: route.explore(),
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
      visible: config.experiment,
      href: route.myNetwork(),
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
      visible: config.experiment,
      href: route.messages(),
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
      visible: config.experiment,
      href: route.notifications(),
    },
  ];

  console.log('profile url: ', data?.profile_url);

  return (
    <header className="border-b border-neutral-800 px-2.5 py-2.5 flex items-center justify-center !bg-bg">
      <nav className="flex items-center justify-between mx-2.5 gap-12.5 w-full max-w-desktop">
        <div className="flex items-center gap-5">
          <Link
            href={route.home()}
            onClick={() => {
              props.setMobileExtends(false);
            }}
          >
            <Logo width="54" height="54" />
          </Link>
        </div>

        <div className="flex items-center gap-2.5 max-tablet:hidden">
          {navItems.map((item, index) => (
            <Link
              key={`nav-item-${index}`}
              href={item.href}
              className="flex flex-col items-center justify-center group p-2.5"
              hidden={!item.visible}
            >
              {item.icon}
              <span className="whitespace-nowrap text-neutral-500 group-hover:text-white text-[15px] font-medium transition-all">
                {' '}
                {item.name}{' '}
              </span>
            </Link>
          ))}

          {!isLoading &&
          data &&
          (data.user_type === UserType.Individual ||
            data?.user_type === UserType.Team) ? (
            <Profile profileUrl={data.profile_url} name={data.nickname} />
          ) : (
            <button
              className="cursor-pointer font-bold text-neutral-500 text-[15px]"
              onClick={() => {
                popup.open(<LoginModal />).withTitle('Join the Movement');
              }}
            >
              Sign In
            </button>
          )}
        </div>

        <div
          className="hidden max-tablet:block"
          onClick={() => {
            props.setMobileExtends(!props.mobileExtends);
          }}
        >
          <Hamburger />
        </div>
      </nav>
    </header>
  );
}

export default Header;

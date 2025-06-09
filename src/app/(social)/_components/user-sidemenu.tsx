'use client';
import React from 'react';
import ProfileSection from './profile-section';

import RecentActivities from './RecentActivities';
import Spaces from './Spaces';
import Saved from './Saved';
import { useUserInfo } from '@/lib/api/hooks/users';
import Link from 'next/link';
import { route } from '@/route';
import { Post, Settings } from '@/components/icons';
// import DevTools from './dev-tools';

export default function UserSidemenu() {
  const { data: user, isLoading } = useUserInfo();
  if (isLoading || !user) {
    return <div />;
  }

  return (
    <div className="w-64 flex flex-col gap-2.5 max-mobile:hidden">
      <ProfileSection />

      {/* Navigation */}
      <nav className="px-2 py-5 px-3 w-full rounded-[10px] bg-component-bg">
        <Link href={route.myPosts()} className="sidemenu-link">
          <Post />
          <span>My Posts</span>
        </Link>
        <Link href={route.settings()} className="sidemenu-link">
          <Settings />
          <span>Settings</span>
        </Link>
      </nav>

      {/* <DevTools /> */}

      <RecentActivities />

      <Spaces />

      <Saved />
    </div>
  );
}

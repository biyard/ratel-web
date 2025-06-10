'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { route } from '@/route';

interface ProfileProps {
  profileUrl?: string;
  name?: string;
}

export default function Profile({ profileUrl, name }: ProfileProps) {
  return (
    <Link
      href={route.settings()}
      className="flex flex-col items-center justify-center p-2.5 group"
    >
      {profileUrl ? (
        <Image
          src={profileUrl || '/default-profile.png'}
          alt="User Profile"
          width={24}
          height={24}
          className="rounded-full object-cover"
        />
      ) : (
        <div className="w-[24px] h-[24px] bg-neutral-500 rounded-full" />
      )}

      <span className="text-neutral-500 group-hover:text-white text-[15px] font-medium transition-colors">
        {name || 'Unknown User'}
      </span>
    </Link>
  );
}

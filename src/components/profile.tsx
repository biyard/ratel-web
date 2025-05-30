import { getUserProfile } from '@/lib/api/get-user-profile';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Image from 'next/image';

interface ProfileProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Profile({ onClick }: ProfileProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user_profile'],
    queryFn: getUserProfile,
  });

  // 로딩 및 에러 상태에 대한 UI를 추가하는 것이 좋습니다.
  if (isLoading) {
    return (
      <div className="flex items-center gap-0.5 p-2 animate-pulse">
        <div className="w-6 h-6 bg-neutral-300 rounded-full"></div>
        <div className="h-4 bg-neutral-300 rounded w-20 mt-1"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-0.5 p-2">
        <div className="w-6 h-6 bg-red-300 rounded-full"></div>
        <span className="text-red-500 text-[15px] font-medium mt-1">Error</span>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center px-2.5 py-2.5 hover:bg-neutral-800 rounded-lg transition-colors group"
    >
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-neutral-600 rounded-full">
          <Image
            src={data?.profile_url || '/default-profile.png'}
            alt="User Profile"
            width={24}
            height={24}
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-neutral-400 group-hover:text-white text-[15px] font-medium transition-colors">
          {data?.name || 'Unknown User'}
        </span>
      </div>
    </button>
  );
}

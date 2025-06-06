'use client';
import { Suspense } from 'react';
import { useUserInfo } from '@/lib/api/hooks/users';
import UserSidemenu from './_components/UserSidemenu';

export default function SocialLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user, isLoading } = useUserInfo();

  return (
    <div className="flex min-h-screen justify-between max-w-6xl mx-auto text-white pt-3">
      {!isLoading && user && <UserSidemenu />}

      <div className="flex-1 flex">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}

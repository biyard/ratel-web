'use client';
import { Suspense } from 'react';
import { useUserInfo } from '@/lib/api/hooks/users';
import UserSidemenu from './_components/user-sidemenu';
import Loading from '../loading';
import { usePathname } from 'next/navigation';

export default function SocialLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user, isLoading } = useUserInfo();
  const pathname = usePathname();
  const hideSideMenu = /^\/spaces\/[^/]+$/.test(pathname || '');

  return (
    <div className="flex min-h-screen gap-5 justify-between max-w-6xl mx-auto text-white py-3 px-2.5">
      {!hideSideMenu && !isLoading && user && <UserSidemenu />}

      <div className="flex-1 flex">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <Loading />
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </div>
  );
}

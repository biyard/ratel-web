'use client';
import { Suspense } from 'react';
import Loading from '@/app/loading';
import { useUserInfo } from '@/lib/api/hooks/users';
import { UserType } from '@/lib/api/models/user';
import UserSidemenu from '../(social)/_components/user-sidemenu';
import { usePathname } from 'next/navigation';

export default function TeamLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isTeamPage = /^\/teams\/[^/]+$/.test(pathname);

  const { data: user, isLoading } = useUserInfo();

  if (isTeamPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen gap-5 justify-between max-w-6xl mx-auto text-white py-3 px-2.5">
      {!isLoading &&
        user &&
        (user.user_type === UserType.Individual ||
          user.user_type === UserType.Team) && <UserSidemenu />}

      <div className="flex-1 flex">
        <Suspense
          fallback={
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
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

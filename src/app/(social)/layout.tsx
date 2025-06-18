'use client';
import { Suspense } from 'react';
import { useUserInfo } from '@/lib/api/hooks/users';
import UserSidemenu from './_components/user-sidemenu';
import Loading from '../loading';
import { UserType } from '@/lib/api/models/user';
import NewSideBar from './_components/news-right-sidebar';
import { CreatePost, PostDraftProvider } from './_components/create-post';

export default function SocialLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user, isLoading } = useUserInfo();

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
          <PostDraftProvider>
            {children}

            <div className="fixed bottom-0 left-0 right-0 z-10 flex flex-row items-center justify-center">
              <div className="max-w-desktop w-full">
                <CreatePost />
              </div>
            </div>
          </PostDraftProvider>
        </Suspense>
        <NewSideBar />
      </div>
    </div>
  );
}

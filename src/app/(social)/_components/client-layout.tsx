'use client';

import { Suspense, useEffect, useState } from 'react';
import Header from '@/components/header';
import Loading from '@/app/loading';
import Link from 'next/link';
import { route } from '@/route';
import { useUserInfo } from '@/lib/api/hooks/users';
import { useAuth } from '@/lib/contexts/auth-context';
import { usePopup } from '@/lib/contexts/popup-service';
import { LoginModal } from '@/components/popup/login-popup';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const popup = usePopup();
  const userInfo = useUserInfo();
  const { data, isLoading } = useUserInfo();
  const { logout } = useAuth();
  const [mobileExtends, setMobileExtends] = useState(false);

  useEffect(() => {
    if (mobileExtends) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileExtends]);

  return (
    <>
      <Header
        mobileExtends={mobileExtends}
        setMobileExtends={setMobileExtends}
      />
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <Loading />
          </div>
        }
      >
        {children}
      </Suspense>
      <div
        className={
          mobileExtends
            ? 'fixed top-[80px] left-0 w-screen h-screen z-20 text-white bg-neutral-800 hidden max-tablet:flex max-tablet:flex-col max-tablet:items-center max-tablet:justify-center gap-[50px]'
            : 'hidden'
        }
      >
        <Link
          href={route.settings()}
          onClick={() => setMobileExtends(false)}
          className="font-bold text-neutral-500 text-[20px] hover:text-primary flex flex-row w-full justify-center items-center"
        >
          {data?.nickname}
        </Link>
        <Link
          href={route.home()}
          onClick={() => setMobileExtends(false)}
          className="font-bold text-neutral-500 text-[20px] hover:text-primary flex flex-row w-full justify-center items-center"
        >
          Home
        </Link>

        {!isLoading && data ? (
          <div
            className="cursor-pointer font-bold text-neutral-500 text-[20px] hover:text-primary flex flex-row w-full justify-center items-center"
            onClick={() => {
              logout();
              userInfo.refetch();
              setMobileExtends(false);
            }}
          >
            Logout
          </div>
        ) : (
          <button
            className="cursor-pointer font-bold text-neutral-500 text-[20px] hover:text-primary flex flex-row w-full justify-center items-center"
            onClick={() => {
              popup.open(<LoginModal />).withTitle('Join the Movement');
            }}
          >
            Sign In
          </button>
        )}
      </div>
    </>
  );
}

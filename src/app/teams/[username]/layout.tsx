import { Suspense } from 'react';
import Loading from '@/app/loading';
import { logger } from '@/lib/logger';
import TeamSidemenu from './_components/team-sidemenu';

export interface TeamLayoutProps {
  params: Promise<{ username: string }>;
}

export default async function TeamLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
}> &
  TeamLayoutProps) {
  const { username } = await params;
  logger.debug('TeamLayout: username', username);

  return (
    <div className="flex min-h-screen justify-between max-w-6xl mx-auto text-white pt-3 gap-[20px]">
      <TeamSidemenu username={username} />
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

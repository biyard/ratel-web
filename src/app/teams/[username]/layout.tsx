import { Suspense } from 'react';
import Loading from '@/app/loading';
import { ratelApi } from '@/lib/api/ratel_api';
import { client } from '@/lib/apollo';
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
  const {
    data: { users },
  } = await client.query(ratelApi.graphql.getTeamByTeamname(username));
  logger.debug('TeamLayout: users', users);

  const [team] = users;
  logger.debug('TeamLayout: team', team);

  return (
    <div className="flex min-h-screen justify-between max-w-6xl mx-auto text-white pt-3">
      <TeamSidemenu team={team} />
      <div className="flex-1 flex">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}

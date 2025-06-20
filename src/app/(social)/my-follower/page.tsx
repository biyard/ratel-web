import PageClient from './page.client';

export enum FollowType {
  FOLLOWER = 'followers',
  FOLLOWING = 'followings',
}

type Props = {
  searchParams: Promise<{ type?: FollowType }>;
};

export default async function Page({ searchParams }: Props) {
  const { type } = await searchParams;
  const selectedType = type || FollowType.FOLLOWER;

  return <PageClient type={selectedType} />;
}

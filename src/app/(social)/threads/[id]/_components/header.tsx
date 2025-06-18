'use client';

import { useFeedByID } from '@/app/(social)/_hooks/feed';
import { ArrowLeft } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserType } from '@/lib/api/models/user';
import { getTimeAgo } from '@/lib/time-utils';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { BadgeIcon } from '@/components/icons';

export default function Header({ post_id }: { post_id: number }) {
  const { data: post } = useFeedByID(post_id);

  return (
    <div className="flex flex-col w-full gap-2.5">
      <div>
        <ArrowLeft />
      </div>
      <div className="flex flex-row justify-between">
        <div>
          {post?.industry.map((industry) => (
            <Badge
              key={industry.id}
              variant="outline"
              className="border-c-wg-70 mr-2"
              size="lg"
            >
              {industry.name}
            </Badge>
          ))}
        </div>

        <Button
          variant="rounded_primary"
          className="bg-white text-black px-2 py-1.5"
          onClick={async () => {}}
        >
          <Plus className="size-5" />
          Create a Space
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-bold">{post?.title}</h2>
      </div>
      <div className="flex flex-row justify-between">
        <ProposerProfile
          profileUrl={post?.author[0]?.profile_url ?? ''}
          proposerName={post?.author[0]?.nickname ?? ''}
          userType={post?.author[0]?.user_type || UserType.Individual}
        />
        <div className="font-light text-white text-sm/[14px]">
          {post?.created_at !== undefined ? getTimeAgo(post.created_at) : ''}
        </div>
      </div>
    </div>
  );
}

export function ProposerProfile({
  profileUrl = '',
  proposerName = '',
  userType = UserType.Individual,
}: {
  profileUrl: string;
  proposerName: string;
  userType: UserType;
}) {
  return (
    <div className="flex flex-row w-fit gap-2 justify-between items-center">
      <Image
        src={profileUrl || '/default-profile.png'}
        alt={proposerName}
        width={20}
        height={20}
        className={
          userType == UserType.Team
            ? 'rounded-[8px] object-cover object-top w-[25px] h-[25px]'
            : 'rounded-full object-cover object-top w-[25px] h-[25px]'
        }
      />
      <div className="font-semibold text-white text-sm/[20px]">
        {proposerName}
      </div>
      <BadgeIcon />
    </div>
  );
}

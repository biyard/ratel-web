'use client';
import Loading from '@/app/loading';
import React, { Suspense } from 'react';
import SpaceSideMenu from './_components/space_side_menu';
import CreateCommentBox from './_components/create_comment_box';
import { useSpaceBySpaceId } from '@/app/(social)/_hooks/use-spaces';
import { useParams } from 'next/navigation';
import SpaceComments from './_components/space_comments';
import { useApiCall } from '@/lib/api/use-send';
import { ratelApi } from '@/lib/api/ratel_api';
import { useSuspenseUserInfo } from '@/lib/api/hooks/users';
import { writeCommentRequest } from '@/lib/api/models/feeds/comment';
import { useQueryClient } from '@tanstack/react-query';
import { QK_GET_SPACE_BY_SPACE_ID } from '@/constants';

export default function SpaceByIdLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const queryClient = useQueryClient();
  const params = useParams();
  const spaceId = Number(params.id);
  const { data } = useSpaceBySpaceId(spaceId);
  const { post } = useApiCall();
  const { data: user } = useSuspenseUserInfo();

  const feedId = data.feed_id;

  const handleSubmit = async (contents: string) => {
    await post(
      ratelApi.feeds.comment(),
      writeCommentRequest(contents, user.id, feedId),
    );

    queryClient.invalidateQueries({
      queryKey: [QK_GET_SPACE_BY_SPACE_ID, spaceId],
    });
  };

  return (
    <div className="flex flex-col w-full min-h-screen justify-between max-w-6xl mx-auto text-white pt-3 gap-5 max-tablet:px-5">
      <div className="flex flex-row w-full gap-20">
        <div className="flex-1 flex w-full">
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
        <SpaceSideMenu />
      </div>
      <SpaceComments
        numberOfComments={data.feed_comments.length}
        comments={data.feed_comments}
      />
      <CreateCommentBox handleSubmit={handleSubmit} />
    </div>
  );
}

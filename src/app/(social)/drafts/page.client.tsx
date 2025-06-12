'use client';
import { useSuspenseUserInfo } from '@/lib/api/hooks/users';
import React from 'react';
import { usePostByUserId } from '../_hooks/use-posts';
import { Col } from '@/components/ui/col';
import { logger } from '@/lib/logger';
import { FeedStatus } from '@/lib/api/models/feeds';
import { usePostDraft } from '../_components/create-post';
import CreatePostButton from '../_components/create-post-button';
import { Row } from '@/components/ui/row';
import { FeedContents, IndustryTag, UserBadge } from '@/components/feed-card';
import { UserType } from '@/lib/api/models/user';
import TimeAgo from '@/components/time-ago';

export default function MyPostsPage() {
  const { data: user } = useSuspenseUserInfo();
  const user_id = user?.id || 0;
  const posts = usePostByUserId(user_id, 1, 20, FeedStatus.Draft);
  const data = posts.data;
  logger.debug('query response of posts', data);
  const { setExpand, loadDraft } = usePostDraft();

  const drafts = data?.items.map((item) => ({
    id: item.id,
    title: item.title!,
    updated_at: item.updated_at,
    contents: item.html_contents,
    url: item.url,
  }));

  return (
    <div className="flex flex-1 relative">
      <div className="flex-1 flex max-mobile:px-[10px]">
        {drafts?.length != 0 ? (
          <Col className="flex-1">
            {drafts?.map((props) => (
              <Col
                key={props.id}
                className="cursor-pointer pt-5 pb-2.5 bg-component-bg rounded-lg"
                onClick={(evt) => {
                  loadDraft(props.id);
                  setExpand(true);
                  evt.preventDefault();
                  evt.stopPropagation();
                }}
              >
                <Row className="justify-between px-5">
                  <Row>
                    <IndustryTag industry={'CRYPTO'} />
                  </Row>
                </Row>
                <div className="flex flex-row items-center gap-1 w-full line-clamp-2 font-bold text-xl/[25px] tracking-[0.5px] align-middle text-white px-5">
                  <div className="text-sm font-normal">(Draft)</div>
                  <div className="font-normal">{props.title}</div>
                </div>
                <Row className="justify-between items-center px-5">
                  <UserBadge
                    profile_url={user.profile_url ?? ''}
                    name={user.username}
                    author_type={UserType.Individual}
                  />
                  <TimeAgo timestamp={props.updated_at} />
                </Row>
                <Row className="justify-between px-5"></Row>
                <FeedContents contents={props.contents} url={props.url} />
              </Col>
            ))}
          </Col>
        ) : (
          <div className="flex flex-row w-full h-fit justify-start items-center px-[16px] py-[20px] border border-gray-500 rounded-[8px] font-medium text-base text-gray-500">
            No drafts available
          </div>
        )}
      </div>

      <div className="w-80 pl-4 max-tablet:!hidden">
        <CreatePostButton />
      </div>
    </div>
  );
}

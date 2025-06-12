'use client';
import { useSuspenseUserInfo } from '@/lib/api/hooks/users';
import React from 'react';
import { usePostByUserId } from '../_hooks/use-posts';
import { Col } from '@/components/ui/col';
import { logger } from '@/lib/logger';
import { FeedStatus } from '@/lib/api/models/feeds';
import { usePostDraft } from '../_components/create-post';

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
    contents: item.html_contents,
    url: item.url,
  }));

  return (
    <div className="flex-1 flex max-mobile:px-[10px]">
      {drafts?.length != 0 ? (
        <Col className="flex-1 border-r border-gray-800">
          {drafts?.map((props) => (
            <div
              key={`feed-${props.id}`}
              className="cursor-pointer bg-component-bg rounded-[10px] px-[16px] py-[12px] mb-[8px] hover:bg-gray-700 transition-colors duration-200 text-white"
              onClick={(evt) => {
                loadDraft(props.id);
                setExpand(true);
                evt.preventDefault();
                evt.stopPropagation();
              }}
            >
              (Draft) <span className="font-extrabold">{props.title}</span>
            </div>
          ))}
        </Col>
      ) : (
        <div className="flex flex-row w-full h-fit justify-start items-center px-[16px] py-[20px] border border-gray-500 rounded-[8px] font-medium text-base text-gray-500">
          No drafts available
        </div>
      )}
    </div>
  );
}

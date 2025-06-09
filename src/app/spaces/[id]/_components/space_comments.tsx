import React from 'react';
import Comment from '@/assets/icons/comment.svg';
import { SpaceComment } from '@/lib/api/models/comments';
import { getTimeAgo } from '@/lib/time-utils';

export interface SpaceCommentsProps {
  numberOfComments: number;
  comments: SpaceComment[];
}

export default function SpaceComments({
  numberOfComments,
  comments,
}: SpaceCommentsProps) {
  return (
    <div className="flex flex-col mt-[20px] gap-[20px]">
      <div className="flex flex-row gap-2 items-center justify-start">
        <Comment width={24} height={24} className="[&>path]:stroke-white" />
        <div className="font-medium text-white text-base/[24px]">
          {numberOfComments.toLocaleString()} Reply
        </div>
      </div>
      {comments.map((comment, index) => (
        <CommentInfo comment={comment} key={'comment ' + index} />
      ))}
    </div>
  );
}

function CommentInfo({ comment }: { comment: SpaceComment }) {
  return (
    <div className="flex flex-col gap-[14px] pb-5 border-b border-b-neutral-800">
      <div className="flex flex-row gap-2 items-center">
        <img
          alt={comment.author[0].nickname ?? ''}
          src={comment.author[0].profile_url ?? ''}
          width={40}
          height={40}
          className="rounded-full object-cover object-top"
        />

        <div className="flex flex-col gap-[2px]">
          <div className="font-semibold text-neutral-300 text-[15px]/[15px]">
            {comment.author[0].nickname ?? ''}
          </div>
          <div className="font-semibold text-xs/[20px] text-[#6d6d6d]">
            {getTimeAgo(comment.created_at)}
          </div>
        </div>
      </div>

      <div className="flex flex-col mx-10 gap-5">
        <div className="font-normal text-neutral-300 text-[15px]/[22.5px]">
          {comment.html_contents}
        </div>

        {/* <div className="flex flex-row w-full justify-end items-center gap-2">
          <ThumbUp
            width={24}
            height={24}
            className="[&>path]:stroke-[#aeaaab]"
          />
          <div className="font-medium text-base/[24px] text-[#aeaaab]">{0}</div>
        </div> */}
      </div>
    </div>
  );
}

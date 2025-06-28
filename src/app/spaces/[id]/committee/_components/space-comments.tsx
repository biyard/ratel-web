'use client';
import Comment from '@/assets/icons/comment.svg';
import { SpaceComment } from '@/lib/api/models/comments';
import { getTimeAgo } from '@/lib/time-utils';
import { useSpaceBySpaceId } from '@/app/(social)/_hooks/use-spaces';
import { checkString } from '@/lib/string-filter-utils';
import Image from 'next/image';
import { useCommitteeSpaceByIdContext } from '../providers.client';
import { ThumbUp } from '@/components/icons';
import React, { useState } from 'react';

export default function SpaceComments({ spaceId }: { spaceId: number }) {
  const { close, setClose, setExpand } = useCommitteeSpaceByIdContext();

  const space = useSpaceBySpaceId(spaceId);
  const numberOfComments = space.data.feed_comments.length;
  const comments = space.data.feed_comments;
  return (
    <div className="flex flex-col mt-[20px] gap-[20px] ">
      <div className="flex flex-row gap-2 items-center justify-start">
        <Comment width={24} height={24} className="[&>path]:stroke-white" />
        <div className="font-medium text-white text-base/[24px]">
          {numberOfComments?.toLocaleString()} Reply
        </div>
      </div>
      <CreateComment
        setClose={() => {
          setClose(!close);
          if (close) {
            setExpand(true);
          }
        }}
      />
      {comments
        ?.filter((v) => !checkString(v.html_contents))
        .map((comment, index) => (
          <CommentInfo comment={comment} key={'comment ' + index} />
        ))}
    </div>
  );
}

function CreateComment({ setClose }: { setClose: () => void }) {
  return (
    <div
      className="cursor-pointer flex flex-row w-full px-[14px] py-[12px] bg-neutral-800 border border-neutral-700 gap-[8px] items-center rounded-[8px]"
      onClick={() => {
        setClose();
      }}
    >
      <Comment width={24} height={24} className="[&>path]:stroke-neutral-500" />
      <div className="font-medium text-neutral-500 text-[15px] text-center">
        Share your thoughts...
      </div>
    </div>
  );
}

function CommentInfo({ comment }: { comment: SpaceComment }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    // TODO: Call API to persist like
  };

  const handleReply = () => {
    if (replyText.trim()) {
      // TODO: Call API to submit reply
      console.log(`Reply to ${comment.id}:`, replyText);
      setReplyText('');
      setShowReplyInput(false);
    }
  };

  return (
    <div className="flex flex-col gap-[14px] pb-5 border-b border-b-neutral-800">
      <div className="flex flex-row gap-2 items-center">
        {comment.author?.[0]?.profile_url ? (
          <Image
            alt={comment.author?.[0]?.nickname ?? ''}
            src={comment.author?.[0]?.profile_url ?? ''}
            width={40}
            height={40}
            className="rounded-full object-cover object-top"
          />
        ) : (
          <div className="w-[40px] h-[40px] rounded-full bg-neutral-500" />
        )}

        <div className="flex flex-col gap-[2px]">
          <div className="font-semibold text-neutral-300 text-[15px]/[15px]">
            {comment.author?.[0]?.nickname ?? ''}
          </div>
          <div className="font-semibold text-xs/[20px] text-[#6d6d6d]">
            {getTimeAgo(comment.created_at)}
          </div>
        </div>
      </div>

      <div className="flex flex-col mx-10 gap-3">
        <div className="font-normal text-neutral-300 text-[15px]/[22.5px]">
          {comment.html_contents}
        </div>

        <div className="flex flex-row  items-center gap-4">
          {/* Number of replies */}
          <div className="flex flex-row">
            <p className="text-primary">
              201 Reply {/*To be replaced by real data from BE*/}
            </p>
            <Image
              src="/logos/arr-down.png"
              alt="reply ropdown icon"
              width={24}
              height={24}
            ></Image>
          </div>

          {/* Reply Button */}
          <div className="">
            <button
              onClick={() => setShowReplyInput((prev) => !prev)}
              className="text-sm text-neutral-400 hover:text-white flex  flex-row"
            >
              <Image
                width={24}
                height={24}
                src="/logos/reply-arrow.png"
                alt="reply arrowicon"
              />

              <p className="ml-2">Reply</p>
            </button>
          </div>

          <div className="flex ml-auto">
            {/* number of Comments */}
            <div>
              <Image
                width={24}
                height={24}
                src="/logos/comment-icon.png"
                alt="comment icon"
                className="mr-4"
              ></Image>
            </div>

            {/* Like Button */}
            <button onClick={handleLike} className="flex items-center gap-1">
              <ThumbUp
                width={20}
                height={20}
                className={`[&>path]:stroke ${liked ? 'stroke-blue-500' : 'stroke-[#aeaaab]'}`}
                fill={liked ? '#3b82f6' : 'none'}
              />
              <span className="text-[#aeaaab] text-sm">{likeCount}</span>
            </button>
          </div>
        </div>

        {/* Reply Input Box */}
        {showReplyInput && (
          <div className="mt-2 flex flex-col gap-2">
            <textarea
              className="bg-neutral-800 border border-neutral-600 p-2 rounded-md text-white text-sm"
              rows={2}
              placeholder="Write your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button
              onClick={handleReply}
              className="self-end  bg-primary  p-3 rounded-full text-sm hover:text-[#1E1E1E] flex items-center gap-1"
              className="self-end  bg-primary  p-3 rounded-full text-sm hover:text-[#1E1E1E] flex items-center gap-1"
            >
              {/* <Send size={16} /> */}
              <Comment
                width={24}
                height={24}
                className="[&>path]:stroke-black "
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

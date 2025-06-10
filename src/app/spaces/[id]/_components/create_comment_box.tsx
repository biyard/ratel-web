'use client';

import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import Comment from '@/assets/icons/comment.svg';
import { useApiCall } from '@/lib/api/use-send';
import { useSuspenseUserInfo } from '@/lib/api/hooks/users';
import { useSpaceBySpaceId } from '@/app/(social)/_hooks/use-spaces';
import { ratelApi } from '@/lib/api/ratel_api';
import { writeCommentRequest } from '@/lib/api/models/feeds/comment';
import DoubleArrowDown from '@/assets/icons/double-arrow-down.svg';
import DoubleArrowUp from '@/assets/icons/double-arrow-up.svg';
import Clear from '@/assets/icons/clear.svg';

export interface CreateCommentBoxProps {
  handleSubmit: (value: string) => void;
}

export interface TitleProps {
  title: string;
  setTitle: (value: string) => void;
}

export interface DescriptionProps {
  description: string;
  setDescription: (value: string) => void;
}

export interface SendButtonProps {
  handleSubmit: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function CreateCommentBox({
  spaceId,
  expand,
  setExpand,
  setClose,
}: {
  spaceId: number;
  expand: boolean;
  setExpand: (description: string) => void;
  setClose: () => void;
}) {
  const [description, setDescription] = useState('');
  const { post } = useApiCall();
  const { data: user } = useSuspenseUserInfo();
  const space = useSpaceBySpaceId(spaceId);
  const feedId = space.data.feed_id;

  const handleSubmit = async (contents: string) => {
    await post(
      ratelApi.feeds.comment(),
      writeCommentRequest(contents, user.id, feedId),
    );
    space.refetch();
  };

  return !expand ? (
    <div className="flex flex-row w-full justify-end items-center px-[14px] py-[15px] rounded-t-[8px] bg-primary">
      <div className="flex flex-row w-full justify-end items-end gap-[30px]">
        <DoubleArrowUp
          className="cursor-pointer w-fit h-fit"
          onClick={() => {
            setExpand(description);
          }}
        />
        <Clear
          className="cursor-pointer w-fit h-fit"
          onClick={() => {
            setClose();
          }}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col w-full justify-start items-start px-[14px] py-[15px] border-b-[1px] border-l-[1px] border-r-[1px] border-t-[6px] rounded-t-[8px] border-primary gap-[10px] bg-neutral-900">
      {/* <Title title={title} setTitle={setTitle} /> */}
      <div className="flex flex-row w-full justify-end items-end">
        <DoubleArrowDown
          className="cursor-pointer w-fit h-fit"
          onClick={() => {
            setExpand(description);
          }}
        />
      </div>
      <Description description={description} setDescription={setDescription} />
      <SendButton
        handleSubmit={() => {
          handleSubmit(description);
          setDescription('');
        }}
      />
    </div>
  );
}

function SendButton({ handleSubmit }: SendButtonProps) {
  return (
    <div className="cursor-pointer flex flex-row w-full justify-end items-end">
      <div
        className="cursor-pointer p-2 rounded-full bg-primary"
        onClick={handleSubmit}
      >
        <Comment width={24} height={24} className="[&>path]:stroke-black" />
      </div>
    </div>
  );
}

function Description({ description, setDescription }: DescriptionProps) {
  return (
    <Textarea
      className="flex flex-row w-full justify-start items-center bg-transparent font-medium text-[18px]/[25px] text-white placeholder:font-medium placeholder:text-[15px]/[24px] placeholder:text-neutral-600 border-none"
      value={description}
      placeholder="Input description"
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
      }}
    />
  );
}

// function Title({ title, setTitle }: TitleProps) {
//   return (
//     <Input
//       className="flex flex-row w-full justify-start items-center bg-transparent font-medium text-[18px]/[25px] text-white placeholder:font-medium placeholder:text-[15px]/[24px] placeholder:text-neutral-600 border-none"
//       type="text"
//       value={title}
//       placeholder="Input Title"
//       onChange={(e) => {
//         setTitle(e.target.value);
//       }}
//     />
//   );
// }

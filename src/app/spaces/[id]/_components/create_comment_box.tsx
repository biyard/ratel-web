'use client';
import { Textarea } from '@/components/ui/textarea';
import React, { MouseEventHandler, useState } from 'react';
import Comment from '@/assets/icons/comment.svg';

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
  handleSubmit,
}: CreateCommentBoxProps) {
  //   const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="flex flex-col w-full justify-start items-start px-[14px] py-[15px] border-b-[1px] border-l-[1px] border-r-[1px] border-t-[6px] rounded-t-[8px] border-primary gap-[10px] bg-neutral-900 mb-[20px]">
      {/* <Title title={title} setTitle={setTitle} /> */}
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
      onChange={(e: any) => {
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

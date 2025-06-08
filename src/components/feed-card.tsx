import React from 'react';
import Image from 'next/image';
import { Col } from './ui/col';
import { Row } from './ui/row';
import { CommentIcon, Rewards, Shares, ThumbUp } from './icons';
import { convertNumberToString } from '@/lib/number-utils';
import TimeAgo from './time-ago';
import DOMPurify from 'dompurify';

export interface FeedCardProps {
  id: number;
  industry: string;
  title: string;
  contents: string;
  author_profile_url: string;
  author_name: string;
  url?: string;
  created_at: number;

  likes: number;
  comments: number;
  rewards: number;
  shares: number;

  spaceId?: number;
}

export default function FeedCard(props: FeedCardProps) {
  return (
    <Col className="bg-component-bg rounded-[10px]">
      <FeedBody {...props} />
      <FeedFooter {...props} />
    </Col>
  );
}

export function FeedBody({
  industry,
  title,
  contents,
  author_name,
  author_profile_url,
  url,
  created_at,
}: FeedCardProps) {
  return (
    <Col className="pt-5 px-5 pb-2.5">
      <Row className="justify-between">
        <IndustryTag industry={industry} />
      </Row>
      <h2 className="w-full line-clamp-2 font-bold text-xl/[25px] tracking-[0.5px] align-middle text-white">
        {title}
      </h2>
      <Row className="justify-between items-center">
        <UserBadge profile_url={author_profile_url} name={author_name} />
        <TimeAgo timestamp={created_at} />
      </Row>
      <Row className="justify-between"></Row>
      <FeedContents contents={contents} url={url} />
    </Col>
  );
}

export function FeedContents({
  contents,
  url,
}: {
  contents: string;
  url?: string;
}) {
  const c = DOMPurify.sanitize(contents);

  return (
    <Col className="text-white">
      <p
        className="font-normal text-[15px]/[24px] align-middle tracking-[0.5px] text-c-wg-30"
        dangerouslySetInnerHTML={{ __html: c }}
      ></p>
      {url && <img className="w-full rounded-[8px]" src={url} />}
    </Col>
  );
}

export function IconText({ children }: { children: React.ReactNode }) {
  return (
    <Row className="justify-center items-center gap-1.25 text-white font-normal text-[15px] px-4 py-5">
      {children}
    </Row>
  );
}

export function UserBadge({
  profile_url,
  name,
}: {
  profile_url: string;
  name: string;
}) {
  return (
    <Row className="w-fit items-center med-16 text-white">
      <Image
        src={profile_url}
        alt="User Profile"
        width={24}
        height={24}
        className="rounded-sm object-cover"
      />
      <span>{name}</span>
    </Row>
  );
}

export function IndustryTag({ industry }: { industry: string }) {
  return (
    <span className="rounded-sm border border-c-wg-70 px-2 text-xs/[25px] font-semibold align-middle uppercase">
      {industry}
    </span>
  );
}

export function FeedFooter({
  likes,
  comments,
  rewards,
  shares,
}: FeedCardProps) {
  return (
    <Row className="items-center justify-around border-t w-full border-neutral-800">
      <IconText>
        <ThumbUp />
        {convertNumberToString(likes)}
      </IconText>
      <IconText>
        <CommentIcon />
        {convertNumberToString(comments)}
      </IconText>
      <IconText>
        <Rewards />
        {convertNumberToString(rewards)}
      </IconText>
      <IconText>
        <Shares />
        {convertNumberToString(shares)}
      </IconText>
    </Row>
  );
}

'use client';
import React from 'react';
import { Col } from './ui/col';
import { Row } from './ui/row';
import { CommentIcon, Rewards, Shares, ThumbUp } from './icons';
import { convertNumberToString } from '@/lib/number-utils';
import TimeAgo from './time-ago';
import DOMPurify from 'dompurify';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useApiCall } from '@/lib/api/use-send';
import { ratelApi } from '@/lib/api/ratel_api';
import { UserType } from '@/lib/api/models/user';
import Image from 'next/image';
import { route } from '@/route';
import { SpaceType } from '@/lib/api/models/spaces';
import { showErrorToast } from '@/lib/toast';

export interface FeedCardProps {
  id: number;
  industry: string;
  title: string;
  contents: string;
  author_profile_url: string;
  author_name: string;
  author_type: UserType;
  url?: string;
  created_at: number;

  likes: number;
  is_liked: boolean;
  comments: number;
  rewards: number;
  shares: number;

  space_id?: number;
  space_type?: SpaceType;
  author_id: number;
  user_id: number;
  onboard: boolean;

  onLikeClick?: (value: boolean) => void;
  refetch?: () => void;
}

export default function FeedCard(props: FeedCardProps) {
  const router = useRouter();
  const { post } = useApiCall();
  const [optimisticLikes, setOptimisticLikes] = React.useState(props.likes);
  const [optimisticIsLiked, setOptimisticIsLiked] = React.useState(
    props.is_liked,
  );
  const [isLikeLoading, setIsLikeLoading] = React.useState(false);
  const likeRequestRef = React.useRef<AbortController | null>(null);

  // Update optimistic state when props change
  React.useEffect(() => {
    setOptimisticLikes(props.likes);
    setOptimisticIsLiked(props.is_liked);
  }, [props.likes, props.is_liked]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      likeRequestRef.current?.abort();
    };
  }, []);

  const handleLike = async (value: boolean) => {
    // Prevent multiple simultaneous requests
    if (isLikeLoading) return;

    // Abort any pending request
    likeRequestRef.current?.abort();

    // Store current state for rollback
    const previousLikes = optimisticLikes;
    const previousIsLiked = optimisticIsLiked;

    // Set loading state and optimistically update UI
    setIsLikeLoading(true);
    setOptimisticIsLiked(value);
    setOptimisticLikes(value ? optimisticLikes + 1 : optimisticLikes - 1);

    // Create new abort controller for this request
    const abortController = new AbortController();
    likeRequestRef.current = abortController;

    try {
      const res = await post(ratelApi.feeds.likePost(props.id), {
        like: {
          value,
        },
      });

      // Check if request was aborted
      if (abortController.signal.aborted) return;

      if (res?.ok) {
        props.onLikeClick?.(value);
        props.refetch?.();
      } else {
        // Rollback on failure
        setOptimisticIsLiked(previousIsLiked);
        setOptimisticLikes(previousLikes);
        showErrorToast(
          value ? 'Failed to like the post' : 'Failed to unlike the post',
        );
      }
    } catch (error) {
      // Don't show error if request was aborted
      if (abortController.signal.aborted) return;

      // Rollback on error
      setOptimisticIsLiked(previousIsLiked);
      setOptimisticLikes(previousLikes);

      // More specific error handling
      const isNetworkError =
        error instanceof TypeError && error.message.includes('fetch');
      showErrorToast(
        isNetworkError
          ? 'Network error. Please check your connection and try again.'
          : value
            ? 'Failed to like the post'
            : 'Failed to unlike the post',
      );
    } finally {
      setIsLikeLoading(false);
      likeRequestRef.current = null;
    }
  };

  return (
    <Col
      className="cursor-pointer bg-component-bg rounded-[10px]"
      onClick={() => {
        router.push(route.threadByFeedId(props.id));
      }}
    >
      <FeedBody {...props} />
      <FeedFooter
        {...props}
        likes={optimisticLikes}
        is_liked={optimisticIsLiked}
        onLikeClick={handleLike}
      />
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
  author_type,
  // user_id,
  // author_id,
  space_type,
  space_id,
  onboard,
}: FeedCardProps) {
  const router = useRouter();
  return (
    <Col className="pt-5 pb-2.5">
      <Row className="justify-between px-5">
        <Row>
          <IndustryTag industry={industry} />
          {onboard && <OnboradingTag />}
        </Row>
        {/* {user_id === author_id && !space_id && (
          <Button
            variant="rounded_primary"
            className="text-[10px] font-semibold align-middle uppercase py-1 px-3"
          >
            Create a Space
          </Button>
        )} */}

        {space_id && space_type ? (
          <Button
            variant="rounded_primary"
            className="text-[10px] font-semibold align-middle uppercase py-1 px-3"
            onClick={(e) => {
              e.stopPropagation();
              if (space_type === SpaceType.Committee) {
                router.push(route.commiteeSpaceById(space_id));
              } else {
                router.push(route.deliberationSpaceById(space_id));
              }
            }}
          >
            Join
          </Button>
        ) : (
          <div />
        )}
      </Row>
      <h2 className="w-full line-clamp-2 font-bold text-xl/[25px] tracking-[0.5px] align-middle text-white px-5">
        {title}
      </h2>
      <Row className="justify-between items-center px-5">
        <UserBadge
          profile_url={author_profile_url}
          name={author_name}
          author_type={author_type}
        />
        <TimeAgo timestamp={created_at} />
      </Row>
      <Row className="justify-between px-5"></Row>
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
  const c =
    typeof window !== 'undefined' ? DOMPurify.sanitize(contents) : contents;

  return (
    <Col className="text-white">
      <p
        className="feed-content font-normal text-[15px]/[24px] align-middle tracking-[0.5px] text-c-wg-30 px-5"
        dangerouslySetInnerHTML={{ __html: c }}
      ></p>

      {url && (
        <div className="px-5">
          <div className="relative w-full max-h-80 aspect-video">
            <Image
              src={url}
              alt="Uploaded image"
              fill
              className="object-cover rounded-[8px]"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </Col>
  );
}

export function IconText({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) {
  return (
    <Row
      className="justify-center items-center gap-1.25 text-white font-normal text-[15px] px-4 py-5"
      {...props}
    >
      {children}
    </Row>
  );
}

export function UserBadge({
  author_type,
  profile_url,
  name,
}: {
  author_type: UserType;
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
        className={
          author_type == UserType.Team
            ? 'w-6 h-6 rounded-sm object-cover'
            : 'w-6 h-6 rounded-full object-cover'
        }
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

export function OnboradingTag() {
  return (
    <span className="rounded-sm bg-primary text-white px-2 text-xs/[25px] font-semibold align-middle uppercase">
      Onboard
    </span>
  );
}

export function FeedFooter({
  likes,
  comments,
  rewards,
  shares,
  is_liked,
  onLikeClick,
}: FeedCardProps) {
  return (
    <Row className="items-center justify-around border-t w-full border-neutral-800">
      <IconText
        onClick={(evt) => {
          evt.stopPropagation();
          onLikeClick?.(!is_liked);
        }}
      >
        <ThumbUp
          className={
            is_liked
              ? '[&>path]:fill-primary [&>path]:stroke-primary'
              : undefined
          }
        />
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

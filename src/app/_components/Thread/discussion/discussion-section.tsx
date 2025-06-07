'use client';

import { useState } from 'react';
import { Comment } from './comment';
import type { Comment as CommentType } from '@/types';
import { ReplyEditor } from './reply-editor';

interface DiscussionSectionProps {
  initialComments: CommentType[];
}

export function DiscussionSection({ initialComments }: DiscussionSectionProps) {
  const [comments, setComments] = useState<CommentType[]>(initialComments);

  const handleLike = (commentId: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }

        if (comment.replies) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === commentId) {
              return { ...reply, likes: reply.likes + 1 };
            }
            return reply;
          });
          return { ...comment, replies: updatedReplies };
        }

        return comment;
      }),
    );
  };

  const handleReply = (commentId: string, content: string) => {
    const newReply: CommentType = {
      id: `reply-${Date.now()}`,
      author: {
        name: 'You',
        avatar: '/placeholder.svg?height=32&width=32',
      },
      content,
      timestamp: 'just now',
      likes: 0,
      replies: [],
    };

    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }

        if (comment.replies) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === commentId) {
              return {
                ...reply,
                replies: [...(reply.replies || []), newReply],
              };
            }
            return reply;
          });
          return { ...comment, replies: updatedReplies };
        }

        return comment;
      }),
    );
  };

  const handleNewComment = (content: string) => {
    const newComment: CommentType = {
      id: `comment-${Date.now()}`,
      author: {
        name: 'You',
        avatar: '/placeholder.svg?height=32&width=32',
      },
      content,
      timestamp: 'just now',
      likes: 0,
      replies: [],
    };

    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div className="border-t border-[#404040] pt-6 mt-6">
      <h2 className="text-lg font-semibold mb-6">Discussion</h2>

      <div className="space-y-8 pt-12">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onLike={handleLike}
            onReply={handleReply}
          />
        ))}
      </div>

      <div className="mt-6">
        <ReplyEditor
          onSubmit={handleNewComment}
          placeholder="Add your thoughts..."
        />
      </div>
    </div>
  );
}

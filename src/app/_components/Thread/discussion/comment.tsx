"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronDown, MessageSquare, MoreVertical, ThumbsUp } from "lucide-react"
import type { Comment as CommentType } from "@/types"
import { ReplyEditor } from "./reply-editor"

interface CommentProps {
  comment: CommentType
  onLike: (id: string) => void
  onReply: (id: string, content: string) => void
  depth?: number
  showReplyButton?: boolean
}

export function Comment({ comment, onLike, onReply, depth = 0, showReplyButton = true }: CommentProps) {
  const [showReplies, setShowReplies] = useState(false)
  const [isReplying, setIsReplying] = useState(false)

  const handleReplySubmit = (content: string) => {
    onReply(comment.id, content)
    setIsReplying(false)
  }

  const toggleReplies = () => {
    setShowReplies(!showReplies)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <Avatar className="w-8 h-8 mt-1">
          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
          <AvatarFallback className="bg-[#404040]">{comment.author.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">{comment.author.name}</span>
              <span className="text-xs text-[#a1a1a1]">{comment.timestamp}</span>
              {comment.percentage && <span className="text-xs text-[#a1a1a1] ml-2">{comment.percentage}%</span>}
            </div>
            <Button variant="outline" size="sm" className="h-8 w-8 text-[#a1a1a1]">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-1 text-[#a1a1a1]">{comment.content}</div>
          <div className="flex items-center gap-4 mt-2">
            <Button
              variant="outline"
              size="sm"
              className="h-6 px-1 text-[#a1a1a1] hover:text-white"
              onClick={() => onLike(comment.id)}
            >
              <ThumbsUp className="h-3 w-3 mr-1" />
              <span className="text-xs">{comment.likes}</span>
            </Button>
            {showReplyButton && (
              <Button
                variant="outline"
                size="sm"
                className="h-6 px-1 text-[#a1a1a1] hover:text-white"
                onClick={() => setIsReplying(!isReplying)}
              >
                <MessageSquare className="h-3 w-3 mr-1" />
                <span className="text-xs">Reply</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {isReplying && <ReplyEditor onSubmit={handleReplySubmit} onCancel={() => setIsReplying(false)} />}

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-10">
          {showReplyButton && (
            <Button
              variant="outline"
              size="sm"
              className="bg-[#fcb300] hover:bg-[#fcb300]/80 text-black border-none mb-3"
              onClick={toggleReplies}
            >
              <span>{comment.replies.length} Reply</span>
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showReplies ? "rotate-180" : ""}`} />
            </Button>
          )}

          {showReplies &&
            comment.replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                onLike={onLike}
                onReply={onReply}
                depth={depth + 1}
                showReplyButton={depth < 2}
              />
            ))}
        </div>
      )}
    </div>
  )
}

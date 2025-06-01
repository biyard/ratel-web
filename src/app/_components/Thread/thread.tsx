"use client"

import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronDown, Download, ThumbsUp, MessageSquare } from "lucide-react"
import { attachedFiles, externalLinks, initialComments } from "@/lib/api/thread/mockdata"
import { MainContent } from "./content/main-content"
import { Sidebar } from "./layout/sidebar"
import { DiscussionSection } from "./discussion/discussion-section"


interface Member {
  id: string
  name: string
  avatar: string
  status: "online" | "offline" | "away"
}

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  active?: boolean
}

interface ChatMessage {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  replies: number
  percentage?: number
  isReply?: boolean
  replyTo?: string
}

interface AttachedFile {
  id: string
  name: string
  type: "pdf" | "doc" | "img"
  size: string
}

interface CollapsibleSection {
  id: string
  title: string
  items: string[]
  isOpen: boolean
}

const CollapsibleSectionComponent = ({
  section,
  onToggle,
}: {
  section: CollapsibleSection
  onToggle: (id: string) => void
}) => (
  <div>
    <div className="flex items-center justify-between mb-2 cursor-pointer" onClick={() => onToggle(section.id)}>
      <span className="text-sm font-medium">{section.title}</span>
      <ChevronDown className={`w-4 h-4 transition-transform ${section.isOpen ? "rotate-180" : ""}`} />
    </div>
    {section.isOpen && (
      <div className="space-y-1 text-sm text-[#a1a1a1]">
        {section.items.map((item, index) => (
          <div key={index} className="hover:text-white cursor-pointer transition-colors">
            {item}
          </div>
        ))}
        <Button variant="outline" className="text-[#a1a1a1] p-0 h-auto mt-1 text-sm hover:text-white">
          View all →
        </Button>
      </div>
    )}
  </div>
)

const MemberItem = ({ member }: { member: Member }) => (
  <div className="flex items-center gap-2 p-1 rounded hover:bg-[#404040] cursor-pointer transition-colors">
    <div className="relative">
      <Avatar className="w-6 h-6">
        <AvatarImage src={member.avatar || "/placeholder.svg"} />
        <AvatarFallback className="bg-[#404040] text-xs">{member.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div
        className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-[#1e1e1e] ${
          member.status === "online" ? "bg-green-500" : member.status === "away" ? "bg-yellow-500" : "bg-gray-500"
        }`}
      />
    </div>
    <span className="text-sm">{member.name}</span>
  </div>
)

const FileAttachment = ({ file }: { file: AttachedFile }) => {
  const getFileColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-red-600"
      case "doc":
        return "bg-blue-600"
      case "img":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="bg-[#262626] rounded-lg p-3 flex items-center gap-2 hover:bg-[#333333] transition-colors cursor-pointer">
      <div className={`w-8 h-8 ${getFileColor(file.type)} rounded flex items-center justify-center text-xs font-bold`}>
        {file.type.toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm truncate">{file.name}</div>
        <div className="text-xs text-[#a1a1a1]">{file.size}</div>
      </div>
      <Download className="w-4 h-4 text-[#a1a1a1] hover:text-white transition-colors" />
    </div>
  )
}

const ChatMessageComponent = ({
  message,
  onLike,
  onReply,
}: {
  message: ChatMessage
  onLike: (id: string) => void
  onReply: (id: string) => void
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Avatar className="w-6 h-6">
        <AvatarImage src={message.avatar || "/placeholder.svg"} />
        <AvatarFallback className="bg-[#404040] text-xs">{message.author.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">{message.author}</span>
      <span className="text-xs text-[#a1a1a1]">{message.timestamp}</span>
      {message.percentage && <div className="ml-auto text-xs text-[#a1a1a1]">{message.percentage}%</div>}
    </div>

    {message.isReply && message.replyTo && (
      <div className="bg-[#262626] rounded-lg p-3 ml-8">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="w-4 h-4">
            <AvatarFallback className="bg-[#404040] text-xs">{message.replyTo.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium">{message.replyTo}</span>
        </div>
        <div className="text-xs text-[#a1a1a1]">{message.content}</div>
      </div>
    )}

    {!message.isReply && <div className="text-sm text-[#a1a1a1] leading-relaxed ml-8">{message.content}</div>}

    <div className="flex items-center gap-4 text-xs text-[#a1a1a1] ml-8">
      <button className="flex items-center gap-1 hover:text-white transition-colors" onClick={() => onLike(message.id)}>
        <ThumbsUp className="w-3 h-3" />
        <span>{message.likes}</span>
      </button>
      <button
        className="flex items-center gap-1 hover:text-white transition-colors"
        onClick={() => onReply(message.id)}
      >
        <MessageSquare className="w-3 h-3" />
        <span>{message.replies}</span>
      </button>
    </div>
  </div>
)

export default function ViewThread() {
  return (
    <div className="flex h-screen bg-[#191919] text-[#ffffff]">

      <Sidebar />

     <div className="flex-1 flex flex-col overflow-hidden"> 
        <div className="flex-1 overflow-y-auto">
          <MainContent files={attachedFiles} links={externalLinks} />
          <div className="px-6 pb-6">
            <DiscussionSection initialComments={initialComments} />
          </div>
        </div>
      </div> 
    </div>
  )
}

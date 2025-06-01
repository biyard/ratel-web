import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Member } from "@/types"

interface MemberItemProps {
  member: Member
}

export function MemberItem({ member }: MemberItemProps) {
  return (
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
}

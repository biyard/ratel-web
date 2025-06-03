"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronDown, Crown, Hash, Users, Settings } from "lucide-react"
import { Member, NavItemType, SectionType } from "@/types"
import { CollapsibleSection } from "./collapsible-section"
import { MemberItem } from "./member-item"
import { NavItem } from "./nav-item"

export function Sidebar() {
  const [activeNav, setActiveNav] = useState<string>("threads")
  const [searchTerm, setSearchTerm] = useState<string>("")

  const members: Member[] = [
    { id: "1", name: "[Nickname]", avatar: "/placeholder.svg?height=24&width=24", status: "online" },
    { id: "2", name: "[Nickname]", avatar: "/placeholder.svg?height=24&width=24", status: "away" },
    { id: "3", name: "[Nickname]", avatar: "/placeholder.svg?height=24&width=24", status: "online" },
    { id: "4", name: "[Nickname]", avatar: "/placeholder.svg?height=24&width=24", status: "offline" },
    { id: "5", name: "[Nickname]", avatar: "/placeholder.svg?height=24&width=24", status: "online" },
  ]

  const navItems: NavItemType[] = [
    { id: "profile", label: "Profile", icon: <div className="w-4 h-4 bg-[#a1a1a1] rounded-full"></div> },
    { id: "threads", label: "Threads", icon: <Hash className="w-4 h-4" /> },
    { id: "manage", label: "Manage Group", icon: <Users className="w-4 h-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ]

  const sections: SectionType[] = [
    {
      id: "recent",
      title: "Recent",
      isOpen: true,
      items: ["Crypto/DAO Treasury Transpe...", "Crypto/DAO Act Inventor", "Crypto/DAO Welcome to Protec..."],
    },
    {
      id: "spaces",
      title: "Spaces",
      isOpen: true,
      items: ["Crypto/DAO Treasury Transpe...", "Crypto/DAO Act Inventor", "Crypto/DAO Welcome to Protec..."],
    },
    {
      id: "saved",
      title: "Saved",
      isOpen: true,
      items: ["Crypto/DAO Treasury Transpe...", "Crypto/DAO Act Inventor", "Crypto/DAO Welcome to Protec..."],
    },
  ]

  return (
    <div className="w-[300px] bg-[#1e1e1e] flex flex-col h-full mx-8">

      <div className="p-4 border-b border-[#404040]">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-[#404040]">HC</AvatarFallback>
            </Avatar>
            <Crown className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1" />
          </div>
          <div>
            <div className="flex items-center gap-1 mx-16">
              <span className="font-medium">Hyejin Choi</span>
              <span className="text-yellow-500">👑</span>
            </div>
            <ChevronDown className="w-4 h-4 text-[#a1a1a1]" />
          </div>
        </div>
        <div className="text-sm text-[#a1a1a1] mx-16">
          <div>Owner Kim Hoyoung</div>
          <div className="mt-1">
            <span>Office of Rep.</span>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Dragon, Unite Sale</span>
            </div>
          </div>
          <div className="mt-2">
            <span>Tier</span>
            <div className="flex items-center gap-2 mt-1">
              <span>Diamond</span>
              <div className="w-4 h-4 bg-blue-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>


      <div className="p-4 space-y-2 mx-16">
        {navItems.map((item) => (
          <NavItem key={item.id} item={item} isActive={activeNav === item.id} onClick={() => setActiveNav(item.id)} />
        ))}
      </div>

      
      <div className="p-4 flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium mx-16">Members</span>
          <ChevronDown className="w-16 h-16" />
        </div>
        <div className="space-y-2 mx-16">
          {members.map((member) => (
            <MemberItem key={member.id} member={member} />
          ))}
        </div>
        <Button variant="outline" className="text-[#a1a1a1] p-0 h-auto mt-2">
          View all →
        </Button>
      </div>

      
      <div className="-pt-96 p-4 space-y-4 border-t border-[#404040] mx-16">
        {sections.map((section) => (
          <CollapsibleSection key={section.id} section={section} />
        ))}
      </div>
    </div>
  )
}

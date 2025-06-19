import React from 'react'
import { Search, Home, Compass, Users, MessageCircle, Bell, User} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function NotificationHeader() {
  return (
    <header className="border-b border-[#262626] px-6 py-3 ">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#fcb300] rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-lg">Ratel</span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#737373] w-4 h-4" />
              <Input
                placeholder="Search"
                className="pl-10 bg-[#262626] border-[#404040] text-white placeholder-[#737373] w-80"
              />
            </div>
          </div>
          <nav className="flex items-center gap-8">
            <div className="flex items-center gap-1 text-[#737373]">
              <Home className="w-5 h-5" />
              <span className="text-sm">Home</span>
            </div>
            <div className="flex items-center gap-1 text-[#737373]">
              <Compass className="w-5 h-5" />
              <span className="text-sm">Explore</span>
            </div>
            <div className="flex items-center gap-1 text-[#737373]">
              <Users className="w-5 h-5" />
              <span className="text-sm">My Network</span>
            </div>
            <div className="flex items-center gap-1 text-[#737373]">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">Message</span>
            </div>
            <div className="flex items-center gap-1 text-white">
              <Bell className="w-5 h-5" />
              <span className="text-sm">Notification</span>
            </div>
            <div className="flex items-center gap-1 text-[#737373]">
              <User className="w-5 h-5" />
              <span className="text-sm">Me</span>
            </div>
          </nav>
        </div>
      </header>
  )
}
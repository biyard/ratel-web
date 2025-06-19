"use client"

import { Search, Home, Compass, Users, MessageCircle, Bell, User, MoreHorizontal, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import { useLayout } from "@/contexts/layoutContext"

export default function NotificationClientPage() {
  const { setLayout } = useLayout();

  useEffect(() => {
    setLayout('notification');
    return () => setLayout('notification');
  }, []);

  const [activeTab, setActiveTab] = useState<"notification" | "message">("notification")

  return (
    <div className="col-span-2 space-y-4">
            {/* Tab Headers */}
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("notification")}
                className={`pb-4 text-xl font-semibold transition-colors relative ${
                  activeTab === "notification" ? "text-white" : "text-[#737373] hover:text-white"
                }`}
              >
                Notification
                {activeTab === "notification" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#fcb300] rounded-full"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("message")}
                className={`pb-4 text-xl font-semibold transition-colors relative ${
                  activeTab === "message" ? "text-white" : "text-[#737373] hover:text-white"
                }`}
              >
                Message
                {activeTab === "message" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#fcb300] rounded-full"></div>
                )}
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "notification" && (
              <div className="space-y-4">
                {/* Filter Tabs */}
                <div className="flex gap-4 text-sm">
                  <button className="bg-white text-black px-4 py-2 rounded-full">All</button>
                  <button className="text-[#737373] flex items-center gap-1 hover:text-white">
                    <MessageCircle className="w-4 h-4" />
                    Replies
                  </button>
                  <button className="text-[#737373] flex items-center gap-1 hover:text-white">
                    <span>@</span>
                    Mention
                  </button>
                  <button className="text-[#737373] flex items-center gap-1 hover:text-white">
                    <span>#</span>
                    Spaces
                  </button>
                </div>

                {/* Notification Items */}
                <div className="space-y-4">
                  {/* Keep all the existing notification items here */}
                  <div className="flex items-start gap-3 p-3 hover:bg-[#1e1e1e] rounded-lg">
                    <div className="w-10 h-10 bg-[#404040] rounded-lg flex items-center justify-center">
                      <span className="text-xs">C</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">[Community]</span>
                        <span className="text-[#737373] text-sm">We've updated the Community.</span>
                      </div>
                      <p className="text-[#737373] text-sm">User name left a comment in the community.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#737373] text-xs">12hrs ago</span>
                      <MoreHorizontal className="w-4 h-4 text-[#737373]" />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 hover:bg-[#1e1e1e] rounded-lg">
                    <div className="w-10 h-10 bg-[#404040] rounded-lg flex items-center justify-center">
                      <span className="text-xs">S</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">[Space]</span>
                        <span className="text-[#737373] text-sm">We've updated the space.</span>
                      </div>
                      <p className="text-[#737373] text-sm">User name left a comment in the space.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#737373] text-xs">12hrs ago</span>
                      <MoreHorizontal className="w-4 h-4 text-[#737373]" />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 hover:bg-[#1e1e1e] rounded-lg">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-[#404040]">U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">[User name]</span>
                        <span className="text-[#737373] text-sm">We are planning to launch for our project next.</span>
                      </div>
                      <p className="text-[#737373] text-sm">Replies in [Community name]</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#737373] text-xs">12hrs ago</span>
                      <MoreHorizontal className="w-4 h-4 text-[#737373]" />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 hover:bg-[#1e1e1e] rounded-lg">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-[#404040]">U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">[User name]</span>
                        <span className="text-[#737373] text-sm">We are planning to launch for our project next.</span>
                      </div>
                      <p className="text-[#737373] text-sm">Mention in [Space name]</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#737373] text-xs">12hrs ago</span>
                      <MoreHorizontal className="w-4 h-4 text-[#737373]" />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 hover:bg-[#1e1e1e] rounded-lg">
                    <div className="w-10 h-10 bg-[#404040] rounded-lg flex items-center justify-center">
                      <span className="text-xs">C</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">[Community]</span>
                        <span className="text-[#737373] text-sm">We've updated the Community.</span>
                      </div>
                      <p className="text-[#737373] text-sm">User name left a comment in the community.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#737373] text-xs">12hrs ago</span>
                      <MoreHorizontal className="w-4 h-4 text-[#737373]" />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 hover:bg-[#1e1e1e] rounded-lg">
                    <div className="w-10 h-10 bg-[#404040] rounded-lg flex items-center justify-center">
                      <span className="text-xs">S</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">[Space]</span>
                        <span className="text-[#737373] text-sm">We've updated the space.</span>
                      </div>
                      <p className="text-[#737373] text-sm">User name left a comment in the space.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#737373] text-xs">12hrs ago</span>
                      <MoreHorizontal className="w-4 h-4 text-[#737373]" />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 hover:bg-[#1e1e1e] rounded-lg">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-[#404040]">U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">[User name]</span>
                        <span className="text-[#737373] text-sm">We are planning to launch for our project next.</span>
                      </div>
                      <p className="text-[#737373] text-sm">Replies in [Community name]</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#737373] text-xs">12hrs ago</span>
                      <MoreHorizontal className="w-4 h-4 text-[#737373]" />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 hover:bg-[#1e1e1e] rounded-lg">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-[#404040]">U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">[User name]</span>
                        <span className="text-[#737373] text-sm">We are planning to launch for our project next.</span>
                      </div>
                      <p className="text-[#737373] text-sm">Replies in [Space name]</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#737373] text-xs">12hrs ago</span>
                      <MoreHorizontal className="w-4 h-4 text-[#737373]" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "message" && (
              <div className="space-y-4">
                <div className="h-96 flex items-center justify-center text-[#737373]">
                  <div className="text-center">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-[#404040]" />
                    <p>No messages yet</p>
                    <p className="text-sm mt-2">Start a conversation with someone</p>
                  </div>
                </div>
              </div>
            )}
          </div>
  )
}

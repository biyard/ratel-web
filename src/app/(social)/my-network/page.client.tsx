"use client"
import { useState } from "react"
import {
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent } from "@/app/(social)/_components/tabs"
import { followingUsers, suggestedUsers } from "./data"

export default function MyNetworkClientPage() {
  const [activeTab, setActiveTab] = useState("following")
  const [expandedSections, setExpandedSections] = useState({
    recent: true,
    spaces: false,
    communities: false,
  })

  const [activeCategory, setActiveCategory] = useState(0)

  const categories = [
    {
      name: "ALL",
      content: (
        <div>
          <h3 className="text-lg font-medium mb-4">All Content</h3>
        </div>
      ),
    },
    {
      name: "POLITICIAN",
      content: (
        <div>
          <h3 className="text-lg font-medium mb-4">Politician Content</h3>
        </div>
      ),
    },
    {
      name: "POLITIC",
      content: (
        <div>
          <h3 className="text-lg font-medium mb-4">Political Content</h3>
        </div>
      ),
    },
    {
      name: "CRYPTO",
      content: (
        <div>
          <h3 className="text-lg font-medium mb-4">Crypto Content</h3>
        </div>
      ),
    },
    {
      name: "CATEGORY",
      content: (
        <div>
          <h3 className="text-lg font-medium mb-4">Category Content</h3>
        </div>
      ),
    },
    {
      name: "CATEGORY",
      content: (
        <div>
          <h3 className="text-lg font-medium mb-4">Additional Category</h3>
        </div>
      ),
    },
  ]

  const [followingStatus, setFollowingStatus] = useState<{ [key: string]: boolean }>({
    // Initialize following users as already followed
    "following-0": true,
    "following-1": true,
    "following-2": true,
    "following-3": true,
    // Initialize suggested users as not followed
    "suggested-0": false,
    "suggested-1": false,
    "suggested-2": false,
    "suggested-3": false,
    "suggested-4": false,
    // Initialize feed users as not followed
    "feed-trump": false,
    "feed-musk": false,
  })

  const toggleFollow = (userId: string) => {
    setFollowingStatus((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }))
  }
  return <div>
    <main className="flex-1 p-6 bg-gray-950">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex border-b border-gray-800 mb-6">
          <button
            onClick={() => setActiveTab("following")}
            className={`px-4 py-3 text-sm font-medium relative ${activeTab === "following" ? "text-white" : "text-gray-400 hover:text-gray-300"
              }`}
          >
            Following
            {activeTab === "following" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("followers")}
            className={`px-4 py-3 text-sm font-medium relative ml-8 ${activeTab === "followers" ? "text-white" : "text-gray-400 hover:text-gray-300"
              }`}
          >
            Followers
            {activeTab === "followers" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"></div>
            )}
          </button>
        </div>

        <TabsContent value="following" className="space-y-6">
          {/* Filter Buttons with Tab Navigation */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="p-0 mr-2"
                onClick={() => {
                  if (activeCategory > 0) {
                    setActiveCategory(activeCategory - 1)
                  }
                }}
              >
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              </Button>

              <div className="flex space-x-2 overflow-x-auto no-scrollbar">
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant={activeCategory === index ? "rounded_secondary" : "ghost"}
                    className={
                      activeCategory === index
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "text-gray-400 hover:text-white"
                    }
                    onClick={() => setActiveCategory(index)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="p-0 ml-2"
                onClick={() => {
                  if (activeCategory < categories.length - 1) {
                    setActiveCategory(activeCategory + 1)
                  }
                }}
              >
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Button>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">{categories[activeCategory].content}</div>
          </div>

          <div className="text-sm text-gray-400 mb-4">2 Following</div>

          {/* Following List */}
          <div className="space-y-4">
            {followingUsers.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-400">{user.description}</div>
                  </div>
                </div>
                <Button
                      size="sm"
                      className={
                        followingStatus[`following-${index}`]
                          ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                          : "bg-gray-600 hover:bg-gray-500 text-white border border-gray-500"
                      }
                      onClick={() => toggleFollow(`following-${index}`)}
                    >
                      {followingStatus[`following-${index}`] ? "Following" : "Follow"}
                    </Button>
              </div>
            ))}
          </div>

          {/* Suggested Accounts */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Suggested account</h3>
            <div className="space-y-4">
              {suggestedUsers.map((user, index) => (
                <div key={index} className="flex items-start justify-between p-4 bg-gray-900 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-blue-400">{user.name}</div>
                      <div className="text-sm text-gray-400 whitespace-pre-line">{user.description}</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className={
                      followingStatus[`suggested-${index}`]
                        ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                        : "bg-gray-600 hover:bg-gray-500 text-white border border-gray-500"
                    }
                    onClick={() => toggleFollow(`suggested-${index}`)}
                  >
                    {followingStatus[`suggested-${index}`] ? "Following" : "Follow"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="followers">
          <div className="text-center text-gray-400 py-8">Followers content would go here</div>
        </TabsContent>
      </Tabs>
    </main>
  </div>;
}

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Tabs and Content */}
          {children}
          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Hot Promotion */}
            <div className="bg-[#1e1e1e] rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Hot Promotion</h3>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-[#fcb300] rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold">🗳️</span>
                </div>
                <div>
                  <h4 className="font-medium">Presidential Election</h4>
                </div>
              </div>
              <button className="text-[#737373] text-sm flex items-center gap-1 hover:text-white">
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* News */}
            <div className="space-y-4">
              <h3 className="font-semibold">News</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">
                    Ratel' Launches Digital Asset Policy Comparison Feature Ahead of 2025 Election
                  </h4>
                  <p className="text-[#737373] text-xs">
                    Ratel, a blockchain-based legislative social media platform, has introduced a new feature that
                    allows voters to...
                  </p>
                  <button className="text-[#737373] text-xs flex items-center gap-1 hover:text-white">
                    View Detail <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">
                    Legislative Platform 'Ratel' Records Public Opinion on Election Pledges via Blockchain
                  </h4>
                  <p className="text-[#737373] text-xs">
                    Ratel, a blockchain-based social media platform, has launched a new feature ahead of South Korea's
                    2025...
                  </p>
                  <button className="text-[#737373] text-xs flex items-center gap-1 hover:text-white">
                    View Detail <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">
                    Decentralized Legislative Platform 'RATEL' Leads Crypto Regulatory Reform in South Korea
                  </h4>
                  <p className="text-[#737373] text-xs">
                    RATEL is the world's first decentralized legislative DAO platform empowering communities to propose
                    and monitor...
                  </p>
                  <button className="text-[#737373] text-xs flex items-center gap-1 hover:text-white">
                    View Detail <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Add to your feed */}
            <div className="space-y-4">
              <h3 className="font-semibold">Add to your feed</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>DT</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Donald Trump</h4>
                    <p className="text-[#737373] text-xs">President of the US</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent border-[#404040] text-white hover:bg-[#262626]"
                  >
                    + Follow
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>EM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Elon Musk</h4>
                    <p className="text-[#737373] text-xs">CEO of Tesla and SpaceX</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent border-[#404040] text-white hover:bg-[#262626]"
                  >
                    + Follow
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Jongseok Park</h4>
                    <p className="text-[#737373] text-xs">National Assembly of</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent border-[#404040] text-white hover:bg-[#262626]"
                  >
                    + Follow
                  </Button>
                </div>
              </div>

              <button className="text-[#737373] text-sm flex items-center gap-1 hover:text-white">
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
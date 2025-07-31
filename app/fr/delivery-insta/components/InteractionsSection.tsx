"use client"

import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Activity, X } from "lucide-react"
import { PieChart, Pie, Cell } from "recharts"

interface Follower {
  name: string;
  avatar: string;
}

interface InteractionsSectionProps {
  isActive: boolean;
  followers: Follower[];
}

export default function InteractionsSection({ isActive, followers }: InteractionsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const chartData = [
    { name: "Visto", value: 85, fill: "#a855f7" },
    { name: "No visto", value: 15, fill: "#374151" }
  ]

  const chartConfig = {
    viewed: {
      label: "Visto",
      color: "#a855f7"
    },
    not_viewed: {
      label: "No visto",
      color: "#374151"
    }
  }

  // Use the followers from props
  const displayFollowers = followers.map((follower, index) => ({
    ...follower,
    username: follower.name.toLowerCase().replace(' ', '_')
  }))

  return (
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer col-span-2">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
      <div className="relative z-10">
        <div className="flex flex-col space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg md:text-xl">Interactions</h3>
                <p className="text-gray-300 text-sm">Voir les DMs, Stalkers, Redirections...</p>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${isActive
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
              Actif
            </div>
          </div>

          {/* Chart and Stats - Vertical Layout */}
          <div className="flex flex-col space-y-6 mt-6">
            {/* Chart Section */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <ChartContainer config={chartConfig} className="w-32 h-32 md:w-40 md:h-40">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={60}
                      paddingAngle={1}
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={0.5}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                {/* Center percentage */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-purple-400 font-bold text-2xl md:text-3xl">85%</div>
                    <div className="text-gray-400 text-sm">Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex justify-center">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span className="text-white text-base font-medium">85% Stories vues</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-400 text-base">15% Non vues</span>
                </div>
              </div>
            </div>

            {/* Followers Section */}
            <div className="text-center">
              <p className="text-white font-semibold text-base mb-4">Voir les followers</p>
              <div 
                className="flex items-center justify-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="flex -space-x-2">
                  {followers.slice(0, 3).map((follower, index) => (
                    <Avatar key={index} className="w-10 h-10 border-2 border-purple-500">
                      <AvatarImage src={follower.avatar} />
                      <AvatarFallback>{follower.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="text-purple-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Shared Profile Section */}
            <div className="text-center">
              <p className="text-white font-semibold text-base mb-4">Ton profil a été partagé cette semaine</p>
              <div className="flex items-center justify-center space-x-3">
                <span className="text-purple-400 font-bold text-2xl">11</span>
                <span className="text-gray-400 text-base">Personnes</span>
                <div className="text-purple-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Followers Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-black/95 border border-white/20 text-white w-[95vw] max-w-lg max-h-[85vh] overflow-hidden">
          <DialogHeader className="flex flex-row items-center justify-between pb-4">
            <DialogTitle className="text-lg md:text-xl font-bold">Follower ({displayFollowers.length})</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsModalOpen(false)}
              className="text-white hover:bg-white/10 p-2 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[65vh] space-y-2 pr-2">
            {displayFollowers.map((follower, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <Avatar className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                  <AvatarImage src={follower.avatar} />
                  <AvatarFallback className="bg-purple-600 text-white text-sm">
                    {follower.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm md:text-base truncate">{follower.name}</p>
                  <p className="text-xs md:text-sm text-gray-400 truncate">@{follower.username}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white text-xs md:text-sm px-3 py-1 flex-shrink-0"
                  onClick={() => window.open(`https://instagram.com/${follower.username}`, '_blank')}
                >
                  Voir
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
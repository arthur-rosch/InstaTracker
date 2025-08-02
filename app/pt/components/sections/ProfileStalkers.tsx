"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertTriangle } from "lucide-react"

interface ProfileStalkersProps {
  username: string
}

const mockStalkers = {
  lastWeek: [
    { id: 1, visits: "2-7 times" },
    { id: 2, visits: "2-7 times" },
    { id: 3, visits: "2-7 times" }
  ],
  superStalker: {
    consecutiveDays: 11,
    videoCalls: 3,
    deletedConversations: true
  }
}

export function ProfileStalkers({ username }: ProfileStalkersProps) {
  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <div className="text-white text-lg">↓</div>
        <h3 className="text-xl font-bold text-white">Last week</h3>
        <p className="text-gray-400">15/07 - 21/07</p>
        <p className="text-white font-semibold">Visited this profile this week 2 to 7 times:</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {mockStalkers.lastWeek.map((stalker, index) => (
          <div
            key={stalker.id}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-xl text-center"
          >
            <Avatar className="w-12 h-12 mx-auto mb-2">
              <AvatarImage src={`/placeholder.svg?height=48&width=48&query=stalker ${stalker.id}`} />
              <AvatarFallback>S{stalker.id}</AvatarFallback>
            </Avatar>
            <p className="text-white text-xs font-semibold">*******</p>
            <p className="text-gray-400 text-xs">{stalker.visits}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-orange-400 font-semibold">... and more:</p>

      <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div className="space-y-3">
            <h3 className="text-red-400 font-bold text-lg">Super Stalker Found!</h3>
            <p className="text-white">{username} has a fan on the profile!</p>
            <p className="text-gray-300 text-sm">
              This Super Stalker visited {username}'s profile for {mockStalkers.superStalker.consecutiveDays} consecutive days
            </p>
            <p className="text-gray-300 text-sm">
              {username} made {mockStalkers.superStalker.videoCalls} video calls and deleted the conversation with this Stalker
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
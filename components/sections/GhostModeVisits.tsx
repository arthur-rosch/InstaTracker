"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

interface GhostModeVisitsProps {
  username: string
}

const mockGhostVisits = [
  { id: 1, username: "user1", time: "2h ago", isAnonymous: true },
  { id: 2, username: "user2", time: "5h ago", isAnonymous: true },
  { id: 3, username: "user3", time: "1d ago", isAnonymous: false },
  { id: 4, username: "user4", time: "2d ago", isAnonymous: true }
]

export function GhostModeVisits({ username }: GhostModeVisitsProps) {
  return (
    <section className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Ghost Mode Visits</h3>
        <p className="text-gray-300">Anonymous profile visitors detected</p>
      </div>

      <div className="space-y-3">
        {mockGhostVisits.map((visit) => (
          <div
            key={visit.id}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={`/placeholder.svg?height=48&width=48&query=${visit.username}`} />
                  <AvatarFallback>{visit.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                {visit.isAnonymous && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                    <EyeOff className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-white font-semibold">
                  {visit.isAnonymous ? "*******" : visit.username}
                </p>
                <p className="text-gray-400 text-sm">{visit.time}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {visit.isAnonymous ? (
                <EyeOff className="w-5 h-5 text-purple-400" />
              ) : (
                <Eye className="w-5 h-5 text-green-400" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-6 shadow-xl">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
            <EyeOff className="w-6 h-6 text-purple-400" />
          </div>
          <h4 className="text-purple-400 font-bold">Ghost Mode Active</h4>
          <p className="text-white text-sm">
            {mockGhostVisits.filter(v => v.isAnonymous).length} anonymous visitors detected this week
          </p>
          <p className="text-gray-300 text-sm">
            These users visited your profile without leaving traces
          </p>
        </div>
      </div>

      <Button className="w-full instagram-gradient text-white font-bold py-4 rounded-2xl">
        Reveal anonymous visitors
      </Button>
    </section>
  )
}
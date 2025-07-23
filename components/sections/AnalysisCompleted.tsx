"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertTriangle } from "lucide-react"


interface Follower {
  name: string;
  avatar: string;
}

interface StoredProfile {
  id: string;
  name: string;
  fullName: string;
  avatar: string;
}

interface AnalysisCompletedProps {
  username: string;
  profileData: StoredProfile | null;
  followers: Follower[];
  followersLoading: boolean;
}

export function AnalysisCompleted({ username, profileData, followers, followersLoading }: AnalysisCompletedProps) {

  return (
    <section className="space-y-6 pt-6">
      <div className="text-center">
        <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-purple-500">
          <AvatarImage src={profileData?.avatar || "/placeholder.svg?height=80&width=80"} />
          <AvatarFallback>
            {profileData?.fullName ? profileData.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : username.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <p className="text-gray-300 mb-2">@{profileData?.name || username}</p>
        <h2 className="text-3xl font-bold text-white mb-6">Analysis Completed!</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <p className="text-white">{followers.length > 0 ? followers.length : 4} profiles from São Leopoldo are accessing this profile now</p>
            {followersLoading && <span className="text-gray-400 text-sm">Loading...</span>}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <p className="text-white">Stalkers identified last week</p>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">+15</span>
            </div>
          </div>
        </div>

        <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 shadow-xl">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div className="space-y-3">
              <h3 className="text-red-400 font-bold text-lg">Super Stalker Found!</h3>
              <p className="text-white">{profileData?.name || username} has a fan on the profile!</p>
              <p className="text-gray-300 text-sm">
                This Super Stalker visited {profileData?.name || username}'s profile for 11 consecutive days
              </p>
              <p className="text-gray-300 text-sm">
                {profileData?.name || username} made 3 video calls and deleted the conversation with this Stalker
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
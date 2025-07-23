"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, Users, Lock, MapPin } from "lucide-react"

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

interface MainActivitiesProps {
  username: string;
  profileData: StoredProfile | null;
  followers: Follower[];
  followersLoading: boolean;
}

const mockActivities = [
  { username: "@d******", action: "Deleted DM messages - 12 times yesterday", icon: Lock },
  { username: "@a******", action: "Added to close friends", icon: Users },
  { username: "@o******", action: "Spent +52m on video call with eo.rosch", icon: Clock }
]

const ActivityItem = ({ username, action, icon: Icon }: {
  username: string
  action: string
  icon: any
}) => (
  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
    <Icon className="h-4 w-4 text-gray-400" />
    <div>
      <p className="text-sm font-medium">{username}</p>
      <p className="text-xs text-gray-400">{action}</p>
    </div>
  </div>
)

export function MainActivities({ username, profileData, followers, followersLoading }: MainActivitiesProps) {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Main activities detected this week</h2>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
        {mockActivities.map((activity, index) => (
          <ActivityItem
            key={index}
            username={activity.username}
            action={activity.action}
            icon={activity.icon}
          />
        ))}
      </div>

      <div className="pt-4">
        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
          Access Instagram in Real Time
        </button>
      </div>

      <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <p className="text-white">Profiles were restricted in {username}'s stories and posts</p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="relative h-48 bg-gray-900 rounded-lg overflow-hidden">
          {/* Simulated map background */}
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-green-900/40 via-blue-900/40 to-gray-900/40">
              {/* Map grid lines */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-gray-600/30"></div>
                  ))}
                </div>
              </div>
              {/* Simulated roads/paths */}
              <div className="absolute top-1/4 left-0 w-full h-0.5 bg-yellow-600/40 transform rotate-12"></div>
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-yellow-600/40 transform -rotate-6"></div>
              <div className="absolute top-3/4 left-1/4 w-3/4 h-0.5 bg-yellow-600/40 transform rotate-3"></div>
              <div className="absolute left-1/3 top-0 h-full w-0.5 bg-yellow-600/40 transform rotate-12"></div>
              <div className="absolute left-2/3 top-0 h-full w-0.5 bg-yellow-600/40 transform -rotate-6"></div>
              {/* Simulated buildings/areas */}
              <div className="absolute top-6 left-8 w-12 h-8 bg-gray-700/60 rounded-sm"></div>
              <div className="absolute top-16 right-12 w-16 h-12 bg-gray-700/60 rounded-sm"></div>
              <div className="absolute bottom-12 left-16 w-20 h-10 bg-gray-700/60 rounded-sm"></div>
              <div className="absolute bottom-8 right-8 w-14 h-14 bg-gray-700/60 rounded-sm"></div>
            </div>
          </div>
          {/* Blur overlay */}
          <div className="absolute inset-0 backdrop-blur-lg bg-black/50">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-white font-bold text-xl">Location detected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
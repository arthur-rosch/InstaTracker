"use client"

import { Eye } from "lucide-react"

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

interface TopObserversProps {
  username: string;
  profileData: StoredProfile | null;
  followers: Follower[];
  followersLoading: boolean;
}

const mockTopObservers = [
  { username: "@g********", action: "42 posts saved" },
  { username: "@d********", action: "65 profile views" },
  { username: "@k********", action: "52 stories viewed" }
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

export function TopObservers({ username, profileData, followers, followersLoading }: TopObserversProps) {
  return (
    <section className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Your top observers</h3>
        <p className="text-gray-300">These profiles interact most with your content</p>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
        {mockTopObservers.map((observer, index) => (
          <ActivityItem
            key={index}
            username={observer.username}
            action={observer.action}
            icon={Eye}
          />
        ))}
      </div>
    </section>
  )
}
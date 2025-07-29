"use client"

import { Eye, UserCheck, Heart } from "lucide-react"

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

interface InteractionsDetectedProps {
  username: string;
  profileData: StoredProfile | null;
  followers: Follower[];
  followersLoading: boolean;
}

const mockInteractions = [
  { text: "5 screenshots of your stories", icon: Eye },
  { text: "Viewed your stories 13 times", icon: Eye },
  { text: "Shared your stories 13 times", icon: UserCheck },
  { text: "Saved 15 of your posts", icon: Heart }
]

export function InteractionsDetected({ username, profileData, followers, followersLoading }: InteractionsDetectedProps) {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Interactions detected</h2>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
        {mockInteractions.map((interaction, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
          >
            <interaction.icon className="w-4 h-4 text-gray-400" />
            <p className="text-white">{interaction.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
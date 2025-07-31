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
  { text: "5 screenshot delle tue storie", icon: Eye },
  { text: "Ha visto le tue storie 13 volte", icon: Eye },
  { text: "Ha condiviso le tue storie 13 volte", icon: UserCheck },
  { text: "Ha salvato 15 delle tue pubblicazioni", icon: Heart }
]

export function InteractionsDetected({ username, profileData, followers, followersLoading }: InteractionsDetectedProps) {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Interazioni rilevate</h2>
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
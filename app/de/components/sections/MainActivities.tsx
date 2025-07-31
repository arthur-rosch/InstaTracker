"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, Users, Lock, MapPin } from "lucide-react"
import MapboxMap from "@/app/delivery-insta/components/MapboxMap"
import { ChatList } from "./ChatList"

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
  { username: "@d******", action: "DM-Nachrichten gelöscht - 12 Mal gestern", icon: Lock },
  { username: "@a******", action: "Zu engen Freunden hinzugefügt", icon: Users },
  { username: "@o******", action: "Verbrachte +52m im Videoanruf mit eo.rosch", icon: Clock }
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
  const [showChatList, setShowChatList] = useState(false);

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Hauptaktivitäten dieser Woche erkannt</h2>
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
        <button
          onClick={() => setShowChatList(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
        >
Zugriff auf Instagram in Echtzeit
        </button>
      </div>

      <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <p className="text-white">Profile wurden in den Stories und Beiträgen von {username} eingeschränkt</p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="mb-4">
          <div className="flex items-center space-x-3 mb-3">
            <div>
              <h3 className="text-white font-bold text-lg">Standortaktivität erkannt</h3>
              <p className="text-gray-300 text-sm">Echtzeit-Standortverfolgung</p>
            </div>
          </div>
        </div>

        <div className="relative h-64 bg-gray-900 rounded-lg overflow-hidden border border-white/20">
          <MapboxMap
            position={[-23.5505, -46.6333]} // São Paulo coordinates
            city="São Paulo"
            country="Brazil"
            ip="192.168.1.1"
            zoom={13}
          />

          {/* Blur overlay */}
          <div className="absolute inset-0 backdrop-blur-sm"></div>
        </div>
      </div>

      <ChatList
        open={showChatList}
        onOpenChange={setShowChatList}
        username={username}
        avatar={profileData?.avatar}
        followers={followers}
      />
    </section>
  )
}
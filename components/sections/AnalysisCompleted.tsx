"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertTriangle } from "lucide-react"
import { useState, useEffect } from "react"


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
  const [userCity, setUserCity] = useState<string>("São Leopoldo")
  const [displayFollowers, setDisplayFollowers] = useState<Follower[]>([])

  // Gerar followers de fallback com fotos dos assets
  const generateFallbackFollowers = () => {
    const profileImages = [
      "/assets/profile/01.jpg",
      "/assets/profile/02.jpg",
      "/assets/profile/03.jpg",
      "/assets/profile/04.jpg",
      "/assets/profile/05.jpg",
      "/assets/profile/06.jpg",
      "/assets/profile/07.jpg",
      "/assets/profile/08.jpg",
      "/assets/profile/09.jpg",
      "/assets/profile/10.jpg"
    ]

    const names = ["Ana", "Carlos", "Maria", "João", "Fernanda", "Pedro", "Julia", "Rafael", "Camila", "Lucas"]

    return Array.from({ length: 4 }, (_, i) => ({
      name: names[Math.floor(Math.random() * names.length)],
      avatar: profileImages[Math.floor(Math.random() * profileImages.length)]
    }))
  }

  // Obter localização do usuário via IP
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        if (data.city) {
          setUserCity(data.city)
        }
      } catch (error) {
        console.log('Erro ao obter localização:', error)
        // Mantém São Leopoldo como fallback
      }
    }

    fetchUserLocation()

    // Usar followers reais se disponíveis, senão usar fallback
    if (followers && followers.length > 0) {
      setDisplayFollowers(followers.slice(0, 4))
    } else {
      setDisplayFollowers(generateFallbackFollowers())
    }
  }, [followers])

  return (
    <section className="space-y-6 pt-6">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full p-1">
          <Avatar className="w-full h-full rounded-full">
            <AvatarImage src={profileData?.avatar || "/placeholder.svg?height=80&width=80"} />
            <AvatarFallback>
              {profileData?.fullName ? profileData.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : username.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
        <p className="text-gray-300 mb-2">@{profileData?.name || username}</p>
        <h2 className="text-3xl font-bold text-white mb-6">Analysis Completed!</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex -space-x-3 items-center justify-center">
            {displayFollowers.map((follower, index) => (
              <Avatar key={index} className="w-12 h-12 border-2 border-white/30">
                <AvatarImage
                  src={follower.avatar}
                  alt={follower.name}
                  className="blur-sm"
                />
                <AvatarFallback className="text-xs bg-gray-600">
                  {follower.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <p className="text-white text-lg font-medium">{followers.length > 0 ? followers.length : 4} profiles from {userCity} are accessing this profile now</p>
            {followersLoading && <span className="text-gray-400 text-sm">Loading...</span>}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-center -space-x-3">
            {displayFollowers.slice(0, 3).map((follower, index) => (
              <Avatar key={`stalker-${index}`} className="w-12 h-12 border-2 border-white/30">
                <AvatarImage
                  src={follower.avatar}
                  alt={follower.name}
                  className="blur-sm"
                />
                <AvatarFallback className="text-xs bg-gray-600">
                  {follower.name.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="flex items-center justify-center mb-4">
            <p className="text-white text-lg font-medium">Stalkers identified last week</p>
          </div>
        </div>

        <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 shadow-xl">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-red-400 font-bold text-lg">Super Stalker Found!</h3>
              <p className="text-white">{profileData?.name || username} has a fan on the profile!</p>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="bg-red-800/20 border border-red-600/20 rounded-lg p-3">
              <p className="text-gray-300 text-sm">
                This Super Stalker visited {profileData?.name || username}'s profile for 11 consecutive days
              </p>
            </div>

            <div className="bg-red-800/20 border border-red-600/20 rounded-lg p-3">
              <p className="text-gray-300 text-sm">
                {profileData?.name || username} made 3 video calls and deleted the conversation with this Stalker
              </p>
            </div>

            <div className="bg-red-800/20 border border-red-600/20 rounded-lg p-3">
              <p className="text-gray-300 text-sm">
                Some conversations contain sexual content beyond what we can show here
              </p>
            </div>

            <div className="bg-red-800/20 border border-red-600/20 rounded-lg p-3">
              <p className="text-gray-300 text-sm">
                {profileData?.name || username} added only this Stalker to close friends
              </p>
            </div>

            <div className="bg-red-800/20 border border-red-600/20 rounded-lg p-3">
              <p className="text-gray-300 text-sm">
                This Stalker's interaction surpasses the second place by 11 times
              </p>
            </div>
          </div>
        </div>

        {/* Do not leave this page alert */}
        <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <h3 className="text-red-400 font-bold text-lg">Do not leave this page.</h3>
              <p className="text-white text-sm mt-1">We allow only ONE VIEW per device.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
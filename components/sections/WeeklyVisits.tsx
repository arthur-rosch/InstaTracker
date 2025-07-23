"use client"

import { useState } from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

interface WeeklyVisitsProps {
  username: string;
  profileData: StoredProfile | null;
  followers: Follower[];
  followersLoading: boolean;
}

export function WeeklyVisits({ username, profileData, followers, followersLoading }: WeeklyVisitsProps) {
  const [showChatList, setShowChatList] = useState(false);
  // Usar apenas os primeiros 5 seguidores para o carrossel
  const displayFollowers = followers.slice(0, 5);

  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <div className="text-white text-lg">↓</div>
        <h3 className="text-xl font-bold text-white">Last week</h3>
        <p className="text-gray-400">16/07 - 22/07</p>
        <p className="text-white font-semibold">Visited this profile this week 2 to 7 times:</p>
      </div>

      <Carousel 
        className="w-full max-w-sm mx-auto"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {followersLoading ? (
            // Mostrar placeholders enquanto carrega
            Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={`loading-${index}`} className="pl-2 md:pl-4 basis-1/3">
                <div className="relative">
                  <div className="w-24 h-32 rounded-2xl overflow-hidden border-2 border-white/20 bg-gray-700 animate-pulse">
                    <div className="w-full h-full bg-gray-600"></div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
                      <div className="h-3 bg-gray-500 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))
          ) : (
            displayFollowers.map((follower, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/3">
                <div className="relative">
                  <div className="w-24 h-32 rounded-2xl overflow-hidden border-2 border-white/20 bg-gradient-to-br from-purple-900/40 to-black">
                    <Avatar className="w-full h-full rounded-none">
                      <AvatarImage src={follower.avatar} className="object-cover w-full h-full" />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold w-full h-full rounded-none flex items-center justify-center">
                        {follower.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
                      <p className="text-white text-xs font-semibold text-center">
                        {follower.name.length > 8 ? `${follower.name.slice(0, 6)}***` : follower.name}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
      </Carousel>

      <p className="text-center text-orange-400 font-semibold">... and more:</p>

      {/* Statistics Cards */}
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 border border-red-500/30 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-4xl font-bold text-red-400">19</div>
              <div>
                <p className="text-white font-semibold">Followers of {profileData?.name || username} have sexual interests</p>
              </div>
            </div>
            <div className="text-2xl">❤️</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-4xl font-bold text-orange-400">3</div>
              <div>
                <p className="text-white font-semibold">Conversations of {profileData?.name || username} in Direct contain Nudes</p>
              </div>
            </div>
            <div className="text-2xl">🔥</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">⚠️</div>
              <div>
                <p className="text-white font-semibold">Profiles were restricted in {profileData?.name || username}'s stories and posts</p>
              </div>
            </div>
            <div className="text-2xl">🚫</div>
          </div>
        </div>
      </div>

      {/* View Real-time Button */}
      <div className="pt-4">
        <button 
          onClick={() => setShowChatList(!showChatList)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
        >
          {showChatList ? 'Hide conversations' : 'View real-time conversations'}
        </button>
      </div>

      {/* Chat List */}
      {showChatList && (
        <div className="mt-6">
          <ChatList 
            onBack={() => setShowChatList(false)} 
            username={profileData?.name || username}
          />
        </div>
      )}
    </section>
  )
}
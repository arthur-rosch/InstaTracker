"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Star } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { ChatList } from "./ChatList"

import Storys1 from '@/assets/storys/imgi_17_story-01.jpeg'
import Storys2 from '@/assets/storys/imgi_18_story-02.jpg'
import Storys3 from '@/assets/storys/imgi_19_story-03.jpg'
import Storys4 from '@/assets/storys/imgi_20_story-04.jpg'
import Storys5 from '@/assets/storys/imgi_21_story-05.jpg'
import Storys6 from '@/assets/storys/imgi_22_story-06.gif'
import Image from "next/image"

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

interface CloseFriendsProps {
  username: string;
  profileData: StoredProfile | null;
  followers: Follower[];
  followersLoading: boolean;
}

const mockCloseFriends = {
  count: 4,
  profiles: [1, 2, 3, 4],
  stories: [Storys1, Storys2, Storys3, Storys4, Storys5, Storys6]
}

export function CloseFriends({ username, profileData, followers, followersLoading }: CloseFriendsProps) {
  const [showChatList, setShowChatList] = useState(false);
  // Usar apenas os primeiros 4 seguidores para os avatares
  const displayFollowers = followers.slice(0, 4);
  const carouselApiRef = useRef<any>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      if (carouselApiRef.current) {
        autoScrollRef.current = setInterval(() => {
          carouselApiRef.current.scrollNext();
        }, 3000);
      }
    };

    const stopAutoScroll = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
    };

    // Delay to ensure carousel API is ready
    const timer = setTimeout(() => {
      startAutoScroll();
    }, 100);

    return () => {
      clearTimeout(timer);
      stopAutoScroll();
    };
  }, [carouselApiRef.current]);

  const handleCarouselApi = (api: any) => {
    carouselApiRef.current = api;
    // Start auto-scroll when API is ready
    if (api && !autoScrollRef.current) {
      setTimeout(() => {
        autoScrollRef.current = setInterval(() => {
          api.scrollNext();
        }, 3000);
      }, 100);
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl p-8 text-center">
        {/* Header with green circle and star */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center mr-4">
            <Star className="w-6 h-6 text-white fill-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Close Friends</h2>
        </div>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg mb-8">
          @{profileData?.name || username} and {displayFollowers.length || 4} other people added this profile to close friends
        </p>

        {/* Profile avatars - AvatarGroup style */}
        <div className="flex justify-center mb-8">
          <div className="flex -space-x-3">
            {followersLoading ? (
              // Mostrar placeholders enquanto carrega
              Array.from({ length: 4 }).map((_, index) => (
                <Avatar key={`loading-${index}`} className="w-16 h-16 border-2 border-green-500/50 bg-gray-700 animate-pulse">
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white font-semibold">...</AvatarFallback>
                </Avatar>
              ))
            ) : displayFollowers.length > 0 ? (
              displayFollowers.map((follower, index) => (
                <Avatar key={index} className="w-16 h-16 border-2 border-green-500/50 hover:z-10 transition-all duration-200 hover:scale-110">
                  <AvatarImage src={follower.avatar} className="blur-sm" />
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white font-semibold blur-sm">
                    {follower.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))
            ) : (
              // Fallback to mock data if no followers available
              mockCloseFriends.profiles.map((i) => (
                <Avatar key={i} className="w-16 h-16 border-2 border-green-500/50 hover:z-10 transition-all duration-200 hover:scale-110">
                  <AvatarImage src={`/images/profile-${i}.jpg`} className="blur-sm" />
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white font-semibold blur-sm">U{i}</AvatarFallback>
                </Avatar>
              ))
            )}
          </div>
        </div>

        {/* Stories Carousel */}
        <div className="mb-8">
          <Carousel
            className="w-full max-w-2xl mx-auto"
            setApi={handleCarouselApi}
            opts={{
              align: "center",
              loop: true,
              skipSnaps: false,
              dragFree: true,
              inViewThreshold: 0.5,
            }}
            onMouseEnter={() => {
              if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current);
                autoScrollRef.current = null;
              }
            }}
            onMouseLeave={() => {
              if (carouselApiRef.current && !autoScrollRef.current) {
                autoScrollRef.current = setInterval(() => {
                  carouselApiRef.current.scrollNext();
                }, 3000);
              }
            }}
          >
            <CarouselContent className="-ml-6">
              {mockCloseFriends.stories.map((story, index) => (
                <CarouselItem key={index} className="">
                  <div className="p-3">
                    <div className="relative">
                      <div className="w-full h-[600px] bg-gradient-to-br from-purple-900/40 to-black rounded-3xl overflow-hidden border-2 border-green-500/40 shadow-2xl">
                        <Image
                          src={story}
                          alt={`Story ${index + 1}`}
                          className="w-full h-full object-cover blur-sm"
                        />

                        {/* Gradient overlay for better text visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
                      </div>

                      {/* Profile Avatar with blur */}
                      <div className="absolute top-6 left-6">
                        <div className="backdrop-blur-md bg-white/20 rounded-full p-1 ">
                          <Avatar className="w-12 h-12 ring-2  shadow-lg blur-sm">
                            <AvatarImage src={displayFollowers[index % displayFollowers.length]?.avatar || `/images/profile-${(index % 3) + 1}.jpg`} />
                            <AvatarFallback>
                              {displayFollowers[index % displayFollowers.length]?.name.slice(0, 2).toUpperCase() || `U${index + 1}`}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>

                      {/* Star with green background and blur */}
                      <div className="absolute top-6 right-6">
                        <div className="bg-green-500/60 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center shadow-xl ">
                          <Star className="w-6 h-6 text-white fill-white blur-sm" />
                        </div>
                      </div>

                      {/* Story ring effect */}
                      <div className="absolute inset-0 rounded-3xl border-3 border-green-500/60 animate-pulse"></div>

                      {/* Enhanced glow effect */}
                      <div className="absolute inset-0 rounded-3xl shadow-[0_0_30px_rgba(34,197,94,0.3)]"></div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/10 border-white/20 hover:bg-white/20" />
            <CarouselNext className="right-4 bg-white/10 border-white/20 hover:bg-white/20" />
          </Carousel>
        </div>

        {/* Bottom text */}
        <p className="text-gray-400 text-sm">
          ...and 2 other people who don't follow {username}
        </p>
      </div>
      <div className="pt-4">
        <button
          onClick={() => setShowChatList(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
        >
          View real-time Stories
        </button>
      </div>

      <ChatList
        open={showChatList}
        onOpenChange={setShowChatList}
        username={username}
        avatar={profileData?.avatar}
        followers={followers}
      />
    </section >
  )
}
"use client"

import { AlertTriangle } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import DM1 from '@/assets/dm/imgi_14_chat1.png'
import DM2 from '@/assets/dm/imgi_15_chat2.png'
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

interface PrintsRecoveredProps {
  username: string;
  profileData: StoredProfile | null;
  followers: Follower[];
  followersLoading: boolean;
}

export function PrintsRecovered({ username, profileData, followers, followersLoading }: PrintsRecoveredProps) {
  const dmImages = [DM1, DM2]

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          <span className="instagram-gradient-text">Prints</span> recovered
        </h2>
        <p className="text-gray-300 mt-2">Our artificial intelligence searched</p>
        <p className="text-white font-semibold">
          all of Instagram <span className="text-gray-400">for conversations in Direct of</span>
        </p>
        <p className="instagram-gradient-text font-semibold">@{username}</p>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl text-center">
        <h3 className="text-xl font-bold text-white mb-4">4 Prints extracted</h3>
        <h4 className="text-lg font-semibold text-white mb-4">from @{username}'s DM</h4>
        <p className="text-gray-300 mb-2">We detected several messages with</p>
        <p className="text-white font-semibold">
          <span className="text-red-400">sexual nature</span> and{" "}
          <span className="text-red-400">explicit nudity</span>
        </p>
      </div>

      {/* DM Prints Carousel */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
        <h4 className="text-lg font-semibold text-white mb-4 text-center">DM Conversations</h4>
        <Carousel 
          className="w-full max-w-xs mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {dmImages.map((dmImage, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="relative">
                    <Image
                      src={dmImage}
                      alt={`DM Chat ${index + 1}`}
                      className="w-full h-auto rounded-lg blur-sm"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <p className="text-red-400 font-semibold">Do not leave this page.</p>
        </div>
        <p className="text-white text-center mt-2">We allow only ONE VIEW per device.</p>
      </div>
    </section>
  )
}
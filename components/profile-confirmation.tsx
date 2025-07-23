"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useIg } from "@/hooks/use-ig"

export function ProfileConfirmation() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isClient, setIsClient] = useState(false)
  const username = searchParams.get("username")
  const [isLoading, setIsLoading] = useState(false)
  const { loading: profileLoading, error, profile, getProfile } = useIg()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (username && isClient) {
      getProfile(username)
    }
  }, [username, isClient])

  const handleContinue = async () => {
    if (!isClient || !username || !profile) return
    
    setIsLoading(true)
    
    // Save analysis data to localStorage
    const analysisData = {
      profile: profile,
      username: username,
      timestamp: new Date().toISOString(),
      status: 'analyzed'
    }
    
    localStorage.setItem('instagram_analysis', JSON.stringify(analysisData))
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // Redirect to release page
    router.push(`/results?username=${username}`)
  }

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    )
  }

  // Don't render if no username
  if (!username) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-xl mb-4">No username provided</h2>
          <Button onClick={() => router.back()} className="instagram-gradient">
            Go Back
          </Button>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Background light points */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-pink-400/15 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      {/* Header */}


      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          {/* Single Profile Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
            {/* Loading State */}
            {profileLoading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
                <span className="ml-3 text-white">Loading profile...</span>
              </div>
            )}


            {/* Profile Content */}
            {profile && !profileLoading && (
              <>
                {/* Profile Avatar */}
                <div className="flex justify-center mb-6">
                  <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 ring-3 sm:ring-4 ring-pink-500/80">
                    <AvatarImage
                      src={`/api/image-proxy?url=${encodeURIComponent(profile.avatar)}`}
                      alt={profile.fullName || profile.name}
                      className="object-cover"
                    />
                    {/* <AvatarFallback className="text-lg sm:text-xl md:text-2xl bg-gray-700 text-white">
                      {(profile.full_name || profile.username)
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback> */}
                  </Avatar>
                </div>

                {/* Profile Info */}
                <div className="text-center space-y-2 mb-6">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    {profile.fullName || profile.name}
                  </h1>
                  <p className="text-gray-400 text-sm sm:text-base">@{profile.name}</p>
                  {profile.isBusiness && (
                    <div className="flex justify-center">
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Business</span>
                    </div>
                  )}
                </div>

                {/* Biography */}
                {profile.biography && (
                  <div className="text-center mb-6">
                    <p className="text-gray-300 text-sm">{profile.biography}</p>
                  </div>
                )}



                {/* Stats */}
                <div className="flex justify-between items-center py-4 mb-6 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      {isClient && profile.totalFollower ? profile.totalFollower.toLocaleString() : profile.totalFollower || '0'}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      {isClient && profile.totalFollowing ? profile.totalFollowing.toLocaleString() : profile.totalFollowing || '0'}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      {isClient && profile.totalPosts ? profile.totalPosts.toLocaleString() : profile.totalPosts || '0'}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">Posts</div>
                  </div>
                </div>
              </>
            )}

            {/* Confirmation Question */}
            {profile && !profileLoading && (
              <div className="text-center border-t border-white/10 pt-6">
                <h2 className="text-base sm:text-lg text-white font-semibold">Is this the correct Instagram profile?</h2>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      {profile && !profileLoading && (
        <div className="relative z-10 p-4 sm:p-6 pb-6 sm:pb-8 flex-shrink-0">
          <Button
            onClick={handleContinue}
            disabled={isLoading}
            className="w-full h-12 sm:h-14 md:h-16 text-sm sm:text-base md:text-lg font-bold instagram-gradient hover:opacity-90 text-white rounded-2xl sm:rounded-3xl shadow-xl"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 animate-spin" />
                Analyzing profile...
              </>
            ) : (
              "Continue, it's correct!"
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

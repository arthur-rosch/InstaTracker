"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, Lock, Briefcase } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useIg } from "@/hooks/use-ig"
import AppBar from "@/components/AppBar"

function ProfileConfirmationContent() {
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
    router.push(`/es/results?username=${username}`)
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
          <h2 className="text-xl mb-4">No se proporcionó nombre de usuario</h2>
          <Button onClick={() => router.back()} className="instagram-gradient">
            Volver
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

      {/* Header with Progress Bar */}
      <div className="top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-md mx-auto">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300" style={{ width: '66.66%' }}></div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="text-white hover:bg-white/10 p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="w-8"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-start justify-start px-4 sm:px-6 md:px-8 py-8 pt-24 pb-24">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto space-y-6">
          {/* Single Profile Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl">
            {/* Loading State */}
            {profileLoading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
                <span className="ml-3 text-white">Cargando perfil...</span>
              </div>
            )}


            {/* Profile Content */}
            {profile && !profileLoading && (
              <>
                {/* Profile Avatar */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full p-1">
                    <Avatar className="w-full h-full rounded-full">
                      <AvatarImage
                        src={profile.avatar}
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
                </div>

                {/* Profile Info */}
                <div className="text-center space-y-2 mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                      {profile.fullName || profile.name}
                    </h1>
                    {profile.isPrivate && (
                      <Lock className="w-4 h-4 sm:w-5 sm:h-5  to-pink-500 flex-shrink-0" />
                    )}
                    {profile.isBusiness && (
                      <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 t to-pink-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-gray-400 text-sm sm:text-base">@{profile.name}</p>
                </div>

                {/* Biography */}
                {profile.biography && (
                  <div className="text-center mb-4 sm:mb-6">
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{profile.biography}</p>
                  </div>
                )}



                {/* Stats */}
                <div className="flex justify-between items-center py-3 sm:py-4 border-t border-white/10">
                  <div className="text-center flex-1">
                    <div className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
                      {isClient && profile.totalFollower ? profile.totalFollower.toLocaleString() : profile.totalFollower || '0'}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">Seguidores</div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
                      {isClient && profile.totalFollowing ? profile.totalFollowing.toLocaleString() : profile.totalFollowing || '0'}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">Siguiendo</div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
                      {isClient && profile.totalPosts ? profile.totalPosts.toLocaleString() : profile.totalPosts || '0'}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">Publicaciones</div>
                  </div>
                </div>
              </>
            )}


          </div>

          {/* Confirmation Question - Outside the card */}
          {profile && !profileLoading && (
            <div className="text-center">
              <h2 className="text-sm sm:text-base md:text-lg text-white font-semibold">¿Es este el perfil correcto de Instagram?</h2>
            </div>
          )}

          {/* Fixed Bottom Button */}
          {profile && !profileLoading && (
            <div className=" z-50  p-4 sm:p-6">
              <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
                <Button
                  onClick={handleContinue}
                  disabled={isLoading}
                  className="w-full h-12 sm:h-14 md:h-16 text-sm sm:text-base md:text-lg font-bold instagram-gradient hover:opacity-90 text-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 animate-spin" />
                      Analizando perfil...
                    </>
                  ) : (
                    "¡Continuar, es correcto!"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AppBar */}
      <AppBar activeTab="explore" />
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-white" />
    </div>
  )
}

export function ProfileConfirmation() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProfileConfirmationContent />
    </Suspense>
  )
}

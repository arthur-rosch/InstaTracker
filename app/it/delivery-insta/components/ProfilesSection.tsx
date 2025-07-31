"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { InstagramProfile } from "@/hooks/use-ig";
import { Lock, Briefcase, Users } from "lucide-react"

interface ProfilesSectionProps {
  isActive: boolean;
  profile: InstagramProfile | null;
}

export default function ProfilesSection({ isActive, profile }: ProfilesSectionProps) {
  if (!profile) {
    return (
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
        <div className="text-center text-gray-400">Chargement du profil...</div>
      </div>
    )
  }

  // Use proxy API for avatar
  const avatarUrl = profile.avatar

  return (
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer col-span-2">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
      <div className="relative z-10">
        <div className="flex flex-col space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg md:text-xl">Profilo</h3>
                <p className="text-gray-300 text-sm">Visualizza profili visitati, stalker...</p>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${isActive
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
              Attivo
            </div>
          </div>

          {/* Target Profile */}
          <div className="flex justify-center mt-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 max-w-md w-full">
              {/* Profile Avatar */}
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full p-1">
                  <Avatar className="w-full h-full rounded-full">
                    <AvatarImage
                      src={avatarUrl}
                      alt={profile.fullName}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gray-700 text-white">
                      {profile.fullName.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center space-y-2 mb-4">
                <div className="flex items-center justify-center gap-2">
                  <h4 className="text-white font-bold text-lg">
                    {profile.fullName}
                  </h4>
                  {profile.isPrivate && (
                    <Lock className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  )}
                  {profile.isBusiness && (
                    <Briefcase className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  )}
                </div>
                <p className="text-gray-400 text-sm">@{profile.name}</p>
              </div>

              {/* Biography */}
              {profile.biography && (
                <div className="text-center mb-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {profile.biography}
                  </p>
                </div>
              )}

              {/* Stats */}
              <div className="flex justify-between items-center py-3 border-t border-white/10">
                <div className="text-center flex-1">
                  <div className="text-white font-bold text-lg">
                    {profile.totalFollower.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">Follower</div>
                </div>
                <div className="text-center flex-1">
                  <div className="text-white font-bold text-lg">
                    {profile.totalFollowing.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">Seguiti</div>
                </div>
                <div className="text-center flex-1">
                  <div className="text-white font-bold text-lg">
                    {profile.totalPosts.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">Pubblicazioni</div>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Stats */}
          <div className="text-center mt-6">
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="text-purple-400 font-bold text-2xl">100%</div>
                <div className="text-gray-400 text-sm">Analisi completa</div>
              </div>
              <div className="text-center">
                <div className="text-purple-400 font-bold text-2xl">24h</div>
                <div className="text-gray-400 text-sm">Sorveglianza</div>
              </div>
              <div className="text-center">
                <div className="text-purple-400 font-bold text-2xl">Live</div>
                <div className="text-gray-400 text-sm">Status</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
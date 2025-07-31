"use client"

import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessageCircle, ChevronRight, X } from "lucide-react"

interface Follower {
  name: string;
  avatar: string;
}

interface MentionsSectionProps {
  isActive: boolean;
  mentionsCount: number;
  followers: Follower[];
}

export default function MentionsSection({ isActive, mentionsCount = 19, followers }: MentionsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Use the followers from props for display
  const displayFollowers = followers.map((follower, index) => ({
    ...follower,
    username: follower.name.toLowerCase().replace(' ', '_')
  }))

  return (
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
      <div className="relative z-10">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg md:text-xl">Estimation des mentions</h3>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
              isActive
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              Actif
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Mentions Count */}
            <div className="text-center">
              <h2 className="text-white font-bold text-4xl md:text-5xl mb-2">{mentionsCount} Mentions</h2>
            </div>

            {/* Sample Avatars */}
            <div className="flex items-center justify-center">
              <div 
                className="flex -space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setIsModalOpen(true)}
              >
                {followers.slice(0, 3).map((follower, index) => (
                  <Avatar key={index} className="w-12 h-12 md:w-16 md:h-16 border-3 border-white shadow-lg">
                    <AvatarImage src={follower.avatar} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {follower.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <ChevronRight className="w-6 h-6 text-white ml-3" />
            </div>

            {/* Description */}
            <div className="text-center space-y-2">
              <p className="text-white text-sm md:text-base font-medium">
                Débloque le Centre de Capture pour voir les messages qui
              </p>
              <p className="text-white text-sm md:text-base font-medium">
                ont mentionné ton nom.
              </p>
            </div>

            {/* Status */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">Mis à jour maintenant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mentions Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-black/95 border border-white/20 text-white w-[95vw] max-w-lg max-h-[85vh] overflow-hidden">
          <DialogHeader className="flex flex-row items-center justify-between pb-4">
            <DialogTitle className="text-lg md:text-xl font-bold">Personnes qui t'ont mentionné ({displayFollowers.length})</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsModalOpen(false)}
              className="text-white hover:bg-white/10 p-2 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[65vh] space-y-2 pr-2">
            {displayFollowers.map((follower, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <Avatar className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                  <AvatarImage src={follower.avatar} />
                  <AvatarFallback className="bg-blue-600 text-white text-sm">
                    {follower.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm md:text-base truncate">{follower.name}</p>
                  <p className="text-xs md:text-sm text-gray-400 truncate">@{follower.username}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white text-xs md:text-sm px-3 py-1 flex-shrink-0"
                  onClick={() => window.open(`https://instagram.com/${follower.username}`, '_blank')}
                >
                  Voir
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
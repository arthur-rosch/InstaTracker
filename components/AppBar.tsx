"use client"

import React from 'react'
import { Search, FileText, Image } from 'lucide-react'

interface AppBarProps {
  activeTab?: 'panel' | 'explore' | 'prints'
}

export default function AppBar({ activeTab = 'explore' }: AppBarProps) {
  return (
    <div className="fixed bottom-0 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full  sm:px-0">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-t-2xl px-4 sm:px-8 py-4 shadow-2xl">
        <div className="flex items-center justify-between w-full relative z-10">
          {/* Panel */}
          <div className={`flex flex-col items-center space-y-1 cursor-pointer transition-all duration-300 flex-1 ${activeTab === 'panel'
            ? 'text-purple-400'
            : 'text-white hover:text-gray-300'
            }`}>
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-xl ${activeTab === 'panel'
              ? 'bg-purple-500/20 border border-purple-300/40 shadow-xl shadow-purple-500/30 before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-400/20 before:to-transparent before:rounded-full relative overflow-hidden'
              : 'hover:bg-white/15 hover:border hover:border-white/25 hover:shadow-lg hover:shadow-white/10'
              }`}>
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
            </div>
            <span className="text-xs font-medium hidden sm:block">Panel</span>
          </div>

          {/* Explore */}
          <div className={`flex flex-col items-center space-y-1 cursor-pointer transition-all duration-300 flex-1 ${activeTab === 'explore'
            ? 'text-pink-400'
            : 'text-white hover:text-gray-300'
            }`}>
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-xl ${activeTab === 'explore'
              ? 'bg-pink-500/20 border border-pink-300/40 shadow-xl shadow-pink-500/30 before:absolute before:inset-0 before:bg-gradient-to-br before:from-pink-400/20 before:to-transparent before:rounded-full relative overflow-hidden'
              : 'hover:bg-white/15 hover:border hover:border-white/25 hover:shadow-lg hover:shadow-white/10'
              }`}>
              <Search className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
            </div>
            <span className="text-xs font-medium hidden sm:block">Explore</span>
          </div>

          {/* Prints */}
          <div className={`flex flex-col items-center space-y-1 cursor-pointer transition-all duration-300 flex-1 ${activeTab === 'prints'
            ? 'text-purple-400'
            : 'text-white hover:text-gray-300'
            }`}>
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-xl ${activeTab === 'prints'
              ? 'bg-purple-500/20 border border-purple-300/40 shadow-xl shadow-purple-500/30 before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-400/20 before:to-transparent before:rounded-full relative overflow-hidden'
              : 'hover:bg-white/15 hover:border hover:border-white/25 hover:shadow-lg hover:shadow-white/10'
              }`}>
              <Image className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
            </div>
            <span className="text-xs font-medium hidden sm:block">Prints</span>
          </div>
        </div>
      </div>
    </div>
  )
}
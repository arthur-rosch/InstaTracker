"use client"

import React from 'react'
import { Search, FileText, Image } from 'lucide-react'

interface AppBarProps {
  activeTab?: 'panel' | 'explore' | 'prints'
}

export default function AppBar({ activeTab = 'explore' }: AppBarProps) {
  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm px-4 sm:px-0">
      <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl px-4 sm:px-8 py-3 shadow-2xl">
        <div className="flex items-center justify-between w-full">
          {/* Panel */}
          <div className={`flex flex-col items-center space-y-1 cursor-pointer transition-all duration-300 flex-1 ${activeTab === 'panel'
            ? 'text-purple-400'
            : 'text-gray-400 hover:text-white'
            }`}>
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${activeTab === 'panel'
              ? 'bg-purple-500/20 border border-purple-500/30'
              : 'hover:bg-white/10'
              }`}>
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs font-medium hidden sm:block">Panel</span>
          </div>

          {/* Explore */}
          <div className={`flex flex-col items-center space-y-1 cursor-pointer transition-all duration-300 flex-1 ${activeTab === 'explore'
            ? 'text-pink-400'
            : 'text-gray-400 hover:text-white'
            }`}>
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${activeTab === 'explore'
              ? 'bg-pink-500/20 border border-pink-500/30'
              : 'hover:bg-white/10'
              }`}>
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs font-medium hidden sm:block">Explore</span>
          </div>

          {/* Prints */}
          <div className={`flex flex-col items-center space-y-1 cursor-pointer transition-all duration-300 flex-1 ${activeTab === 'prints'
            ? 'text-purple-400'
            : 'text-gray-400 hover:text-white'
            }`}>
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${activeTab === 'prints'
              ? 'bg-purple-500/20 border border-purple-500/30'
              : 'hover:bg-white/10'
              }`}>
              <Image className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs font-medium hidden sm:block">Prints</span>
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import { Eye } from "lucide-react"

interface ContentSectionProps {
  isActive: boolean
}

export default function ContentSection({ isActive }: ContentSectionProps) {
  return (
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer col-span-2">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
      <div className="relative z-10">
        <div className="flex flex-col space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg md:text-xl">Contenuto</h3>
                <p className="text-gray-300 text-sm">Visualizza Stories, pubblicazioni, contenuto condiviso...</p>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
              isActive
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              Attivo
            </div>
          </div>

          {/* Content Types Progress Bars */}
          <div className="space-y-6 mt-6">
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-base">Tipo di contenuto più condiviso</h4>
              
              {/* Stories */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Stories</span>
                  <span className="text-white text-sm font-medium">{Math.floor(Math.random() * 50) + 30}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: `${Math.floor(Math.random() * 50) + 30}%`}}></div>
                </div>
              </div>

              {/* Publications */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Publications</span>
                  <span className="text-white text-sm font-medium">{Math.floor(Math.random() * 50) + 30}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: `${Math.floor(Math.random() * 50) + 30}%`}}></div>
                </div>
              </div>

              {/* Reels */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Reels</span>
                  <span className="text-white text-sm font-medium">{Math.floor(Math.random() * 50) + 30}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: `${Math.floor(Math.random() * 50) + 30}%`}}></div>
                </div>
              </div>
            </div>


            {/* Content shared this week */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-base">Contenuto condiviso questa settimana</h4>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">Totale condiviso</span>
                  <span className="text-white font-medium">{Math.floor(Math.random() * 100) + 50}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Media al giorno</span>
                  <span className="text-white font-medium">{Math.floor(Math.random() * 15) + 5}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
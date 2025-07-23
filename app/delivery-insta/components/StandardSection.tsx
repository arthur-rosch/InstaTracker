"use client"

import { LucideIcon } from "lucide-react"

interface StandardSectionProps {
  id: string
  name: string
  description: string
  icon: LucideIcon
  status: string
  data: string
  isActive: boolean
}

export default function StandardSection({ 
  id, 
  name, 
  description, 
  icon: IconComponent, 
  status, 
  data, 
  isActive 
}: StandardSectionProps) {
  return (
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center">
            <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
            isActive
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {status}
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-white font-bold text-lg md:text-xl">{name}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
          <div className="pt-2">
            <p className="text-purple-300 font-medium text-sm">{data}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
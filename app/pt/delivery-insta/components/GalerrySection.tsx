"use client"

import { Eye, AlertTriangle, Camera } from "lucide-react"
import Image from "next/image"
import suspiciousPhoto from "@/assets/Captura de Tela 2025-07-24 às 18.27.18.png"

interface GallerySectionProps {
  isActive: boolean;
}

export default function GallerySection({ isActive }: GallerySectionProps) {
  return (
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-2xl"></div>
      <div className="relative z-10">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-red-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg md:text-xl">Verdächtige Fotos</h3>
                <p className="text-gray-400 text-sm">Potenziell kompromittierender Inhalt erkannt</p>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${isActive
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
              }`}>
              {isActive ? 'Alarm' : 'Inaktiv'}
            </div>
          </div>

          {/* Suspicious Photo Display */}
          <div className="relative">
            <div className="relative aspect-video w-full max-w-md mx-auto rounded-xl overflow-hidden border border-red-500/30 shadow-lg">
              <Image
                src={suspiciousPhoto}
                alt="Verdächtiger Inhalt erkannt"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>




            </div>
          </div>

          {/* Stats and Warning */}
          <div className="text-center space-y-3">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-semibold">Datenschutz-Alarm</span>
              </div>
              <p className="text-gray-300 text-sm">
                Potenziell kompromittierender Inhalt wurde erkannt und erfasst.
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-white font-bold text-xl">1 Verdächtiges Foto</p>
              <p className="text-red-400 text-sm">Erfordert sofortige Aufmerksamkeit</p>
              <p className="text-gray-400 text-xs">Letzte Erkennung: Gerade jetzt</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
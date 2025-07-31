"use client"

import { MapPin } from "lucide-react"
import { useEffect, useState, useMemo } from "react"
import dynamic from "next/dynamic"

interface LocationsSectionProps {
  isActive: boolean
}

interface LocationData {
  city: string
  country: string
  coordinates: { lat: number; lng: number }
  timestamp: string
  ip: string
  region?: string
}

export default function LocationsSection({ isActive }: LocationsSectionProps) {
  const [detectedLocation, setDetectedLocation] = useState<LocationData>({
    city: "Chargement...",
    country: "Chargement...",
    coordinates: { lat: 0, lng: 0 },
    timestamp: new Date().toLocaleString('de-DE'),
    ip: "Détection..."
  })
  const [isLoading, setIsLoading] = useState(true)

  const MapboxMap = useMemo(() => dynamic(
    () => import('./MapboxMap'),
    {
      loading: () => (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-500 rounded-full mx-auto mb-2 animate-spin"></div>
            <p className="text-white text-sm">Caricamento della mappa...</p>
          </div>
        </div>
      ),
      ssr: false
    }
  ), [])

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        // Using ipapi.co for IP geolocation (free tier available)
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()

        setDetectedLocation({
          city: data.city || "Inconnu",
          country: data.country_name || "Inconnu",
          coordinates: {
            lat: parseFloat(data.latitude) || 0,
            lng: parseFloat(data.longitude) || 0
          },
          timestamp: new Date().toLocaleString('de-DE'),
          ip: data.ip || "Inconnu",
          region: data.region || undefined
        })
      } catch (error) {
        console.error('Error fetching location:', error)
        // Fallback data if API fails
        setDetectedLocation({
          city: "São Paulo",
          country: "Brasil",
          coordinates: { lat: -23.5505, lng: -46.6333 },
          timestamp: new Date().toLocaleString('de-DE'),
          ip: "Inconnu"
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocationData()
  }, [])

  return (
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer col-span-2">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
      <div className="relative z-10">
        <div className="flex flex-col space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg md:text-xl">Posizioni</h3>
                <p className="text-gray-300 text-sm">Il telefono che desideri monitorare è stato recentemente localizzato in questo posto</p>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${isActive
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
              Attivo
            </div>
          </div>

          {/* Map and Location */}
          <div className="space-y-6 mt-6">
            {/* Real Map */}
            <div className="bg-white/5 rounded-lg p-6 space-y-4">


              {/* Real Map Area */}
              <div className="relative0 rounded-lg h-48 border  overflow-hidden">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-gray-500 rounded-full mx-auto mb-2 animate-spin"></div>
                      <p className="text-white text-sm">Caricamento della mappa...</p>
                    </div>
                  </div>
                ) : (
                  <MapboxMap
                    position={[detectedLocation.coordinates.lat, detectedLocation.coordinates.lng]}
                    city={detectedLocation.city}
                    country={detectedLocation.country}
                    ip={detectedLocation.ip}
                    zoom={13}
                  />
                )}
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}
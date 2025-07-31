"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User, Bell, MapPin, Camera } from "lucide-react"

export default function DeliveryPage() {
  const router = useRouter()
  const [selectedService, setSelectedService] = useState("instagram")

  const services = [
    {
      id: "instagram",
      name: "Instagram",
      description: "DMs, Stalker, Weiterleitungen ansehen...",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png",
      status: "Aktiv"
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      description: "Unterhaltungen, Anrufe ansehen...",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2048px-WhatsApp.svg.png",
      status: "Inaktiv"
    },
    {
      id: "facebook",
      name: "Facebook",
      description: "Auf Messenger zugreifen, Unterhaltungen abrufen...",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png",
      status: "Inaktiv"
    },
    {
      id: "location",
      name: "Standort",
      description: "Den Standort der überwachten Person in Echtzeit anzeigen.",
      icon: MapPin,
      status: "Inaktiv"
    },
    {
      id: "social",
      name: "Soziale Netzwerke",
      description: "Alle sozialen Netzwerke dieser Person anzeigen. Z.B.: Tinder",
      logo: "https://logos-world.net/wp-content/uploads/2020/09/Tinder-Logo.png",
      status: "Inaktiv"
    },
    {
      id: "camera",
      name: "Kamera",
      description: "Zugriff auf Kamera und Mikrofon des Telefons erhalten...",
      icon: Camera,
      status: "Inaktiv"
    },
    {
      id: "gallery",
      name: "Galerie",
      description: "Fotogalerie, geheime Alben, gelöschte Fotos ansehen...",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Photos_icon_%282020%29.svg",
      status: "Inaktiv"
    },
    {
      id: "adult",
      name: "+18",
      description: "Auf Erwachseneninhalte und private Videos zugreifen...",
      logo: "https://static-cdn77.xvideos-cdn.com/v3/img/skins/default/logo/xv.black.svg",
      status: "Inaktiv"
    }
  ]

  return (
    <section className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Light points - same as hero-section */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-pink-400/15 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 mt-12 mx-4">
            {/* Profile and Notification Icons */}
            <div className="flex justify-between items-center mb-6">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all duration-300">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="relative">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all duration-300">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                {/* Notification dot */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black"></div>
              </div>
            </div>

            {/* Welcome Badge */}
            <div className="inline-block bg-white/5 backdrop-blur-xl border border-purple-400/30 rounded-2xl px-6 py-4 mb-6 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
              <div className="relative z-10 flex items-center space-x-3">
                <User className="w-6 h-6 text-purple-400" />
                <div className="text-left">
                  <h2 className="text-white font-bold text-lg">Willkommen!</h2>
                  <p className="text-purple-300 text-sm">Du hast 1 Bericht diese Woche verfügbar.</p>
                </div>
                <Bell className="w-5 h-5 text-purple-400" />
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Spionage-Dienste
            </h1>
            <p className="text-gray-300 text-lg mb-8">verfügbar für dich</p>
          </div>

          {/* Services Grid - 2 cards per row always */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
            {services.map((service) => {
              const IconComponent = service.icon
              const isActive = service.status === "Aktiv"

              return (
                <div
                  key={service.id}
                  className={`relative backdrop-blur-xl border rounded-2xl p-4 md:p-6 shadow-2xl transition-all duration-300 cursor-pointer ${isActive
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:scale-105'
                    : 'bg-white/2 border-white/5 opacity-50 hover:opacity-70'
                    } ${selectedService === service.id ? 'ring-2 ring-purple-500/50' : ''}`}
                  onClick={() => {
                    if (service.id === 'instagram' && service.status === 'Aktiv') {
                      router.push('/de/delivery-insta')
                    } else {
                      setSelectedService(service.id)
                    }
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
                  <div className="relative z-10">
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center">
                          {service.logo ? (
                            <img
                              src={service.logo}
                              alt={`${service.name} logo`}
                              className="w-8 h-8 md:w-10 md:h-10 object-contain"
                            />
                          ) : IconComponent ? (
                            <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                          ) : null}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${isActive
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                          {service.status === 'Aktiv' ? 'Aktiv' : 'Inaktiv'}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-sm md:text-lg">{service.name}</h3>
                        <p className="text-gray-300 text-xs md:text-sm">{service.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
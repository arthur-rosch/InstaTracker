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
      description: "See DMs, Stalkers, Forwards...",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png",
      status: "Active"
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      description: "See Conversations, Calls...",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2048px-WhatsApp.svg.png",
      status: "Coming Soon"
    },
    {
      id: "facebook",
      name: "Facebook",
      description: "Access Messenger, Get conversations...",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png",
      status: "Coming Soon"
    },
    {
      id: "location",
      name: "Location",
      description: "See the location of the spied person in real time.",
      icon: MapPin,
      status: "Coming Soon"
    },
    {
      id: "social",
      name: "Social Media",
      description: "See all social media that person has. Ex: Tinder",
      logo: "https://logos-world.net/wp-content/uploads/2020/09/Tinder-Logo.png",
      status: "Coming Soon"
    },
    {
      id: "camera",
      name: "Camera",
      description: "Get access to the phone's camera and microphone...",
      icon: Camera,
      status: "Coming Soon"
    },
    {
      id: "gallery",
      name: "Gallery",
      description: "See the photo gallery, secret albums, deleted photos...",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Photos_icon.svg/2048px-Google_Photos_icon.svg.png",
      status: "Coming Soon"
    },
    {
      id: "adult",
      name: "+18",
      description: "Access adult content and private videos...",
      logo: "https://cdn.worldvectorlogo.com/logos/xvideos-1.svg",
      status: "Coming Soon"
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
          <div className="text-center mb-8">
            {/* Welcome Badge */}
            <div className="inline-block bg-white/5 backdrop-blur-xl border border-purple-400/30 rounded-2xl px-6 py-4 mb-6 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
              <div className="relative z-10 flex items-center space-x-3">
                <User className="w-6 h-6 text-purple-400" />
                <div className="text-left">
                  <h2 className="text-white font-bold text-lg">Welcome!</h2>
                  <p className="text-purple-300 text-sm">You have 1 report available this week.</p>
                </div>
                <Bell className="w-5 h-5 text-purple-400" />
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Spy Services
            </h1>
            <p className="text-gray-300 text-lg mb-8">available for you</p>
          </div>

          {/* Services Grid - 2 cards per row always */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
            {services.map((service) => {
              const IconComponent = service.icon
              const isActive = service.status === "Active"

              return (
                <div
                  key={service.id}
                  className={`relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer ${selectedService === service.id ? 'ring-2 ring-purple-500/50' : ''
                    }`}
                  onClick={() => {
                    if (service.id === 'instagram' && service.status === 'Active') {
                      router.push('/delivery-insta')
                    } else {
                      setSelectedService(service.id)
                    }
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
                  <div className="relative z-10">
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center">
                          {service.logo ? (
                            <img
                              src={service.logo}
                              alt={`${service.name} logo`}
                              className="w-6 h-6 md:w-8 md:h-8 object-contain"
                            />
                          ) : IconComponent ? (
                            <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                          ) : null}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${isActive
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                          {service.status}
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

          {/* Footer links - Same as hero section */}
          <div className="pt-12 space-y-4 text-center">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors underline">
                Terms and Conditions
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors underline">
                support@instacheck.app
              </a>
            </div>
            <p className="text-xs text-gray-600">Copyright © 2025. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
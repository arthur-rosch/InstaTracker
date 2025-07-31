"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Camera, Shield, Smartphone, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Upsell3Page() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedCamera, setSelectedCamera] = useState("front")
  const [accessLevel, setAccessLevel] = useState("premium")

  return (
    <section className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden mt-6">
      {/* Light points - same as home */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-pink-400/15 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg mx-auto text-center space-y-6">


          {/* Title Section */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Zugang zur versteckten <br />
              <span className="instagram-gradient-text">Kamera</span>
            </h1>
            <p className="text-lg text-purple-400 font-semibold">
              100% ANONYM UND SICHER
            </p>
            <p className="text-gray-300 leading-relaxed">
              Greifen Sie in Echtzeit auf die Kamera jedes Telefons zu
            </p>
          </div>

          {/* Description Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl hover:bg-white/10 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
            <div className="relative z-10">
              <p className="text-gray-300 text-sm leading-relaxed">
                Überwachen Sie remote die Kamera jeder Telefonnummer, ohne dass die Person es weiß. Live-Übertragung, keine App-Installation erforderlich, 100% unsichtbar.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Phone Number Input */}
            <div className="text-left">
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Zu überwachende Telefonnummer
              </label>
              <Input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="h-12 text-base border-2 border-gray-800 bg-gray-900 text-white placeholder-gray-500 focus:border-purple-500 rounded-2xl"
              />
            </div>

            {/* Camera Selection */}
            <div className="text-left">
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Kamera auswählen
              </label>
              <select
                value={selectedCamera}
                onChange={(e) => setSelectedCamera(e.target.value)}
                className="w-full h-12 text-base border-2 border-gray-800 bg-gray-900 text-white focus:border-purple-500 rounded-2xl px-4 appearance-none"
              >
                <option value="front">Frontkamera</option>
                <option value="back">Rückkamera</option>
                <option value="both">Beide Kameras</option>
              </select>
            </div>

            {/* Access Level */}
            <div className="text-left">
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Zugangsebene
              </label>
              <select
                value={accessLevel}
                onChange={(e) => setAccessLevel(e.target.value)}
                className="w-full h-12 text-base border-2 border-gray-800 bg-gray-900 text-white focus:border-purple-500 rounded-2xl px-4 appearance-none"
              >
                <option value="premium">Premium-Zugang (Video und Audio)</option>
                <option value="basic">Basis-Zugang (Nur Video)</option>
              </select>
            </div>
          </div>

          {/* Connect Button */}
          <Button
            className="w-full h-12 px-8 instagram-gradient hover:opacity-90 text-white font-bold shadow-xl rounded-2xl text-base"
            onClick={() => router.push('/results')}
          >
            MIT REMOTE-KAMERA VERBINDEN
          </Button>

          {/* Features Grid - same style as home */}
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mt-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-left shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-2xl"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-2">100% Anonym</h3>
                <p className="text-gray-300 text-sm">
                  Ihre Identität bleibt vollständig verborgen. Die Person wird nicht wissen, dass sie überwacht wird.
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-left shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-2">Jedes Telefon</h3>
                <p className="text-gray-300 text-sm">
                  Funktioniert mit jeder Telefonnummer, unabhängig vom Anbieter oder Gerätemodell.
                </p>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <p className="text-xs text-gray-400 pt-4">100% Anonym • Sofortige Ergebnisse • Keine Registrierung erforderlich</p>
        </div>
      </div>
    </section>
  )
}
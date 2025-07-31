"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Clock } from "lucide-react"
import AppBar from "@/components/AppBar"

export function HeroSection() {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSearch = async () => {
    if (!username.trim()) return

    setIsLoading(true)

    // Clean username (remove @ if present)
    const cleanUsername = username.replace("@", "")

    // Check if analysis already exists for this username in localStorage
    try {
      const stored = localStorage.getItem('instagram_analysis')
      if (stored) {
        const data = JSON.parse(stored)
        if (data.profile && data.profile.name === cleanUsername) {
          // Já existe análise, redirecionar para tela de consulta já utilizada
          router.push(`/de/release-used?username=${cleanUsername}`)
          setIsLoading(false)
          return
        }
      }
    } catch (error) {
      console.error('Error checking localStorage:', error)
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to confirmation page
    router.push(`/de/confirm?username=${cleanUsername}`)
    setIsLoading(false)
  }

  return (
    <>
      {/* Fixed Header Progress Bar */}
      <div className="top-0 left-0 right-0 z-50 ">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-md mx-auto">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300" style={{ width: '33.33%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <section className="min-h-screen bg-black flex items-start justify-start relative overflow-hidden pt-20 pb-20">
        {/* Light points */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-16 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-pink-400/15 rounded-full blur-xl animate-pulse delay-1500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* Main Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 instagram-gradient rounded-3xl flex items-center justify-center shadow-2xl p-4">
                <img src="/images/spy-icon.png" alt="Spy Icon" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Time indicator */}
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Clock className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-semibold text-purple-400">Entdecke in 1 Minute</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                Alle Informationen, die <br />
                <span className="instagram-gradient-text">Instagram vor dir verbirgt.</span>
              </h1>
            </div>

            {/* Search Input */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">@</div>
                  <Input
                    type="text"
                    placeholder="Gib den Instagram-Benutzernamen ein"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-12 text-base border-2 border-gray-800 bg-gray-900 text-white placeholder-gray-500 focus:border-purple-500 rounded-2xl bg-transparent"
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={isLoading || !username.trim()}
                  className="h-12 px-6 instagram-gradient hover:opacity-90 text-white font-bold shadow-xl rounded-2xl text-base min-w-[120px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analysiere...
                    </>
                  ) : (
                    "Analyse starten"
                  )}
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="space-y-1">
                <p className="text-xs text-gray-400">100% Anonym • Sofortige Ergebnisse • Keine Registrierung erforderlich</p>
                <p className="text-xs text-orange-400 font-semibold">⚠️ Eine Abfrage pro Gerät • Daten auf dem Gerät gespeichert</p>
              </div>
            </div>

            {/* Features with enhanced glass effect */}
            <div className="flex flex-col gap-3 max-w-lg mx-auto mb-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-left shadow-2xl hover:bg-white/10 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl"></div>
                <div className="relative z-10">
                  <h3 className="text-sm font-bold text-white mb-1">Vollständiges Profil</h3>
                  <p className="text-xs text-gray-300">Zugriff auf alle Profilinformationen, Fotos, Follower und mehr</p>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-left shadow-2xl hover:bg-white/10 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent rounded-xl"></div>
                <div className="relative z-10">
                  <h3 className="text-sm font-bold text-white mb-1">Stories und Nachrichten</h3>
                  <p className="text-xs text-gray-300">Entdecke, wer deine Stories gesehen hat und greife auf private Nachrichten zu</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* AppBar */}
        <AppBar activeTab="explore" />
      </section>
    </>
  )
}

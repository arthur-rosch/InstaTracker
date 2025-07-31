"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Instagram, Loader2, Eye, Activity } from "lucide-react"
import { InstagramProfile, useIg } from "@/hooks/use-ig"
import InteractionsSection from "./components/InteractionsSection"
import ContentSection from "./components/ContentSection"
import LocationsSection from "./components/LocationsSection"
import StoriesSection from "./components/StoriesSection"
import StandardSection from "./components/StandardSection"
import ProfilesSection from "./components/ProfilesSection"
import MentionsSection from "./components/MentionsSection"
import PrintsSection from "./components/PrintsSections"
import { Badge } from "@/components/ui/badge"
import GallerySection from "./components/GalerrySection"

export default function DeliveryInstaPage() {
  const router = useRouter()
  const { getProfile, getFollowers, getStories, getHighlights, followers, stories, highlights, loading, followersLoading, storiesLoading, highlightsLoading, error } = useIg()
  const [username, setUsername] = useState("")
  const [profile, setProfile] = useState<InstagramProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [currentUsername, setCurrentUsername] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    setIsLoading(true)
    setCurrentUsername(username)

    try {
      // Fetch profile data
      const profileData = await getProfile(username)
      if (profileData) {
        setProfile(() => profileData);
        // Fetch followers (10 followers)
        await getFollowers(profileData.id)
        // Fetch stories
        const resultStories = await getStories(username)

        // Fetch highlights if stories exist
        if (resultStories.length === 0) {
          await getHighlights(username)
        }

        // Only show report after all data is loaded
        if (!loading && !followersLoading && !storiesLoading && !highlightsLoading) {
          setShowReport(true)
        }
      }
    } catch (err) {
      console.error('Error fetching data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToForm = () => {
    setShowReport(false)
    setUsername("")
    setCurrentUsername("")
  }

  if (showReport) {
    const standardSections: Array<{
      id: string;
      name: string;
      description: string;
      icon: any;
      status: string;
      data: string;
    }> = []

    return (
      <section className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Light points - same as delivery */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-16 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-pink-400/15 rounded-full blur-xl animate-pulse delay-1500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header Section - same structure as delivery */}
            <div className="text-center mb-12 mt-8">
              {/* Profile Badge - same as delivery welcome badge */}

              {/* Main Title - same as delivery */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Reporte de Entrega
              </h1>
              <p className="text-gray-300 text-lg mb-8">Reporte completo de actividad para @{currentUsername}</p>

              <div className="inline-block bg-white/5 backdrop-blur-xl border border-purple-400/30 rounded-2xl px-6 py-4 mb-6 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
                <div className="relative z-10 flex items-center space-x-3">
                  <Instagram className="w-6 h-6 text-purple-400" />
                  <div className="text-left">
                    <h2 className="text-white font-bold text-lg">@{currentUsername}</h2>
                    <p className="text-purple-300 text-sm">Análisis de Instagram Completo</p>
                  </div>
                  <button
                    onClick={handleBackToForm}
                    className="flex items-center space-x-1 text-purple-400 hover:text-white transition-colors text-sm"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Report Flex - All cards in a column */}
            <div className="flex flex-col gap-6 md:gap-8 mb-8">
              <ProfilesSection isActive={true} profile={profile} />
              <InteractionsSection isActive={true} followers={followers} />
              <MentionsSection isActive={true} mentionsCount={19} followers={followers} />

              <ContentSection isActive={true} />
              {stories.length > 0 && (
                <StoriesSection isActive={true} followers={followers} stories={stories} />
              )}

              {stories.length === 0 && highlights.length > 0 && (
                <StoriesSection isActive={true} followers={followers} highlights={highlights} />
              )}

              <LocationsSection isActive={true} />
              <PrintsSection isActive={true} followers={followers} />
              <GallerySection isActive={true} />

              {/* Temporary Messages Recovery Section */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Activity className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg md:text-xl">Mensajes Temporales</h3>
                        <p className="text-gray-300 text-sm">Recuperando mensajes temporales eliminados</p>
                      </div>
                    </div>
                    <div className="px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm bg-green-500/20 text-green-400 border border-green-500/30">
                      Activo
                    </div>
                  </div>

                  {/* Recovery Steps */}
                  <div className="space-y-4 mb-6">
                    {/* Protection Bypass */}
                    <div className="bg-white/5 backdrop-blur-xl border border-purple-400/30 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <Eye className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">Bypass de Protección</h4>
                          <p className="text-gray-300 text-sm">Evadiendo protecciones de mensajes temporales...</p>
                        </div>
                      </div>
                    </div>

                    {/* Media Recovery */}
                    <div className="bg-white/5 backdrop-blur-xl border border-pink-400/30 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                          <Activity className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">Recuperación de Medios</h4>
                          <p className="text-gray-300 text-sm">Buscando fotos y videos temporales de los últimos 30 días...</p>
                        </div>
                      </div>
                    </div>

                    {/* Interaction Analysis */}
                    <div className="bg-white/5 backdrop-blur-xl border border-blue-400/30 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <Activity className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">Análisis de Interacciones</h4>
                          <p className="text-gray-300 text-sm">Identificando patrones sospechosos en las interacciones...</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Analysis in Progress */}
                  <div className="bg-orange-500/10 border border-orange-400/30 rounded-xl p-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <Loader2 className="w-5 h-5 text-orange-400 animate-spin" />
                      <div>
                        <h4 className="text-white font-semibold">Análisis en progreso</h4>
                        <p className="text-gray-300 text-sm">El reporte profundo con análisis detallado del perfil estará disponible en 7 días.</p>
                      </div>
                    </div>
                  </div>

                  {/* Exclusive Bonus */}
                  <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-xl p-6 mb-6">
                    <div className="text-center mb-4">
                      <h4 className="text-white font-bold text-lg mb-2">🎁 ¡Bono Exclusivo!</h4>
                      <p className="text-gray-300">¡Recibirás el MemberKit completo por email en 24 horas con más de $1000 en contenido gratuito!</p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                      <h5 className="text-purple-300 font-semibold mb-3">📧 Lo que recibirás:</h5>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                          <span>Acceso completo al MemberKit</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                          <span>Más de $1000 en contenido premium</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                          <span>Enviado directamente a tu email</span>
                        </li>
                      </ul>
                      <p className="text-yellow-400 text-sm mt-3 font-semibold">Revisa tu bandeja de entrada y carpeta de spam</p>
                    </div>
                  </div>

                  {/* Temporary Messages */}
                  <div className="space-y-3">
                    <div className="bg-white/5 backdrop-blur-xl border border-red-400/30 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-gray-300 text-sm">Yesterday, 23:45</span>
                        </div>
                        <span className="text-red-400 text-sm font-semibold">Mensaje Temporal</span>
                      </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-red-400/30 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-gray-300 text-sm">Yesterday, 22:30</span>
                        </div>
                        <span className="text-red-400 text-sm font-semibold">Mensaje Temporal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Standard Sections */}
              {standardSections.map((section) => {
                const isActive = section.status === "Active"
                return (
                  <StandardSection
                    key={section.id}
                    {...section}
                    isActive={isActive}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden  mt-12">
      {/* Light points - same as hero-section */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-pink-400/15 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver a servicios</span>
          </button>

          {/* Header Section */}
          <div className="text-center mb-12">
            {/* Instagram Badge */}
            <div className="inline-block bg-white/5 backdrop-blur-xl border border-purple-400/30 rounded-2xl px-6 py-4 mb-6 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
              <div className="relative z-10 flex items-center space-x-3">
                <Instagram className="w-8 h-8 text-purple-400" />
                <div className="text-left">
                  <h2 className="text-white font-bold text-xl">Espía de Instagram</h2>
                  <p className="text-purple-300 text-sm">Accede a DMs, stalkers, reenvíos...</p>
                </div>
              </div>
            </div>

            {/* Main Title */}
            <div className="inline-block bg-green-500/20 backdrop-blur-xl border border-green-400/30 rounded-2xl px-6 py-4 mb-6 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-2xl"></div>
              <div className="relative z-10 flex items-center space-x-3">
                <div className="text-left">
                  <p className="text-green-500/80 text-sm font-semibold">¡Tu compra ha sido aprobada!</p>
                </div>
              </div>
            </div>
            <h1 className="text-2xl md:text-5xl font-bold text-white mb-4">
              Ingresa Instagram @
            </h1>
            <p className="text-gray-300 text-sm mb-8">
              Siempre puedes acceder a esta plataforma usando el enlace enviado a tu email
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
            <div className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-white font-semibold mb-3 text-lg">
                    Nombre de Usuario de Instagram
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg font-semibold">
                      @
                    </span>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.replace('@', ''))}
                      placeholder="example_user"
                      className="pl-8 h-14 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl text-lg focus:border-purple-500/50 focus:ring-purple-500/20"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    Ingresa solo el nombre de usuario, sin el símbolo @
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={!username.trim() || isLoading}
                  className="w-full h-14 instagram-gradient hover:opacity-90 text-white font-bold shadow-xl rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Procesando reporte...
                    </>
                  ) : (
                    "GENERAR REPORTE ESPÍA"
                  )}
                </Button>
              </form>


              {error && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="text-red-400 font-semibold">Error</p>
                      <p className="text-red-300 text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}
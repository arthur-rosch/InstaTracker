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
            <div className="text-center mb-12">
              {/* Profile Badge - same as delivery welcome badge */}
              <div className="inline-block bg-white/5 backdrop-blur-xl border border-purple-400/30 rounded-2xl px-6 py-4 mb-6 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
                <div className="relative z-10 flex items-center space-x-3">
                  <Instagram className="w-6 h-6 text-purple-400" />
                  <div className="text-left">
                    <h2 className="text-white font-bold text-lg">@{currentUsername}</h2>
                    <p className="text-purple-300 text-sm">Instagram Analysis Complete</p>
                  </div>
                  <button
                    onClick={handleBackToForm}
                    className="flex items-center space-x-1 text-purple-400 hover:text-white transition-colors text-sm"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Title - same as delivery */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Delivery Report
              </h1>
              <p className="text-gray-300 text-lg mb-8">Complete activity report for @{currentUsername}</p>
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
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to services</span>
          </button>

          {/* Header Section */}
          <div className="text-center mb-12">
            {/* Instagram Badge */}
            <div className="inline-block bg-white/5 backdrop-blur-xl border border-purple-400/30 rounded-2xl px-6 py-4 mb-6 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
              <div className="relative z-10 flex items-center space-x-3">
                <Instagram className="w-8 h-8 text-purple-400" />
                <div className="text-left">
                  <h2 className="text-white font-bold text-xl">Instagram Spy</h2>
                  <p className="text-purple-300 text-sm">Access DMs, stalkers, forwards...</p>
                </div>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Enter Instagram @
            </h1>
            <div className="inline-block bg-white/5 backdrop-blur-xl border border-purple-400/30 rounded-2xl px-6 py-4 mb-6 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
              <div className="relative z-10 flex items-center space-x-3">
                <div className="text-left">
                  <p className="text-purple-300 text-sm">Your purchase has been approved!</p>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-lg mb-8">
              You can always acesse this platform using the link sent you email
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
            <div className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-white font-semibold mb-3 text-lg">
                    Instagram Username
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
                    Enter only the username, without the @ symbol
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
                      Processing report...
                    </>
                  ) : (
                    "GENERATE SPY REPORT"
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
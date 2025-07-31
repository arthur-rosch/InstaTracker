"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Profile from "@/assets/profile/25.jpg"
import Profile2 from "@/assets/profile/24.jpg"

declare global {
  interface Window {
    pixelId: string;
  }
}

function ReleaseUsedContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isClient, setIsClient] = useState(false)
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [profileData, setProfileData] = useState<any>(null)
  const username = searchParams.get("username")

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && username) {
      // Get analysis data from localStorage
      try {
        const savedData = localStorage.getItem('instagram_analysis')
        if (savedData) {
          const data = JSON.parse(savedData)
          if (data.profile && data.profile.name === username.replace('@', '')) {
            setAnalysisData(data)
            setProfileData(data.profile)
          }
        }
      } catch (error) {
        console.error('Error loading analysis data:', error)
      }
    }
  }, [isClient, username])

  const handleViewExistingReport = () => {
    if (username) {
      router.push(`/en/results?username=${username.replace('@', '')}`)
    }
  }

  const handleNewAnalysis = () => {
    router.push('/en')
  }

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Background light points */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-pink-400/15 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-8">
        <div className="w-full max-w-md mx-auto">
          {/* Instagram Report - Main Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl mb-6">
            {/* Instagram Report Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 bg-orange-500/20 px-3 py-1 rounded-full mb-4">
                <span className="text-orange-400 text-xs font-medium">Instagram Report</span>
              </div>

              {/* Profile Info */}
              {profileData && (
                <div className="w-full flex items-center justify-center">
                  <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full p-1">
                    <Avatar className="w-full h-full rounded-full">
                      <AvatarImage src={profileData.avatar} />
                    </Avatar>
                  </div>
                </div>


              )}

              {!profileData && (
                <div>
                  <h2 className="text-white text-2xl font-bold mb-2">Complete Analysis</h2>
                  <p className="text-gray-400 text-sm">@{username?.replace('@', '') || 'username'}</p>
                </div>
              )}
            </div>

            {/* Unlock Section */}
            <div className="bg-pink-500/10 border border-pink-500/20 rounded-2xl p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                </div>
                <div>
                  <div className="text-pink-200 font-medium text-sm mb-1">Unlock Full Report</div>
                  <div className="text-pink-300/80 text-xs">Get real-time access to all features:</div>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-2xl">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm mb-1">Stalker Tracking</h3>
                  <p className="text-gray-400 text-xs">Discover who visits your profile secretly</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-2xl">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm mb-1">Screenshot Alerts</h3>
                  <p className="text-gray-400 text-xs">Know when someone screenshots your content</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-2xl">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm mb-1">Story Viewers</h3>
                  <p className="text-gray-400 text-xs">See who watches your stories repeatedly</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-2xl">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm mb-1">Mention Tracking</h3>
                  <p className="text-gray-400 text-xs">Track who mentions you in private chats</p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 mb-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="w-4 h-4 bg-green-400 rounded-full"></div>
              </div>
              <h3 className="text-white text-lg font-bold mb-1">+235,742 Profiles</h3>
              <p className="text-gray-400 text-xs">Join the community that discovered the truth</p>
            </div>

            {/* Testimonials */}
            <div className="space-y-4 mb-6">
              <div className="bg-white/5 rounded-2xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={Profile2}
                      alt="User"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-xs">@sarah***_jones</h3>
                    <p className="text-gray-400 text-xs">2min ago</p>
                  </div>
                </div>
                <p className="text-gray-300 text-xs mb-3 leading-relaxed">
                  "Found out who was stalking my profile! Worth every penny!"
                </p>
                <div className="flex space-x-1">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-yellow-400 text-sm">★</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={Profile}
                      alt="User"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-xs">@mike***_wilson</h3>
                    <p className="text-gray-400 text-xs">5min ago</p>
                  </div>
                </div>
                <p className="text-gray-300 text-xs mb-3 leading-relaxed">
                  "Amazing! Now I know who views my stories repeatedly."
                </p>
                <div className="flex space-x-1">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-yellow-400 text-sm">★</span>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-bold">Premium Access</h3>
                <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  50% OFF
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm font-medium">100% secure payment</span>
              </div>


              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-white text-sm">Lifetime access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-white text-sm">Real-time updates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-white text-sm">24/7 Support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-white text-sm">Bonus: Close Friends access</span>
                </div>
              </div>

              <Button
                className="w-full h-14 text-lg font-bold instagram-gradient hover:opacity-90 text-white rounded-2xl shadow-xl mb-4"
              >
                Get Full Report Now
              </Button>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-white" />
    </div>
  )
}

export default function ReleaseUsedPage() {
  useEffect(() => {
    window.pixelId = "68784e037cf5a59f3a129655";
    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("defer", "");
    script.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
    document.head.appendChild(script);
  }, []);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ReleaseUsedContent />
    </Suspense>
  )
}
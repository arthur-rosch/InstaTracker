"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Star, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import AppBar from "@/components/AppBar"

// Import all profile images
import profile01 from "/assets/profile/01.jpg"
import profile02 from "/assets/profile/02.jpg"
import profile03 from "/assets/profile/03.jpg"
import profile04 from "/assets/profile/04.jpg"
import profile05 from "/assets/profile/05.jpg"
import profile06 from "/assets/profile/06.jpg"
import profile07 from "/assets/profile/07.jpg"
import profile08 from "/assets/profile/08.jpg"
import profile09 from "/assets/profile/09.jpg"
import profile10 from "/assets/profile/10.jpg"
import profile11 from "/assets/profile/11.jpg"
import profile12 from "/assets/profile/12.jpg"
import profile13 from "/assets/profile/13.jpg"
import profile14 from "/assets/profile/14.jpg"
import profile15 from "/assets/profile/15.jpg"
import profile16 from "/assets/profile/16.jpg"
import profile17 from "/assets/profile/17.jpg"
import profile18 from "/assets/profile/18.jpg"
import profile019 from "/assets/profile/019.jpg"
import profile20 from "/assets/profile/20.jpg"
import profile21 from "/assets/profile/21.jpg"
import profile22 from "/assets/profile/22.jpg"
import profile23 from "/assets/profile/23.jpg"
import profile24 from "/assets/profile/24.jpg"
import profile25 from "/assets/profile/25.jpg"


interface LocationData {
  city: string
  region: string
  country: string
  ip: string
}

// Profile data from localStorage
const getProfileFromStorage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('instagram_analysis')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        return {
          name: data.profile?.fullName || "Unknown User",
          username: data.username || "unknown",
          avatar: data.profile?.avatar || "/placeholder.svg?height=60&width=60",
        }
      } catch (error) {
        console.error('Error parsing localStorage data:', error)
      }
    }
  }
  return {
    name: "Unknown User",
    username: "unknown",
    avatar: "/placeholder.svg?height=60&width=60",
  }
}

// Analysis topics in 2x2 grid format
const analysisTopics = [
  { label: "Profile Information", completed: false, threshold: 20 },
  { label: "Story Interactions", completed: false, threshold: 30 },
  { label: "Direct Messages", completed: false, threshold: 40 },
  { label: "Close Friends List", completed: false, threshold: 50 },
  { label: "Profile Visitors", completed: false, threshold: 60 },
  { label: "Deleted Content", completed: false, threshold: 70 },
  { label: "Hidden Connections", completed: false, threshold: 80 },
  { label: "Security Analysis", completed: false, threshold: 90 },
]

// Mock reviews data
const reviews = [
  {
    name: "@mar***_silva",
    time: "2min ago",
    rating: 5,
    text: "Found out who was stalking my profile! Worth every penny!",
    verified: true,
    avatar: "/images/profile-testimonial-1.jpg",
  },
  {
    name: "@carlos***_m",
    time: "5min ago",
    rating: 5,
    text: "Amazing! Now I know who views my stories repeatedly.",
    verified: true,
    avatar: "/images/profile-testimonial-2.jpg",
  },
]

// Company logos for sliding carousel
const companies = [
  {
    name: "TechCrunch",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40'%3E%3Ctext x='10' y='25' font-family='Arial, sans-serif' font-size='18' font-weight='bold' fill='%23ffffff'%3ETechCrunch%3C/text%3E%3C/svg%3E"
  },
  {
    name: "Forbes",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40'%3E%3Ctext x='10' y='25' font-family='Arial, sans-serif' font-size='18' font-weight='bold' fill='%23ffffff'%3EForbes%3C/text%3E%3C/svg%3E"
  },
  {
    name: "Wired",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40'%3E%3Ctext x='10' y='25' font-family='Arial, sans-serif' font-size='18' font-weight='bold' fill='%23ffffff'%3EWired%3C/text%3E%3C/svg%3E"
  },
  {
    name: "Mashable",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40'%3E%3Ctext x='10' y='25' font-family='Arial, sans-serif' font-size='18' font-weight='bold' fill='%23ffffff'%3EMashable%3C/text%3E%3C/svg%3E"
  },
  {
    name: "The Verge",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40'%3E%3Ctext x='10' y='25' font-family='Arial, sans-serif' font-size='18' font-weight='bold' fill='%23ffffff'%3EThe Verge%3C/text%3E%3C/svg%3E"
  },
  {
    name: "Engadget",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40'%3E%3Ctext x='10' y='25' font-family='Arial, sans-serif' font-size='18' font-weight='bold' fill='%23ffffff'%3EEngadget%3C/text%3E%3C/svg%3E"
  },
  {
    name: "VentureBeat",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40'%3E%3Ctext x='10' y='25' font-family='Arial, sans-serif' font-size='18' font-weight='bold' fill='%23ffffff'%3EVentureBeat%3C/text%3E%3C/svg%3E"
  },
  {
    name: "Business Insider",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40'%3E%3Ctext x='10' y='25' font-family='Arial, sans-serif' font-size='18' font-weight='bold' fill='%23ffffff'%3EBusiness Insider%3C/text%3E%3C/svg%3E"
  },
]

// Random profile photos for blur effect during analysis
const randomProfiles = [
  profile01,
  profile02,
  profile03,
  profile04,
  profile05,
  profile06,
  profile07,
  profile08,
  profile09,
  profile10,
  profile11,
  profile12,
  profile13,
  profile14,
  profile15,
  profile16,
  profile17,
  profile18,
  profile019,
  profile20,
  profile21,
  profile22,
  profile23,
  profile24,
  profile25
]

function ProfileAnalysisContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const username = searchParams.get("username")
  const [progress, setProgress] = useState(0)
  const [completedTopics, setCompletedTopics] = useState<number[]>([])

  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
  const [currentReview, setCurrentReview] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const [profileData, setProfileData] = useState(getProfileFromStorage())

  // Update profile data from localStorage on mount
  useEffect(() => {
    setProfileData(getProfileFromStorage())
  }, [])



  // Simulate progress loading and show topics progressively
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 0.5

        // Mark topics as completed based on progress thresholds
        analysisTopics.forEach((topic, index) => {
          if (newProgress >= topic.threshold && !completedTopics.includes(index)) {
            setCompletedTopics((current) => [...current, index])
          }
        })

        if (newProgress >= 100) {
          setShowButton(true)
          clearInterval(timer)
          return 100
        }

        return newProgress
      })
    }, 120)

    return () => clearInterval(timer)
  }, [completedTopics])

  // Auto-rotate reviews
  useEffect(() => {
    const reviewTimer = setInterval(() => {
      setCurrentReview((prev: number) => (prev + 1) % reviews.length)
    }, 4000)
    return () => clearInterval(reviewTimer)
  }, [])

  // Rotate random profile photos during analysis
  useEffect(() => {
    const profileTimer = setInterval(() => {
      setCurrentProfileIndex(() => {
        const randomIndex = Math.floor(Math.random() * randomProfiles.length)
        console.log('Changing to random profile index:', randomIndex) // Debug log
        return randomIndex
      })
    }, 2000) // Reduced interval to 2 seconds for more visible rotation

    return () => clearInterval(profileTimer)
  }, []) // Empty dependency array to run only once

  const handleBack = () => {
    router.back()
  }

  const handleGenerateReport = () => {
    router.push(`/report?username=${username}`)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden pb-20">
      {/* Background light points */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-pink-400/15 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      {/* Header with Progress Bar */}
      <div className="w-full">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-md mx-auto">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300" style={{ width: '80%' }}></div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-white hover:bg-white/10 p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="w-8"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className={`relative z-10 px-4 space-y-8 ${showButton ? "pb-24" : "pb-8"}`}>
        <div className="max-w-md mx-auto space-y-8">
          {/* Profile Section */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full p-1">
                <Avatar className="w-full h-full rounded-full">
                  <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                  <AvatarFallback className="text-lg bg-gray-700 text-white">
                    {profileData.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <h1 className="text-xl font-bold text-white mb-1">@{username}</h1>
          </div>

          {/* Analysis Header */}
          <div className="text-center space-y-2">
            <h2 className="text-base font-semibold text-white">Collecting information from Instagram</h2>
            <p className="text-gray-300 text-sm">Please be patient while we search through millions of records</p>
          </div>

          {/* Progress Section with Random Photos */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center space-x-4 mb-4">
              {/* Single Random Profile Photo with Blur */}
              {progress < 100 && (
                <div className="relative w-16 h-16">
                  <div className="relative overflow-hidden rounded-lg w-full h-full">
                    <img
                      key={currentProfileIndex}
                      src={randomProfiles[currentProfileIndex].src}
                      alt={`Profile ${currentProfileIndex + 1}`}
                      className="w-full h-full object-cover transition-all duration-500 blur-[3px] opacity-70"
                      style={{
                        animation: 'fadeIn 0.5s ease-in-out'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
                  </div>
                  <div className="absolute inset-0 border border-white/20 rounded-lg"></div>
                </div>
              )}

              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{Math.floor(progress)}%</span>
              </div>
              <div className="flex-1">
                <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full instagram-gradient transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm text-center">
              Your search history is secure and private. The Instagram profile owner will not be notified about your
              search.
            </p>
          </div>

          {/* Analysis Topics - 2x2 Grid */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Collecting Data...</h3>
            <div className="grid grid-cols-2 gap-3">
              {analysisTopics.map((topic, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-3 rounded-xl transition-all duration-300 ${completedTopics.includes(index)
                    ? "bg-green-500/10 border border-green-500/30"
                    : "bg-white/5 border border-white/10"
                    }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${completedTopics.includes(index) ? "bg-green-500" : "bg-white/20"
                      }`}
                  >
                    {completedTopics.includes(index) && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <span
                    className={`text-xs transition-colors ${completedTopics.includes(index) ? "text-green-400" : "text-gray-300"
                      }`}
                  >
                    {topic.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="space-y-4 mb-6">
            <div className="bg-white/5 rounded-2xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src="/images/profile-testimonial-1.jpg"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-xs">@mar***_silva</h3>
                  <p className="text-gray-400 text-xs">2min ago</p>
                </div>
              </div>
              <p className="text-gray-300 text-xs mb-3 leading-relaxed">
                "I found out who was stalking my profile! Worth every penny!"
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
                  <img
                    src="/images/profile-testimonial-2.jpg"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-xs">@carlos***_m</h3>
                  <p className="text-gray-400 text-xs">5min ago</p>
                </div>
              </div>
              <p className="text-gray-300 text-xs mb-3 leading-relaxed">
                "Thought my ex-girlfriend had moved on... Still watches all my stories. This app revealed the truth I needed to know!"
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

          {/* Companies Sliding Section */}
          <div className="space-y-6">
            <p className="text-gray-300 font-medium text-center text-sm">INSTACHECK WAS FEATURED IN</p>

            {/* Sliding Logos */}
            <div className="relative overflow-hidden py-4">
              <div className="flex animate-slide space-x-12">
                {/* First set of logos */}
                {companies.map((company, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 flex items-center justify-center min-w-[140px] h-12"
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-10 w-auto filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {companies.map((company, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 flex items-center justify-center min-w-[140px] h-12"
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-10 w-auto filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      {showButton && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-xl border-t border-white/10 z-50">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleGenerateReport}
              className="w-full py-4 instagram-gradient text-white font-bold rounded-2xl hover:opacity-90 transition-opacity text-lg shadow-xl animate-fade-in"
            >
              Access Instagram in real-time
            </button>
          </div>
        </div>
      )}

      {/* AppBar - Only visible when button is not showing */}
      {!showButton && <AppBar activeTab="explore" />}

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 0.7;
          }
        }
        
        .animate-slide {
          animation: slide 20s linear infinite;
        }
      `}</style>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-white text-lg">Loading analysis...</div>
        <div className="text-gray-400 text-sm mt-2">Please wait while we prepare your profile analysis</div>
      </div>
    </div>
  )
}

export function ProfileAnalysis() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProfileAnalysisContent />
    </Suspense>
  )
}

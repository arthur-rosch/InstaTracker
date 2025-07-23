"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Star, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Profile1 from '@/assets/profile/01.jpg'
import Profile2 from '@/assets/profile/02.jpg'
import Profile3 from '@/assets/profile/03.jpg'
import Profile4 from '@/assets/profile/04.jpg'

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
    name: "Maria Silva",
    location: "São Paulo, Brazil",
    time: "2 days ago",
    rating: 5,
    text: "This service was very accurate and reliable in most of my searches, except in some cases where the information seemed a bit outdated. However, that's what made everything rewarding.",
    verified: true,
  },
  {
    name: "João Santos",
    location: "Rio de Janeiro, Brazil",
    time: "1 week ago",
    rating: 5,
    text: "Incredible tool! Found information I never thought was possible to discover. The analysis was detailed and helped me understand my Instagram profile better.",
    verified: true,
  },
  {
    name: "Ana Costa",
    location: "Belo Horizonte, Brazil",
    time: "3 days ago",
    rating: 5,
    text: "Fast and efficient service. The report provided valuable insights about my profile security and interactions. Highly recommended!",
    verified: true,
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
const randomProfiles: string[] = [
  Profile1.src,
  Profile2.src,
  Profile3.src,
  Profile4.src,
  Profile1.src,
  Profile2.src,
  Profile3.src,
  Profile4.src,
]

export function ProfileAnalysis() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const username = searchParams.get("username") || "eo.rosch"
  const [progress, setProgress] = useState(0)
  const [location, setLocation] = useState<LocationData | null>(null)
  const [completedTopics, setCompletedTopics] = useState<number[]>([])
  const [currentReview, setCurrentReview] = useState(0)
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
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
        const newProgress = prev + 1

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
    }, 80)

    return () => clearInterval(timer)
  }, [completedTopics])

  // Auto-rotate reviews
  useEffect(() => {
    const reviewTimer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length)
    }, 4000)
    return () => clearInterval(reviewTimer)
  }, [])

  // Rotate random profile photos during analysis
  useEffect(() => {
    if (progress < 100) {
      const profileTimer = setInterval(() => {
        setCurrentProfileIndex((prev) => (prev + 1) % randomProfiles.length)
      }, 1500)
      return () => clearInterval(profileTimer)
    }
  }, [progress])

  const handleBack = () => {
    router.back()
  }

  const handleGenerateReport = () => {
    router.push(`/report?username=${username}`)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background light points */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-pink-400/15 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 pt-8 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-xl">
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="w-10 h-10"></div>
      </div>

      {/* Scrollable Content */}
      <div className={`relative z-10 px-4 space-y-8 ${showButton ? "pb-24" : "pb-8"}`}>
        <div className="max-w-md mx-auto space-y-8">
          {/* Profile Section */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="w-16 h-16 ring-3 ring-pink-500/80">
                <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                <AvatarFallback className="text-lg bg-gray-700 text-white">
                  {profileData.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <h1 className="text-xl font-bold text-white mb-1">@{username}</h1>
          </div>

          {/* Analysis Header */}
          <div className="text-center space-y-2">
            <h2 className="text-lg font-semibold text-white">Collecting information from Instagram profile</h2>
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
                      src={randomProfiles[currentProfileIndex % randomProfiles.length] || "/placeholder.svg"}
                      alt={`Profile ${currentProfileIndex + 1}`}
                      className="w-full h-full object-cover transition-all duration-700 blur-[3px] opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
                  </div>
                  <div className="absolute inset-0 border border-white/20 rounded-lg"></div>
                </div>
              )}

              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{progress}%</span>
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
                  className={`flex items-center space-x-2 p-3 rounded-xl transition-all duration-300 ${
                    completedTopics.includes(index)
                      ? "bg-green-500/10 border border-green-500/30"
                      : "bg-white/5 border border-white/10"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                      completedTopics.includes(index) ? "bg-green-500" : "bg-white/20"
                    }`}
                  >
                    {completedTopics.includes(index) && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <span
                    className={`text-xs transition-colors ${
                      completedTopics.includes(index) ? "text-green-400" : "text-gray-300"
                    }`}
                  >
                    {topic.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="space-y-6">
            {/* Rating Header */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-2xl font-bold text-white">Excellent</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300">
                <span className="font-bold text-white">4.75</span> based on{" "}
                <span className="font-bold text-white">338</span> reviews
              </p>
            </div>

            {/* Review Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{reviews[currentReview].name}</h3>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                {reviews[currentReview].verified && (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300 text-sm">Verified Customer</span>
                  </div>
                )}

                <p className="text-gray-300 leading-relaxed text-sm">{reviews[currentReview].text}</p>

                <div className="text-right">
                  <p className="text-gray-400 text-sm">
                    {reviews[currentReview].location}, {reviews[currentReview].time}
                  </p>
                </div>
              </div>
            </div>

            {/* Review Indicators */}
            <div className="flex justify-center space-x-2">
              {reviews.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentReview ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Companies Sliding Section */}
          <div className="space-y-4">
            <p className="text-gray-300 font-medium text-center">INSTACHECK WAS FEATURED IN</p>

            {/* Sliding Logos */}
            <div className="relative overflow-hidden">
              <div className="flex animate-slide space-x-16">
                {/* First set of logos */}
                {companies.map((company, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 flex items-center justify-center min-w-[120px]"
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-6 w-auto filter brightness-0 invert opacity-60 hover:opacity-80 transition-opacity"
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {companies.map((company, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 flex items-center justify-center min-w-[120px]"
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-6 w-auto filter brightness-0 invert opacity-60 hover:opacity-80 transition-opacity"
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
              Continue to Full Report
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-slide {
          animation: slide 20s linear infinite;
        }
      `}</style>
    </div>
  )
}

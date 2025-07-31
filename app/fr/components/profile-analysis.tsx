"use client"


import { useState, useEffect, Suspense, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Star, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel"
import AppBar from "@/components/AppBar"

// Import logo images
import logo1 from "/assets/logos/imgi_16_default.png"
import logo2 from "/assets/logos/imgi_17_default.png"
import logo3 from "/assets/logos/imgi_18_default.png"
import logo4 from "/assets/logos/imgi_19_default.png"
import reviewsLogo from "/assets/logos/imgi_2_reviewsio-logo.75fd9fc5.png"

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
          name: data.profile?.fullName || "Utilisateur inconnu",
          username: data.username || "inconnu",
          avatar: data.profile?.avatar || "/placeholder.svg?height=60&width=60",
        }
      } catch (error) {
        console.error('Error parsing localStorage data:', error)
      }
    }
  }
  return {
    name: "Utilisateur inconnu",
    username: "inconnu",
    avatar: "/placeholder.svg?height=60&width=60",
  }
}

// Analysis topics in 2x2 grid format
const analysisTopics = [
  { label: "Informations du profil", completed: false, threshold: 20 },
  { label: "Interactions des stories", completed: false, threshold: 30 },
  { label: "Messages directs", completed: false, threshold: 40 },
  { label: "Liste d'amis proches", completed: false, threshold: 50 },
  { label: "Visiteurs du profil", completed: false, threshold: 60 },
  { label: "Contenus supprimés", completed: false, threshold: 70 },
  { label: "Connexions cachées", completed: false, threshold: 80 },
  { label: "Analyse de sécurité", completed: false, threshold: 90 },
]

// Mock reviews data
const reviews = [
  {
    name: "@maria.silva...",
    time: "il y a 2 jours",
    rating: 5,
    text: "Je pensais que mon ex avait tourné la page... 😤 Elle regarde encore toutes mes stories. Cette app a révélé la vérité que je devais savoir !",
    verified: true,
    avatar: "/images/profile-testimonial-1.jpg",
  },
  {
    name: "@jessica.santos...",
    time: "il y a 1 jour",
    rating: 5,
    text: "Enfin j'ai découvert qui vérifie mon profil quotidiennement ! Cette app est incroyable et vaut absolument le coup ! 🔥",
    verified: true,
    avatar: "/images/profile-testimonial-2.jpg",
  },
]

// Company logos for sliding carousel - Using imported local assets
const companies = [
  {
    name: "Company 1",
    logo: logo1
  },
  {
    name: "Company 2",
    logo: logo2
  },
  {
    name: "Company 3",
    logo: logo3
  },
  {
    name: "Company 4",
    logo: logo4
  },
  {
    name: "Reviews.io",
    logo: reviewsLogo
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
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()

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

  // Carousel autoplay
  useEffect(() => {
    if (!carouselApi) return

    const autoplay = setInterval(() => {
      carouselApi.scrollNext()
    }, 2000)

    return () => clearInterval(autoplay)
  }, [carouselApi])

  const handleBack = () => {
    router.back()
  }

  const handleGenerateReport = () => {
    router.push(`/fr/report?username=${username}`)
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
            <div className="flex items-center justify-between mt-2 z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-white hover:bg-white/10 p-2 z-50"
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
            <h2 className="text-base font-semibold text-white">Collecte d'informations Instagram</h2>
            <p className="text-gray-300 text-sm">Veuillez patienter pendant que nous fouillons des millions de données</p>
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
              Votre historique de recherche est sécurisé et privé. Le propriétaire du profil Instagram ne sera pas
              notifié de votre recherche.
            </p>
          </div>

          {/* Analysis Topics - 2x2 Grid */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Collecte de données...</h3>
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

          {/* Reviews Section - User Reviews */}
          <div className="space-y-6">
            {/* Rating Header - Rating Header with Statistics */}
            <div className="text-center">
              {/* Title and Stars - Overall Rating Display */}
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-2xl font-bold text-white">Excellent</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              {/* Numerical Statistics - Average and Total Reviews */}
              <p className="text-gray-300">
                <span className="font-bold text-white">4.75</span> basé sur{" "}
                <span className="font-bold text-white">338</span> avis
              </p>
            </div>

            {/* Review Card - Individual User Review Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="space-y-4">
                {/* Review Header - Avatar and User Name */}
                <div className="flex items-center space-x-3">
                  {/* User Avatar - Profile Picture */}
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={reviews[currentReview].avatar}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* User Information - Name and Rating */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">{reviews[currentReview].name}</h3>
                      {/* Individual Rating Stars */}
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification Badge - Customer Status */}
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-300 text-sm">Client vérifié</span>
                </div>

                {/* Testimonial Text - User Comment */}
                <p className="text-gray-300 leading-relaxed text-sm">{reviews[currentReview].text}</p>

                {/* Timestamp - Comment Date */}
                <div className="text-right">
                  <p className="text-gray-400 text-sm">{reviews[currentReview].time}</p>
                </div>
              </div>
            </div>

            {/* Review Indicators - Navigation Indicators */}
            <div className="flex justify-center space-x-2">
              {reviews.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${index === currentReview ? "bg-white" : "bg-white/30"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Companies Sliding Section */}
          <div className="space-y-6">
            <p className="text-gray-300 font-medium text-center text-sm">INSTACHECK A ÉTÉ PRÉSENTÉ DANS</p>

            {/* Carousel Logos */}
            <div className="py-6">
              <Carousel
                setApi={setCarouselApi}
                opts={{
                  align: "start",
                  loop: true,
                  dragFree: true,
                  containScroll: "trimSnaps"
                }}
                className="w-full max-w-6xl mx-auto"
              >
                <CarouselContent className="-ml-6 md:-ml-8">
                  {companies.map((company, index) => {
                    return (
                      <CarouselItem key={index} className="pl-6 md:pl-8 basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <div className="flex items-center justify-center h-16 mx-4">
                          <img
                            src={company.logo.src}
                            alt={company.name}
                            height={48}
                            className="max-h-12 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-300"
                          />
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </Carousel>
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
              Accès Instagram en temps réel
            </button>
          </div>
        </div>
      )}

      {/* AppBar - Only visible when button is not showing */}
      {!showButton && <AppBar activeTab="explore" />}

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 0.7;
          }
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
        <div className="text-white text-lg">Chargement de l'analyse...</div>
        <div className="text-gray-400 text-sm mt-2">Veuillez patienter pendant que nous préparons votre analyse de profil</div>
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

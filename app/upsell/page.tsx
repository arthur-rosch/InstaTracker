"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function UpsellPage() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 4, seconds: 59 })

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* Fixed Warning Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white py-3 px-4">
        <div className="container mx-auto flex items-center justify-center space-x-4">
          <span className="font-semibold text-sm md:text-base">
            OFFER EXPIRES IN:
            <span className="ml-2 font-mono bg-red-700 px-2 py-1 rounded">
              {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </span>
        </div>
      </div>

      <section className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden pt-16 pb-24">
        {/* Light points - Same as hero-section */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-16 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-pink-400/15 rounded-full blur-xl animate-pulse delay-1500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Main Content Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-blue-500/10 rounded-3xl"></div>

              <div className="relative z-10 space-y-8">
                {/* Success Badge */}
                <div className="flex justify-center">
                  <div className="inline-block bg-green-500/20 border border-green-400/30 rounded-full px-6 py-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-bold text-sm">ACCESS GRANTED</span>
                    </div>
                  </div>
                </div>

                {/* Main Heading */}
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    CONGRATULATIONS! <br />
                    <span className="instagram-gradient-text">Your Instagram Dossier is guaranteed</span>
                  </h1>
                </div>

                {/* Warning Message */}
                <div className="bg-orange-500/10 border border-orange-400/30 rounded-2xl p-6 mt-6">
                  <div className="text-left">
                    <h3 className="text-white font-bold text-lg mb-2">Firewall Upgrade Required</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Due to the large volume of compromising deleted data found on Instagram, we need to upgrade the firewall package to reveal all compromising data. If you choose "lose data", your investigation may be lost forever.
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 text-left">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✅</span>
                    <div>
                      <h3 className="text-white font-bold text-xl">Guarantees the revelation of all your data</h3>
                      <p className="text-gray-300">Discover the truth once and for all</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✅</span>
                    <div>
                      <h3 className="text-white font-bold text-xl">Do you trust enough to ignore the truth?</h3>
                      <p className="text-gray-300">Release it now and make the most of your app!</p>
                    </div>
                  </div>
                </div>

                {/* Timer Section */}
                <div className="bg-red-500/10 border border-red-400/30 rounded-2xl p-4 mt-6 text-center">
                  <h3 className="text-white font-bold text-lg mb-2">OFFER EXPIRES IN:</h3>
                  <div className="font-mono text-xl bg-red-600/30 px-4 py-2 rounded-lg inline-block">
                    {String(timeLeft.hours).padStart(2, '0')}:
                    {String(timeLeft.minutes).padStart(2, '0')}:
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                </div>

                {/* Upgrade Button */}
                <div className="mt-8">
                  <Button
                    onClick={() => router.push('/results')}
                    className="h-14 px-8 instagram-gradient hover:opacity-90 text-white font-bold shadow-xl rounded-2xl text-lg w-full"
                  >
                    UPGRADE NOW - ACCESS ALL DATA
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="space-y-6 mt-6">
                  <p className="text-sm text-gray-400">Secure Processing • Instant Upgrade • Data Protection</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


    </>
  )
}
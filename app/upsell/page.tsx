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
                    <span className="instagram-gradient-text">You're almost there.</span>
                  </h1>
                </div>

                {/* Progress Section */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">50%</span>
                    </div>
                    <div className="flex-1">
                      <div className="bg-white/20 rounded-full h-4 overflow-hidden">
                        <div className="h-full instagram-gradient transition-all duration-300 ease-out" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-white font-semibold">
                    Your spot for the Instagram analysis is guaranteed
                  </p>
                </div>

                {/* Features List - Same style as hero section */}
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto my-12">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-2">Complete Data Revelation</h3>
                      <p className="text-gray-300">Guarantees access to all hidden data and discovers the truth once and for all</p>
                    </div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent rounded-2xl"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-2">Advanced Security Bypass</h3>
                      <p className="text-gray-300">Unlock protected content and private interactions</p>
                    </div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-2">Permanent Access</h3>
                      <p className="text-gray-300">Never lose your investigation data again</p>
                    </div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent rounded-2xl"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-2">Deep Analysis</h3>
                      <p className="text-gray-300">Complete investigation of hidden activities and connections</p>
                    </div>
                  </div>
                </div>

                {/* Warning Message */}
                <div className="bg-orange-500/10 border border-orange-400/30 rounded-2xl p-6">
                  <div className="text-left">
                    <h3 className="text-white font-bold text-lg mb-2">Firewall Upgrade Required</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Due to the large volume of sensitive data found, we need to upgrade the security package to reveal all hidden information. Without this upgrade, your investigation may be lost forever.
                    </p>
                  </div>
                </div>

                {/* Urgency Section */}
                <div className="bg-red-500/10 border border-red-400/30 rounded-2xl p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-white font-bold text-lg">Limited Time Offer</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed text-center">
                    This upgrade is only available during your current session. If you leave this page, you may lose access to this special offer and your data forever.
                  </p>
                </div>

                {/* Trust indicators */}
                <div className="space-y-6">
                  <p className="text-sm text-gray-400">Secure Processing • Instant Upgrade • Data Protection</p>
                </div>
              </div>
            </div>

            {/* Footer links - Same as hero section */}
            <div className="pt-12 space-y-4">
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

      {/* Fixed Footer Button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-t border-white/10 p-4">
        <div className="container mx-auto">
          <Button
            onClick={() => router.push('/results')}
            className="h-14 px-8 instagram-gradient hover:opacity-90 text-white font-bold shadow-xl rounded-2xl text-lg w-full max-w-lg mx-auto block"
          >
            UPGRADE NOW - ACCESS ALL DATA
          </Button>
        </div>
      </div>
    </>
  )
}
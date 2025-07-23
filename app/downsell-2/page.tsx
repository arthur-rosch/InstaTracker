"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DownsellPage() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 4, seconds: 59 })

  // Timer countdown effect - Same as upsell
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

      {/* Fixed Discount Banner */}
      <div className="fixed top-10 left-0 right-0 z-40 bg-yellow-500 text-black py-3 px-4">
        <div className="container mx-auto flex items-center justify-center">
          <span className="font-bold text-sm md:text-base">
            🎉 CONGRATULATIONS! YOU WON 85% DISCOUNT! 🎉
          </span>
        </div>
      </div>

      <section className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden pt-32 pb-24">
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
                {/* Main Heading */}
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    PROTECT YOUR <br />
                    <span className="instagram-gradient-text">ACCESS 100%!</span>
                  </h1>
                </div>

                {/* Progress Section - Similar to upsell but adapted for security */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <Lock className="w-6 h-6 text-green-400" />
                    <span className="text-green-400 font-bold text-lg">SECURITY SERVERS ACTIVATED!</span>
                  </div>
                  <p className="text-white font-semibold">
                    To guarantee total and secure access to the application, activate server protection now.
                  </p>
                </div>

                {/* Security Features - Same style as upsell */}
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto my-12">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-2xl"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-2">Automatic Backup</h3>
                      <p className="text-gray-300">Automatic backup activated for complete data protection</p>
                    </div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-2">Complete Protection</h3>
                      <p className="text-gray-300">Complete protection of your information and privacy</p>
                    </div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-2">24/7 Monitoring</h3>
                      <p className="text-gray-300">Real-time monitoring 24/7 for maximum security</p>
                    </div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent rounded-2xl"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-2">Priority Support</h3>
                      <p className="text-gray-300">Priority technical support for immediate assistance</p>
                    </div>
                  </div>
                </div>

                {/* Warning Message - Same style as upsell */}
                <div className="bg-orange-500/10 border border-orange-400/30 rounded-2xl p-6">
                  <div className="text-left">
                    <h3 className="text-white font-bold text-lg mb-2">Security Warning</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Without this protection, your app may function with security limitations and your data could be at risk.
                    </p>
                  </div>
                </div>

                {/* Urgency Section - Same style as upsell */}
                <div className="bg-red-500/10 border border-red-400/30 rounded-2xl p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-white font-bold text-lg">Limited Time Offer</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed text-center">
                    This offer expires when the timer reaches zero! Don't miss this opportunity to secure your access.
                  </p>
                </div>

                {/* Trust indicators */}
                <div className="space-y-6">
                  <p className="text-sm text-gray-400">Secure Processing • Instant Activation • Data Protection</p>
                </div>
              </div>
            </div>

            {/* Footer links - Same as upsell */}
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
            className="h-14 px-8 instagram-gradient hover:opacity-90 text-white font-bold shadow-xl rounded-2xl text-lg w-full max-w-lg mx-auto block leading-tight"
          >
            ACTIVATE PROTECTION<br />WITH 85% DISCOUNT
          </Button>
        </div>
      </div>
    </>
  )
}
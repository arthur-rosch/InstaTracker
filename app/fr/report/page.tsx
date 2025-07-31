"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { DetailedReport } from "../components/detailed-report"

declare global {
  interface Window {
    pixelId: string;
  }
}

function ReportContent() {
  const searchParams = useSearchParams()
  const username = searchParams.get("username") || "eo.rosch"
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    // Pixel script
    window.pixelId = "68784e037cf5a59f3a129655";
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    // Simuliere die Ladezeit der Daten
    const loadData = async () => {
      // Warten Sie eine Zeit, um das vollständige Laden zu simulieren
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsDataLoaded(true)
    }

    loadData()
  }, [])

  if (!isDataLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-lg">Chargement du rapport...</div>
          <div className="text-gray-400 text-sm mt-2">Veuillez patienter pendant que nous traitons les données</div>
        </div>
      </div>
    )
  }

  return <DetailedReport username={username} />
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-white text-lg">Chargement du rapport...</div>
        <div className="text-gray-400 text-sm mt-2">Veuillez patienter pendant que nous traitons les données</div>
      </div>
    </div>
  )
}

export default function ReportPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ReportContent />
    </Suspense>
  )
}

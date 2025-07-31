"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { DetailedReport } from "@/components/detailed-report"

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
    // Simular o tempo de carregamento dos dados
    const loadData = async () => {
      // Aguardar um tempo para simular o carregamento completo
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
          <div className="text-white text-lg">Loading report...</div>
          <div className="text-gray-400 text-sm mt-2">Please wait while we process the data</div>
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
        <div className="text-white text-lg">Loading report...</div>
        <div className="text-gray-400 text-sm mt-2">Please wait while we process the data</div>
      </div>
    </div>
  )
}

export default function ReportPage() {
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
      <ReportContent />
    </Suspense>
  )
}

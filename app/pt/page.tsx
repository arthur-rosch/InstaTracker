'use client'
import { HeroSection } from "./components/hero-section"
import { useEffect } from 'react'

declare global {
  interface Window {
    pixelId: string;
  }
}

export default function Home() {
  useEffect(() => {
    window.pixelId = "68784e037cf5a59f3a129655";
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
    </div>
  )
}

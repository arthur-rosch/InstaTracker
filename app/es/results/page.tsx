"use client"

import { ProfileAnalysis } from "../components/profile-analysis"
import { useEffect } from "react"

declare global {
  interface Window {
    pixelId: string;
  }
}

export default function ResultsPage() {
  useEffect(() => {
    window.pixelId = "68784e037cf5a59f3a129655";
    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("defer", "");
    script.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
    document.head.appendChild(script);
  }, []);

  return <ProfileAnalysis />
}

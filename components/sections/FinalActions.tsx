"use client"

import { Button } from "@/components/ui/button"
import { Download, Share2, AlertTriangle } from "lucide-react"

interface FinalActionsProps {
  username: string
}

export function FinalActions({ username }: FinalActionsProps) {
  return (
    <section className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Analysis Complete</h3>
        <p className="text-gray-300">Your Instagram security report is ready</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Button className="w-full instagram-gradient text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Download Full Report</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full border-white/20 text-white hover:bg-white/10 font-bold py-4 rounded-2xl flex items-center justify-center space-x-2"
        >
          <Share2 className="w-5 h-5" />
          <span>Share Report</span>
        </Button>
      </div>

      <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="space-y-2">
            <h4 className="text-yellow-400 font-bold">Privacy Recommendation</h4>
            <p className="text-white text-sm">
              Based on your analysis, we recommend reviewing your privacy settings
            </p>
            <p className="text-gray-300 text-sm">
              Consider making your profile private and reviewing your follower list
            </p>
          </div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-gray-400 text-sm">
          Report generated for @{username}
        </p>
        <p className="text-gray-500 text-xs">
          {new Date().toLocaleDateString()} • ClarityIG Security Analysis
        </p>
      </div>
    </section>
  )
}
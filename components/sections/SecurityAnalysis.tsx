"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, MessageCircle } from "lucide-react"

interface SecurityAnalysisProps {
  username: string
}

const mockSecurityStats = {
  sexualInterests: 19,
  nudeConversations: 3,
  restrictedProfiles: true
}

const StatCard = ({ title, value, subtitle, icon: Icon, variant = "default" }: {
  title: string
  value: string | number
  subtitle?: string
  icon?: any
  variant?: "default" | "warning" | "danger"
}) => {
  const bgColor = variant === "warning" ? "bg-yellow-500/20" : variant === "danger" ? "bg-red-500/20" : "bg-white/10"
  const textColor = variant === "warning" ? "text-yellow-400" : variant === "danger" ? "text-red-400" : "text-white"

  return (
    <div className={`p-4 rounded-lg ${bgColor} backdrop-blur-sm`}>
      <div className="flex items-center gap-3">
        {Icon && <Icon className={`h-5 w-5 ${textColor}`} />}
        <div>
          <p className="text-sm text-gray-300">{title}</p>
          <p className={`text-lg font-bold ${textColor}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}

export function SecurityAnalysis({ username }: SecurityAnalysisProps) {
  return (
    <section className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Security Analysis</h3>
        <p className="text-gray-300">Potential security concerns detected</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Sexual Interests"
          value={mockSecurityStats.sexualInterests}
          variant="warning"
          icon={AlertTriangle}
        />
        <StatCard
          title="Nude Conversations"
          value={mockSecurityStats.nudeConversations}
          variant="danger"
          icon={MessageCircle}
        />
      </div>

      <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div className="space-y-2">
            <h4 className="text-red-400 font-bold">Security Alert</h4>
            <p className="text-white text-sm">
              Detected {mockSecurityStats.sexualInterests} profiles with potential sexual interests
            </p>
            <p className="text-gray-300 text-sm">
              These profiles show unusual interaction patterns that may indicate inappropriate behavior
            </p>
          </div>
        </div>
      </div>

      <Button className="w-full instagram-gradient text-white font-bold py-4 rounded-2xl">
        View real-time conversations
      </Button>
    </section>
  )
}
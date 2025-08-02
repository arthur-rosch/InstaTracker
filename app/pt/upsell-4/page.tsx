"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Shield, Clock, Users, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Upsell4Page() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 35,
    seconds: 53
  })

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
    <section className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Light points - same as home */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-pink-400/15 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      {/* Fixed Timer Banner */}
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white py-3 z-50">
        <div className="max-w-sm mx-auto text-center">
          <div className="flex items-center justify-center space-x-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-bold">
              OFERTA POR TEMPO LIMITADO: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-lg mx-auto text-center space-y-6">

          {/* Title Section */}
          <div className="space-y-3">


            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              LISTA NEGRA <br />
              <span className="instagram-gradient-text">Exclusiva</span>
            </h1>
            <p className="text-lg text-purple-400 font-semibold">
              SISTEMA DE MONITORAMENTO AVANÇADO
            </p>
          </div>


          {/* Main Content Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:bg-white/10 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
            <div className="relative z-10 space-y-4">
              <div className="text-center mb-6">

                <p className="text-gray-300 text-sm">
                  Receba notificações quando a pessoa monitorada interagir com perfis específicos!
                </p>
              </div>

              {/* Features List - Same style as upsell and upsell-3 */}
              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-left shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl"></div>
                  <div className="relative z-10">
                    <h3 className="text-white font-semibold text-sm mb-1">Lista Personalizada de Perfis Proibidos</h3>
                    <p className="text-gray-300 text-xs">
                      Adicione contatos específicos que você deseja monitorar com atenção especial e saiba imediatamente se houver alguma interação.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-left shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent rounded-xl"></div>
                  <div className="relative z-10">
                    <h3 className="text-white font-semibold text-sm mb-1">Notificações Instantâneas</h3>
                    <p className="text-gray-300 text-xs">
                      Receba notificações em tempo real quando a pessoa monitorada curtir, comentar ou seguir alguém da Blacklist.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-left shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl"></div>
                  <div className="relative z-10">
                    <h3 className="text-white font-semibold text-sm mb-1">Registro Detalhado de Interações</h3>
                    <p className="text-gray-300 text-xs">
                      Mantenha um histórico completo com o horário exato de cada interação. Guarde um arquivo de evidências de todas as atividades para consulta quando necessário.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 shadow-2xl">
            <div className="text-center">
              <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">
                50% DE DESCONTO
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-gray-400 line-through text-lg">$89.90</span>
                  <span className="text-3xl font-bold text-white">$44.95</span>
                </div>
                <p className="text-red-400 font-semibold text-sm">
                  Apenas 7 vagas restantes!
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button
            className="w-full h-14 px-8 instagram-gradient hover:opacity-90 text-white font-bold shadow-xl rounded-2xl text-lg"
            onClick={() => router.push('/pt/results')}
          >
            ATIVAR PROTEÇÃO BLACKLIST
          </Button>

          {/* Trust indicators */}
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-400 pt-4">
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>100% Seguro</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>Resultados Instantâneos</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>Não é necessário registro</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
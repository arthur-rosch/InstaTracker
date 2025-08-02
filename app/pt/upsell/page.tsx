"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function UpsellPage() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 51 })

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 }
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
NÃO SAIA DESTA PÁGINA, PODE HAVER PERDA DE DADOS!
          </span>
        </div>
      </div>

      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col justify-center relative overflow-hidden pt-16 pb-24">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-16 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <ArrowLeft className="w-6 h-6 text-white cursor-pointer" onClick={() => router.push('/pt')} />
            <h1 className="text-white text-lg font-semibold">Atualizar</h1>
            <div className="w-6 h-6"></div>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-8">
            {/* Success Message */}
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                PARABÉNS!
              </h2>
              <p className="text-white text-lg">
                Acesso Rápido ao Aplicativo
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{width: '50%'}}></div>
              </div>
              <p className="text-purple-400 text-2xl font-bold">50%</p>
            </div>

            {/* Guarantee Message */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-6">
              <p className="text-white text-lg leading-relaxed">
                Seu lugar no aplicativo <span className="text-purple-400 font-bold">Instagram Dossier</span> está garantido.
              </p>
            </div>

            {/* Warning Message */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 text-left">
              <p className="text-gray-300 leading-relaxed">
                Devido ao grande volume de dados comprometidos e excluídos encontrados no Instagram, precisamos atualizar o pacote de firewall para revelar todos os dados comprometidos. Se você optar por "perder dados", sua investigação poderá ser perdida para sempre.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl mt-1">✅</span>
                <div>
                  <p className="text-white font-semibold">
                    Garanta a revelação de todos os seus dados e descubra a verdade de uma vez por todas.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl mt-1">✅</span>
                <div>
                  <p className="text-white font-semibold">
                    Confia o suficiente para ignorar a verdade?
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="space-y-4">
              <h3 className="text-white text-xl font-bold">
                Desbloqueie agora e aproveite ao máximo seu aplicativo!
              </h3>
            </div>

            {/* Timer Section */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-6 border-2 border-red-500">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-white text-sm font-semibold">🚨 URGENTE</span>
              </div>
              <p className="text-white text-sm font-semibold mb-3">A OFERTA EXPIRA EM</p>
              <div className="bg-black/30 rounded-xl p-4">
                <div className="text-white text-4xl font-mono font-bold">
                  {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </div>
              </div>
              <p className="text-white text-sm font-bold mt-3">
                NÃO PERCA SEU LUGAR!
              </p>
              <div className="flex justify-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>

            {/* Main CTA Button */}
            <div className="mt-8">
              <Button
                onClick={() => window.open('https://go.perfectpay.com.br/PPU38CPSHT4?upsell=true', '_blank')}
                className="w-full h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-sm rounded-2xl shadow-2xl transform transition-all duration-200 hover:scale-105 leading-tight"
              >
                🔥 CLIQUE AQUI PARA ACESSAR<br />TODOS OS DADOS
              </Button>
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-purple-400 text-xl font-bold mb-4">PERGUNTAS FREQUENTES</h3>
              <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <p className="text-gray-300 text-left">Por que preciso pagar essa taxa?</p>
                  <span className="text-purple-400 text-xl">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
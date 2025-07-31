"use client"

import { useState } from "react"
import { MessageCircle, ArrowLeft, Phone, Video, Info, Camera, Mic, Image, Heart } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

// No need to import print images anymore - creating with code

interface Follower {
  name: string;
  avatar: string;
}

interface PrintsSectionProps {
  isActive: boolean;
  followers: Follower[];
}

export default function PrintsSection({ isActive, followers }: PrintsSectionProps) {

  // Generate prints data using followers list
  const generatePrints = (followers: Follower[]) => {
    const messageTemplates = [
      [
        { text: "¿qué haces este fin de semana?", time: "14:32", isRead: true },
        { text: "¿Por qué? ¿Me extrañas?😏", time: "14:35", isRead: true, sender: "me" },
        { text: "JAJA un poco 🙈", time: "14:36", isRead: false }
      ],
      [
        { text: "¿Viste mi historia ayer?", time: "22:15", isRead: true },
        { text: "Sí, la vi... te veías hermosa 🔥", time: "22:18", isRead: true, sender: "me" },
        { text: "Gracias, amor ❤️ Te extraño", time: "22:20", isRead: false }
      ],
      [
        { text: "Hola guapo 😘", time: "19:45", isRead: true },
        { text: "Hola princesa, ¿cómo estuvo tu día?", time: "19:50", isRead: true, sender: "me" },
        { text: "Mejor ahora que respondiste 💕", time: "19:52", isRead: false }
      ],
      [
        { text: "Te extraño...", time: "23:30", isRead: true },
        { text: "Yo también... ¿cuándo podemos vernos?", time: "23:33", isRead: true, sender: "me" },
        { text: "¿Mañana? Mis padres no estarán en casa 😏", time: "23:35", isRead: false }
      ]
    ];

    return followers.slice(0, 4).map((follower, index) => ({
      id: index + 1,
      profile: follower,
      messages: messageTemplates[index % messageTemplates.length].map(msg => ({
        sender: msg.sender,
        text: msg.text,
        time: msg.time,
        isRead: msg.isRead
      }))
    }));
  };

  const prints = generatePrints(followers);



  return (
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
      <div className="relative z-10">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg md:text-xl">Capturas Recuperadas</h3>
                <p className="text-gray-400 text-sm">Conversaciones privadas</p>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${isActive
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
              Activo
            </div>
          </div>

          {/* Carousel */}
          <Carousel className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
            <CarouselContent>
              {prints.map((print, index) => (
                <CarouselItem key={print.id}>
                  <div className="relative aspect-[9/16] w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] mx-auto bg-black rounded-xl overflow-hidden border border-gray-800">
                    {/* Instagram-like chat interface */}
                    <div className="h-full flex flex-col">
                      {/* Chat header */}
                      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-black/95 backdrop-blur-xl">
                        <div className="flex items-center space-x-3">
                          <ArrowLeft className="w-6 h-6 text-white cursor-pointer" />
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={print.profile.avatar} />
                            <AvatarFallback className="bg-blue-600 text-white text-xs">
                              {print.profile.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-white">{print.profile.name}</h3>

                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Phone className="w-5 h-5 text-white" />
                          <Video className="w-5 h-5 text-white" />
                          <Info className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-black pb-20">
                        {print.messages.map((message, msgIndex) => (
                          <div key={msgIndex} className={`flex items-end space-x-2 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            {message.sender !== 'me' && (
                              <Avatar className="w-6 h-6 mb-1">
                                <AvatarImage src={print.profile.avatar} />
                                <AvatarFallback className="bg-blue-600 text-white text-xs">
                                  {print.profile.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${message.sender === 'me'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-800 text-white'
                              }`}>
                              <p className="text-sm">{message.text}</p>
                            </div>
                            {message.sender === 'me' && (
                              <div className="flex items-center mb-1">
                                {message.isRead ? (
                                  <div className="w-4 h-4 rounded-full overflow-hidden">
                                    {/* <Avatar className="w-4 h-4">
                                        <AvatarImage src={print.profile.avatar} />
                                        <AvatarFallback className="bg-blue-600 text-white text-xs">
                                          {print.profile.name.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar> */}
                                  </div>
                                ) : (
                                  <div className="w-3 h-3 border-2 border-gray-400 rounded-full"></div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                        <div className="text-center">
                          <span className="text-gray-500 text-xs">{print.messages[print.messages.length - 1].time}</span>
                        </div>
                      </div>

                      {/* Message input area */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/95 backdrop-blur-xl border-t border-gray-800">
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 flex items-center bg-gray-800 rounded-full px-4 py-2">
                            <input
                              type="text"
                              placeholder="Mensaje..."
                              className="bg-transparent flex-1 text-white placeholder-gray-400 outline-none text-sm"
                            />
                            <div className="flex items-center space-x-2 ml-2">
                              <Camera className="w-5 h-5 text-gray-400" />
                              <Mic className="w-5 h-5 text-gray-400" />
                              <Image className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                          <Heart className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-black/50 hover:bg-black/70 text-white border-gray-600" />
            <CarouselNext className="right-2 bg-black/50 hover:bg-black/70 text-white border-gray-600" />
          </Carousel>



          {/* Stats */}
          <div className="text-center space-y-2">
            <p className="text-white font-bold text-2xl">{prints.length} Capturas</p>
            <p className="text-purple-400 text-sm">Desliza para ver conversaciones recuperadas</p>
            <p className="text-gray-400 text-xs">Actualizado ahora</p>
          </div>
        </div>
      </div>
    </div>
  )
}
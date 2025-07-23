"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Phone, Video, Info, Camera, Mic, Image, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ChatPage() {
  const router = useRouter()
  const params = useParams()
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "received",
      content: "Hey, are you still coming over tonight?",
      time: "10:30 PM",
      isImage: false
    },
    {
      id: 2,
      type: "received",
      content: "My husband is working late again...",
      time: "10:32 PM",
      isImage: false
    },
    {
      id: 3,
      type: "sent",
      content: "Of course, I'll be there in 20 minutes",
      time: "10:33 PM",
      isImage: false
    },
    {
      id: 4,
      type: "received",
      content: "Perfect, I've been thinking about you all day",
      time: "10:35 PM",
      isImage: false
    },
    {
      id: 5,
      type: "received",
      content: "I bought something special for tonight 😉",
      time: "10:36 PM",
      isImage: false
    },
    {
      id: 6,
      type: "sent",
      content: "Can't wait to see you",
      time: "10:37 PM",
      isImage: false
    },
    {
      id: 7,
      type: "received",
      content: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=300&fit=crop",
      time: "10:38 PM",
      isImage: true
    },
    {
      id: 8,
      type: "sent",
      content: "Wow... you look incredible",
      time: "10:39 PM",
      isImage: false
    },
    {
      id: 9,
      type: "received",
      content: "Just for you baby... hurry up",
      time: "10:40 PM",
      isImage: false
    },
    {
      id: 10,
      type: "sent",
      content: "On my way, see you soon ❤️",
      time: "10:41 PM",
      isImage: false
    }
  ])

  const contactName = "Sarah Johnson"
  const isOnline = true

  return (
    <div className="min-h-screen bg-black text-white max-w-sm mx-auto flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-black/95 backdrop-blur-xl">
        <div className="flex items-center space-x-3">
          <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={() => router.back()} />
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
              alt={contactName}
              className="w-10 h-10 rounded-full object-cover"
            />
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-white">{contactName}</h3>
            <p className="text-xs text-green-400">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Phone className="w-5 h-5 text-white" />
          <Video className="w-5 h-5 text-white" />
          <Info className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-20">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              message.type === 'sent' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-800 text-white'
            }`}>
              {message.isImage ? (
                <div className="space-y-2">
                  <img 
                    src={message.content} 
                    alt="Shared image"
                    className="rounded-lg w-full h-48 object-cover"
                  />
                </div>
              ) : (
                <p className="text-sm">{message.content}</p>
              )}
              <p className={`text-xs mt-1 ${
                message.type === 'sent' ? 'text-blue-100' : 'text-gray-400'
              }`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/95 backdrop-blur-xl border-t border-gray-800">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center space-x-3">
            <div className="flex-1 flex items-center bg-gray-800 rounded-full px-4 py-2">
              <input 
                type="text" 
                placeholder="Message..." 
                className="bg-transparent flex-1 text-white placeholder-gray-400 outline-none text-sm"
              />
              <div className="flex items-center space-x-2 ml-2">
                <Camera className="w-5 h-5 text-gray-400" />
                <Mic className="w-5 h-5 text-gray-400" />
                <Image className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <Heart className="w-6 h-6 text-red-500" />
          </div>
          
          {/* Action Button */}
          <div className="mt-4">
            <Button
              className="w-full h-12 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-2xl hover:opacity-90 transition-opacity text-sm shadow-xl"
              onClick={() => router.push('/results')}
            >
              🚨 RECOVER ALL DELETED MESSAGES 🚨
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
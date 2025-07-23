"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit, Search, MoreHorizontal, Phone, Video, Info, Camera, Mic, Image, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Conversation {
  id: number;
  name: string;
  message: string;
  time: string;
  avatar: string;
  unread: boolean;
  muted?: boolean;
}

export default function Upsell2Page() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState('list') // 'list' or 'chat'
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [chatBlurred, setChatBlurred] = useState(false)

  const conversations = [
    {
      id: 1,
      name: "AYOHANAKETLYN",
      message: "Can't wait to see you tonight when he's not home 😈",
      time: "12 h",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
      unread: false
    },
    {
      id: 2,
      name: "Alan Dapper",
      message: "I've been thinking about our secret all day...",
      time: "13 h",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      unread: false
    },
    {
      id: 3,
      name: "Leandro Ludwig",
      message: "Leandro enviou um anexo",
      time: "14 h",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      unread: false,
      muted: true
    },
    {
      id: 4,
      name: "Gabriel Santana",
      message: "Você enviou um anexo",
      time: "18 h",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
      unread: false
    },
    {
      id: 5,
      name: "João 🔥",
      message: "Você: MDs",
      time: "1 d",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=50&h=50&fit=crop&crop=face",
      unread: false
    },
    {
      id: 6,
      name: "Shau",
      message: "Tá",
      time: "1 d",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop&crop=face",
      unread: false
    },
    {
      id: 7,
      name: "Louise Cachoeira",
      message: "Você enviou um anexo",
      time: "1 d",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      unread: false
    },
    {
      id: 8,
      name: "biladem 💥💥",
      message: "Ou no",
      time: "2 d",
      avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=50&h=50&fit=crop&crop=face",
      unread: false
    },
    {
      id: 9,
      name: "Veronica Pereira Ricardo",
      message: "Você enviou um anexo",
      time: "2 d",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face",
      unread: false
    }
  ]

  const chatMessages = [
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
      content: "https://i.pinimg.com/736x/29/3a/ea/293aea6891ff6663b22268cfdfad29e7.jpg",
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
  ]

  useEffect(() => {
    if (currentView === 'chat') {
      const timer = setTimeout(() => {
        setChatBlurred(true)
        setShowModal(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [currentView])

  if (currentView === 'chat' && selectedChat) {
    return (
      <div className="min-h-screen bg-black text-white max-w-sm mx-auto flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-black/95 backdrop-blur-xl">
          <div className="flex items-center space-x-3">
            <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={() => setCurrentView('list')} />
            <div className="relative">
              <img
                src={selectedChat.avatar}
                alt={selectedChat.name}
                className="w-10 h-10 rounded-full object-cover blur-sm"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
            </div>
            <div>
              <h3 className="font-semibold text-white blur-sm">{selectedChat.name}</h3>
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
          {chatMessages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${message.type === 'sent'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-white'
                }`}>
                {message.isImage ? (
                  <div className="space-y-2">
                    <img
                      src={message.content}
                      alt="Shared image"
                      className={`rounded-lg w-full h-48 object-cover ${chatBlurred ? 'blur-md' : 'blur-sm'}`}
                    />
                  </div>
                ) : (
                  <p className={`text-sm ${chatBlurred ? 'blur-md' : ''}`}>{message.content}</p>
                )}
                <p className={`text-xs mt-1 ${message.type === 'sent' ? 'text-blue-100' : 'text-gray-400'
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

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full mx-4 border border-gray-700">
              <div className="text-center">
                <div className="text-4xl mb-4">🔓</div>
                <h3 className="text-xl font-bold text-white mb-2">Secret Messages Detected!</h3>
                <p className="text-gray-300 text-sm mb-6">
                  We found hidden and deleted messages in this conversation. Click below to reveal all secret content.
                </p>
                <div className="space-y-3">
                  <Button
                    className="w-full h-12 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm shadow-xl"
                    onClick={() => router.push('/results')}
                  >
                    🚨 REVEAL SECRET MESSAGES 🚨
                  </Button>
                  <button
                    className="w-full text-gray-400 text-sm hover:text-white transition-colors"
                    onClick={() => {
                      setShowModal(false)
                      setChatBlurred(false)
                    }}
                  >
                    Continue without revealing
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <ArrowLeft className="w-6 h-6" onClick={() => router.back()} />
          <span className="text-lg font-semibold blur-sm">eo.rosch</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <Edit className="w-6 h-6" />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        <div className="flex-1 text-center py-3 border-b-2 border-white font-semibold">
          Primary
        </div>
        <div className="flex-1 text-center py-3 text-gray-400">
          General
        </div>
        <div className="flex-1 text-center py-3 text-blue-400 relative">
          Requests
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            2
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="flex items-center bg-gray-900 rounded-lg px-3 py-2">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Pesquisar"
            className="bg-transparent flex-1 text-white placeholder-gray-400 outline-none"
          />
        </div>
      </div>



      {/* Conversations */}
      <div className="flex-1">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className="flex items-center px-4 py-3 hover:bg-gray-900/50 cursor-pointer"
            onClick={() => {
              setSelectedChat(conv)
              setCurrentView('chat')
            }}
          >
            <div className="relative">
              <img
                src={conv.avatar}
                alt={conv.name}
                className="w-12 h-12 rounded-full object-cover blur-sm"
              />
              {conv.id === 1 && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
              )}
            </div>
            <div className="flex-1 ml-3 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white truncate blur-sm max-w-0 flex-1">{conv.name}</h3>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className="text-gray-400 text-sm">{conv.time}</span>
                  {conv.muted && (
                    <div className="w-4 h-4 text-gray-400">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.793a1 1 0 011.617.793zM14.657 5.757a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-2.929 7.071 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.829a1 1 0 011.414 0A5.983 5.983 0 0115 12a5.983 5.983 0 01-1.758 4.243 1 1 0 01-1.414-1.414A3.983 3.983 0 0013 12a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <p className={`text-gray-400 text-sm truncate ${conv.id > 2 ? 'blur-sm' : ''}`}>{conv.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Footer Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/95 backdrop-blur-xl border-t border-gray-800 z-50">
        <div className="max-w-sm mx-auto">
          <Button
            className="w-full h-14 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:opacity-90 transition-opacity text-lg shadow-xl"
            onClick={() => router.push('/results')}
          >
            VIEW SECRET MESSAGES 🔍
          </Button>
        </div>
      </div>
    </div>
  )
}
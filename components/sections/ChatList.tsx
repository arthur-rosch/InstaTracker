"use client"

import { useState } from "react"
import { Edit, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatListProps {
  onBack: () => void;
  username: string;
}

export function ChatList({ username }: ChatListProps) {
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

  return (
    <div className="bg-black text-white rounded-2xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold blur-sm">{username}</span>
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
      <div className="max-h-96 overflow-y-auto">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className="flex items-center px-4 py-3 hover:bg-gray-900/50 cursor-pointer"
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

      {/* Footer Button */}
      <div className="p-4 border-t border-gray-800">
        <Button
          className="w-full h-12 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:opacity-90 transition-opacity text-sm shadow-xl"
        >
          VIEW SECRET MESSAGES 🔍
        </Button>
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import { Edit, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Follower {
  name: string;
  avatar: string;
}

interface ChatListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  username: string;
  followers?: Follower[];
}

export function ChatList({ open, onOpenChange, username, followers = [] }: ChatListProps) {
  const [messagesUnlocked, setMessagesUnlocked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("primary");

  // Mensagens predefinidas para as conversas
  const predefinedMessages = [
    "Can't wait to see you tonight when he's not home 😈",
    "I've been thinking about our secret all day...",
    "enviou um anexo",
    "Você enviou um anexo",
    "Você: MDs",
    "Tá",
    "Ou no",
    "😍😍😍",
    "Oi amor"
  ];

  const timeOptions = ["12 h", "13 h", "14 h", "18 h", "1 d", "2 d", "3 d"];

  // Função para gerar perfil aleatório
  const generateRandomProfile = () => {
    const randomNames = [
      "Ana Silva", "Carlos Santos", "Maria Oliveira", "João Costa", "Fernanda Lima",
      "Pedro Alves", "Juliana Rocha", "Rafael Mendes", "Camila Ferreira", "Lucas Barbosa",
      "Beatriz Cardoso", "Thiago Nascimento", "Larissa Gomes", "Gabriel Ribeiro", "Natália Souza"
    ];
    const randomAvatars = [
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=50&h=50&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=50&h=50&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face"
    ];
    
    return {
      name: randomNames[Math.floor(Math.random() * randomNames.length)],
      avatar: randomAvatars[Math.floor(Math.random() * randomAvatars.length)],
      message: predefinedMessages[Math.floor(Math.random() * predefinedMessages.length)],
      time: timeOptions[Math.floor(Math.random() * timeOptions.length)]
    };
  };

  // Criar conversas usando os seguidores da API ou fallback para dados fictícios
  const allConversations = followers.length > 0
    ? followers.slice(0, 9).map((follower, index) => ({
      id: index + 1,
      name: follower.name,
      message: predefinedMessages[index % predefinedMessages.length],
      time: timeOptions[index % timeOptions.length],
      avatar: follower.avatar.startsWith('http') ? `/api/image-proxy?url=${encodeURIComponent(follower.avatar)}` : follower.avatar,
      unread: false,
      muted: index === 2
    }))
    : [
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
    ];

  // Filtrar conversas baseado na busca
  const filteredConversations = searchTerm
    ? allConversations.filter(conv => 
        conv.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allConversations;

  // Se não há resultados na busca, mostrar perfil aleatório
  const conversations = filteredConversations.length === 0 && searchTerm
    ? [{
        id: 999,
        ...generateRandomProfile(),
        unread: false,
        muted: false
      }]
    : filteredConversations;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black text-white border-gray-800 max-w-md w-full h-[100vh] max-h-[100vh] overflow-hidden flex flex-col p-0 sm:max-h-[80vh] sm:rounded-lg sm:h-auto">
        <DialogHeader className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <DialogTitle className="text-lg font-semibold text-white">{username}</DialogTitle>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex items-center space-x-3">
              <Edit className="w-6 h-6" />
              <button 
                onClick={() => onOpenChange(false)}
                className="p-1 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <button 
            onClick={() => setActiveTab("primary")}
            className={`flex-1 text-center py-3 ${activeTab === "primary" ? "border-b-2 border-white font-semibold text-white" : "text-gray-400"}`}
          >
            Primary
          </button>
          <button 
            onClick={() => messagesUnlocked && setActiveTab("general")}
            className={`flex-1 text-center py-3 ${!messagesUnlocked ? "opacity-50 cursor-not-allowed" : ""} ${activeTab === "general" ? "border-b-2 border-white font-semibold text-white" : "text-gray-400"}`}
          >
            General
          </button>
          <button 
            onClick={() => messagesUnlocked && setActiveTab("requests")}
            className={`flex-1 text-center py-3 relative ${!messagesUnlocked ? "opacity-50 cursor-not-allowed" : ""} ${activeTab === "requests" ? "border-b-2 border-white font-semibold text-white" : "text-blue-400"}`}
          >
            Requests
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="flex items-center bg-gray-900 rounded-lg px-3 py-2">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent flex-1 text-white placeholder-gray-400 outline-none"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "primary" && conversations.map((conv) => (
            <div
              key={conv.id}
              className="flex items-center px-4 py-3 hover:bg-gray-900/50 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={conv.avatar}
                  alt={conv.name}
                  className={`w-12 h-12 rounded-full object-cover ${!messagesUnlocked ? 'blur-sm' : ''}`}
                />
                {conv.id === 1 && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                )}
              </div>
              <div className="flex-1 ml-3 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white truncate max-w-0 flex-1">{conv.name}</h3>
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
                <p className={`text-gray-400 text-sm truncate ${!messagesUnlocked && conv.id > 2 ? 'blur-sm' : ''}`}>{conv.message}</p>
              </div>
            </div>
          ))}
          
          {activeTab === "general" && messagesUnlocked && (
            <div className="p-4 text-center text-gray-400">
              <p>Conversas gerais aparecerão aqui</p>
            </div>
          )}
          
          {activeTab === "requests" && messagesUnlocked && (
            <div className="p-4 text-center text-gray-400">
              <p>Solicitações de mensagem aparecerão aqui</p>
            </div>
          )}
          
          {(activeTab === "general" || activeTab === "requests") && !messagesUnlocked && (
            <div className="p-4 text-center text-gray-400 opacity-50">
              <p>Desbloqueie para ver este conteúdo</p>
            </div>
          )}
        </div>




        {/* Footer Button */}
        <div className="p-4 border-t border-gray-800 mt-auto">
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
            Unlock full access
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
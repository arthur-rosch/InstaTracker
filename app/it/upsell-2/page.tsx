"use client"

import React, { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Edit, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, Phone, Video, Info, Camera, Mic, Image, Heart } from "lucide-react"
import { useInstagramToast } from "@/components/ui/instagram-toast"


// Avatar image paths as strings
const avatar01 = "/assets/profile/01.jpg"
const avatar02 = "/assets/profile/02.jpg"
const avatar03 = "/assets/profile/03.jpg"
const avatar04 = "/assets/profile/04.jpg"
const avatar05 = "/assets/profile/05.jpg"
const avatar06 = "/assets/profile/06.jpg"
const avatar07 = "/assets/profile/07.jpg"
const avatar08 = "/assets/profile/08.jpg"
const avatar09 = "/assets/profile/09.jpg"
const avatar10 = "/assets/profile/10.jpg"
const avatar11 = "/assets/profile/11.jpg"
const avatar12 = "/assets/profile/12.jpg"
const avatar13 = "/assets/profile/13.jpg"
const avatar14 = "/assets/profile/14.jpg"
const avatar15 = "/assets/profile/15.jpg"
const avatar16 = "/assets/profile/16.jpg"
const avatar17 = "/assets/profile/17.jpg"
const avatar18 = "/assets/profile/18.jpg"

interface Follower {
  name: string;
  avatar: string;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  message: string;
  time: string;
  muted?: boolean;
  isUnlocked?: boolean;
}

interface ChatMessage {
  id: number;
  content: string;
  type: 'sent' | 'received';
  time: string;
  isImage?: boolean;
}

interface ProfileData {
  profile?: {
    id: string;
    name: string;
    fullName: string;
    avatar: string;
    totalFollower: number;
    totalFollowing: number;
  };
  username?: string;
  [key: string]: any;
}



export default function Upsell2Page() {
  const router = useRouter()
  const [open, setOpen] = useState(true)
  const [messagesUnlocked, setMessagesUnlocked] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("primary")
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [currentView, setCurrentView] = useState('list')
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null)
  const [chatBlurred, setChatBlurred] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [username, setUsername] = useState('eo.rosch')
  const [conversations, setConversations] = useState<Conversation[]>([])
  const { showToast, ToastContainer } = useInstagramToast()

  const playNotificationSound = () => {
    try {
      // Create a more pleasant notification sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      // Create a sequence of tones for a more pleasant notification
      const frequencies = [523.25, 659.25]; // C5 and E5 notes

      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = freq;
        oscillator.type = 'sine';

        const startTime = audioContext.currentTime + (index * 0.15);
        const endTime = startTime + 0.2;

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, endTime);

        oscillator.start(startTime);
        oscillator.stop(endTime);
      });
    } catch (error) {
      console.log('Audio non supportato');
    }
  };

  // Avatar images array for easy access
  const avatarImages = [
    avatar01, avatar02, avatar03, avatar04, avatar05, avatar06,
    avatar07, avatar08, avatar09, avatar10, avatar11, avatar12,
    avatar13, avatar14, avatar15, avatar16, avatar17, avatar18
  ];

  // Timer to lock conversations after 8 seconds
  useEffect(() => {
    const lockTimer = setTimeout(() => {
      setConversations((prev: Conversation[]) =>
        prev.map((conv: Conversation) => ({ ...conv, isUnlocked: false }))
      );
    }, 8000);

    return () => {
      clearTimeout(lockTimer);
    };
  }, []);

  // Simulate Instagram message notifications
  useEffect(() => {
    const simulateNotifications = () => {
      const randomConversation = conversations[Math.floor(Math.random() * conversations.length)];
      if (randomConversation) {
        const messages = [
          "Ciao! Come va?",
          "Hai visto la mia ultima foto?",
          "E se uscissimo oggi?",
          "Grazie per il like! ❤️",
          "Sei online?",
          "Buonanotte! 🌙",
          "Che giornata incredibile!",
          "Mi manchi"
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        playNotificationSound()

        showToast(randomConversation.avatar, randomConversation.name, randomMessage);
      }
    };

    // Show first notification after 6 seconds
    const firstTimeout = setTimeout(simulateNotifications, 4000);

    // Then show notifications every 15 seconds
    const interval = setInterval(() => {
      simulateNotifications();
    }, 15000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, [showToast, conversations]);

  // Compromising chat messages for unlocked conversations
  const compromisingMessages1: ChatMessage[] = [
    {
      id: 1,
      content: "Ehi, sei libera stasera? 😏",
      type: 'received',
      time: '11:30 PM'
    },
    {
      id: 2,
      content: "Sì, da me o da te? 😘",
      type: 'sent',
      time: '11:32 PM'
    },
    {
      id: 3,
      content: "Da me... ho preparato qualcosa di speciale 🔥",
      type: 'received',
      time: '11:33 PM'
    },
    {
      id: 4,
      content: "Mi incuriosisce... che tipo di speciale? 😈",
      type: 'sent',
      time: '11:34 PM'
    },
    {
      id: 5,
      content: "https://i.pinimg.com/1200x/bf/7a/30/bf7a3060a72ed8a25733602bb8bd38b5.jpg",
      type: 'received',
      time: '11:35 PM',
      isImage: true
    },
    {
      id: 6,
      content: "Wow... sei incredibile 🔥🔥",
      type: 'sent',
      time: '11:36 PM'
    },
    {
      id: 7,
      content: "È solo l'inizio... aspetta di vedere cosa indosso sotto 😏",
      type: 'received',
      time: '11:37 PM'
    },
    {
      id: 8,
      content: "Mi fai impazzire... sto arrivando 🚗💨",
      type: 'sent',
      time: '11:38 PM'
    },
    {
      id: 9,
      content: "Bene... ti aspetterò alla porta. Non bussare, entra direttamente 😈",
      type: 'received',
      time: '11:39 PM'
    },
    {
      id: 10,
      content: "Non vedo l'ora di vederti... ho una sorpresa 😈",
      type: 'received',
      time: '11:40 PM'
    },
    {
      id: 11,
      content: "Che sorpresa? Mi uccidi dall'impazienza 🔥",
      type: 'sent',
      time: '11:41 PM'
    },
    {
      id: 12,
      content: "Mi sto già preparando... sarà incredibile 💋",
      type: 'sent',
      time: '11:42 PM'
    },
    {
      id: 13,
      content: "Diciamo che... non rimarrai delusa. Ci ho pensato tutto il giorno 😍",
      type: 'received',
      time: '11:43 PM'
    },
    {
      id: 14,
      content: "Anch'io... non riuscivo a concentrarmi su altro al lavoro oggi 💭",
      type: 'sent',
      time: '11:44 PM'
    },
    {
      id: 15,
      content: "Bene... perché questa notte sarà indimenticabile 🌙✨",
      type: 'received',
      time: '11:45 PM'
    },
    {
      id: 16,
      content: "Sono quasi arrivata... il mio cuore batte forte 💓",
      type: 'sent',
      time: '11:47 PM'
    },
    {
      id: 17,
      content: "Anche il mio... non vedo l'ora di sentire di nuovo il tuo tocco 😘",
      type: 'received',
      time: '11:48 PM'
    },
    {
      id: 18,
      content: "Sono appena arrivata... ci vediamo tra 30 secondi 😏",
      type: 'sent',
      time: '11:50 PM'
    }
  ];

  const compromisingMessages2: ChatMessage[] = [
    {
      id: 1,
      content: "Non riesco a smettere di pensare alla notte scorsa... 😍",
      type: 'received',
      time: '2:15 AM'
    },
    {
      id: 2,
      content: "Nemmeno io... eri incredibile 🔥",
      type: 'sent',
      time: '2:17 AM'
    },
    {
      id: 3,
      content: "Il modo in cui mi hai guardata... mi dà ancora i brividi 😊",
      type: 'received',
      time: '2:18 AM'
    },
    {
      id: 4,
      content: "Hai questo effetto su di me che non riesco a spiegare... è inebriante 💫",
      type: 'sent',
      time: '2:19 AM'
    },
    {
      id: 5,
      content: "Quando possiamo ricominciare? Mi manchi già...",
      type: 'received',
      time: '2:20 AM'
    },
    {
      id: 6,
      content: "Anche tu mi manchi... più di quanto dovrei ammettere 💭",
      type: 'sent',
      time: '2:21 AM'
    },
    {
      id: 7,
      content: "Rivivo ogni momento nella mia mente... soprattutto quello che hai fatto 😏",
      type: 'received',
      time: '2:22 AM'
    },
    {
      id: 8,
      content: "Quale parte? Ci sono stati così tanti momenti incredibili 😈",
      type: 'sent',
      time: '2:23 AM'
    },
    {
      id: 9,
      content: "Sai esattamente quale parte... quando mi hai sussurrato all'orecchio 🔥",
      type: 'received',
      time: '2:24 AM'
    },
    {
      id: 10,
      content: "https://i.pinimg.com/736x/a2/4a/05/a24a05cc160dbd1b07e6e65bc5964155.jpg",
      type: 'sent',
      time: '2:25 AM',
      isImage: true
    },
    {
      id: 11,
      content: "OMG... mi fai impazzire 😈💦",
      type: 'received',
      time: '2:26 AM'
    },
    {
      id: 12,
      content: "Non posso farne a meno... fai emergere questo lato di me 😍",
      type: 'sent',
      time: '2:27 AM'
    },
    {
      id: 13,
      content: "Adoro questo lato di te... così appassionato, così intenso 🔥",
      type: 'received',
      time: '2:28 AM'
    },
    {
      id: 14,
      content: "Solo con te... mi fai provare cose che non ho mai provato prima 💕",
      type: 'sent',
      time: '2:29 AM'
    },
    {
      id: 15,
      content: "Domani sera? Stessa ora, stessa passione? 😘",
      type: 'sent',
      time: '2:30 AM'
    },
    {
      id: 16,
      content: "Sì... ma questa volta faremo qualcosa di ancora più speciale 🌹",
      type: 'received',
      time: '2:31 AM'
    },
    {
      id: 17,
      content: "Ho qualche idea... cose che volevo provare con te 😏",
      type: 'received',
      time: '2:32 AM'
    },
    {
      id: 18,
      content: "Ora mi rendi curiosa... ed eccitata 😈",
      type: 'sent',
      time: '2:33 AM'
    },
    {
      id: 19,
      content: "Bene... perché domani sera sarà ancora meglio della notte scorsa 🔥",
      type: 'received',
      time: '2:34 AM'
    },
    {
      id: 20,
      content: "Non so come sia possibile... ma mi fido di te 💋",
      type: 'sent',
      time: '2:35 AM'
    }
  ];

  const [currentChatMessages, setCurrentChatMessages] = useState<ChatMessage[]>(compromisingMessages1);

  // Mock conversations fallback data
  const createMockConversations = () => {
    const mockConversations: Conversation[] = [
      {
        id: 1,
        name: "Sarah Johnson",
        avatar: avatarImages[0],
        message: "Ehi, sei libera stasera? 😏",
        time: "2m",
        isUnlocked: true
      },
      {
        id: 2,
        name: "Emma Wilson",
        avatar: avatarImages[1],
        message: "Non riesco a smettere di pensare alla notte scorsa... 😍",
        time: "5m",
        isUnlocked: true
      },
      {
        id: 3,
        name: "Mike Chen",
        avatar: avatarImages[2],
        message: "Grazie per la raccomandazione!",
        time: "1h",
        muted: true,
      },
      {
        id: 4,
        name: "Alex Rodriguez",
        avatar: avatarImages[3],
        message: "La festa era incredibile!",
        time: "2h",
      },
      {
        id: 5,
        name: "Jessica Taylor",
        avatar: avatarImages[4],
        message: "Prendiamo un caffè presto",
        time: "3h",
      },
      {
        id: 6,
        name: "David Kim",
        avatar: avatarImages[5],
        message: "È stato fantastico conoscerti ieri!",
        time: "4h",
      },
      {
        id: 7,
        name: "Lisa Anderson",
        avatar: avatarImages[6],
        message: "Puoi mandarmi quel link?",
        time: "5h",
        muted: true,
      },
      {
        id: 8,
        name: "Carlos Martinez",
        avatar: avatarImages[7],
        message: "Ci vediamo in palestra!",
        time: "6h",
      },
      {
        id: 9,
        name: "Rachel Green",
        avatar: avatarImages[8],
        message: "Grazie per l'aiuto oggi",
        time: "7h",
      },
      {
        id: 10,
        name: "Tom Wilson",
        avatar: avatarImages[9],
        message: "Serata film questo weekend?",
        time: "8h",
      },
      {
        id: 11,
        name: "Sophie Brown",
        avatar: avatarImages[10],
        message: "Adoro la tua nuova foto profilo!",
        time: "9h",
        muted: true,
      },
      {
        id: 12,
        name: "Jake Thompson",
        avatar: avatarImages[11],
        message: "Buon compleanno! 🎉",
        time: "10h",
        muted: true,
      },
      {
        id: 13,
        name: "Maya Patel",
        avatar: avatarImages[12],
        message: "La cena era incredibile!",
        time: "11h",
        muted: true,
      },
      {
        id: 14,
        name: "Chris Lee",
        avatar: avatarImages[13],
        message: "Buona fortuna per la tua presentazione",
        time: "12h",
        muted: true,
      },
      {
        id: 15,
        name: "Amanda Davis",
        avatar: avatarImages[14],
        message: "Non vedo l'ora delle vacanze!",
        time: "13h",
        muted: true,
      },
      {
        id: 16,
        name: "Ryan Clark",
        avatar: avatarImages[15],
        message: "Grazie per la raccomandazione",
        time: "14h",
        muted: true,
      },
      {
        id: 17,
        name: "Nicole White",
        avatar: avatarImages[16],
        message: "A domani!",
        time: "15h",
        muted: true,
      },
      {
        id: 18,
        name: "Kevin Johnson",
        avatar: avatarImages[17],
        message: "Ottimo lavoro sul progetto",
        time: "16h",
        muted: true,
      }
    ];
    return mockConversations;
  };

  // Create conversations from followers data
  const createConversationsFromFollowers = (followersData: any[]) => {
    if (!followersData || followersData.length === 0) {
      return createMockConversations();
    }

    // Ensure we have at least 18 conversations by combining real followers with mock data
    const mockData = createMockConversations();
    const conversations: Conversation[] = [];

    // Use real followers first
    followersData.forEach((follower, index) => {
      if (index < 18) {
        conversations.push({
          id: index + 1,
          name: follower.name || follower.fullName || `User ${index + 1}`,
          avatar: follower.avatar || avatarImages[index % avatarImages.length],
          message: index === 0 ? "Ehi, sei libera stasera? 😏" :
            index === 1 ? "Non riesco a smettere di pensare alla notte scorsa... 😍" :
              index < 5 ? "Ciao! Come va?" :
                index < 10 ? "Grazie per la raccomandazione!" :
                  "Prendiamo un caffè presto",
          time: index === 0 ? "2m" :
            index === 1 ? "5m" :
              index < 5 ? "1h" :
                index < 10 ? "2h" : "3h",
          muted: index > 10,
          isUnlocked: index < 2 // First 2 conversations are unlocked
        });
      }
    });

    // Fill remaining slots with mock data if needed
    while (conversations.length < 18) {
      const mockIndex = conversations.length;
      const mockConv = mockData[mockIndex];
      if (mockConv) {
        conversations.push({
          ...mockConv,
          id: conversations.length + 1,
          isUnlocked: conversations.length < 2
        });
      } else {
        break;
      }
    }

    return conversations;
  };

  useEffect(() => {
    const loadData = () => {
      const storedData = typeof window !== 'undefined'
        ? localStorage.getItem('instagram_analysis')
        : null

      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setProfileData(parsedData);
          if (parsedData.username) {
            setUsername(parsedData.username);
          }

          // Use followers from localStorage directly
          if (parsedData.followers && parsedData.followers.length > 0) {
            console.log('Utilizzo dei follower da localStorage:', parsedData.followers);
            const newConversations = createConversationsFromFollowers(parsedData.followers);
            setConversations(newConversations);
          } else {
            console.log('Nessun follower trovato in localStorage, utilizzo di dati fittizi');
            const mockConversations = createMockConversations();
            setConversations(mockConversations);
          }
        } catch (e) {
          console.error('Error parsing localStorage data', e);
          const mockConversations = createMockConversations();
          setConversations(mockConversations);
        }
      } else {
        console.log('Nessun dato localStorage trovato, utilizzo di dati fittizi');
        const mockConversations = createMockConversations();
        setConversations(mockConversations);
      }
    };

    loadData();
  }, []);



  // Filter conversations based on search term
  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort conversations to put unlocked ones at the top
  const sortedConversations = useMemo(() => {
    const sorted = [...conversations].sort((a, b) => {
      // Unlocked conversations first
      if (a.isUnlocked && !b.isUnlocked) return -1;
      if (!a.isUnlocked && b.isUnlocked) return 1;
      // Then by ID
      return a.id - b.id;
    });
    return sorted;
  }, [conversations]);

  // Random conversations for different views
  const randomConversations = useMemo(() => {
    return [...sortedConversations].sort(() => Math.random() - 0.5);
  }, [sortedConversations]);

  const handleChatClick = (conv: Conversation) => {
    // For unlocked conversations, show chat
    if (conv.isUnlocked) {
      setSelectedChat(conv);
      setCurrentView('chat');

      // Set appropriate messages based on conversation
      if (conv.id === 1) {
        setCurrentChatMessages(compromisingMessages1);
      } else if (conv.id === 2) {
        setCurrentChatMessages(compromisingMessages2);
      }
    } else {
      // For locked conversations, show modal
      setShowModal(true);
      return;
    }
  };

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
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
            </div>
            <div>
              <h3 className="font-semibold text-white">{selectedChat.name}</h3>
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
          {currentChatMessages.map((message) => (
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
                      className="rounded-lg w-full h-48 object-cover blur-md"
                    />
                  </div>
                ) : (
                  <p className="text-sm">{message.content}</p>
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
                  placeholder="Messaggio..."
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
                className="w-full h-12 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-2xl hover:opacity-90 transition-opacity text-xs shadow-xl"
                onClick={() => window.open('https://go.perfectpay.com.br/PPU38CPSHSB?upsell=true', '_blank')}
              >
                RECUPERA TUTTI I MESSAGGI ELIMINATI
              </Button>
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-black text-white max-w-sm mx-auto">
      {/* Header */}
      <div className="fixed flex items-center justify-between p-4 border-b border-gray-800 bg-black z-10 w-full">
        <div className="flex items-center space-x-4">
          <ArrowLeft className="w-6 h-6" onClick={() => router.back()} />
          <span className="text-lg font-semibold">{username}</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <Edit className="w-6 h-6" />
      </div>

      {/* Tabs */}
      <div className=" flex border-b border-gray-800">
        <div className="flex-1 text-center py-3 border-b-2 border-white font-semibold">
          Principale
        </div>
        <div className="flex-1 text-center py-3 text-gray-400 opacity-50">
          Generale
        </div>
        <div className="flex-1 text-center py-3 text-blue-400 opacity-50 relative">
          Richieste
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            2
          </span>
        </div>
      </div>

      {/* Notes Profile Slider */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex space-x-4 pb-2">
          {/* User's profile - first photo */}
          <div className="flex-shrink-0 text-center">
            <div className="relative mb-2">
              <img
                src={profileData?.profile?.avatar || avatarImages[0]}
                alt="Your profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
            </div>
            <p className="text-white text-xs font-medium truncate w-16">
              La tua nota
            </p>
          </div>

          {/* Mock followers profiles with blur */}
          {avatarImages.slice(1, 8).map((avatar, index) => (
            <div key={index} className="flex-shrink-0 text-center">
              <div className="relative mb-2">
                <img
                  src={avatar}
                  alt={`Profile ${index + 1}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-600 blur-sm"
                />
              </div>
              <p className="text-white text-xs font-medium truncate w-16 blur-sm">
                User {index + 1}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="flex items-center bg-gray-900 rounded-lg px-3 py-2">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Cerca"
            className="bg-transparent flex-1 text-white placeholder-gray-400 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <X
              className="w-5 h-5 text-gray-400 cursor-pointer"
              onClick={() => setSearchTerm('')}
            />
          )}
        </div>
      </div>



      {/* Conversations */}
      <div className="flex-1 pb-24">
        <ToastContainer />
        {(searchTerm ? filteredConversations : sortedConversations).map((conv) => (
          <div
            key={conv.id}
            className="flex items-center px-4 py-3 hover:bg-gray-900/50 cursor-pointer"
            onClick={() => handleChatClick(conv)}
          >
            <div className="relative">
              <img
                src={conv.avatar}
                alt={conv.name}
                className={`w-12 h-12 rounded-full object-cover ${!conv.isUnlocked ? 'blur-sm' : ''}`}
              />
              {conv.id === 1 && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
              )}
            </div>
            <div className="flex-1 ml-3 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className={`font-semibold text-white truncate ${!conv.isUnlocked ? 'blur-sm' : ''}`}>{conv.name}</h3>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className="text-gray-400 text-sm">{conv.time}</span>
                  {conv.muted && (
                    <div className="w-4 h-4 text-gray-400">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.793a1 1 0 011.617.793zM14.657 5.757a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-2.929 7.071 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.414 0A5.983 5.983 0 0115 12a5.983 5.983 0 01-1.758 4.243 1 1 0 11-1.414-1.414A3.987 3.987 0 0013 12a3.987 3.987 0 00-1.172-2.829 1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  {!conv.isUnlocked && (
                    <div className="w-4 h-4 text-yellow-500">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <p className={`text-gray-400 text-sm truncate ${!conv.isUnlocked ? 'blur-sm' : ''}`}>{conv.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Footer Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/95 backdrop-blur-xl border-t border-gray-800 z-[9999] min-h-[88px]">
        <div className="max-w-sm mx-auto">
          <Button
            className="w-full h-12 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-2xl hover:opacity-90 transition-opacity text-xs shadow-xl"
            onClick={() => window.open('https://go.perfectpay.com.br/PPU38CPSHSB?upsell=true', '_blank')}
          >
            RÉCUPÉRER TOUS LES MESSAGES SUPPRIMÉS
          </Button>
        </div>
      </div>

      {/* Locked Conversation Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md bg-[#1a1a2e] border-none rounded-2xl">
          <div className="text-center p-6">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 616 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">
                Messaggi segreti scoperti!
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Abbiamo trovato messaggi nascosti ed eliminati in questa conversazione. Clicca qui sotto per rivelare tutto il contenuto segreto.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-4 rounded-lg transition-all duration-200 text-sm border-none"
                onClick={() => window.open('https://go.perfectpay.com.br/PPU38CPSHSB?upsell=true', '_blank')}
              >
                🔍 RIVELA I MESSAGGI SEGRETI 🔍
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ToastContainer />

    </div>
  )
}

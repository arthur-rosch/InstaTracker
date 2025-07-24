"use client"

import { useState, useEffect, useMemo } from "react"
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
import { useIg } from "@/hooks/use-ig"

// Import avatar images
import avatar01 from "/assets/profile/01.jpg"
import avatar02 from "/assets/profile/02.jpg"
import avatar03 from "/assets/profile/03.jpg"
import avatar04 from "/assets/profile/04.jpg"
import avatar05 from "/assets/profile/05.jpg"
import avatar06 from "/assets/profile/06.jpg"
import avatar07 from "/assets/profile/07.jpg"
import avatar08 from "/assets/profile/08.jpg"
import avatar09 from "/assets/profile/09.jpg"
import avatar10 from "/assets/profile/10.jpg"
import avatar11 from "/assets/profile/11.jpg"
import avatar12 from "/assets/profile/12.jpg"
import avatar13 from "/assets/profile/13.jpg"
import avatar14 from "/assets/profile/14.jpg"
import avatar15 from "/assets/profile/15.jpg"
import avatar16 from "/assets/profile/16.jpg"
import avatar17 from "/assets/profile/17.jpg"
import avatar18 from "/assets/profile/18.jpg"

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

interface ChatListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  username: string;
  followers?: Follower[];
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
  const [showTimerModal, setShowTimerModal] = useState(false)
  const [username, setUsername] = useState('eo.rosch')
  const [conversations, setConversations] = useState<Conversation[]>([])

  const { getFollowers, followers, followersLoading, error } = useIg();

  // Avatar images array for easy access - convert to strings
  const avatarImages = [
    avatar01.src, avatar02.src, avatar03.src, avatar04.src, avatar05.src, avatar06.src,
    avatar07.src, avatar08.src, avatar09.src, avatar10.src, avatar11.src, avatar12.src,
    avatar13.src, avatar14.src, avatar15.src, avatar16.src, avatar17.src, avatar18.src
  ];

  // Timer for modal
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimerModal(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  // Compromising chat messages for unlocked conversations
  const compromisingMessages1: ChatMessage[] = [
    {
      id: 1,
      content: "Hey, are you free tonight? 😏",
      type: 'received',
      time: '11:30 PM'
    },
    {
      id: 2,
      content: "Yes, my place or yours? 😘",
      type: 'sent',
      time: '11:32 PM'
    },
    {
      id: 3,
      content: "https://i.pinimg.com/1200x/bf/7a/30/bf7a3060a72ed8a25733602bb8bd38b5.jpg",
      type: 'received',
      time: '11:35 PM',
      isImage: true
    },
    {
      id: 4,
      content: "Wow... you look incredible 🔥🔥",
      type: 'sent',
      time: '11:36 PM'
    },
    {
      id: 5,
      content: "Can't wait to see you... I have a surprise 😈",
      type: 'received',
      time: '11:40 PM'
    },
    {
      id: 6,
      content: "I'm already getting ready... this is going to be amazing 💋",
      type: 'sent',
      time: '11:42 PM'
    }
  ];

  const compromisingMessages2: ChatMessage[] = [
    {
      id: 1,
      content: "I can't stop thinking about last night... 😍",
      type: 'received',
      time: '2:15 AM'
    },
    {
      id: 2,
      content: "Me neither... you were incredible 🔥",
      type: 'sent',
      time: '2:17 AM'
    },
    {
      id: 3,
      content: "When can we do it again? I'm already missing you...",
      type: 'received',
      time: '2:20 AM'
    },
    {
      id: 4,
      content: "https://i.pinimg.com/736x/a2/4a/05/a24a05cc160dbd1b07e6e65bc5964155.jpg",
      type: 'sent',
      time: '2:25 AM',
      isImage: true
    },
    {
      id: 5,
      content: "OMG... you're driving me crazy 😈💦",
      type: 'received',
      time: '2:26 AM'
    },
    {
      id: 6,
      content: "Tomorrow night? Same time, same passion? 😘",
      type: 'sent',
      time: '2:30 AM'
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
        message: "Hey, are you free tonight? 😏",
        time: "2m",
        isUnlocked: true
      },
      {
        id: 2,
        name: "Emma Wilson",
        avatar: avatarImages[1],
        message: "I can't stop thinking about last night... 😍",
        time: "5m",
        isUnlocked: true
      },
      {
        id: 3,
        name: "Mike Chen",
        avatar: avatarImages[2],
        message: "Thanks for the recommendation!",
        time: "1h",
        muted: true,
      },
      {
        id: 4,
        name: "Alex Rodriguez",
        avatar: avatarImages[3],
        message: "The party was amazing!",
        time: "2h",
      },
      {
        id: 5,
        name: "Jessica Taylor",
        avatar: avatarImages[4],
        message: "Let's grab coffee soon",
        time: "3h",
      },
      {
        id: 6,
        name: "David Kim",
        avatar: avatarImages[5],
        message: "Great meeting you yesterday!",
        time: "4h",
      },
      {
        id: 7,
        name: "Lisa Anderson",
        avatar: avatarImages[6],
        message: "Can you send me that link?",
        time: "5h",
        muted: true,
      },
      {
        id: 8,
        name: "Carlos Martinez",
        avatar: avatarImages[7],
        message: "See you at the gym!",
        time: "6h",
      },
      {
        id: 9,
        name: "Rachel Green",
        avatar: avatarImages[8],
        message: "Thanks for the help today",
        time: "7h",
      },
      {
        id: 10,
        name: "Tom Wilson",
        avatar: avatarImages[9],
        message: "Movie night this weekend?",
        time: "8h",
      },
      {
        id: 11,
        name: "Sophie Brown",
        avatar: avatarImages[10],
        message: "Love your new profile pic!",
        time: "9h",
        muted: true,
      },
      {
        id: 12,
        name: "Jake Thompson",
        avatar: avatarImages[11],
        message: "Happy birthday! 🎉",
        time: "10h",
        muted: true,
      },
      {
        id: 13,
        name: "Maya Patel",
        avatar: avatarImages[12],
        message: "Dinner was amazing!",
        time: "11h",
        muted: true,
      },
      {
        id: 14,
        name: "Chris Lee",
        avatar: avatarImages[13],
        message: "Good luck with your presentation",
        time: "12h",
        muted: true,
      },
      {
        id: 15,
        name: "Amanda Davis",
        avatar: avatarImages[14],
        message: "Can't wait for vacation!",
        time: "13h",
        muted: true,
      },
      {
        id: 16,
        name: "Ryan Clark",
        avatar: avatarImages[15],
        message: "Thanks for the recommendation",
        time: "14h",
        muted: true,
      },
      {
        id: 17,
        name: "Nicole White",
        avatar: avatarImages[16],
        message: "See you tomorrow!",
        time: "15h",
        muted: true,
      },
      {
        id: 18,
        name: "Kevin Johnson",
        avatar: avatarImages[17],
        message: "Great job on the project",
        time: "16h",
        muted: true,
      }
    ];
    return mockConversations;
  };

  // Create conversations from followers data
  const createConversationsFromFollowers = (followersData: Follower[]) => {
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
          name: follower.name || `User ${index + 1}`,
          avatar: follower.avatar || avatarImages[index % avatarImages.length],
          message: index === 0 ? "Hey, are you free tonight? 😏" :
            index === 1 ? "I can't stop thinking about last night... 😍" :
              index < 5 ? "Hey! How are you doing?" :
                index < 10 ? "Thanks for the recommendation!" :
                  "Let's grab coffee soon",
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
    const loadData = async () => {
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

          // Get followers using the profile ID
          if (parsedData.profile?.id && !parsedData.profile?.isPrivate) {
            try {
              console.log('Fetching followers for ID:', parsedData.profile.id);
              const followersData = await getFollowers(parsedData.profile.id);

              console.log('Followers received:', followersData);

              // Create conversations with fallback
              const newConversations = createConversationsFromFollowers(followersData);
              setConversations(newConversations);

            } catch (error) {
              console.error('Error fetching followers:', error);
              // Fallback to mock data if API fails
              const mockConversations = createMockConversations();
              setConversations(mockConversations);
            }
          } else {
            console.log('No profile ID found, using mock data');
            const mockConversations = createMockConversations();
            setConversations(mockConversations);
          }
        } catch (e) {
          console.error('Error parsing localStorage data', e);
          const mockConversations = createMockConversations();
          setConversations(mockConversations);
        }
      } else {
        console.log('No localStorage data found, using mock data');
        const mockConversations = createMockConversations();
        setConversations(mockConversations);
      }
    };

    loadData();
  }, []);

  // Update conversations when followers from hook change
  useEffect(() => {
    if (followers && followers.length > 0) {
      console.log('Updating conversations with hook followers:', followers);
      const newConversations = createConversationsFromFollowers(followers);
      setConversations(newConversations);
    }
  }, [followers]);

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
    setSelectedChat(conv);
    setCurrentView('chat');

    // Set appropriate messages based on conversation
    if (conv.id === 1) {
      setCurrentChatMessages(compromisingMessages1);
    } else if (conv.id === 2) {
      setCurrentChatMessages(compromisingMessages2);
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

        {/* Timer Modal */}
        <Dialog open={showTimerModal} onOpenChange={() => { }}>
          <DialogContent className="bg-black border-red-500 border-2 text-white max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle className="text-red-500 text-center text-xl font-bold">
                🚨 URGENT SECURITY ALERT 🚨
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-center">
              <p className="text-red-400 font-semibold">
                Your private messages are being exposed!
              </p>
              <p className="text-white text-sm">
                Someone is trying to access your deleted conversations. Act now to secure your account!
              </p>
              <Button
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-3 rounded-xl"
                onClick={() => router.push('/results')}
              >
                🔒 SECURE MY ACCOUNT NOW
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
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
      <div className="flex border-b border-gray-800">
        <div className="flex-1 text-center py-3 border-b-2 border-white font-semibold">
          Primary
        </div>
        <div className="flex-1 text-center py-3 text-gray-400 opacity-50">
          General
        </div>
        <div className="flex-1 text-center py-3 text-blue-400 opacity-50 relative">
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
            placeholder="Search"
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

      {/* Loading State */}
      {followersLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="text-gray-400 text-sm">Loading conversations...</div>
        </div>
      )}

      {/* Error State */}
      {error && !followersLoading && (
        <div className="flex items-center justify-center p-4">
          <div className="text-red-400 text-sm text-center">
            <p>Unable to load real followers</p>
            <p className="text-xs text-gray-500 mt-1">Using demo conversations</p>
          </div>
        </div>
      )}

      {/* Conversations */}
      <div className="flex-1 pb-20">
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

      {/* Locked Chat Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-black border-yellow-500 border-2 text-white max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-yellow-500 text-center text-xl font-bold">
              🔒 LOCKED CONVERSATION
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-center">
            <p className="text-yellow-400 font-semibold">
              This conversation is locked!
            </p>
            <p className="text-white text-sm">
              Unlock all private messages and see what they're really saying about you.
            </p>
            <Button
              className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-bold py-3 rounded-xl"
              onClick={() => router.push('/results')}
            >
              🔓 UNLOCK ALL MESSAGES
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Timer Modal */}
      <Dialog open={showTimerModal} onOpenChange={() => { }}>
        <DialogContent className="bg-black border-red-500 border-2 text-white max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-red-500 text-center text-xl font-bold">
              🚨 URGENT SECURITY ALERT 🚨
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-center">
            <p className="text-red-400 font-semibold">
              Your private messages are being exposed!
            </p>
            <p className="text-white text-sm">
              Someone is trying to access your deleted conversations. Act now to secure your account!
            </p>
            <Button
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-3 rounded-xl"
              onClick={() => router.push('/results')}
            >
              🔒 SECURE MY ACCOUNT NOW
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

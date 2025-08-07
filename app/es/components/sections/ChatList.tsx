"use client"

import { useState, useEffect } from "react"
import { Edit, Search, X, ArrowLeft, Unlock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useInstagramToast } from "@/components/ui/instagram-toast"

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

interface ChatListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  username: string;
  avatar?: string
  followers?: Follower[];
}

export function ChatList({ open, onOpenChange, username, followers = [], avatar }: ChatListProps) {
  const [messagesUnlocked, setMessagesUnlocked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("primary");
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [conversationNotification, setConversationNotification] = useState(false);
  const { showToast, ToastContainer } = useInstagramToast();

  // Function to play notification sound
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
      console.log('Audio not supported');
    }
  };



  // Avatar images array for easy access
  const avatarImages = [
    avatar01, avatar02, avatar03, avatar04, avatar05, avatar06,
    avatar07, avatar08, avatar09, avatar10, avatar11, avatar12,
    avatar13, avatar14, avatar15, avatar16, avatar17, avatar18
  ];

  // Mensajes predefinidos para las conversaciones
  const predefinedMessages = [
    "No puedo esperar a verte esta noche cuando él no esté en casa 😈",
    "He estado pensando en nuestro secreto todo el día...",
    "envió un archivo adjunto",
    "Tú enviaste un archivo adjunto",
    "Tú: MDs",
    "Sí",
    "O no",
    "😍😍😍",
    "Hola amor",
    "¿Cuándo nos vemos de nuevo?",
    "Te extraño...",
    "¿Viste mi última foto?",
    "Necesito contarte algo",
    "¿A qué hora llegas?",
    "Soñé contigo anoche",
    "¿Estás libre hoy?",
    "Tengo una sorpresa para ti",
    "No puedo dejar de pensar en ti",
    "¿Nos encontramos?"
  ];

  // Complete conversations for each person
  const generateFullConversation = (name: string, avatar: string) => {
    const conversationTemplates = [
      [
        { sender: 'them', message: '¡Hola! ¿Cómo estás hoy?', time: '14:30' },
        { sender: 'you', message: '¡Hola! Estoy bien, gracias por preguntar. ¿Y tú?', time: '14:32' },
        { sender: 'them', message: '¡Estoy genial! He estado pensando en ti todo el día', time: '14:35' },
        { sender: 'you', message: '¿En serio? Qué dulce de tu parte decir eso 😊', time: '14:36' },
        { sender: 'them', message: '¡Lo digo en serio! ¿Cuándo podemos vernos de nuevo?', time: '14:40' },
        { sender: 'you', message: '¿Qué tal esta noche? Estoy libre después de las 8pm', time: '14:42' },
        { sender: 'them', message: '¡Perfecto! No puedo esperar a verte 😍', time: '14:45' },
        { sender: 'them', message: 'Tengo algo especial planeado para nosotros', time: '14:46' },
        { sender: 'you', message: '¡Ahora tengo curiosidad! ¿Qué tienes en mente?', time: '14:48' },
        { sender: 'them', message: 'Es una sorpresa, pero creo que te encantará', time: '14:50' },
        { sender: 'you', message: 'Siempre sabes cómo emocionarme', time: '14:52' },
        { sender: 'them', message: 'Es porque significas todo para mí ❤️', time: '14:55' }
      ],
      [
        { sender: 'them', message: '¿Viste mi última publicación en Instagram?', time: '15:20' },
        { sender: 'you', message: '¡Sí! Te ves absolutamente deslumbrante 😍', time: '15:22' },
        { sender: 'them', message: '¡Gracias! Estaba pensando en ti cuando me la tomé', time: '15:25' },
        { sender: 'you', message: 'Siempre sabes cómo hacer que mi corazón se acelere', time: '15:27' },
        { sender: 'them', message: 'Jeje 😘 Tengo más fotos que aún no he compartido', time: '15:30' },
        { sender: 'you', message: 'Me encantaría verlas alguna vez', time: '15:32' },
        { sender: 'them', message: 'Tal vez pueda mostrártelas en persona la próxima vez que nos veamos', time: '15:35' },
        { sender: 'you', message: 'Eso suena como un plan que no puedo rechazar', time: '15:37' },
        { sender: 'them', message: 'Bien, porque he estado queriendo pasar más tiempo contigo', time: '15:40' },
        { sender: 'you', message: 'El sentimiento es mutuo. Eres increíble', time: '15:42' },
        { sender: 'them', message: 'Siempre sabes exactamente qué decir para hacerme sonreír', time: '15:45' }
      ],
      [
        { sender: 'them', message: 'Necesito decirte algo importante', time: '16:10' },
        { sender: 'you', message: '¿Qué tienes en mente? Suenas serio', time: '16:12' },
        { sender: 'them', message: 'No te preocupes, no es nada malo. De hecho, es todo lo contrario', time: '16:15' },
        { sender: 'you', message: 'Ahora tienes toda mi atención. ¡Dime!', time: '16:16' },
        { sender: 'them', message: 'Creo que me estoy enamorando de ti', time: '16:20' },
        { sender: 'you', message: 'Wow... No me esperaba eso, pero siento lo mismo', time: '16:22' },
        { sender: 'them', message: '¿En serio? Estaba tan nervioso de decírtelo', time: '16:25' },
        { sender: 'you', message: 'Nunca tienes que estar nervioso conmigo. Me importas mucho', time: '16:27' },
        { sender: 'them', message: 'Eres increíble. Soy tan afortunado de tenerte en mi vida ❤️', time: '16:30' },
        { sender: 'you', message: 'La suerte es toda mía. Haces que cada día sea más brillante', time: '16:32' },
        { sender: 'them', message: 'No puedo esperar a ver a dónde nos lleva esto', time: '16:35' },
        { sender: 'you', message: 'Pase lo que pase, quiero experimentarlo contigo', time: '16:37' }
      ],
      [
        { sender: 'them', message: 'Tuve el sueño más increíble sobre nosotros anoche', time: '17:15' },
        { sender: 'you', message: '¿En serio? Me intriga. ¿Qué pasó en ese sueño?', time: '17:17' },
        { sender: 'them', message: 'Estábamos viajando juntos a este hermoso resort de playa', time: '17:20' },
        { sender: 'you', message: 'Eso suena como el paraíso. Me encantaría hacer ese sueño realidad', time: '17:22' },
        { sender: 'them', message: 'Tal vez deberíamos empezar a planear un viaje juntos', time: '17:25' },
        { sender: 'you', message: 'Ya estoy esperándolo con ansias. ¿A dónde te gustaría ir?', time: '17:27' },
        { sender: 'them', message: 'A algún lugar tropical donde podamos ver el atardecer juntos', time: '17:30' },
        { sender: 'you', message: 'Eso suena absolutamente perfecto. Solo tú y yo', time: '17:32' },
        { sender: 'them', message: '¡Exactamente! Sin distracciones, solo nosotros disfrutando de nuestra compañía', time: '17:35' },
        { sender: 'you', message: 'Ya puedo imaginarnos caminando por la playa tomados de la mano', time: '17:37' },
        { sender: 'them', message: 'Pintas una imagen tan hermosa con tus palabras', time: '17:40' },
        { sender: 'you', message: 'Es fácil cuando estoy pensando en estar contigo', time: '17:42' }
      ],
      [
        { sender: 'them', message: 'He estado escuchando nuestra canción todo el día', time: '18:45' },
        { sender: 'you', message: '¿Cuál? Tenemos tantas canciones que me recuerdan a ti', time: '18:47' },
        { sender: 'them', message: 'La que sonaba cuando bailamos juntos por primera vez', time: '18:50' },
        { sender: 'you', message: '¿Cómo podría olvidarlo? Fue un momento tan mágico', time: '18:52' },
        { sender: 'them', message: 'Todavía siento mariposas pensando en esa noche', time: '18:55' },
        { sender: 'you', message: 'Yo también. La forma en que me miraste... Supe que algo especial estaba pasando', time: '18:57' },
        { sender: 'them', message: 'Me sentí como si estuviera en un cuento de hadas', time: '19:00' },
        { sender: 'you', message: 'Cada momento contigo se siente como un cuento de hadas para mí', time: '19:02' },
        { sender: 'them', message: 'Siempre sabes cómo hacerme sentir como una princesa', time: '19:05' },
        { sender: 'you', message: 'Porque eso es exactamente lo que eres para mí', time: '19:07' },
        { sender: 'them', message: 'Me encanta cómo haces que los momentos ordinarios se sientan extraordinarios', time: '19:10' },
        { sender: 'you', message: 'Esa es la magia de estar con alguien que realmente te importa', time: '19:12' }
      ]
    ];

    // Generate unique conversation based on name hash to ensure consistency
    const nameHash = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const conversationIndex = nameHash % conversationTemplates.length;
    return conversationTemplates[conversationIndex];
  };



  const timeOptions = ["12 h", "13 h", "14 h", "18 h", "1 d", "2 d", "3 d"];

  // Función para generar perfil aleatorio
  const generateRandomProfile = () => {
    const randomNames = [
      "Ana Silva", "Carlos Santos", "María Oliveira", "João Costa", "Fernanda Lima",
      "Pedro Álvez", "Juliana Rocha", "Rafael Méndez", "Camila Ferreira", "Lucas Barbosa",
      "Beatriz Cardoso", "Thiago Nascimento", "Larissa Gómez", "Gabriel Ribeiro", "Natalia Souza"
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

  // Crear conversaciones usando los seguidores de la API o fallback para datos ficticios
  const allConversations = followers.length > 0
    ? followers.slice(0, 9).map((follower, index) => ({
      id: index + 1,
      name: follower.name,
      message: predefinedMessages[index % predefinedMessages.length],
      time: timeOptions[index % timeOptions.length],
      avatar: follower.avatar,
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
        message: "Leandro envió un archivo adjunto",
        time: "14 h",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
        unread: false,
        muted: true
      },
      {
        id: 4,
        name: "Gabriel Santana",
        message: "Tú enviaste un archivo adjunto",
        time: "18 h",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
        unread: false
      },
      {
        id: 5,
        name: "João 🔥",
        message: "Tú: MDs",
        time: "1 d",
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=50&h=50&fit=crop&crop=face",
        unread: false
      },
      {
        id: 6,
        name: "Shau",
        message: "Sí",
        time: "1 d",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop&crop=face",
        unread: false
      },
      {
        id: 7,
        name: "Louise Cachoeira",
        message: "Tú enviaste un archivo adjunto",
        time: "1 d",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
        unread: false
      },
      {
        id: 8,
        name: "biladem 💥💥",
        message: "O no",
        time: "2 d",
        avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=50&h=50&fit=crop&crop=face",
        unread: false
      },
      {
        id: 9,
        name: "Veronica Pereira Ricardo",
        message: "Tú enviaste un archivo adjunto",
        time: "2 d",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face",
        unread: false
      }
    ];

  // Filtrar conversaciones basado en la búsqueda
  const filteredConversations = searchTerm
    ? allConversations.filter(conv =>
      conv.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : allConversations;

  // Si no hay resultados en la búsqueda, mostrar perfil aleatorio
  const conversations = filteredConversations.length === 0 && searchTerm
    ? [{
      id: 999,
      ...generateRandomProfile(),
      unread: false,
      muted: false
    }]
    : filteredConversations;

  // Simulate Instagram message notifications
  useEffect(() => {
    const simulateNotifications = () => {
      const randomConversation = conversations[Math.floor(Math.random() * conversations.length)];
      const messages = [
        "¡Hola! ¿Cómo estás?",
        "¿Viste mi última foto?",
        "¿Qué tal si salimos hoy?",
        "¡Gracias por el like! ❤️",
        "¿Estás en línea?",
        "¡Buenas noches! 🌙",
        "¡Qué día increíble!",
        "Te extraño"
      ];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];

      // Play notification sound
      playNotificationSound();

      // Show notification indicator
      setHasNewNotification(true);

      // Show conversation notification if in conversation view
      if (selectedConversation) {
        setConversationNotification(true);
        setTimeout(() => setConversationNotification(false), 3000);
      }

      showToast(randomConversation.avatar, randomConversation.name, randomMessage);

      // Hide notification indicator after 3 seconds
      setTimeout(() => setHasNewNotification(false), 3000);
    };

    // Show first notification after 3 seconds
    const firstTimeout = setTimeout(simulateNotifications, 6000);

    // Then show notifications every 8-15 seconds
    const interval = setInterval(() => {
      simulateNotifications();
    }, 15000); // Random between 8-15 seconds

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, [showToast, conversations, selectedConversation]);



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black text-white border-gray-800 max-w-md w-full h-[100vh] max-h-[100vh] overflow-hidden flex flex-col p-0 sm:max-h-[80vh] sm:rounded-lg sm:h-auto">
        <DialogHeader className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <DialogTitle className="text-lg font-semibold text-white">{username}</DialogTitle>

              </div>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Edit className="w-6 h-6" />

              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="p-1 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pb-[88px]">

          {/* Tabs */}
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setActiveTab("primary")}
              className={`flex-1 text-center py-3 ${activeTab === "primary" ? "border-b-2 border-white font-semibold text-white" : "text-gray-400"}`}
            >
              Principal
            </button>
            <button
              className="flex-1 text-center py-3 opacity-30 cursor-not-allowed text-gray-500"
              disabled
            >
              General
            </button>
            <button
              className="flex-1 text-center py-3 relative opacity-30 cursor-not-allowed text-gray-500"
              disabled
            >
              Solicitudes
              <span className="absolute -top-1 -right-1 bg-gray-600 text-gray-400 text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-50">
                2
              </span>
            </button>
          </div>

          {/* Notes Profile Slider */}
          <div className="p-4 border-b border-gray-800">

            <div className="flex space-x-4 pb-2 overflow-x-hidden">
              {/* User's profile - first photo */}
              <div className="flex-shrink-0 text-center">
                <div className="relative mb-2">
                  <img
                    src={avatar || avatarImages[0].src}
                    alt="Tu perfil"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                </div>
                <p className="text-white text-xs font-medium truncate w-16">
                  Tu nota
                </p>
              </div>

              {/* Followers profiles with blur */}
              {followers.slice(0, 7).map((follower, index) => (
                <div key={index} className="flex-shrink-0 text-center">
                  <div className="relative mb-2">
                    <img
                      src={follower.avatar}
                      alt={follower.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-600 blur-sm"
                    />
                  </div>
                  <p className="text-white text-xs font-medium truncate w-16 blur-sm">
                    {follower.name.split(' ')[0]}
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
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent flex-1 text-white placeholder-gray-400 outline-none"
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
          <div className="flex-1 overflow-y-auto relative">
            <div className="pb-24">
              {activeTab === "primary" && conversations.map((conv) => (
                <div
                  key={conv.id}
                  className="flex items-center px-4 py-3 hover:bg-gray-900/50 cursor-pointer relative"
                  onClick={() => {
                    setSelectedConversation(conv);
                  }}
                >
                  <div className="relative">
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-12 h-12 rounded-full object-cover blur-sm"
                    />
                    {conv.id === 1 && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black blur-sm"></div>
                    )}
                  </div>
                  <div className="flex-1 ml-3 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white truncate blur-sm">{conv.name}</h3>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <span className="text-gray-400 text-sm blur-sm">{conv.time}</span>
                        {conv.muted && (
                          <div className="w-4 h-4 text-gray-400 blur-sm">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.793a1 1 0 011.617.793zM14.657 5.757a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-2.929 7.071 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.414 0A5.983 5.983 0 0115 12a5.983 5.983 0 01-1.758 4.243 1 1 0 11-1.414-1.414A3.987 3.987 0 0013 12a3.987 3.987 0 00-1.172-2.829 1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                        <div className="w-4 h-4 text-yellow-500">
                          <svg fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 616 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm truncate blur-sm">{conv.message}</p>
                  </div>
                </div>
              ))}

              {activeTab === "general" && messagesUnlocked && (
                <div className="p-4 text-center text-gray-400">
                  <p>Las conversaciones generales aparecerán aquí</p>
                </div>
              )}

              {activeTab === "s" && messagesUnlocked && (
                <div className="p-4 text-center text-gray-400">
                  <p>Las solicitudes de mensaje aparecerán aquí</p>
                </div>
              )}

              {(activeTab === "general" || activeTab === "requests") && !messagesUnlocked && (
                <div className="p-4 text-center text-gray-400 opacity-50">
                  <p>Desbloquea para ver este contenido</p>
                </div>
              )}
            </div>

            {/* Fixed Footer Button */}
            <div className="fixed bottom-10 left-0 right-0 w-full p-4 pb-safe z-[9999]">
              <div className="max-w-sm mx-auto">
                <Button
                  onClick={() => window.open('https://go.perfectpay.com.br/PPU38CPSHJR')}
                  className="w-full h-14 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:opacity-90 transition-opacity text-lg shadow-xl"
                >
                  <Unlock className="w-5 h-5 mr-2" />
                  DESBLOQUEAR MENSAJES
                </Button>
              </div>
            </div>
          </div>
          {/* Conversation View */}
          {selectedConversation && (
            <div className="absolute inset-0 bg-black z-10 flex flex-col">
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setSelectedConversation(null)}
                      className="p-1 hover:bg-gray-800 rounded-full transition-colors"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={selectedConversation.avatar}
                          alt={selectedConversation.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />

                      </div>
                      <div className="relative">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-white blur-sm">
                            {selectedConversation.name}
                          </h3>

                        </div>
                        <p className="text-sm text-gray-400 blur-sm">Activo ahora</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.3 10.5a11.05 11.05 0 005.2 5.2l1.113-3.924a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto relative">
                {/* Toast Container for Conversation View */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
                  <ToastContainer />
                </div>





                <div className="p-4 space-y-4 pb-24">
                  {generateFullConversation(selectedConversation.name, selectedConversation.avatar).map((msg: { sender: string, message: string, time: string, isImage?: boolean }, index) => (
                    <div key={index} className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg blur-sm ${msg.sender === 'you'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-white'
                        }`}>
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))}


                </div>

                {/* Middle Unlock Button - Always centered */}
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="bg-black/80 backdrop-blur-sm rounded-3xl p-6 text-center max-w-sm mx-auto">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Unlock className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2">Contenido Bloqueado</h3>
                      <p className="text-gray-300 text-sm mb-4">Contenido restringido para menores</p>
                    </div>
                    <Button
                      onClick={() => window.open('https://go.perfectpay.com.br/PPU38CPSHJR', '_blank')}
                      className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                    >
                      🔒 PREMIUM REQUERIDO
                    </Button>
                  </div>
                </div>

                {/* Fixed Footer Button */}
                <div className="fixed bottom-10 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/95 to-transparent z-20">
                  <Button
                    onClick={() => window.open('https://go.perfectpay.com.br/PPU38CPSHJR', '_blank')}
                    className="w-full h-14 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:opacity-90 transition-opacity text-lg shadow-xl"
                  >
                    <Unlock className="w-5 h-5 mr-2" />
                    DESBLOQUEAR MENSAJES
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Toast Container for Chat List View */}
          {!selectedConversation && <ToastContainer />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
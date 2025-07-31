"use client"

import Profile1 from '@/assets/profile/01.jpg'
import Profile2 from '@/assets/profile/02.jpg'
import Profile3 from '@/assets/profile/03.jpg'
import Profile4 from '@/assets/profile/04.jpg'
import Profile5 from '@/assets/profile/05.jpg'
import Profile6 from '@/assets/profile/06.jpg'
import Profile7 from '@/assets/profile/07.jpg'
import Profile8 from '@/assets/profile/08.jpg'
import Profile9 from '@/assets/profile/09.jpg'
import Profile10 from '@/assets/profile/10.jpg'

import { useRouter } from "next/navigation"
import { ArrowLeft, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { useIg } from "@/hooks/use-ig"
import { AnalysisCompleted } from "../components/sections/AnalysisCompleted"
import { WeeklyVisits } from "../components/sections/WeeklyVisits"
import { PrintsRecovered } from "../components/sections/PrintsRecovered"
import { MainActivities } from "../components/sections/MainActivities"
import { InteractionsDetected } from "../components/sections/InteractionsDetected"
import { TopObservers } from "../components/sections/TopObservers"
import { CloseFriends } from "../components/sections/CloseFriends"
import { ChatList } from "../components/sections/ChatList"


interface DetailedReportProps {
  username: string
}

interface StoredProfile {
  id: string;
  name: string;
  fullName: string;
  avatar: string;
}

export function DetailedReport({ username }: DetailedReportProps) {
  const router = useRouter()
  const [profileData, setProfileData] = useState<StoredProfile | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isPrivateProfile, setIsPrivateProfile] = useState(false);
  const [showUrgentButton, setShowUrgentButton] = useState(false);
  const [showChatList, setShowChatList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { followers, getFollowers, followersLoading, setFollowersFromStorage } = useIg();

  // Array of local images for private profiles
  const localProfileImages = [
    Profile1, Profile2, Profile3, Profile4, Profile5,
    Profile6, Profile7, Profile8, Profile9, Profile10
  ];

  // Function to generate mock followers for private profiles
  const generateMockFollowers = () => {
    const mockNames = [
      'ana_silva', 'carlos_santos', 'maria_oliveira', 'joao_costa', 'lucia_ferreira',
      'pedro_almeida', 'julia_rodrigues', 'rafael_lima', 'camila_souza', 'bruno_martins',
      'fernanda_pereira', 'diego_barbosa', 'amanda_ribeiro', 'gustavo_carvalho', 'patricia_gomes'
    ];

    return mockNames.slice(0, 10).map((name, index) => {
      const image = localProfileImages[index % localProfileImages.length];
      return {
        name: name,
        avatar: typeof image === 'string' ? image : image.src
      };
    });
  };

  useEffect(() => {
    setIsClient(true);

    // Show urgent button after 2.5 seconds
    const urgentTimer = setTimeout(() => {
      setShowUrgentButton(true);
    }, 2500);

    // Get data from localStorage
    const getProfileFromStorage = async () => {
      try {
        const stored = localStorage.getItem('instagram_analysis');
        if (stored) {
          const data = JSON.parse(stored);
          if (data.profile) {
            // Check if profile is private
            const isPrivate = data.profile.isPrivate || false;
            setIsPrivateProfile(isPrivate);

            setProfileData({
              id: data.profile.id,
              name: data.profile.name,
              fullName: data.profile.fullName,
              avatar: data.profile.avatar
            });

            if (isPrivate) {
              // For private profiles, use local mock data (without saving to localStorage)
              console.log('Private profile detected - using mock data');
              const mockFollowers = generateMockFollowers();
              setFollowersFromStorage(mockFollowers);
              // Simulate loading time for private profiles
              setTimeout(() => {
                setIsLoading(false);
              }, 1500);
            } else {
              // For public profiles, use original logic
              if (data.followers && data.followers.length > 0) {
                console.log('Using followers from localStorage');
                setFollowersFromStorage(data.followers);
                setIsLoading(false);
              } else {
                const fetchedFollowers = await getFollowers(data.profile.id);
                if (fetchedFollowers && fetchedFollowers.length > 0) {
                  const updatedData = {
                    ...data,
                    followers: fetchedFollowers
                  };
                  localStorage.setItem('instagram_analysis', JSON.stringify(updatedData));
                }
                setIsLoading(false);
              }
            }
          } else {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
        setIsLoading(false);
      }
    };

    getProfileFromStorage();

    return () => {
      clearTimeout(urgentTimer);
    };
  }, []);

  const handleBack = () => {
    router.back()
  }

  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        {/* Background light points */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-16 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-pink-400/15 rounded-full blur-xl animate-pulse delay-1500"></div>
        </div>

        <div className="relative z-10 text-center space-y-6">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="space-y-2">
            <div className="text-white text-xl font-semibold">Raccolta informazioni...</div>
            <div className="text-gray-400 text-sm max-w-xs mx-auto">Attendi mentre analizziamo il profilo e raccogliamo tutti i dati necessari</div>
          </div>

          {/* Progress indicators */}
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300 text-sm">Verifica del profilo</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-300"></div>
              <span className="text-gray-300 text-sm">Caricamento follower</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-600"></div>
              <span className="text-gray-300 text-sm">Preparazione del rapporto</span>
            </div>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background light points */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-pink-400/15 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 pt-8 space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full  flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-white">Instagram in tempo reale</h1>
          <div className="w-10 h-10"></div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300" style={{ width: '100%' }}></div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 px-4 pb-8 space-y-8">
        <div className="max-w-md mx-auto space-y-8">
          {/* 1. Analysis Completed Section */}
          <AnalysisCompleted
            username={username}
            profileData={profileData}
            followers={followers}
            followersLoading={followersLoading}
          />

          {/* 2. Weekly Visits Section */}
          <WeeklyVisits
            username={username}
            profileData={profileData}
            followers={followers}
            followersLoading={followersLoading}
          />

          {/* 3. Prints Recovered Section */}
          <PrintsRecovered
            username={username}
            profileData={profileData}
            followers={followers}
            followersLoading={followersLoading}
          />

          {/* 4. Main Activities Section */}
          <MainActivities
            username={username}
            profileData={profileData}
            followers={followers}
            followersLoading={followersLoading}
          />

          {/* 5. Interactions Detected Section */}
          <InteractionsDetected
            username={username}
            profileData={profileData}
            followers={followers}
            followersLoading={followersLoading}
          />

          {/* 6. Your Top Observers Section */}
          <TopObservers
            username={username}
            profileData={profileData}
            followers={followers}
            followersLoading={followersLoading}
          />

          {/* 7. Peak Activity Times Section */}
          {/* <PeakActivityTimes username={username} /> */}

          {/* 8. Close Friends Section */}
          <CloseFriends
            username={username}
            profileData={profileData}
            followers={followers}
            followersLoading={followersLoading}
          />

          {/* Security Analysis Section */}
          {/* <SecurityAnalysis username={username} /> */}

          {/* Profile Stalkers Section */}
          {/* <ProfileStalkers username={username} /> */}

          {/* Ghost Mode Visits Section */}
          {/* <GhostModeVisits username={username} /> */}

        </div>
      </div>

      {/* Urgent Access Button - Fixed Position */}
      {showUrgentButton && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 w-full">
          <div className="w-full bg-white10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center space-x-3 mb-3">
              <p className="text-white text-sm font-medium text-center">
                Per motivi di riservatezza, possiamo mantenere il tuo rapporto disponibile per l'acquisto solo per 10 minuti
              </p>
            </div>
            <button
              onClick={() => setShowChatList(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Accesso a Instagram in tempo reale
            </button>
          </div>
        </div>
      )}

      {/* Chat List Modal */}
      <ChatList
        open={showChatList}
        onOpenChange={setShowChatList}
        username={username}
        avatar={profileData?.avatar}
        followers={followers}
      />
    </div>
  );
}

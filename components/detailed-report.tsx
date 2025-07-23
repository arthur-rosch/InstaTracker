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
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { useIg } from "@/hooks/use-ig"
import { AnalysisCompleted } from "@/components/sections/AnalysisCompleted"
import { WeeklyVisits } from "@/components/sections/WeeklyVisits"
import { PrintsRecovered } from "@/components/sections/PrintsRecovered"
import { MainActivities } from "@/components/sections/MainActivities"
import { InteractionsDetected } from "@/components/sections/InteractionsDetected"
import { TopObservers } from "@/components/sections/TopObservers"
import { CloseFriends } from "@/components/sections/CloseFriends"


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

    // Get data from localStorage
    const getProfileFromStorage = () => {
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
            } else {
              // For public profiles, use original logic
              if (data.followers && data.followers.length > 0) {
                console.log('Using followers from localStorage');
                setFollowersFromStorage(data.followers);
              } else {
                getFollowers(data.profile.id).then((fetchedFollowers) => {
                  if (fetchedFollowers && fetchedFollowers.length > 0) {
                    const updatedData = {
                      ...data,
                      followers: fetchedFollowers
                    };
                    localStorage.setItem('instagram_analysis', JSON.stringify(updatedData));
                  }
                });
              }
            }
          }
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    };

    getProfileFromStorage();
  }, []);

  const handleBack = () => {
    router.back()
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
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
      <div className="relative z-10 p-4 pt-8 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-white">Full Report</h1>
        <div className="w-10 h-10"></div>
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
    </div>
  );
}

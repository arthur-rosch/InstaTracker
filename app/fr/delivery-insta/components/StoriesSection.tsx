"use client"

import React from 'react'
import { Eye } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Highlight } from '@/hooks/use-ig'

interface Follower {
  name: string;
  avatar: string;
}

interface Story {
  id: string;
  createdAt: string;
  video?: {
    url: string;
    width: number;
    height: number;
  };
  image?: {
    url: string;
    width: number;
    height: number;
  };
}

interface StoriesSectionProps {
  isActive: boolean;
  followers: Follower[];
  stories?: Story[];
  highlights?: Highlight[];
}

const storiesData = [
  {
    id: 1,
    image: "/assets/storys/imgi_17_story-01.jpeg",
    pausedProfiles: 9,
    viewers: [
      { id: 1, avatar: "/assets/profile/01.jpg" },
      { id: 2, avatar: "/assets/profile/02.jpg" },
      { id: 3, avatar: "/assets/profile/03.jpg" },
      { id: 4, avatar: "/assets/profile/04.jpg" }
    ]
  },
  {
    id: 2,
    image: "/assets/storys/imgi_18_story-02.jpg",
    pausedProfiles: 7,
    viewers: [
      { id: 5, avatar: "/assets/profile/05.jpg" },
      { id: 6, avatar: "/assets/profile/06.jpg" },
      { id: 7, avatar: "/assets/profile/07.jpg" }
    ]
  },
  {
    id: 3,
    image: "/assets/storys/imgi_19_story-03.jpg",
    pausedProfiles: 12,
    viewers: [
      { id: 8, avatar: "/assets/profile/08.jpg" },
      { id: 9, avatar: "/assets/profile/09.jpg" },
      { id: 10, avatar: "/assets/profile/10.jpg" },
      { id: 11, avatar: "/assets/profile/11.jpg" },
      { id: 12, avatar: "/assets/profile/12.jpg" }
    ]
  },
  {
    id: 4,
    image: "/assets/storys/imgi_20_story-04.jpg",
    pausedProfiles: 5,
    viewers: [
      { id: 13, avatar: "/assets/profile/13.jpg" },
      { id: 14, avatar: "/assets/profile/14.jpg" }
    ]
  },
  {
    id: 5,
    image: "/assets/storys/imgi_21_story-05.jpg",
    pausedProfiles: 15,
    viewers: [
      { id: 15, avatar: "/assets/profile/15.jpg" },
      { id: 16, avatar: "/assets/profile/16.jpg" },
      { id: 17, avatar: "/assets/profile/17.jpg" },
      { id: 18, avatar: "/assets/profile/18.jpg" }
    ]
  },
  {
    id: 6,
    image: "/assets/storys/imgi_22_story-06.gif",
    pausedProfiles: 8,
    viewers: [
      { id: 20, avatar: "/assets/profile/20.jpg" },
      { id: 21, avatar: "/assets/profile/21.jpg" },
      { id: 22, avatar: "/assets/profile/22.jpg" }
    ]
  }
]

// Fonction pour normaliser les Stories
function mapStories(stories: Story[], followers: Follower[]) {
  return stories
    .filter(story => story.image)
    .map((story, index) => {
      // Utilise l'API proxy pour les images de Story
      const proxyImageUrl = story.image!.url;

      return {
        id: story.id,
        image: proxyImageUrl,
        pausedProfiles: Math.floor(Math.random() * 15) + 5,
        viewers: followers.slice(0, Math.min(followers.length, 4)).map((follower, i) => ({
          id: i + 1,
          avatar: follower.avatar
        }))
      };
    });
}

// Fonction pour normaliser les Highlights
function mapHighlights(highlights: Highlight[], followers: Follower[]) {
  const highlightItems: {
    id: string;
    image: string;
    pausedProfiles: number;
    viewers: { id: number; avatar: string }[];
  }[] = [];

  highlights.forEach((highlight) => {
    highlight.items.forEach((item, itemIndex) => {
      if (item.image?.url) {
        // Utilise l'API proxy pour les images de Highlight
        const proxyImageUrl = item.image.url;

        highlightItems.push({
          id: `${highlight.id}-${item.id}`,
          image: proxyImageUrl,
          pausedProfiles: Math.floor(Math.random() * 15) + 5,
          viewers: followers.slice(0, Math.min(followers.length, 4)).map((follower, i) => ({
            id: i + 1,
            avatar: follower.avatar
          }))
        });
      }
    });
  });

  return highlightItems;
}

export default function StoriesSection({
  isActive,
  followers,
  stories,
  highlights = []
}: StoriesSectionProps) {
  let displayStories: {
    id: string | number;
    image: string;
    pausedProfiles: number;
    viewers: { id: number; avatar: string }[];
  }[] = [];

  // Priorise les Stories, puis les Highlights, puis les données fictives
  if (stories && stories.length > 0) {
    displayStories = mapStories(stories, followers);
  } else if (highlights && highlights.length > 0) {
    displayStories = mapHighlights(highlights, followers);
  } else {
    displayStories = storiesData;
  }

  return (
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl"></div>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Eye className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg md:text-xl">Stories</h3>
              <p className="text-gray-300 text-sm">Stories qui ont été mises en pause</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${isActive
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
            {isActive ? 'Actif' : 'Inactif'}
          </div>
        </div>
        {/* Stories Carousel */}
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {displayStories.map((story) => (
                <CarouselItem key={story.id} className="pl-2 md:pl-4 basis-3/4 md:basis-1/2 lg:basis-1/3">
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                    {/* Story Image */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden">
                      <img
                        src={story.image}
                        alt={`Story ${story.id}`}
                        className="w-full h-full object-cover"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                      {/* Story Info - Bottom Left */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="space-y-2">
                          {/* Paused Profiles Text */}
                          <div className="text-white font-semibold text-sm">
                            {story.pausedProfiles} Profils mis en pause pendant +13s
                          </div>
                          {/* Avatars */}
                          <div className="flex -space-x-2">
                            {story.viewers.slice(0, 4).map((viewer) => (
                              <Avatar key={viewer.id} className="w-8 h-8 border-2 border-white">
                                <AvatarImage src={viewer.avatar} alt={`Viewer ${viewer.id}`} />
                                <AvatarFallback className="bg-gray-600 text-white text-xs">
                                  {viewer.id}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {story.viewers.length > 4 && (
                              <div className="w-8 h-8 rounded-full bg-black/70 border-2 border-white flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  +{story.viewers.length - 4}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2 md:-left-4 bg-white/10 border-white/20 text-white hover:bg-white/20 w-8 h-8 md:w-10 md:h-10" />
            <CarouselNext className="-right-2 md:-right-4 bg-white/10 border-white/20 text-white hover:bg-white/20 w-8 h-8 md:w-10 md:h-10" />
          </Carousel>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react';

export interface InstagramProfile {
  id: string;
  name: string;
  fullName: string;
  biography: string;
  avatar: string;
  isBusiness: boolean;
  isPrivate: boolean;
  totalFollower: number;
  totalFollowing: number;
  totalPosts: number;
}

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

interface HighlightItem {
  id: string;
  createdAt: string;
  video?: {
    url: string;
  };
  image?: {
    url: string;
  };
}

export interface Highlight {
  id: string;
  title: string;
  url: string;
  items: HighlightItem[];
}

interface ApiError {
  error: string;
}

type ProfileResponse = InstagramProfile | ApiError;
type FollowersResponse = Follower[] | ApiError;
type StoriesResponse = Story[] | ApiError;
type HighlightsResponse = Highlight[] | ApiError;

export const useIg = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [followersLoading, setFollowersLoading] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);
  const [storiesLoading, setStoriesLoading] = useState(false);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [highlightsLoading, setHighlightsLoading] = useState(false);

  const getProfile = async (username: string): Promise<InstagramProfile | null> => {
    setLoading(true);
    setError(null);
    setProfile(null);

    try {
      const response = await fetch(`https://instagram-scrapper-develop.up.railway.app/instagram/${username}`, {
        headers: {
          'Authorization': 'Bearer a9Xf2Bq7LmCzT4vNwK8r'
        }
      });
      const data: ProfileResponse = await response.json();

      if ('error' in data) {
        setError(data.error);
        return null;
      }

      setProfile(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar perfil';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getFollowers = async (userId: string): Promise<Follower[]> => {
    setFollowersLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://instagram-scrapper-develop.up.railway.app/instagram/followers/${userId}`, {
        headers: {
          'Authorization': 'Bearer a9Xf2Bq7LmCzT4vNwK8r'
        }
      });
      const data: FollowersResponse = await response.json();

      if ('error' in data) {
        setError(data.error);
        return [];
      }

      // Pega apenas os primeiros 10 seguidores
      const first10Followers = data.slice(0, 10);
      setFollowers(first10Followers);
      return first10Followers;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar seguidores';
      setError(errorMessage);
      return [];
    } finally {
      setFollowersLoading(false);
    }
  };

  const getStories = async (username: string): Promise<Story[]> => {
    setStoriesLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://instagram-scrapper-develop.up.railway.app/instagram/stories/${username}`, {
        headers: {
          'Authorization': 'Bearer a9Xf2Bq7LmCzT4vNwK8r'
        }
      });
      const data: StoriesResponse = await response.json();

      if ('error' in data) {
        setError(data.error);
        return [];
      }

      setStories(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching stories';
      setError(errorMessage);
      return [];
    } finally {
      setStoriesLoading(false);
    }
  };

  const getHighlights = async (username: string): Promise<Highlight[]> => {
    setHighlightsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://instagram-scrapper-develop.up.railway.app/instagram/highlights/${username}`, {
        headers: {
          'Authorization': 'Bearer a9Xf2Bq7LmCzT4vNwK8r'
        }
      });
      const data: HighlightsResponse = await response.json();

      if ('error' in data) {
        setError(data.error);
        return [];
      }

      setHighlights(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching highlights';
      setError(errorMessage);
      return [];
    } finally {
      setHighlightsLoading(false);
    }
  };

  const setFollowersFromStorage = (followersData: Follower[]) => {
    setFollowers(followersData);
  };

  return {
    loading,
    error,
    profile,
    followers,
    followersLoading,
    stories,
    storiesLoading,
    highlights,
    highlightsLoading,
    getProfile,
    getFollowers,
    getStories,
    getHighlights,
    setFollowersFromStorage
  };
};
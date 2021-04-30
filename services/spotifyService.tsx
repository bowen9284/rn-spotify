import React, { createContext, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import * as SecureStore from 'expo-secure-store';

// Types
type SpotifyContextType = {
  fetchUserProfile: () => Promise<PrivateUser | undefined>;
  fetchRecentlyPlayed: () => Promise<RecentlyPlayedResponse | undefined>;
  fetchPlaylist: (playlistId: string) => Promise<PlaylistResponse | undefined>;
  fetchIsFollowing: (playlistId: string) => Promise<boolean | undefined>;
  followPlaylist: (isFollowing: boolean, playlistId: string) => void;
};

type Props = {
  children: React.ReactNode;
};

// Exports
export const SpotifyContext = createContext<SpotifyContextType | undefined>(
  undefined
);

export const useSpotifyApi = () => {
  return useContext(SpotifyContext);
};

export const SpotifyProvider: React.FC<Props> = ({ children }) => {
  return (
    <SpotifyContext.Provider
      value={{
        fetchUserProfile,
        fetchRecentlyPlayed,
        fetchPlaylist,
        fetchIsFollowing,
        followPlaylist,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

// Endpoints
const SPOTIFY_BASE_URI = 'https://api.spotify.com/v1';

const fetchUserProfile = async () => {
  let user: PrivateUser = await spotifyFetch('/me');
  try {
    await SecureStore.setItemAsync('userId', user.id);
  } catch (e) {
    console.log('error storing userId', e);
  }

  return user;
};

const fetchRecentlyPlayed = async () => {
  let response = await spotifyFetch('/me/player/recently-played?limit=6');
  return response as RecentlyPlayedResponse;
};

const fetchPlaylist = async (playlistId: string) => {
  let response = await spotifyFetch(`/playlists/${playlistId}`);
  return response as PlaylistResponse;
};

const fetchIsFollowing = async (playlistId: string) => {
  const userId = await SecureStore.getItemAsync('userId');

  let response = await spotifyFetch(
    `/playlists/${playlistId}/followers/contains?ids=${userId}`
  );

  return response[0];
};

const followPlaylist = async (isFollowing: boolean, playlistId: string) => {
  const authContext = useContext(AuthContext);

  let httpMethod = isFollowing ? 'DELETE' : 'PUT';

  try {
    let response = await fetch(
      `${SPOTIFY_BASE_URI}/playlists/${playlistId}/followers`,
      {
        method: httpMethod,
        headers: {
          Authorization: `Bearer ${authContext?.token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.ok);
  } catch (error) {
    console.error(error);
  }
};

const spotifyFetch = async (uri?: string): Promise<any> => {
  let authToken = await SecureStore.getItemAsync('authToken');

  try {
    let response = await fetch(`${SPOTIFY_BASE_URI}${uri}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
import React, { createContext, useContext } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as storageService from './secureStorageService';

// Types
type SpotifyContextProps = {
  fetchUserProfile: () => Promise<PrivateUser | undefined>;
  fetchRecentPlaylists: () => Promise<PlaylistsResponse | undefined>;
  fetchFeaturedPlaylists: () => Promise<FeaturedPlaylistsResponse | undefined>;
  fetchRecentlyPlayed: () => Promise<RecentlyPlayedResponse | undefined>;
  fetchPlaylist: (playlistId: string) => Promise<PlaylistObject | undefined>;
  fetchPlaylistTracks: (
    playlistId: string
  ) => Promise<PlaylistTracksRefObject | undefined>;
  fetchRelatedArtists: (
    artistId: string
  ) => Promise<RelatedArtistsResponse | undefined>;
  fetchIsFollowing: (playlistId: string) => Promise<[boolean] | undefined>;
  followPlaylist: (isFollowing: boolean, playlistId: string) => void;
};

type Props = {
  children: React.ReactNode;
};

// Exports
export const SpotifyContext = createContext<SpotifyContextProps | undefined>(
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
        fetchRecentPlaylists,
        fetchFeaturedPlaylists,
        fetchRecentlyPlayed,
        fetchPlaylist,
        fetchPlaylistTracks,
        fetchRelatedArtists,
        fetchIsFollowing,
        followPlaylist,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

const SPOTIFY_BASE_URI = 'https://api.spotify.com/v1';

const fetchUserProfile = async () => {
  let user: PrivateUser;
  try {
    user = await spotifyFetch('/me');
    let success = await storageService.saveUserID(user.id);
    if (success) {
      return user;
    }
  } catch (error) {
    console.log('There was an error fetching the user profile', error);
  }
};

const fetchRecentPlaylists = async () => {
  const userId = await storageService.getUserID();
  let response = await spotifyFetch(`/users/${userId}/playlists?limit=6`);
  return response as PlaylistsResponse;
};

const fetchFeaturedPlaylists = async () => {
  let response = await spotifyFetch(`/browse/featured-playlists`);
  return response as FeaturedPlaylistsResponse;
};

const fetchRecentlyPlayed = async () => {
  let response = await spotifyFetch('/me/player/recently-played?limit=6');
  return response as RecentlyPlayedResponse;
};

const fetchPlaylist = async (playlistId: string) => {
  let response = await spotifyFetch(`/playlists/${playlistId}`);
  return response as PlaylistObject;
};

const fetchPlaylistTracks = async (playlistId: string) => {
  let response = await spotifyFetch(`/playlists/${playlistId}/tracks`);
  console.log('tracks', response);
  return response as PlaylistTracksRefObject;
};

const fetchRelatedArtists = async (artistId: string) => {
  let response = await spotifyFetch(`/artists/${artistId}/related-artists`);
  return response as RelatedArtistsResponse;
};

const fetchIsFollowing = async (playlistId: string) => {
  const userId: string = await storageService.getUserID();

  let response = await spotifyFetch(
    `/playlists/${playlistId}/followers/contains?ids=${userId}`
  );

  return response as [boolean];
};

const followPlaylist = async (isFollowing: boolean, playlistId: string) => {
  let tokenResponse: AuthSession.TokenResponse = await storageService.getToken();
  if (!tokenResponse) return;

  let httpMethod = isFollowing ? 'DELETE' : 'PUT';

  try {
    await fetch(`${SPOTIFY_BASE_URI}/playlists/${playlistId}/followers`, {
      method: httpMethod,
      headers: {
        Authorization: `Bearer ${tokenResponse.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
};

// @todo add error handling for spotify error object
const spotifyFetch = async (uri?: string): Promise<any> => {
  let tokenResponse = await storageService.getToken();
  if (!tokenResponse) return;

  try {
    let response = await fetch(`${SPOTIFY_BASE_URI}${uri}`, {
      headers: {
        Authorization: `Bearer ${tokenResponse.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

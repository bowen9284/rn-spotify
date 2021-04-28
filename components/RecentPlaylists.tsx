import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/authContext';
import PlaylistScroller from './PlaylistsScroller';

const RecentPlaylists: React.FC = () => {
  const context = useContext(AuthContext);

  const [recentPlaylists, setRecentPlaylists] = useState<
    PlaylistsResponse | undefined
  >(undefined);

  // homescreen will get recently played. Based off of that response,
  // I can grab genres and artists for other areas of the app
  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      try {
        let response = await fetch(
          'https://api.spotify.com/v1/me/playlists?limit=6',
          {
            headers: {
              Authorization: `Bearer ${context?.token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        let json = await response.json();
        setRecentPlaylists(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecentlyPlayed();
  }, []);

  if (!recentPlaylists) {
    return <Text style={{ color: 'white' }}>Loading...</Text>;
  }

  return (
    <PlaylistScroller title="Recent playlists" items={recentPlaylists.items} />
  );
};

export default RecentPlaylists;

const styles = StyleSheet.create({});

import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/authContext';
import { useSpotifyApi } from '../services/spotifyService';
import PlaylistScroller from './PlaylistsScroller';

const RecentPlaylists: React.FC = () => {
  const spotifyService = useSpotifyApi();


  const [recentPlaylists, setRecentPlaylists] = useState<
    PlaylistsResponse | undefined
  >(undefined);

  useEffect(() => {
    const getRecentPlaylists = async () => {
      let response = await spotifyService?.fetchRecentPlaylists();
      console.log('resp', response);
      setRecentPlaylists(response);
    };
    getRecentPlaylists();
  }, []);

  if (!recentPlaylists) {
    return <ActivityIndicator />;
  }

  return (
    <PlaylistScroller title="Recent playlists" items={recentPlaylists.items} />
  );
};

export default RecentPlaylists;

const styles = StyleSheet.create({});

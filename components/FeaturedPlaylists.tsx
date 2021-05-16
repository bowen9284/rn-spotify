import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSpotifyApi } from '../services/spotifyService';
import PlaylistScroller from './PlaylistsScroller';

const FeaturedPlaylists: React.FC = () => {
  const spotifyService = useSpotifyApi();

  const [featuredPlaylists, setFeaturedPlaylists] = useState<
    FeaturedPlaylistsResponse | undefined
  >(undefined);

  useEffect(() => {
    const getFeaturedPlaylists = async () => {
      let response = await spotifyService?.fetchFeaturedPlaylists();
      setFeaturedPlaylists(response);
    };
    getFeaturedPlaylists();
  }, []);

  if (!featuredPlaylists) {
    return <ActivityIndicator />;
  }

  return (
    <PlaylistScroller
      title="Featured playlists"
      items={featuredPlaylists.playlists.items}
    />
  );
};

export default FeaturedPlaylists;

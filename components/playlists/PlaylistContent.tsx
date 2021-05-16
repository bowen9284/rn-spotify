import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import PlaylistRow from './PlaylistRow';
import Animated from 'react-native-reanimated';
import { useSpotifyApi } from '../../services/spotifyService';

type Props = {
  y: Animated.Value<number>;
  playlist: PlaylistObject;
};

const PlaylistContent: React.FC<Props> = ({ y, playlist }) => {
  const spotifyApi = useSpotifyApi();
  const [tracks, setTracks] = useState<PlaylistTracksRefObject | undefined>(
    undefined
  );
  // check if the playist has an array of tracks
  // if it doesn't fetch the contentent from tracks.href url
  useEffect(() => {
    if (!playlist.tracks) {
      return;
    }
    
    const getPlaylistTracks = async () => {
      let fetchedPlaylist = await spotifyApi?.fetchPlaylist(playlist.id);
        setTracks(fetchedPlaylist?.tracks);
    };
    getPlaylistTracks();
  }, []);

  if (!tracks) {
    return <ActivityIndicator />;
  }

  let trackTiles = tracks.items?.map((playlistTrack, index) => {
    return <PlaylistRow key={index} track={playlistTrack.track} />;
  });

  return (
    <Animated.ScrollView>
      <View>{trackTiles}</View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({});

export default PlaylistContent;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import PlaylistRow from './PlaylistRow';
import Animated from 'react-native-reanimated';

type Props = {
  y: Animated.Value<number>;
  playlist: PlaylistResponse;
};

const PlaylistContent: React.FC<Props> = ({ y, playlist }) => {
  let tracks: PlaylistItem[] =
    playlist?.tracks.items || new Array<PlaylistItem>();

  let trackTiles = tracks.map((playlistTrack, index) => {
    // @todo fix duration. Incorrect amount
    return <PlaylistRow key={index} playlistTrack={playlistTrack} />;
  });

  return (
    <Animated.ScrollView>
      <View>{trackTiles}</View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({});

export default PlaylistContent;

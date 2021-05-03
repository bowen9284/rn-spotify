import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

type Props = {
  imageUrl: string;
};

const PlaylistCover: React.FC<Props> = ({ imageUrl }) => {
  return (
    <View style={styles.playlistHeaderContainer}>
      <Image style={styles.mainCoverImage} source={{ uri: imageUrl }} />
    </View>
  );
};

const styles = StyleSheet.create({
  playlistHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainCoverImage: {
    width: 200,
    height: 200,
  },
});

export default PlaylistCover;

import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SecondaryText } from '../inputs/SecondaryText';

type Props = {
  playlistTrack: PlaylistItem;
};

const PlaylistRow: React.FC<Props> = ({ playlistTrack }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.trackRow}>
      <Image
        style={styles.albumImage}
        source={{ uri: playlistTrack.track.album.images[0]?.url }}
      />
      <View style={styles.trackInfo}>
        <Text style={{ color: colors.text, fontWeight: '600' }}>
          {playlistTrack.track.name}
        </Text>
        <SecondaryText>{playlistTrack.track.artists[0].name}</SecondaryText>
      </View>
      <View style={styles.trackElipsis}>
        <Text style={{ color: colors.text }}>...</Text>
      </View>
    </View>
  );
};

export default PlaylistRow;

const styles = StyleSheet.create({
  albumImage: {
    width: 60,
    height: 60,
  },
  trackRow: {
    height: 60,
    flexDirection: 'row',
    marginVertical: 10,
  },
  trackInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  trackElipsis: {
    alignSelf: 'center',
  },
});

import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { SecondaryText } from '../inputs/SecondaryText';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  track: TrackObject;
};

const PlaylistRow: React.FC<Props> = ({ track }) => {
  const { colors } = useTheme();

  if (!track) {
    return <ActivityIndicator/>
  }
  
  return (
    <View style={styles.trackRow}>
      <Image
        style={styles.albumImage}
        source={{ uri: track.album.images[0]?.url }}
      />
      <View style={styles.trackInfo}>
        <Text style={{ color: colors.text, fontWeight: '600' }}>
          {track.name}
        </Text>
        <SecondaryText>{track.artists[0].name}</SecondaryText>
      </View>
      <View style={styles.trackElipsis}>
        <Ionicons name="ellipsis-horizontal" size={24} color="gray" />
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

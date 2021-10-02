import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PlaylistDetailScreenNavigationProp } from '../screens/PlaylistDetailScreen';

type Props = {
  id: string;
  images: SpotifyImage[];
  name: string;
}

const RecentListenSquareTile = ({ id, images, name }: Props) => {
  const { colors } = useTheme();
  const navigation = useNavigation<PlaylistDetailScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.recentSquareContainer}
      onPress={() =>
        navigation.navigate('PlaylistDetailScreen', {
          playlistId: id,
        })
      }
    >
      <View>
        <Image style={styles.albumImage} source={{ uri: images[0].url }} />
        <Text style={[styles.text, { color: colors.text }]}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recentSquareContainer: {
    width: 125,
    height: 125,
    backgroundColor: 'gray',
    marginVertical: 5,
    marginRight: 20,
  },
  albumImage: {
    width: 125,
    height: 125,
  },
  text: {
    alignSelf: 'flex-start',
    flexWrap: 'nowrap',
  },
});

export default RecentListenSquareTile;

import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

type Props = {
  id: string;
  images: SpotifyImage[];
  name: string;
};

const RecentListenSquareTile: React.FC<Props> = ({ id, images, name }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  // create page fpr artist
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

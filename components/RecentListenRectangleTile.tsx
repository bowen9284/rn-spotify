import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

type Props = {
  albumImages: SpotifyImage[];
  name: string;
};

const RecentListenRectangleTile: React.FC<Props> = ({ albumImages, name }) => {
  const { colors } = useTheme();

  const handlePress = () => {};
  return (
    <TouchableOpacity
      style={styles.recentRectangleContainer}
      onPress={() => {
        handlePress();
      }}
    >
      <View style={{ backgroundColor: colors.card }}>
        <Image style={styles.albumImage} source={{ uri: albumImages[0].url }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: colors.text }]}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recentRectangleContainer: {
    flexDirection: 'row',
    width: '48%',
    height: 60,
    backgroundColor: 'gray',
    borderRadius: 5,
    marginVertical: 5,
  },
  albumImage: {
    width: 60,
    height: 60,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  textContainer: {
    alignSelf: 'center',
    flexShrink: 1,
    padding: 3,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default RecentListenRectangleTile;

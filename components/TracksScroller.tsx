import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RecentListenSquareTile from './RecentListenSquareTile';

type Props = {
  title: string;
  items: [TrackItem];
};

const TracksScroller: React.FC<Props> = ({ title, items }) => {
  const { colors } = useTheme();

  let tiles = items?.map((item, index) => {
    return (
      <RecentListenSquareTile
        key={index}
        images={item.track.album.images}
        name={item.track.album.name}
      />
    );
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color: colors.text }]}>{title}</Text>
      <View></View>
      <ScrollView horizontal={true}>{tiles}</ScrollView>
    </View>
  );
};

export default TracksScroller;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 225,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingVertical: 15,
  },
});

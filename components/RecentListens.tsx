import React from 'react';
import { View, StyleSheet } from 'react-native';
import RecentListenRectangleTile from './RecentListenRectangleTile';

type Props = {
  items: [TrackItem];
};

const RecentListens: React.FC<Props> = ({ items }) => {
  let tiles = items?.slice(0, 6).map((item, index) => {
    return (
      <RecentListenRectangleTile
        key={index}
        albumImages={item.track.album.images}
        name={item.track.name}
      />
    );
  });

  return <View style={styles.container}>{tiles}</View>;
};

const styles = StyleSheet.create({
  container: {
    height: 225,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default RecentListens;

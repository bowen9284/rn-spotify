import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { color } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { PlayerState } from '../../redux/features/player/playerSlice';
import IsFollowedHeart from '../inputs/IsFollowedHeart';
import { PrimaryText } from '../inputs/PrimaryText';

interface Props {
  isVisible: boolean;
}

const MiniPlayer = ({ isVisible }: Props) => {
  const { colors } = useTheme();
  const playerInfo = useAppSelector((state) => state.player.playerInfo)

  const TrackInfoScroller = () => <PrimaryText>{playerInfo?.artist}</PrimaryText>;

  const ActiveListeningDevice = () => (
    <PrimaryText style={{ color: '#1DB954' }}>Some Device</PrimaryText>
  );

  return isVisible ? (
    <View style={[styles.playerContainer, { backgroundColor: colors.card }]}>
      <Image
        style={styles.albumImage}
        source={require('../../assets/post_malone_cover.jpg')}
      />
      <View>
        <TrackInfoScroller />
        <PrimaryText>{playerInfo?.artist}</PrimaryText>
        <ActiveListeningDevice />
      </View>
      <PrimaryText>{playerInfo?.album}</PrimaryText>
      <IsFollowedHeart isFollowed={true} />
      <PrimaryText>Play/Pause</PrimaryText>
    </View>
  ) : null;
};

export default MiniPlayer;

const styles = StyleSheet.create({
  playerContainer: {
    borderRadius: 5,
    position: 'absolute',
    alignSelf: 'center',
    width: '95%',
    paddingHorizontal: 10,
    bottom: 80,
    zIndex: 100,
    flexDirection: 'row',
    height: 50,
    borderBottomColor: '#000000',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  albumImage: {
    width: 40,
    height: 40,
    backgroundColor: 'gray',
  },
});

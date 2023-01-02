import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import IsFollowedHeart from '../inputs/IsFollowedHeart';
import { PrimaryText } from '../inputs/PrimaryText';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { HomeScreenNavigationProp } from '../../screens/HomeScreen/HomeScreen';
import { toggleMiniPlayer } from '../../redux/features/player/playerSlice';
import { AnimatePresence } from 'framer-motion';
import { MotiView } from 'moti';

const MiniPlayer = () => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const playerInfo = useAppSelector((state) => state.player.playerInfo);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigateToFullPlayer = () => {
    navigation.navigate('FullPlayerScreen');
    dispatch(toggleMiniPlayer());
  };

  return (
    <AnimatePresence>
      {playerInfo.miniPlayerIsVisible && (
        <MotiView
          from={{
            opacity: 1,
            translateY: 100,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
          transition={{
            type: 'timing',
            duration: 200,
            delay: 0,
          }}
          exit={{
            opacity: 0,
            translateY: 100,
          }}
          style={[styles.playerContainer, { backgroundColor: colors.card }]}
        >
          <Pressable
            style={{ flex: 1, flexDirection: 'row' }}
            onPress={() => navigateToFullPlayer()}
          >
            <Image
              style={styles.albumImage}
              source={{ uri: playerInfo.albumImage?.url }}
            />
            <View style={styles.listeningInfo}>
              <PrimaryText style={{ fontWeight: '700' }}>
                {playerInfo?.trackName}
              </PrimaryText>
              <PrimaryText>{playerInfo?.artist}</PrimaryText>
            </View>
            <View style={styles.iconGroup}>
              <TouchableOpacity>
                <AntDesign name="laptop" size={24} color="#1DB954" />
              </TouchableOpacity>
              <TouchableOpacity>
                <IsFollowedHeart isFollowed={true} />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="play" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
          </Pressable>
        </MotiView>
      )}
    </AnimatePresence>
  );
};

export default MiniPlayer;

const styles = StyleSheet.create({
  playerContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    position: 'absolute',
    alignSelf: 'center',
    width: '95%',
    paddingHorizontal: 10,
    bottom: 85,
    zIndex: 100,
    height: 70,
    borderBottomColor: '#000000',
    borderWidth: 1,
    alignItems: 'center',
  },
  albumImage: {
    width: 45,
    height: 45,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginRight: 10,
  },
  listeningInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  iconGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

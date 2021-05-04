import { RouteProp } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { PrimaryText } from '../components/inputs/PrimaryText';
import { HomeStackParamList } from '../components/navigation/HomeStackNavigator';
import Animated from 'react-native-reanimated';
import { SpotifyContext } from '../services/spotifyService';
import PlaylistCover from '../components/playlists/PlaylistCover';
import PlaylistContent from '../components/playlists/PlaylistContent';
import PlaylistHeader from '../components/playlists/PlaylistHeader';
import ControlsWidget from '../components/inputs/ControlsWidget';
import { StackNavigationProp } from '@react-navigation/stack';
import DetailOverlayScreen from './DetailOverlayScreen';
import { LinearGradient } from 'expo-linear-gradient';

type CustomPlaylistDetailScreenRouteProp = RouteProp<
  HomeStackParamList,
  'CustomPlaylistDetailScreen'
>;

type CustomPlaylistDetailScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'CustomPlaylistDetailScreen'
>;

type Props = {
  route: CustomPlaylistDetailScreenRouteProp;
  navigation: CustomPlaylistDetailScreenNavigationProp;
};

const { Value } = Animated;

const CustomPlaylistDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { playlistId } = route.params;

  const spotifyService = useContext(SpotifyContext);

  const [numOfLikes, setNumOfLikes] = useState<number>(0);
  const [isFollowing, toggleIsFollowing] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<PlaylistResponse | undefined>(
    undefined
  );
  const [showPlaylistOverlay, togglePlaylistOverlay] = useState<boolean>(false);

  const getPlaylistMemo = useCallback(async () => {
    const response = await spotifyService?.fetchPlaylist(playlistId);
    return response as PlaylistResponse;
  }, [playlist]);

  const getIsFollowingMemo = useCallback(async () => {
    const response = await spotifyService?.fetchIsFollowing(playlistId);
    return response as boolean;
  }, [isFollowing]);

  useEffect(() => {
    const getPlaylist = async () => {
      let playlistResponse = await getPlaylistMemo();
      if (playlistResponse) {
        setPlaylist(playlistResponse);
        setNumOfLikes(playlistResponse?.followers.total);
      } else {
        console.log('problem getting playlist');
      }
    };

    getPlaylist();
  }, []);

  useEffect(() => {
    const getIsFollowing = async () => {
      let isFollowingResponse = await getIsFollowingMemo();
      toggleIsFollowing(isFollowingResponse);
    };
    getIsFollowing();
  }, []);

  const followPlaylist = async () => {
    spotifyService?.followPlaylist(isFollowing, playlistId);
  };

  let handleFollowPress = (isFollowing: boolean) => {
    followPlaylist();
    toggleIsFollowing(isFollowing);
  };

  let handleDownloadPress = () => {};

  let handleEllipsisPress = () => {
    togglePlaylistOverlay(!showPlaylistOverlay);
    navigation.setOptions;
  };

  if (!playlist) {
    return <PrimaryText>Loading...</PrimaryText>;
  }

  const y = new Value(0);

  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#CCCCCC', 'transparent']}
          end={{ x: 0.6, y: 1 }}
          style={styles.background}
        />
        <View style={styles.content}>
          <PlaylistCover imageUrl={playlist.images[0].url} />
          <PlaylistHeader />
          <ControlsWidget
            description={playlist.description}
            isFollowed={isFollowing}
            owner={playlist.owner}
            numOfLikes={numOfLikes}
            totalDuration={0}
            onFollowPress={handleFollowPress}
            onDownloadPress={handleDownloadPress}
            onEllipsisPress={handleEllipsisPress}
          />
          <PlaylistContent y={y} playlist={playlist} />
        </View>
      </View>
      {showPlaylistOverlay && (
        <DetailOverlayScreen
          navigation={navigation}
          closeOverlay={handleEllipsisPress}
          title={playlist.name}
          imageUrl={playlist.images[0].url}
          numOfFollowers={numOfLikes}
        />
      )}
    </>
  );
};

export default CustomPlaylistDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginHorizontal: 20,
    marginTop: 40,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 500,
  },
  playlistTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
});

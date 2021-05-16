import { RouteProp } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { PrimaryText } from '../components/inputs/PrimaryText';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import Animated from 'react-native-reanimated';
import { SpotifyContext } from '../services/spotifyService';
import PlaylistCover from '../components/playlists/PlaylistCover';
import PlaylistContent from '../components/playlists/PlaylistContent';
import PlaylistHeader from '../components/playlists/PlaylistHeader';
import ControlsWidget from '../components/inputs/ControlsWidget';
import { StackNavigationProp } from '@react-navigation/stack';
import DetailOverlayScreen from './DetailOverlayScreen';
import { LinearGradient } from 'expo-linear-gradient';

type PlaylistDetailScreenRouteProp = RouteProp<
  HomeStackParamList,
  'PlaylistDetailScreen'
>;

type PlaylistDetailScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'PlaylistDetailScreen'
>;

type Props = {
  route: PlaylistDetailScreenRouteProp;
  navigation: PlaylistDetailScreenNavigationProp;
};

const { Value } = Animated;

const PlaylistDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { playlistId } = route.params;

  const spotifyService = useContext(SpotifyContext);

  const [numOfLikes, setNumOfLikes] = useState<number>(0);
  const [isFollowing, toggleIsFollowing] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<PlaylistObject | undefined>(
    undefined
  );
  const [showDetailOverlay, toggleShowDetailOverlay] = useState<boolean>(false);
  useEffect(() => {
    const getPlaylist = async () => {
      let playlistResponse = await getPlaylistMemo();
      if (playlistResponse) {
        setPlaylist(playlistResponse);
        setNumOfLikes(playlistResponse?.followers.total);
      } else {
        console.log('There was a problem getting the playlist.');
      }
    };

    getPlaylist();
  }, []);

  useEffect(() => {
    const getIsFollowing = async () => {
      let isFollowingResponse = await getIsFollowingMemo();
      console.log('isFollow', isFollowingResponse);
      toggleIsFollowing(isFollowingResponse);
    };
    getIsFollowing();
  }, []);

  const getPlaylistMemo = useCallback(async () => {
    const response = await spotifyService?.fetchPlaylist(playlistId);
    return response as PlaylistObject;
  }, [playlist]);

  const getIsFollowingMemo = useCallback(async () => {
    const response = await spotifyService?.fetchIsFollowing(playlistId);
    return response![0];
  }, [isFollowing]);

  const followPlaylist = async () => {
    spotifyService?.followPlaylist(isFollowing, playlistId);
  };

  let handleFollowPress = (isFollowing: boolean) => {
    followPlaylist();
    toggleIsFollowing(isFollowing);
  };

  // No op. Not suppoerted by Spotify public API
  let handleDownloadPress = () => {};

  let handleEllipsisPress = () => {
    toggleShowDetailOverlay(!showDetailOverlay);
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
      {showDetailOverlay && (
        <DetailOverlayScreen
          id={playlist.id}
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

export default PlaylistDetailScreen;

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

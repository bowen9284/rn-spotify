import { RouteProp } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ControlsWidget from '../components/inputs/ControlsWidget';
import { PrimaryText } from '../components/inputs/PrimaryText';
import { SecondaryText } from '../components/inputs/SecondaryText';
import { HomeStackParamList } from '../components/navigation/HomeStackNavigator';
import PlaylistRow from '../components/playlists/PlaylistRow';
import { AuthContext } from '../context/authContext';
import { getDurationInHoursAndMinutes } from '../utils/dateUtil';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../context/userContext';

type CustomPlaylistDetailScreenRouteProp = RouteProp<
  HomeStackParamList,
  'CustomPlaylistDetailScreen'
>;

type Props = {
  route: CustomPlaylistDetailScreenRouteProp;
};

const CustomPlaylistDetailScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;

  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);

  const [playlist, setPlaylist] = useState<PlaylistResponse | undefined>(
    undefined
  );
  const [numOfLikes, setNumOfLikes] = useState<number>(0);
  const [isFollowing, toggleIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        let response = await fetch(
          `https://api.spotify.com/v1/playlists/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authContext?.token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        let playlistResponse = (await response.json()) as PlaylistResponse;
        setPlaylist(playlistResponse);
        setNumOfLikes(playlistResponse.followers.total);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlaylist();
  }, []);

  useEffect(() => {
    const fetchIsFollowing = async () => {
      try {
        let response = await fetch(
          `https://api.spotify.com/v1/playlists/${id}/followers/contains?ids=${userContext?.id}`,
          {
            headers: {
              Authorization: `Bearer ${authContext?.token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        let json: boolean[] = await response.json();
        toggleIsFollowing(json[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchIsFollowing();
  }, []);

  const followPlaylist = async () => {
    let httpMethod = isFollowing ? 'DELETE' : 'PUT';

    try {
      let response = await fetch(
        `https://api.spotify.com/v1/playlists/${id}/followers`,
        {
          method: httpMethod,
          headers: {
            Authorization: `Bearer ${authContext?.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.ok);
    } catch (error) {
      console.error(error);
    }
  };

  let handleFollowPress = (isFollowing: boolean) => {
    followPlaylist();
    toggleIsFollowing(isFollowing);
  };

  let handleDownloadPress = () => {};

  let handleEllipsisPress = () => {};

  let totalDuration = 0;
  let tracks: PlaylistItem[] =
    playlist?.tracks.items || new Array<PlaylistItem>();

  let trackTiles = tracks.map((playlistTrack, index) => {
    // @todo fix duration. Incorrect amount
    totalDuration += playlistTrack.track.duration_ms;
    return <PlaylistRow key={index} playlistTrack={playlistTrack} />;
  });

  if (!playlist) {
    return <PrimaryText>Loading...</PrimaryText>;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.playlistHeaderContainer}>
          <Image
            style={styles.mainCoverImage}
            source={{ uri: playlist?.images[0].url }}
          />
        </View>

        <View style={styles.playlistMetaContainer}>
          {/* @todo android only */}
          {/* <Text style={[styles.playlistTitle, { color: colors.primary }]}>
            {playlist?.name}
          </Text> */}
          <SecondaryText numberOfLines={2}>
            {playlist?.description}
          </SecondaryText>
        </View>
        <View style={styles.controlsContainer}>
          <View style={styles.leftControls}>
            {/* @todo image isn't always there */}
            {/* <Image
            style={styles.ownerImage}
            source={{ uri: playlist?.owner.images[0].url }}
          /> */}
            <PrimaryText style={styles.playlistOwner}>
              {playlist?.owner.display_name}
            </PrimaryText>
            <SecondaryText style={styles.likesAndDuration}>
              {numOfLikes.toLocaleString()} likes &#183;{' '}
              {getDurationInHoursAndMinutes(totalDuration)}
            </SecondaryText>
            <ControlsWidget
              isFollowed={isFollowing}
              onFollowPress={handleFollowPress}
              onDownloadPress={handleDownloadPress}
              onEllipsisPress={handleEllipsisPress}
            />
          </View>
          <View style={styles.rightControls}>
            <Ionicons name="play-circle" size={75} color="green" />
          </View>
        </View>

        <View>{trackTiles}</View>
      </ScrollView>
    </View>
  );
};

export default CustomPlaylistDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    marginHorizontal: 20,
  },
  playlistHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainCoverImage: {
    width: 150,
    height: 150,
  },
  playlistTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  playlistOwner: {
    fontWeight: 'bold',
  },
  playlistMetaContainer: {
    marginVertical: 10,
  },
  controlsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  leftControls: {
    width: '45%',
  },
  rightControls: {
    width: '55%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  likesAndDuration: {
    marginTop: 10,
    marginBottom: 15,
  },
  ownerImage: {
    width: 20,
    height: 20,
  },
});

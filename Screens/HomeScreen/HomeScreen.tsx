import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import HomeHeader from '../../components/HomeHeader';
import RecentListens from '../../components/RecentListens';
import RecentPlaylists from '../../components/RecentPlaylists';
import { SpotifyContext } from '../../services/spotifyService';
import { LinearGradient } from 'expo-linear-gradient';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import MoreLike from '../../components/MoreLike';
import FeaturedPlaylists from '../../components/FeaturedPlaylists';

type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'HomeScreen'>;

export type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'PlaylistDetailScreen'
>;

type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ route, navigation }) => {
  const spotifyService = useContext(SpotifyContext);

  const [recentlyPlayed, setRecentlyPlayed] = useState<
    RecentlyPlayedResponse | undefined
  >(undefined);

  const [user, setUser] = useState<PrivateUser | undefined>(undefined);

  useEffect(() => {
    let getUserProfile = async () => {
      let response = await spotifyService?.fetchUserProfile();
      if (response) {
        setUser(response);
      }
    };

    getUserProfile();
  }, []);

  useEffect(() => {
    let getRecentlyPlayed = async () => {
      const response = (await spotifyService?.fetchRecentlyPlayed()) as RecentlyPlayedResponse;
      setRecentlyPlayed(response);
    };

    getRecentlyPlayed();
  }, []);

  if (!recentlyPlayed?.items) {
    return <ActivityIndicator />;
  }

  let recentArtist = recentlyPlayed?.items[0].track.artists[0];

  return (
    <>
      <View style={styles.homeContainer}>
        <ScrollView>
          <LinearGradient
            colors={['grey', 'transparent']}
            end={{ x: 0.6, y: 0.5 }}
            style={styles.background}
          />
          <View style={styles.homeContent}>
            <HomeHeader navigation={navigation} />
            <RecentListens items={recentlyPlayed!.items} />
            <RecentPlaylists />
            {/* <MoreLike artist={recentArtist} /> */}
            <FeaturedPlaylists />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  homeContent: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
});

export default HomeScreen;

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import HomeHeader from '../../components/HomeHeader';
import { PrimaryText } from '../../components/inputs/PrimaryText';
import RecentListens from '../../components/RecentListens';
import RecentPlaylists from '../../components/RecentPlaylists';
import { SpotifyContext } from '../../services/spotifyService';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen: React.FC = () => {
  const spotifyService = useContext(SpotifyContext);

  const [recentlyPlayed, setRecentlyPlayed] = useState<
    RecentlyPlayedResponse | undefined
  >(undefined);
  const [user, setUser] = useState<PrivateUser | undefined>(undefined);

  const getUserProfileMemo = useCallback(async () => {
    const response = await spotifyService?.fetchUserProfile();

    return response as PrivateUser;
  }, [user]);

  useEffect(() => {
    let getUserProfile = async () => {
      let user = await getUserProfileMemo();
      setUser(user);
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

  if (!user || !recentlyPlayed) {
    return <PrimaryText>Loading...</PrimaryText>;
  }

  return (
    <>
      <View style={styles.homeContainer}>
        <ScrollView>
          <LinearGradient
            colors={['#cc0000', 'transparent']}
            end={{ x: 0.6, y: 0.5 }}
            style={styles.background}
          />
          <View style={styles.homeContent}>
            <HomeHeader />
            <RecentListens items={recentlyPlayed?.items} />
            {/* <MoreLike /> */}
            <RecentPlaylists />
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

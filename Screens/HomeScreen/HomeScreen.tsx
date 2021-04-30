import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import HomeHeader from '../../components/HomeHeader';
import { PrimaryText } from '../../components/inputs/PrimaryText';
import RecentListens from '../../components/RecentListens';
import RecentPlaylists from '../../components/RecentPlaylists';
import { SpotifyContext } from '../../services/spotifyService';

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
    <SafeAreaView style={styles.homeContainer}>
      <ScrollView>
        <HomeHeader />
        <RecentListens items={recentlyPlayed?.items} />
        {/* <MoreLike /> */}
        <RecentPlaylists />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
});

export default HomeScreen;

import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import HomeHeader from '../../components/HomeHeader';
import RecentListens from '../../components/RecentListens';
import { AuthContext } from '../../context/authContext';
import RecentPlaylists from '../../components/RecentPlaylists';
import { UserContext } from '../../context/userContext';

const HomeScreen: React.FC = () => {
  const context = useContext(AuthContext);
  const userContext = useContext(UserContext);

  const [recentlyPlayedItems, setRecentlyPlayedItems] = useState<
    RecentlyPlayedResponse | undefined
  >(undefined);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${context?.token}`,
            'Content-Type': 'application/json',
          },
        });
        let json: PrivateUser  = await response.json();
        
        userContext?.setId(json.id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      try {
        let response = await fetch(
          'https://api.spotify.com/v1/me/player/recently-played?limit=6',
          {
            headers: {
              Authorization: `Bearer ${context?.token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        let json = await response.json();
        setRecentlyPlayedItems(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecentlyPlayed();
  }, []);

  if (!recentlyPlayedItems) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.homeContainer}>
      <ScrollView>
        <HomeHeader />
        <RecentListens items={recentlyPlayedItems.items} />
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

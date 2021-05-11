import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import HorizontalScroller from './HorizontalScroller';

const MoreLike = () => {
  const [moreLikeItems, setMoreLikeItems] = useState<
    RecentlyPlayedResponse | undefined
  >(undefined);

  // homescreen will get recently played. Based off of that response,
  /// I can grab genres and artists for other areas of the app
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
        setMoreLikeItems(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecentlyPlayed();
  }, []);

  if (!moreLikeItems) {
    return <Text>Loading...</Text>;
  }

  return (
    <HorizontalScroller title="More like" children={moreLikeItems!.items} />
  );
};

export default MoreLike;

const styles = StyleSheet.create({});

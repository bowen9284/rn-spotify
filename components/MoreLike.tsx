import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SpotifyContext } from '../services/spotifyService';
import HorizontalScroller from './HorizontalScroller';
import RecentListenSquareTile from './RecentListenSquareTile';

type Props = {
  artist: Artist
};

const MoreLike: React.FC<Props> = ({ artist }) => {
  const spotifyService = useContext(SpotifyContext);

  const [relatedArtists, setRelatedArtists] = useState<[Artist] | undefined>(
    undefined
  );

  // homescreen will get recently played. Based off of that response,
  /// I can grab genres and artists for other areas of the app
  useEffect(() => {
    let getRelatedArtists = async () => {
      let response = await spotifyService?.fetchRelatedArtists(artist.id);
      if (response) {
        setRelatedArtists(response.artists);
      }
    };

    getRelatedArtists();
  }, []);

  if (!relatedArtists) {
    return <Text>Loading...</Text>;
  }
  const title = `More like ${artist.name}`
  let tiles = relatedArtists?.map((item, index) => {
    return (
      <RecentListenSquareTile
        key={index}
        id={item.id}
        images={item.images}
        name={item.name}
      />
    );
  });

  return <HorizontalScroller title={title} children={tiles} />;
};

export default MoreLike;

const styles = StyleSheet.create({});

import { BlurView } from 'expo-blur';
import React, { useEffect } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import IsFollowedHeart from '../components/inputs/IsFollowedHeart';
import { PrimaryText } from '../components/inputs/PrimaryText';
import { Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { SecondaryText } from '../components/inputs/SecondaryText';

type Props = {
  navigation: any;
  closeOverlay: () => void;
  id: string;
  title: string;
  imageUrl: string;
  numOfFollowers: number;
};

const DetailOverlayScreen: React.FC<Props> = ({
  navigation,
  closeOverlay,
  id,
  title,
  imageUrl,
  numOfFollowers,
}) => {
  // Unique spotify behavior:
  // Hide tab bar on render, show when closing overlay

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    return () => {
      navigation.setOptions({
        headerShown: true,
      });
    };
  }, []);

  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });
    return () => {
      parent.setOptions({
        tabBarVisible: true,
      });
    };
  }, []);

  let NumberOfFollowersText = () => {
    let isFollowersPlural = true;
    if (numOfFollowers === 1) {
      isFollowersPlural = false;
    }

    return (
      <Text>
        {numOfFollowers} {isFollowersPlural ? 'followers' : 'follower'}
      </Text>
    );
  };

  return (
    <>
      <BlurView intensity={99} tint="dark" style={styles.overlay}></BlurView>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Image style={styles.headerImage} source={{ uri: imageUrl }} />
              <PrimaryText style={{ fontSize: 18, fontWeight: 'bold' }}>
                {title}
              </PrimaryText>
              <SecondaryText style={{ marginTop: 5 }}>
                <NumberOfFollowersText />
              </SecondaryText>
            </View>
            <DetailRow text="Liked">
              <IsFollowedHeart isFollowed={false} iconSize={24} />
            </DetailRow>
            <DetailRow text="Download">
              <Ionicons
                name="arrow-down-circle-outline"
                size={24}
                color="gray"
              />
            </DetailRow>
            <DetailRow text="Add to Profile">
              <Ionicons name="person-circle-outline" size={24} color="gray" />
            </DetailRow>
            <DetailRow text="Add to queue">
              <MaterialIcons name="playlist-add" size={24} color="gray" />
            </DetailRow>
            <DetailRow text="Share">
              <MaterialIcons name="ios-share" size={24} color="gray" />
            </DetailRow>
            <DetailRow text="Go to radio">
              <Ionicons name="radio" size={24} color="gray" />
            </DetailRow>
            <DetailRow text="About recommendations">
              <SimpleLineIcons name="question" size={24} color="gray" />
            </DetailRow>
          </View>
        </ScrollView>
        <View>
          <Button
            color="white"
            title="Close"
            onPress={() => {
              closeOverlay();
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

type RowProps = {
  text: string;
  children: React.ReactNode;
};

const DetailRow: React.FC<RowProps> = ({ text, children }) => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.row}>
        <View>{children}</View>
        <DetailRowText>{text}</DetailRowText>
      </View>
    </TouchableOpacity>
  );
};

type DetailTextRowProps = {
  children: React.ReactNode;
};

const DetailRowText: React.FC<DetailTextRowProps> = ({ children }) => {
  return <PrimaryText style={styles.textRow}>{children}</PrimaryText>;
};

export default DetailOverlayScreen;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    marginHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 30,
  },
  headerImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  textRow: {
    fontWeight: '500',
    fontSize: 18,
    marginLeft: 10,
  },
});

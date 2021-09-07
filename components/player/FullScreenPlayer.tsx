import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import IsFollowedHeart from '../inputs/IsFollowedHeart';

interface Props {}

const Header = () => (
  <View style={styles.header}>
    <Ionicons name="ios-arrow-back" size={24} color="white" />
    <View style={styles.headerInfo}>
      <Text style={{ color: 'white' }}>Playing from your library</Text>
      <Text style={{ color: 'white' }}>Liked Songs</Text>
    </View>
    <Ionicons name="ellipsis-vertical" size={24} color="white" />
  </View>
);

const Footer = () => (
  <View style={styles.footer}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Track Title Marquee
        </Text>
        <Text style={{ color: 'white' }}>Track Artist</Text>
      </View>
      <View>
        <IsFollowedHeart isFollowed={true} />
      </View>
    </View>
  </View>
);

const FullScreenPlayer = (props: Props) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Footer />
    </SafeAreaView>
  );
};

export default FullScreenPlayer;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'white',
    borderWidth: 1,
  },
  headerInfo: {
    alignItems: 'center',
  },
  footer: {
    borderColor: 'white',
    borderWidth: 1,
  },
});

import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { HomeScreenNavigationProp } from '../screens/HomeScreen/HomeScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeHeader: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const headerStyle = [{ color: colors.text }, styles.headerText];

  return (
    <View style={styles.headerContainer}>
      <Text style={headerStyle}>Good morning</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RecentlyPlayedScreen')}
        >
          <Entypo name="back-in-time" size={27} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
          <EvilIcons name="gear" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    width: '50%',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerIcons: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default HomeHeader;

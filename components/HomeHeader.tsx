import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const HomeHeader: React.FC = () => {
  const { colors } = useTheme();
  const colorStyle = [{ color: colors.text }, styles.headerText];

  return (
    <View style={styles.headerContainer}>
      <Text style={colorStyle}>Good morning</Text>
      <View style={styles.headerIcons}>
        <View>
          <Entypo name="back-in-time" size={28} color="white" />
        </View>
        <View>
          <EvilIcons name="gear" size={30} color="white" />
        </View>
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

import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { HomeScreenNavigationProp } from '../Screens/HomeScreen/HomeScreen';
import { AuthContext } from '../context/authContext';

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeHeader: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const colorStyle = [{ color: colors.text }, styles.headerText];
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.headerContainer}>
      <Text style={colorStyle}>Good morning</Text>
      <View style={styles.headerIcons}>
        {/* temp button to relogin if token expires */}
        <Button
          title="Logout"
          onPress={() => {
            signOut();
          }}
        />
        {Platform.OS === 'android' ?? (
          <View>
            <Entypo name="back-in-time" size={28} color="white" />
          </View>
        )}
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

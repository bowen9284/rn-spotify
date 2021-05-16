import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Button, SectionList, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/authContext';

type Props = {};

const SettingsScreen: React.FC<Props> = ({}) => {
  const { colors } = useTheme();
  const { signOut } = useContext(AuthContext);

  const DATA = [
    {
      title: 'Data Saver',
      data: ['Data Saver', 'Audio-only podcasts'],
    },
    {
      title: 'Account',
      data: ['Email'],
    },
    {
      title: 'Playback',
      data: ['Water', 'Coke', 'Beer'],
    },
    {
      title: 'Devices',
      data: ['Cheese Cake', 'Ice Cream'],
    },
    {
      title: 'Connect to Apps',
      data: ['Cheese Cake', 'Ice Cream'],
    },
    {
      title: 'Social',
      data: ['Cheese Cake', 'Ice Cream'],
    },
  ];

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  return (
    <View>
      <Button
        title="Logout"
        onPress={() => {
          signOut();
        }}
      />
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ color: colors.text }}>{title}</Text>
        )}
      />
      <Text>Settings</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});

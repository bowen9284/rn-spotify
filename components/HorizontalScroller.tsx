import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PrimaryText } from './inputs/PrimaryText';

type Props = {
  title: string;
  items: React.ReactNode;
};

const HorizontalScroller: React.FC<Props> = ({ title, items }) => {

  return (
    <View style={styles.container}>
      <PrimaryText style={styles.headerText}>{title}</PrimaryText>
      <ScrollView horizontal={true}>{items}</ScrollView>
    </View>
  );
};

export default HorizontalScroller;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 225,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingVertical: 15,
  },
});

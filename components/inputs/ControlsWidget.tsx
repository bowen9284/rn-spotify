import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../context/authContext';

interface Props {
  isFollowed: boolean;
  onFollowPress: (toggle: boolean) => void;
  onDownloadPress: () => void;
  onEllipsisPress: () => void;
}
const ControlsWidget: React.FC<Props> = ({
  isFollowed,
  onFollowPress,
  onDownloadPress,
  onEllipsisPress,
}) => {
  const context = useContext(AuthContext);

  let isFollowedIcon = () => {
    return isFollowed ? (
      <Ionicons name="ios-heart" size={30} color="green" />
    ) : (
      <Ionicons name="heart-outline" size={30} color="gray" />
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onFollowPress(!isFollowed);
        }}
      >
        {isFollowedIcon()}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="arrow-down-circle-outline" size={30} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="ellipsis-horizontal" size={30} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default ControlsWidget;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

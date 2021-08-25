import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SecondaryText } from './SecondaryText';
import { getDurationInHoursAndMinutes } from '../../utils/dateUtil';
import { PrimaryText } from './PrimaryText';
import IsFollowedHeart from './IsFollowedHeart';

interface Props {
  description: string;
  isFollowed: boolean;
  ownerImages: SpotifyImage[];
  ownerDisplayName: string
  numOfLikes: number;
  totalDuration: number;
  onFollowPress: (toggle: boolean) => void;
  onDownloadPress: () => void;
  onEllipsisPress: () => void;
}
const ControlsWidget: React.FC<Props> = ({
  description,
  isFollowed,
  ownerImages,
  ownerDisplayName,
  numOfLikes,
  totalDuration,
  onFollowPress,
  onDownloadPress,
  onEllipsisPress,
}) => {

  return (
    <View style={styles.container}>
      <View style={styles.playlistMetaContainer}>
        <SecondaryText numberOfLines={2}>{description}</SecondaryText>
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.leftControls}>
          {ownerImages && (
            <Image
              style={styles.ownerImage}
              source={{
                uri: ownerImages[0]!.url,
              }}
            />
          )}
          <PrimaryText style={styles.playlistOwner}>
            {ownerDisplayName}
          </PrimaryText>
          <SecondaryText style={styles.likesAndDuration}>
            {numOfLikes.toLocaleString()} likes &#183;{' '}
            {getDurationInHoursAndMinutes(totalDuration)}
          </SecondaryText>
          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => {
                onFollowPress(!isFollowed);
              }}
            >
              <IsFollowedHeart isFollowed={isFollowed} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons
                name="arrow-down-circle-outline"
                size={30}
                color="gray"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onEllipsisPress();
              }}
            >
              <Ionicons name="ellipsis-horizontal" size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rightControls}>
          <Ionicons name="play-circle" size={75} color="#1DB954" />
        </View>
      </View>
    </View>
  );
};

export default ControlsWidget;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  playlistOwner: {
    fontWeight: 'bold',
  },
  playlistMetaContainer: {
    marginVertical: 10,
  },
  controlsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  leftControls: {
    width: '45%',
  },
  rightControls: {
    width: '55%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  likesAndDuration: {
    marginTop: 10,
    marginBottom: 15,
  },
  ownerImage: {
    width: 20,
    height: 20,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

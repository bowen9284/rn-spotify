import React from 'react';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  isFollowed: Boolean;
  iconSize?: number;
};

const IsFollowedHeart: React.FC<Props> = ({ isFollowed, iconSize = 30 }) => {
  return isFollowed ? (
    <Ionicons name="ios-heart" size={iconSize} color="#1DB954" />
  ) : (
    <Ionicons name="heart-outline" size={iconSize} color="gray" />
  );
};

export default IsFollowedHeart;

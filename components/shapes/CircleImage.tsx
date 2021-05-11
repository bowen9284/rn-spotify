import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';

type Props = {
  source: ImageSourcePropType;
  size?: number;
  style?: {};
};

const CircleImage: React.FC<Props> = ({ source, size = 125, style }) => {
  return (
    <Image
      source={source}
      style={{
        ...style,
        width: size,
        height: size,
        borderRadius: size / 2,
        opacity: .4
      }}
    />
  );
};

export default CircleImage;

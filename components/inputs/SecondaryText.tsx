import React from 'react';
import { Text } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: {};
  numberOfLines?: number;
};

export const SecondaryText: React.FC<Props> = ({
  children,
  style,
  numberOfLines,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode="tail"
      style={{ fontSize: 13, color: 'lightgray', ...style }}
    >
      {children}
    </Text>
  );
};

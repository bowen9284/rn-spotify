import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

type Props = {
  children: React.ReactNode;
  style?: {};
};

export const PrimaryText: React.FC<Props> = ({ children, style }) => {
  const { colors } = useTheme();
  return <Text style={{ ...style, color: colors.text }}>{children}</Text>;
};
